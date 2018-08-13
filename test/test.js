/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "should" }] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

describe('routes : Home Page', () => {
  describe('GET /api/v1', () => {
    it('should display "Connected!" message', (done) => {
      chai.request(server)
        .get('/api/v1')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.message.should.eql('Connected!');
          done();
        });
    });
  });
});

describe('routes : Questions', () => {
  describe('GET /api/v1/questions', () => {
    it('should respond a success message along with all questions', (done) => {
      chai.request(server)
        .get('/api/v1/questions')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
  });
});

describe('routes : Single Question', () => {
  describe('GET /api/v1/questions/:questionId', () => {
    it('should respond with a success message along with a single question', (done) => {
      chai.request(server)
        .get('/api/v1/questions/1')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'id', 'title', 'questionBody'
          );
          done();
        });
    });

    it('should respond with a success message along with a single question', (done) => {
      chai.request(server)
        .get('/api/v1/questions/15')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Question not found!');
          done();
        });
    });
  });
});

describe('routes : Post Question', () => {
  describe('POST /api/v1/questions', () => {
    it('should respond with a success message along with a single question that was added', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send({
          title: 'Qui aggredior inveniant desumptas aliquibus sic medicinam nam?',
          questionBody: 'Ipsius cupere vulgus tes hos. Eidem motus vos lucis ibi res mundo. Sit scribere quicquam ibi imponere. Ab generis re de se essendi nunquam. Generis vigilia futurus quodque co calebat spatium id.',
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'id', 'title', 'questionBody'
          );
          done();
        });
    });

    it('should respond with validation error message', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send()
        .end((err, res) => {
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.failures[0].msg.should.eql('Title cannot be empty');
          res.body.failures[1].msg.should.eql('Question body cannot be empty');
          done();
        });
    });
  });
});

describe('routes : Post Answer', () => {
  describe('POST /api/v1/questions/:questionId/answers', () => {
    it('should respond with a success message along with a the question and the answer that was added', (done) => {
      chai.request(server)
        .post('/api/v1/questions/1/answers')
        .send({
          content: 'Obstat mox stupor per pla captum uti.'
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
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
          // res.body.status.should.eql('success');
          res.body.failures[0].msg.should.eql('Content cannot be empty');
          done();
        });
    });
  });
});

describe('routes : Delete Question', () => {
  describe('DELETE /api/v1/questions/:questionId', () => {
    it('should respond with a success message', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/1')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });

    it('should respond with a not found message', (done) => {
      chai.request(server)
        .delete('/api/v1/questions/50')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.eql('Question not found!');
          done();
        });
    });
  });
});

describe('routes : Unreachable routes', () => {
  describe('GET unreachable route', () => {
    it('should display "Connected!" message', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(404);
          res.type.should.equal('text/html');
          res.text.should.eql('Sorry can\'t find that!');
          done();
        });
    });
  });
});
