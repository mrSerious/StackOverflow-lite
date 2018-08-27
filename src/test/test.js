/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^pool" }] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

const should = chai.should();

describe('routes : index', () => {
  describe('GET /api/v1', () => {
    it('should display "Connected!" message', (done) => {
      chai.request(server)
        .get('/api/v1')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Connected!');
          done();
        });
    });
  });

  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Sorry can\'t find that page!');
          done();
        });
    });
  });
});

describe('routes : question', () => {
  describe('GET /api/v1/questions', () => {
    it('should respond a success message and all questions', (done) => {
      chai.request(server)
        .get('/api/v1/questions')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Returning list of questions');
          res.body.data.should.include.keys(
            'count', 'questions'
          );
          res.body.data.count.should.eql(2);
          done();
        });
    });
  });

  describe('GET /api/v1/questions/:questionId', () => {
    it('should respond with a success message and a single question',
      (done) => {
        chai.request(server)
          .get('/api/v1/questions/1')
          .end((err, res) => {
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            res.body.message.should.eql('Returning question');
            res.body.data.should.include.keys(
              'id', 'title', 'questionBody', 'answers'
            );
            res.body.data.title.should
              .equal('Qui aggredior inveniant desumptas aliquibus sic'
                + ' medicinam nam?');
            res.body.data.questionBody.should
              .equal('Ipsius cupere vulgus tes hos. Eidem motus vos '
                + 'lucis ibi res mundo. Sit scribere quicquam ibi imponere. '
                + 'Ab generis re de se essendi nunquam. Generis '
                + 'vigilia futurus quodque co calebat spatium id.');
            done();
          });
      });

    it('should respond with a failure message', (done) => {
      chai.request(server)
        .get('/api/v1/questions/15')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Question not found');
          done();
        });
    });

    it('should respond with a validation error message', (done) => {
      chai.request(server)
        .get('/api/v1/questions/w')
        .end((err, res) => {
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Validation failed');
          res.body.data[0].msg.should.eql('Invalid url parameter');
          done();
        });
    });
  });

  describe('POST /api/v1/questions', () => {
    it('should respond with a success message and a'
      + 'single question that was added', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send({
          title: 'Qui aggredior inveniant desumptas'
            + 'aliquibus sic medicinam nam?',
          questionBody: 'Ipsius cupere vulgus tes hos.'
            + 'Eidem motus vos lucis ibi res mundo. Sit'
            + 'scribere quicquam ibi imponere. Ab generis'
            + 're de se essendi nunquam. Generis vigilia'
            + 'futurus quodque co calebat spatium id.',
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Question created');
          res.body.data.should.include.keys(
            'id', 'title', 'questionBody', 'answers'
          );
          done();
        });
    });

    it('should respond with validation error message', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send()
        .end((err, res) => {
          res.type.should.equal('application/json');
          res.status.should.equal(400);
          res.body.message.should.eql('Validation failed');
          res.body.data[0].msg.should.eql('Title cannot be empty');
          res.body.data[1].msg.should.eql('Question body cannot be empty');
          done();
        });
    });
  });

  describe('POST /api/v1/questions/:questionId/answers', () => {
    it('should respond with a success message, the question and'
      + 'the answer that was added', (done) => {
      chai.request(server)
        .post('/api/v1/questions/1/answers')
        .send({
          content: 'Obstat mox stupor per pla captum uti.'
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Answer created');
          res.body.data.should.include.keys(
            'id', 'title', 'questionBody', 'answers'
          );
          done();
        });
    });

    it('should respond with validation error message', (done) => {
      chai.request(server)
        .post('/api/v1/questions/1/answers')
        .send()
        .end((err, res) => {
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Validation failed');
          res.body.data[0].msg.should.eql('Content cannot be empty');
          done();
        });
    });
  });

  describe('DELETE /api/v1/questions/:questionId', () => {
    it('should respond with a success message', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/1')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Question deleted');
          done();
        });
    });

    it('should respond with a not found message', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/50')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Question not found');
          done();
        });
    });
    it('should respond with validation error', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/r')
        .end((err, res) => {
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Validation failed');
          res.body.data[0].msg.should.eql('Invalid url parameter');
          done();
        });
    });
  });
});

describe('routes : user', () => {
  describe('POST /auth/signup', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'm_doe@example.com',
          password: 'herman1'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(201);
          res.type.should.eql('application/json');
          res.body.should.include.keys('status', 'message', 'token', 'data');
          res.body.status.should.eql('success');
          done();
        });
    });
    it('should not register duplicate user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'm_doe@example.com',
          password: 'herman1'
        })
        .end((err, res) => {
          res.status.should.eql(409);
          res.type.should.eql('application/json');
          res.body.should.include.keys('status', 'message');
          res.body.status.should.eql('failure');
          done();
        });
    });
    it('should return error', (done) => {
      pool => Promise.reject();
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'm_doe@example.com',
          password: 'herman1'
        })
        .end((err, res) => {
          res.status.should.eql(409);
          done();
        });
    });

    it('should respond with validation error message', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send()
        .end((err, res) => {
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('failure');
          res.body.message.should.eql('Validation failed');
          res.body.data[0].msg.should.eql('First Name is required');
          res.body.data[1].msg.should.eql('You have not entered a string');
          res.body.data[2].msg.should.eql('Last Name is required');
          res.body.data[3].msg.should.eql('You have not entered a string');
          res.body.data[4].msg.should.eql('Email is required');
          res.body.data[5].msg.should.eql('You must provide an email address');
          res.body.data[6].msg.should.eql('Password is required');
          res.body.data[7].msg.should
            .eql('Password must be at least 5 chars long');
          res.body.data[8].msg.should.eql('Password must contain a number');
          done();
        });
    });
  });
});
