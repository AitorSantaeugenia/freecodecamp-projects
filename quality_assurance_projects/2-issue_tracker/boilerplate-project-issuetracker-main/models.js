const mongoose = require('mongoose');
const { Schema } = mongoose;

let issueSchema = new mongoose.Schema({
    // projectID: {type: String, required: true},
    issue_title: {type: String, required: true},
    issue_text: {type: String, required: true},
    created_by : {type: String, required: true},
    assigned_to : String,
    status_text : String,
    open: {type: Boolean, required: true},
    created_on: {type: Date, required: true},
    updated_on: {type: Date, required: true},
    project: { type: String, required: true }
  })

  let Issue = mongoose.model('Issue', issueSchema)

  const ProjectSchema = new Schema({
    name: { type: String, required: true }
  });
  const Project = mongoose.model('Project', ProjectSchema);
  
  exports.Issue = Issue;
  exports.Project = Project;