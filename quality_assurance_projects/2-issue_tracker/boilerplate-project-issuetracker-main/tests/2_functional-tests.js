const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let testId;
let testId2;

suite('Functional Tests', function() {
  suite('POST /api/issues/{project}', function() {
    test('Create an issue with every field', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Tester',
          assigned_to: 'Dev',
          status_text: 'In progress'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Tester');
          assert.equal(res.body.assigned_to, 'Dev');
          assert.equal(res.body.status_text, 'In progress');
          testId = res.body._id;
          done();
        });
    });

    test('Create an issue with only required fields', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title2',
          issue_text: 'Text2',
          created_by: 'Tester2'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.equal(res.body.issue_title, 'Title2');
          assert.equal(res.body.issue_text, 'Text2');
          assert.equal(res.body.created_by, 'Tester2');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          testId2 = res.body._id;
          done();
        });
    });

    test('Create an issue with missing required fields', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'No text'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          done();
        });
    });
  });

  suite('GET /api/issues/{project}', function() {
    test('View issues on a project', function(done) {
      chai.request(server)
        .get('/api/issues/test')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], '_id');
          done();
        });
    });

    test('View issues on a project with one filter', function(done) {
      chai.request(server)
        .get('/api/issues/test')
        .query({ created_by: 'Tester' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          res.body.forEach(issue => {
            assert.equal(issue.created_by, 'Tester');
          });
          done();
        });
    });

    test('View issues on a project with multiple filters', function(done) {
      chai.request(server)
        .get('/api/issues/test')
        .query({ created_by: 'Tester', open: true })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          res.body.forEach(issue => {
            assert.equal(issue.created_by, 'Tester');
            assert.equal(issue.open, true);
          });
          done();
        });
    });
  });

  suite('PUT /api/issues/{project}', function() {
    test('Update one field on an issue', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({ _id: testId, issue_text: 'Updated text' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'result');
          assert.equal(res.body.result, 'successfully updated');
          assert.equal(res.body._id, testId);
          done();
        });
    });

    test('Update multiple fields on an issue', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({ _id: testId2, issue_title: 'Updated title', issue_text: 'Updated text' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'result');
          assert.equal(res.body.result, 'successfully updated');
          assert.equal(res.body._id, testId2);
          done();
        });
    });

    test('Update an issue with missing _id', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({ issue_text: 'No id' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });

    test('Update an issue with no fields to update', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({ _id: testId })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'no update field(s) sent');
          done();
        });
    });

    test('Update an issue with an invalid _id', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({ _id: 'invalidid', issue_text: 'text' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'could not update');
          done();
        });
    });
  });

  suite('DELETE /api/issues/{project}', function() {
    test('Delete an issue', function(done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({ _id: testId })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'result');
          assert.equal(res.body.result, 'successfully deleted');
          assert.equal(res.body._id, testId);
          done();
        });
    });

    test('Delete an issue with an invalid _id', function(done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({ _id: 'invalidid' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'could not delete');
          done();
        });
    });

    test('Delete an issue with missing _id', function(done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({ })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });
  });
});