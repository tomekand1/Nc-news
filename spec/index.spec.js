process.env.NODE_ENV = 'test';
const chai = require('chai');
chai.use(require('chai-sorted'));
const { expect } = require('chai');

const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/topics', () => {
    it('GET topics with status 200 and keys slug and description', () =>
      request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an('array');
          expect(res.body.topics[0]).to.contain.keys('slug', 'description');
        }));
  });
  describe('POST /api/topics', () => {
    it('POST /api/topics ', () =>
      request
        .post('/api/topics')
        .send({
          slug: 'coding',
          description: 'Tom is a the best coder in the word'
        })
        .expect(201)
        .then(res => {
          expect(res.body.insertedtopic[0]).to.contain.keys(
            'slug',
            'description'
          );
          expect(res.body.insertedtopic[0].slug).to.equal('coding');
        }));
  });
  describe('/articles', () => {
    describe('GET /articles', () => {
      it('GET articles with keys author, title article_id, topic, created_at, vote comment_count', () =>
        request
          .get('/api/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0]).to.contain.keys(
              'author',
              'title',
              'article_id',
              'topic',
              'created_at',
              'votes'
            );
          }));
      it('GET comment_count to be equal amount of coments from each article', () =>
        request
          .get('/api/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles[10].comment_count).to.equal('0');
          }));
    });
    describe('POST /articles', () => {
      it('POST it should post an new article and return its body', () => {
        const input = {
          title: 'Moustache',
          body: 'Have you seen the size of that thing?',
          votes: 0,
          topic: 'mitch',
          author: 'butter_bridge'
        };
        return request
          .post('/api/articles')
          .send(input)
          .expect(201)
          .then(res => {
            expect(res.body.insertedArticle[0]).to.contain.keys(
              'title',
              'votes'
            );
            expect(res.body.insertedArticle[0].author).to.equal(
              'butter_bridge'
            );
          });
      });
    });
    describe('/:article_id', () => {
      describe('GET /article/query ', () => {
        it('GET articles filtered by author', () =>
          request
            .get('/api/articles?author=butter_bridge')
            .expect(200)
            .then(res => {
              expect(res.body.articles).to.have.lengthOf(3);
            }));
        it('GET articles filtered by topic', () =>
          request
            .get('/api/articles?topic=mitch')
            .expect(200)
            .then(res => {
              expect(res.body.articles).to.have.lengthOf(11);
            }));
        it('GET articles filtered by author and topic', () =>
          request
            .get('/api/articles?author=butter_bridge&topic=mitch')
            .expect(200)
            .then(res => {
              expect(res.body.articles).to.have.lengthOf(3);
            }));
        it('GET articles sorted by author in ascending order ', () =>
          request
            .get('/api/articles?sort_by=article_id&order=asc')
            .expect(200)
            .then(res => {
              expect([
                res.body.articles[0],
                res.body.articles[1],
                res.body.articles[2]
              ]).to.be.ascendingBy('article_id');
            }));
      });
    });
  });
  describe(' /api/articles/:article_id', () => {
    describe('PATCH /article', () => {
      it('PATCH it should patch article by article_id and increment votes by 55', () => {
        const input = {
          inc_votes: 55
        };
        return request
          .patch('/api/articles/1')
          .send(input)
          .expect(201)
          .then(res => {
            expect(res.body.patchedArticle[0].article_id).to.equal(1);
            expect(res.body.patchedArticle[0].votes).to.equal(155);
          });
      });
      it('PATCH it should patch article by article_id and decrement votes by 100', () => {
        const input = {
          inc_votes: -100
        };
        return request
          .patch('/api/articles/1')
          .send(input)
          .expect(201)
          .then(res => {
            expect(res.body.patchedArticle[0].article_id).to.equal(1);
            expect(res.body.patchedArticle[0].votes).to.equal(0);
          });
      });
    });
  });
  describe.only('DELETE /article', () => {
    it('it should delete an article by given id and send status code 204', () => {
      return request.delete('/api/articles/1').expect(204);
    });
  });
});
