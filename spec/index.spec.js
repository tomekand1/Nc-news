process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const connection = require('../db/connection');

describe('/api/topics', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('GET /api/topics', () => {
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
    it('POST /api/topics ', () => {
      return request
        .post('/api/topics')
        .send({
          slug: 'coding',
          description: 'Tom is a the best coder in the word',
        })
        .expect(200)
        .then(res => {
          expect(res.body.topic).to.contain.keys('slug', 'description');
        });
    });
  });
});
