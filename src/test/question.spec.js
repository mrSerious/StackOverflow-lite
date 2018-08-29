/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^pool" }] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

chai.should();

describe('routes : question', () => {
  describe('GET /api/v1/questions', () => {
    it('should respond a success message and all questions', (done) => {
      chai.request(server)
        .get('/api/v1/questions')
        .end((error, response) => {
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Data retreival successful');
          response.body.data.should.include.keys('questions');
          done();
        });
    });
  });

  describe('GET /api/v1/questions/:questionId', () => {
    it('should respond with a success message and a single question',
      (done) => {
        chai.request(server)
          .get('/api/v1/questions/1')
          .end((error, response) => {
            response.status.should.equal(200);
            response.type.should.equal('application/json');
            response.body.status.should.eql('Success');
            response.body.message.should.eql('Request was successful');
            done();
          });
      });

    it('should respond with a failure message', (done) => {
      chai.request(server)
        .get('/api/v1/questions/15')
        .end((error, response) => {
          response.status.should.equal(404);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Question not found');
          done();
        });
    });

    it('should respond with a validation error message', (done) => {
      chai.request(server)
        .get('/api/v1/questions/w')
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Validation failed');
          response.body.data[0].msg.should.eql('Invalid url parameter');
          done();
        });
    });
  });

  describe('POST /api/v1/questions', () => {
    it('should respond with a success message and a'
      + ' single question that was added', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send({
          title: 'Qui aggredior inveniant desumptas',
          body: 'Ipsius cupere vulgus tes hos.',
        })
        .end((error, response) => {
          response.status.should.equal(201);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Question created successfully');
          done();
        });
    });

    it('should respond with validation error message', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send()
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(400);
          response.body.message.should.eql('Validation failed');
          response.body.data[0].msg.should.eql('Title cannot be empty');
          response.body.data[1].msg.should.eql('Question body cannot be empty');
          done();
        });
    });
  });

  describe('DELETE /api/v1/questions/:questionId', () => {
    it('should respond with a success message', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/1')
        .end((error, response) => {
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Question deleted successfully');
          response.body.should.include.keys('status', 'message');
          done();
        });
    });

    it('should respond with a not found message', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/50')
        .end((error, response) => {
          response.status.should.equal(404);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Question not found');
          done();
        });
    });
    it('should respond with validation error', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/r')
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Validation failed');
          response.body.data[0].msg.should.eql('Invalid url parameter');
          done();
        });
    });
  });
});
