/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^pool" }] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);

chai.should();

let userToken;
describe('ANSWERS CONTROLLER', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        lastname: 'Michael',
        firstname: 'Doe',
        email: 'michael_doe@example.com',
        password: process.env.TEST_USER_PASS
      })
      .end((error, response) => {
        if (error) throw error;
        userToken = response.body.data.token;
        done();
      });
  });

  it('should respond with a success message', (done) => {
    chai.request(server)
      .post('/api/v1/questions/1/answers')
      .set('x-access-token', userToken)
      .send({
        content: 'Obstat mox stupor per pla captum uti.'
      })
      .end((error, response) => {
        response.status.should.equal(201);
        response.type.should.equal('application/json');
        response.body.status.should.eql('Success');
        response.body.message.should.eql('Answer created successfully');
        done();
      });
  });

  it('should respond with validation error '
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
