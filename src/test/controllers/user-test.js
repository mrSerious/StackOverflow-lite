import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);

const should = chai.should();

describe('USERS CONTROLLER', () => {
  describe('POST /auth/signup', () => {
    it('Should register a new user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: 'Banks',
          email: 'l_banks@example.com',
          username: 'lyod_banks',
          password: process.env.TEST_USER_PASS,
          confirm_password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          process.env.TEST_USE_TOKEN = response.body.data.token;
          should.not.exist(error);
          response.redirects.length.should.eql(0);
          response.status.should.eql(201);
          response.type.should.eql('application/json');
          response.body.should.include.keys('status', 'message', 'data');
          response.body.status.should.eql('Success');
          done();
        });
    });

    it('Should not register duplicate user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: 'Banks',
          email: 'l_banks@example.com',
          username: 'lyod_banks',
          password: process.env.TEST_USER_PASS,
          confirm_password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.status.should.eql(409);
          response.type.should.eql('application/json');
          response.body.should.include.keys('status', 'message');
          response.body.status.should.eql('Failure');
          done();
        });
    });

    it('Should not register user if firstname field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: '',
          lastname: 'Banks',
          email: 'l_banks@example.com',
          username: 'lyod_banks',
          password: process.env.TEST_USER_PASS,
          confirm_password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('First Name must be a valid string of minimum lenght 5');
          done();
        });
    });

    it('Should not register user if lastname field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: '',
          email: 'l_banks@example.com',
          username: 'lyod_banks',
          password: process.env.TEST_USER_PASS,
          confirm_password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('Last Name must be a valid string of minimum lenght 5');
          done();
        });
    });

    it('Should not register user if email field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: 'Banks',
          email: '',
          username: 'lyod_banks',
          password: process.env.TEST_USER_PASS,
          confirm_password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('Email must be a valid string of minimum lenght 5');
          done();
        });
    });

    it('Should not register user if username field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: 'Banks',
          email: 'l_banks@example.com',
          username: '',
          password: process.env.TEST_USER_PASS,
          confirm_password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('Username must be a valid string of minimum lenght 5');
          done();
        });
    });

    it('Should not register user if password field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: 'Banks',
          email: 'l_banks@example.com',
          username: 'lyod_banks',
          password: '',
          confirm_password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('Password must be a valid string of minimum lenght 5');
          done();
        });
    });

    it('Should not register user if password does not '
      + 'contain a number', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: 'Banks',
          email: 'l_banks@example.com',
          username: 'lyod_banks',
          password: process.env.TEST_USER_PASS_ONE,
          confirm_password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.status.should.equal(400);
          response.type.should.equal('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Password must contain a number');
          done();
        });
    });

    it('Should not register user if confirm password '
      + 'field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: 'Banks',
          email: 'l_banks@example.com',
          username: 'lyod_banks',
          password: process.env.TEST_USER_PASS,
          confirm_password: ''
        })
        .end((error, response) => {
          response.status.should.eql(400);
          response.type.should.eql('application/json');
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('Confirm password must be a '
            + 'valid string of minimum lenght 5');
          done();
        });
    });

    it('Should not register user if password and confirm password'
      + ' values are different', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Lyods',
          lastname: 'Banks',
          email: 'l_banks@example.com',
          username: 'lyod_banks',
          password: process.env.TEST_USER_PASS,
          confirm_password: `${process.env.TEST_USER_PASS}ss`
        })
        .end((error, response) => {
          response.status.should.eql(400);
          response.type.should.eql('application/json');
          response.body.should.include.keys('status', 'message');
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('Passwords do not match');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('Should login a user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'l_banks@example.com',
          password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          should.not.exist(error);
          response.redirects.length.should.eql(0);
          response.status.should.eql(200);
          response.type.should.eql('application/json');
          response.body.should.include.keys('status', 'message', 'data');
          response.body.status.should.eql('Success');
          should.exist(response.body.data.token);
          done();
        });
    });

    it('Should not login user if email field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: '',
          password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.status.should.eql(400);
          response.body.message.should
            .eql('Email must be a valid string of minimum lenght 5');
          done();
        });
    });

    it('Should not login user if password field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'l_banks@example.com',
          password: ''
        })
        .end((error, response) => {
          response.status.should.eql(400);
          response.body.message.should
            .eql('Password must be a valid string of minimum lenght 5');
          done();
        });
    });

    it('Should not login if password is incorrect', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'l_banks@example.com',
          password: `${process.env.TEST_USER_PASS}ss`
        })
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.status.should.eql('Failure');
          done();
        });
    });

    it('Should not login user if password is not provided', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'michael@example.com',
          password: ''
        })
        .end((error, response) => {
          response.status.should.eql(400);
          response.type.should.eql('application/json');
          response.body.status.should.eql('Failure');
          done();
        });
    });

    it('Should not login user if password does not contain a number',
      (done) => {
        chai.request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'michael@example.com',
            password: process.env.TEST_USER_PASS_ONE
          })
          .end((error, response) => {
            response.status.should.eql(400);
            response.type.should.eql('application/json');
            response.body.status.should.eql('Failure');
            response.body.message.should.eql('Password must contain a number');
            done();
          });
      });

    it('Should not login an unregistered user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'michael@example.com',
          password: process.env.TEST_USER_PASS
        })
        .end((error, response) => {
          response.type.should.eql('application/json');
          response.status.should.eql(404);
          response.body.status.should.eql('Failure');
          done();
        });
    });
  });

  describe('GET /users/:userId', () => {
    it('Should not let an unauthenticated user view a profile', (done) => {
      chai.request(server)
        .get('/api/v1/users/1')
        .end((error, response) => {
          response.type.should.eql('application/json');
          response.status.should.eql(401);
          response.body.status.should.eql('Failure');
          response.body.message.should
            .eql('You need to login to perform this operation');
          done();
        });
    });

    it('Should let an authenticated user view a profile', (done) => {
      chai.request(server)
        .get('/api/v1/users/1')
        .set('x-access-token', process.env.TEST_USE_TOKEN)
        .end((error, response) => {
          response.type.should.eql('application/json');
          response.status.should.eql(200);
          response.body.status.should.eql('Success');
          response.body.message.should.eql('User retrieved successfully');
          done();
        });
    });

    it('Should throw error if user profile does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/users/10000')
        .set('x-access-token', process.env.TEST_USE_TOKEN)
        .end((error, response) => {
          response.type.should.eql('application/json');
          response.status.should.eql(404);
          response.body.status.should.eql('Failure');
          response.body.message.should.eql('User not found');
          done();
        });
    });
  });
});
