import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);

chai.should();

let userToken;

describe('COMMENTS CONTROLLER', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Jingles',
        lastname: 'Charles',
        email: 'charles.jingles@example.com',
        username: 'charles_jingles',
        password: process.env.TEST_USER_PASS,
        confirm_password: process.env.TEST_USER_PASS,
      })
      .end((error, response) => {
        if (error) throw error;
        userToken = response.body.data.token;

        chai.request(server)
          .post('/api/v1/questions')
          .set('x-access-token', userToken)
          .send({
            title: 'This question from the comments test',
            body: 'This question from the comments test'
          })
          .end((error1) => {
            if (error1) throw error1;
            chai.request(server)
              .post('/api/v1/questions/4/answers')
              .set('x-access-token', userToken)
              .send({
                content: 'Nos mea requiratur lor quamprimum '
                  + 'intellectui et ordinem'
              })
              .end((error2) => {
                if (error2) throw error2;
                done();
              });
          });
      });
  });

  describe('POST /api/v1/questions/:questionId/answers/:answerId/'
    + 'comments', () => {
    it('Should not let unathenticated users add comment', (done) => {
      chai.request(server)
        .post('/api/v1/questions/5/answers/6/comments/')
        .send({
          comment: 'This comment will be used for tests in the comment route'
        })
        .end((error, response) => {
          response.type.should.eql('application/json');
          response.status.should.equal(401);
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('You need to login to perform this operation');
          done();
        });
    });

    it('Should not let users with invalid tokens add comments', (done) => {
      chai.request(server)
        .post('/api/v1/questions/5/answers/6/comments/')
        .set('x-access-token', `${userToken}xoxo`)
        .send({
          comment: 'This comment will be used for tests in the comment route'
        })
        .end((error, response) => {
          response.type.should.eql('application/json');
          response.status.should.equal(403);
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('You are not allowed to perform the requested operation');
          done();
        });
    });

    it('Should not add comment if question doesn\'t exist', (done) => {
      chai.request(server)
        .post('/api/v1/questions/5000000/answers/6/comments/')
        .set('x-access-token', userToken)
        .send({
          comment: 'This comment will be used for tests in the comment route'
        })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(404);
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Cannot find that question');
          done();
        });
    });

    it('Should not add comment if answer doesn\'t exist', (done) => {
      chai.request(server)
        .post('/api/v1/questions/5/answers/6000/comments/')
        .set('x-access-token', userToken)
        .send({
          comment: 'This comment will be used for tests in the comment route'
        })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(404);
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Cannot find that answer');
          done();
        });
    });

    it('Should not add comment if comment field is empty or '
      + 'invalid', (done) => {
      chai.request(server)
        .post('/api/v1/questions/5/answers/6/comments/')
        .set('x-access-token', userToken)
        .send({
          comment: 60007000453287489367589436769765234767467
        })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(400);
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('Your comment must be a valid string of minimum lenght 5');
          done();
        });
    });

    it('Should let athenticated users add comment', (done) => {
      chai.request(server)
        .post('/api/v1/questions/5/answers/6/comments/')
        .set('x-access-token', userToken)
        .send({
          comment: 'This comment will be used for tests in the comment route'
        })
        .end((error, response) => {
          response.type.should.equal('application/json');
          response.status.should.equal(201);
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Comment added sucessfully');
          done();
        });
    });
  });
});
