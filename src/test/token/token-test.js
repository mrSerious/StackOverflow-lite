import jwt from 'jsonwebtoken';
import DotEnv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

DotEnv.config();
chai.use(chaiHttp);
const should = chai.should();
const secret = process.env.SECRET_KEY;
let token;

describe('TOKEN MIDDLEWARE', () => {
  describe('Should encode token', () => {
    it('should return a token', (done) => {
      token = jwt.sign(
        {
          id: 1
        },
        secret, {
          expiresIn: 86400 // expires in 24 hours
        }
      );
      should.exist(token);
      token.should.be.a('string');
      done();
    });
  });
});
