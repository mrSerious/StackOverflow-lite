import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

chai.should();

chai.use(chaiHttp);

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

describe('routes : question', () => {
  describe('GET /api/v1/questions', () => {
    it('should respond a success message and all questions', (done) => {
      chai.request(server)
        .get('/api/v1/questions')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Returning list of questions');
          res.body.data.should.include.keys(
            'count', 'questions'
          );
          res.body.data.count.should.eql(2);
          done();
        });
    });
  });

  describe('GET /api/v1/questions/:questionId', () => {
    it('should respond with a success message and a single question',
      (done) => {
        chai.request(server)
          .get('/api/v1/questions/1')
          .end((err, res) => {
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.status.should.eql('Success');
            res.body.message.should.eql('Returning question');
            res.body.data.should.include.keys(
              'id', 'title', 'questionBody', 'answers'
            );
            res.body.data.title.should
              .equal('Qui aggredior inveniant desumptas aliquibus sic'
                + ' medicinam nam?');
            res.body.data.questionBody.should
              .equal('Ipsius cupere vulgus tes hos. Eidem motus vos '
                + 'lucis ibi res mundo. Sit scribere quicquam ibi imponere. '
                + 'Ab generis re de se essendi nunquam. Generis '
                + 'vigilia futurus quodque co calebat spatium id.');
            done();
          });
      });

    it('should respond with a failure message', (done) => {
      chai.request(server)
        .get('/api/v1/questions/15')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Question not found');
          done();
        });
    });

    it('should respond with a validation error message', (done) => {
      chai.request(server)
        .get('/api/v1/questions/w')
        .end((err, res) => {
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Validation failed');
          done();
        });
    });
  });

  describe('POST /api/v1/questions', () => {
    it('should respond with a success message and a'
      + 'single question that was added', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send({
          title: 'Qui aggredior inveniant desumptas'
            + 'aliquibus sic medicinam nam?',
          questionBody: 'Ipsius cupere vulgus tes hos.'
            + 'Eidem motus vos lucis ibi res mundo. Sit'
            + 'scribere quicquam ibi imponere. Ab generis'
            + 're de se essendi nunquam. Generis vigilia'
            + 'futurus quodque co calebat spatium id.',
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Question created');
          res.body.data.should.include.keys(
            'id', 'title', 'questionBody', 'answers'
          );
          done();
        });
    });

    it('should respond with validation error message', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send()
        .end((err, res) => {
          res.type.should.equal('application/json');
          res.status.should.equal(400);
          res.body.message.should.eql('Validation failed');
          res.body.data[0].msg.should.eql('Title cannot be empty');
          res.body.data[1].msg.should.eql('Question body cannot be empty');
          done();
        });
    });
  });

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

  describe('DELETE /api/v1/questions/:questionId', () => {
    it('should respond with a success message', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/1')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Success');
          res.body.message.should.eql('Question deleted');
          done();
        });
    });

    it('should respond with a not found message', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/50')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Failure');
          res.body.message.should.eql('Question not found');
          done();
        });
    });
  });
});
