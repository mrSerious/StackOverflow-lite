/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^pool" }] */
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

describe('ANSWERS CONTROLLER', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'James',
        lastname: 'Hardy',
        email: 'james_hardy@example.com',
        username: 'james_hardy',
        password: process.env.TEST_USER_PASS,
        confirm_password: process.env.TEST_USER_PASS
      })
      .end((error, response) => {
        if (error) throw error;
        userToken = response.body.data.token;

        chai.request(server)
          .post('/api/v1/questions')
          .set('x-access-token', userToken)
          .send({
            title: 'This question from the test',
            body: 'Question in answers test'
          })
          .end((error1) => {
            if (error1) throw error1;
            chai.request(server)
              .post('/api/v1/questions/4/answers')
              .set('x-access-token', userToken)
              .send({
                content: 'answer in answers test'
              })
              .end((error2) => {
                if (error2) throw error2;
                done();
              });
          });
      });
  });

  describe('POST /api/v1/questions/:questionId/answers', () => {
    it('Should not let user add answer if user is not logged in', (done) => {
      chai.request(server)
        .post('/api/v1/questions/1/answers')
        .send({
          content: 'Testing the new answer route'
        })
        .end((error, response) => {
          response.status.should.equal(401);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('No token provided');
          done();
        });
    });

    it('Should let user add an answer if they are logged in', (done) => {
      // console.log(userToken);
      chai.request(server)
        .post('/api/v1/questions/1/answers')
        .set('x-access-token', userToken)
        .send({
          content: 'Testing the new answer route'
        })
        .end((error, response) => {
          response.status.should.equal(201);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Answer created successfully');
          done();
        });
    });

    it('Should not add an answer if question id is not valid', (done) => {
      chai.request(server)
        .post('/api/v1/questions/w/answers')
        .set('x-access-token', userToken)
        .send({
          content: 'Testing the new answer route'
        })
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Validation failed');
          done();
        });
    });

    it('Should respond with validation error '
    + 'message for empty or wrong input', (done) => {
      chai.request(server)
        .post('/api/v1/questions/1/answers')
        .set('x-access-token', userToken)
        .send()
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Validation failed');
          response.body.data[0].msg.should.eql('Content cannot be empty');
          done();
        });
    });
  });

  describe('PUT /api/v1/questions/:questionId/answers/:answerId', () => {
    it('Should not allow update if user not logged in', (done) => {
      chai.request(server)
        .put('/api/v1/questions/4/answers/4')
        .send({ content: 'Testing the new answer route' })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(401);
          response.body.status.should.eql('Failure');
          done();
        });
    });

    it('Should not update an answer that does not exist', (done) => {
      chai.request(server)
        .put('/api/v1/questions/4/answers/4000')
        .set('x-access-token', userToken)
        .send({ content: 'Testing the new answer route' })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(404);
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Cannot find that answer');
          done();
        });
    });

    it('Should not let unauthorized user update an answer', (done) => {
      chai.request(server)
        .put('/api/v1/questions/4/answers/4')
        .set('x-access-token', secondUserToken)
        .send({ content: 'Testing the new answer route' })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(403);
          response.body.status.should.eql('Failure');
          done();
        });
    });

    it('Should let authorized user update an answer', (done) => {
      chai.request(server)
        .put('/api/v1/questions/4/answers/4')
        .set('x-access-token', userToken)
        .send({ content: 'Testing the new answer route' })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(200);
          response.body.status.should.eql('Success');
          done();
        });
    });

    it('Should not let unauthorized user update an answer', (done) => {
      chai.request(server)
        .put('/api/v1/questions/4/answers/4')
        .set('x-access-token', secondUserToken)
        .send({ content: 'Testing the new answer route' })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(403);
          response.body.status.should.eql('Failure');
          done();
        });
    });

    it('Should let authorized user set an answer as accepted', (done) => {
      chai.request(server)
        .put('/api/v1/questions/4/answers/4')
        .set('x-access-token', userToken)
        .send({ isaccepted: true })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(200);
          response.body.status.should.eql('Success');
          done();
        });
    });

    it('Should not update an answer if request body is empty', (done) => {
      chai.request(server)
        .put('/api/v1/questions/4/answers/4')
        .set('x-access-token', userToken)
        .send({})
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(400);
          response.body.status.should.eql('Failure');
          done();
        });
    });
  });
});
