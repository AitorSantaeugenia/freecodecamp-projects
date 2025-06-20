'use strict';

const { Project } = require('../models');
const IssueModel = require('../models').Issue;
const ProjectModel = require('../models').Project;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      let project = req.params.project;
      const filter = { project };
      // Añadir filtros de query si existen
      Object.keys(req.query).forEach(key => {
        let value = req.query[key];
        // Convertir 'true'/'false' a booleano para campos booleanos
        if (key === 'open') {
          if (value === 'true') value = true;
          if (value === 'false') value = false;
        }
        filter[key] = value;
      });
      try {
        const issues = await IssueModel.find(filter).exec();
        res.json(issues);
      } catch (err) {
        res.status(500).json({ error: 'Error fetching issues' });
      }
    })
    
    .post(async (req, res)=> {
      let project = req.params.project;
      const {issue_title, issue_text, created_by, assigned_to, status_text} = req.body;
      if (!issue_title || !issue_text || !created_by) {
        return res.status(200).json({ error: 'required field(s) missing' });
      }
      try {
        const issue = new IssueModel({
          issue_title,
          issue_text,
          created_by,
          assigned_to: assigned_to || '',
          status_text: status_text || '',
          created_on: new Date(),
          updated_on: new Date(),
          open: true,
          project
        });
        const savedIssue = await issue.save();
        const { _id, ...rest } = savedIssue.toObject();
        res.json({
          _id,
          issue_title: rest.issue_title,
          issue_text: rest.issue_text,
          created_by: rest.created_by,
          assigned_to: rest.assigned_to,
          status_text: rest.status_text,
          open: rest.open,
          created_on: rest.created_on,
          updated_on: rest.updated_on,
          project: rest.project
        });
      } catch (err) {
        res.status(500).json({ error: 'could not create issue' });
      }
    })
    
    .put(async function (req, res){
      let project = req.params.project;
      const {_id, ...fields} = req.body;
      if (!_id) {
        return res.status(200).json({ error: 'missing _id' });
      }
      // Eliminar campos vacíos o no actualizables
      const updateFields = {};
      Object.keys(fields).forEach(key => {
        let value = fields[key];
        // Convertir 'true'/'false' a booleano para campos booleanos
        if (key === 'open') {
          if (value === 'true') value = true;
          if (value === 'false') value = false;
        }
        if (value !== undefined && value !== '') {
          updateFields[key] = value;
        }
      });
      if (Object.keys(updateFields).length === 0) {
        return res.status(200).json({ error: 'no update field(s) sent', _id });
      }
      updateFields.updated_on = new Date();
      try {
        // Permitir actualizar aunque el issue no tenga el campo project
        const updated = await IssueModel.findOneAndUpdate(
          { _id },
          updateFields,
          { new: true }
        );
        if (!updated) {
          return res.status(200).json({ error: 'could not update', _id });
        }
        res.status(200).json({ result: 'successfully updated', _id });
      } catch (err) {
        res.status(200).json({ error: 'could not update', _id });
      }
    })
    
    .delete(async function (req, res){
      let project = req.params.project;
      const { _id } = req.body;
      if (!_id) {
        return res.status(200).json({ error: 'missing _id' });
      }
      try {
        // Permitir borrar aunque el issue no tenga el campo project
        const deleted = await IssueModel.findOneAndDelete({ _id });
        if (!deleted) {
          return res.status(200).json({ error: 'could not delete', _id });
        }
        res.status(200).json({ result: 'successfully deleted', _id });
      } catch (err) {
        res.status(200).json({ error: 'could not delete', _id });
      }
    });
    
};
