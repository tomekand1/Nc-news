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
    it('GET alltopics with status 200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an('array');
          expect(res.body.topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });
});
