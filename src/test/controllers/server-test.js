import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);

chai.should();

describe('SERVER TESTS', () => {
  describe('GET /api/v1', () => {
    it('Should display "Connected!" message', (done) => {
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
    it('Should throw an error', (done) => {
      chai.request(server)
        .get('/questions')
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
