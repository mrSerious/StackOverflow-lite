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
        .end((error, response) => {
          response.redirects.length.should.equal(0);
          response.status.should.equal(200);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Success');
          response.body.message.should.eql('Connected!');
          done();
        });
    });
  });

  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
        .get('/')
        .end((error, response) => {
          response.redirects.length.should.equal(0);
          response.status.should.equal(404);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Sorry can\'t find that page!');
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
        .end((error, response) => {
          should.not.exist(error);
          response.redirects.length.should.eql(0);
          response.status.should.eql(201);
          response.type.should.eql('application/json');
          response.body.should.include.keys('status', 'message', 'data');
          response.body.status.should.eql('success');
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
        .end((error, response) => {
          response.status.should.eql(409);
          response.type.should.eql('application/json');
          response.body.should.include.keys('status', 'message');
          response.body.status.should.eql('failure');
          done();
        });
    });

    it('should respond with validation error', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send()
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('failure');
          response.body.message.should.eql('Validation failed');
          response.body.data[0].msg.should.eql('First Name is required');
          response.body.data[1].msg.should.eql('You have not entered a string');
          response.body.data[2].msg.should.eql('Last Name is required');
          response.body.data[3].msg.should.eql('You have not entered a string');
          response.body.data[4].msg.should.eql('Email is required');
          response.body.data[5].msg.should
            .eql('You must provide an email address');
          response.body.data[6].msg.should.eql('Password is required');
          response.body.data[7].msg.should
            .eql('Password must be at least 5 chars long');
          response.body.data[8].msg.should
            .eql('Password must contain a number');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should login a user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'm_doe@example.com',
          password: 'herman1'
        })
        .end((error, response) => {
          should.not.exist(error);
          response.redirects.length.should.eql(0);
          response.status.should.eql(200);
          response.type.should.eql('application/json');
          response.body.should.include.keys('status', 'message', 'data');
          response.body.status.should.eql('success');
          should.exist(response.body.data.token);
          done();
        });
    });
    it('should respond with validation error', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: '',
          password: ''
        })
        .end((error, response) => {
          response.status.should.eql(400);
          done();
        });
    });
    it('should not login an unregistered user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'michael@example.com',
          password: 'johnson123'
        })
        .end((error, response) => {
          response.status.should.eql(404);
          response.type.should.eql('application/json');
          response.body.status.should.eql('failure');
          done();
        });
    });
  });
});
