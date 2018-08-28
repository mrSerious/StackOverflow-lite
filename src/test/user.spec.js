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
          console.log(err);
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(201);
          res.type.should.eql('application/json');
          res.body.should.include.keys('status', 'message', 'data');
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

    it('should respond with validation error', (done) => {
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

  describe('POST /auth/login', () => {
    it('should login a user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'm_doe@example.com',
          password: 'herman1'
        })
        .end((err, res) => {
          console.log(err);
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.should.include.keys('status', 'message', 'data');
          res.body.status.should.eql('success');
          should.exist(res.body.data.token);
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
        .end((err, res) => {
          res.status.should.eql(400);
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
        .end((err, res) => {
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.status.should.eql('failure');
          done();
        });
    });
  });
});
