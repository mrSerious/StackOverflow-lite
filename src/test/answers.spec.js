/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^pool" }] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

chai.should();

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
