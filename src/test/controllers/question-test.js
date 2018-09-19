import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import server from '../../server';

chai.use(chaiHttp);

chai.should();

let userToken;
const secondUserToken = jwt.sign({ id: 15 }, process.env.SECRET_KEY, {
  expiresIn: 86400 // expires in 24 hours
});
describe('QUESTIONS CONTROLLER', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        lastname: 'James',
        firstname: 'Crocker',
        email: 'james.croaker@example.com',
        username: 'james_croaker',
        password: process.env.TEST_USER_PASS,
        confirm_password: process.env.TEST_USER_PASS,
      })
      .end((error, response) => {
        if (error) throw error;
        userToken = response.body.data.token;
        done();
      });
  });

  describe('GET /api/v1/questions', () => {
    it('Should get all questions', (done) => {
      chai.request(server)
        .get('/api/v1/questions')
        .end((error, response) => {
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Questions retrieved successfully');
          response.body.data.should.include.keys('questions');
          done();
        });
    });
  });

  describe('GET /api/v1/questions/:questionId', () => {
    it('Should get a question by id',
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

    it('Should not get a question that does not exist', (done) => {
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

    it('Should catch invalid parameter in get single question URL', (done) => {
      chai.request(server)
        .get('/api/v1/questions/w')
        .end((error, response) => {
          response.status.should.equal(404);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Sorry can\'t find that page!');
          done();
        });
    });
  });

  describe('POST /api/v1/questions', () => {
    it('Should post a new question', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .set('x-access-token', userToken)
        .send({
          title: 'Qui aggredior inveniant desumptas aggredior inveniant desumptas',
          body: 'Ipsius cupere vulgus tes hos aggredior inveniant desumptas',
        })
        .end((error, response) => {
          response.status.should.equal(201);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Question created successfully');
          done();
        });
    });

    it('Should not post with invalid token', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .set('x-access-token', `${userToken}rrr`)
        .send({
          title: 'Qui aggredior inveniant desumptas',
          body: 'Ipsius cupere vulgus tes hos.',
        })
        .end((error, response) => {
          response.status.should.equal(403);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('You are not allowed to perform the requested operation');
          done();
        });
    });

    it('Should not post with empty title field', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .set('x-access-token', userToken)
        .send({
          title: '',
          body: 'Ipsius cupere vulgus tes hos.',
        })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(400);
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('"title" must be a valid string of minimum lenght 20');
          done();
        });
    });

    it('Should not create new question with empty body', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .set('x-access-token', userToken)
        .send({
          title: 'Qui aggredior inveniant desumptas',
          body: '',
        })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(400);
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('"body" must be a valid string of minimum lenght 20');
          done();
        });
    });
  });

  describe('DELETE /api/v1/questions/:questionId', () => {
    it('Should not delete question if user is not authorized', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/5')
        .set('x-access-token', secondUserToken)
        .end((error, response) => {
          response.status.should.equal(403);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('You are not authorized to modify this resource');
          done();
        });
    });

    it('Should let question owner delete question', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/5')
        .set('x-access-token', userToken)
        .end((error, response) => {
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Question deleted successfully');
          response.body.should.include.keys('status', 'message');
          done();
        });
    });

    it('Should not delete a question that does not exist', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/50')
        .set('x-access-token', userToken)
        .end((error, response) => {
          response.status.should.equal(404);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Question not found');
          done();
        });
    });

    it('Should not delete a question if URL has invalid paramas', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/r')
        .set('x-access-token', userToken)
        .end((error, response) => {
          response.status.should.equal(404);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Sorry can\'t find that page!');
          done();
        });
    });
  });
});
