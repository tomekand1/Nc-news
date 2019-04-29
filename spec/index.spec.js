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

  describe('Errors', () => {
    it('error 404 on non existent route on / ', () =>
      request
        .get('/bad-route')
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal('Route not Found');
        }));
  });

  describe('/topics', () => {
    it('error POST status: 422 client sends a body with a duplicate slug ', () => {
      request
        .post('/api/topics')
        .send({
          slug: 'mitch',
          description: 'Tom is a the best coder in the word'
        })
        .expect(422)
        .then(res => {
          expect(res.body.msg).to.equal('null or missing value');
        });
    });
    it('error 404 on non existent route on /api/topics/ ', () =>
      request
        .get('/api/topics/bad-route')
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal('Route not Found');
        }));
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
          slug: 'zz',
          description: 'Tom is a the best coder in the word'
        })
        .expect(201)
        .then(res => {
          console.log(res.body);
          expect(res.body.topic).to.contain.keys('slug', 'description');
          expect(res.body.topic.slug).to.equal('zz');
        }));
  });
  describe('/articles', () => {
    it('error 404 on non existent route on /users ', () =>
      request
        .get('/api/articles/abc')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('invalid value');
        }));
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
      it('GET comment_count to be equal amount of comments from each article', () =>
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
          body: 'Tom King of the word',
          votes: 0,
          topic: 'mitch',
          username: 'butter_bridge'
        };
        return request
          .post('/api/articles')
          .send(input)
          .expect(201)
          .then(res => {
            expect(res.body.article).to.contain.keys('title', 'votes');
            expect(res.body.article.author).to.equal('butter_bridge');
          });
      });
    });
    describe('/:article_id', () => {
      it('will ignore an invalid sort_by query', () =>
        request
          .get('/api/articles?sort_by=t')
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('invalid value');
          }));
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
              expect(res.body.articles).to.be.ascendingBy('article_id');
            }));
      });
    });
  });
  describe(' /api/articles/:article_id', () => {
    describe('GET /article', () => {
      it('GET it should return an article by given id', () =>
        request
          .get('/api/articles/1')
          .expect(200)
          .then(res => {
            expect(res.body.article.article_id).to.equal(1);
          }));
    });
    describe('PATCH /article', () => {
      it('PATCH it should patch article by article_id and increment votes by 55', () => {
        const input = {
          inc_votes: 55
        };
        return request
          .patch('/api/articles/1')
          .send(input)
          .expect(200)
          .then(res => {
            expect(res.body.patchedArticle.article_id).to.equal(1);
            expect(res.body.patchedArticle.votes).to.equal(155);
          });
      });
      it('PATCH it should patch article by article_id and decrement votes by 100', () => {
        const input = {
          inc_votes: -100
        };
        return request
          .patch('/api/articles/1')
          .send(input)
          .expect(200)
          .then(res => {
            expect(res.body.patchedArticle.article_id).to.equal(1);
            expect(res.body.patchedArticle.votes).to.equal(0);
          });
      });
      it('DELETE it should give status code 400 when invalid id provided', () =>
        request.delete('/api/articles/ww').expect(400));
      it('DELETE it should give status code 404 when non existent id', () =>
        request.delete('/api/articles/99').expect(404));

      it('DELETE it should delete an article by given id and send status code 204', () =>
        request.delete('/api/articles/4').expect(204));
    });
  });

  describe('/comments', () => {
    it('error 404 on non existent route on /api/topics/ ', () =>
      request
        .get('/api/comments/bad-route')
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal('Route not Found');
        }));

    describe('GET /api/articles/:article_id/comments', () => {
      it('GET should return all the comments belonging to given article', () =>
        request
          .get('/api/articles/1/comments')
          .expect(200)
          .then(res => {
            expect(res.body.comments).lengthOf(13);
            expect(
              res.body.comments[0].article_id && res.body.comments[1].article_id
            ).to.equal(1);
          }));
      it('POST should post new comment to an given article_id', () => {
        const input = {
          username: 'butter_bridge',
          body:
            ' Remember: There are many beautiful and wonderful things to discover about our loving, kind, wise king Tom'
        };
        return request
          .post('/api/articles/2/comments')
          .send(input)
          .expect(200)
          .then(res => {
            expect(res.body.comment).to.contain.keys(
              'article_id',
              'author',
              'body',
              'comment_id',
              'created_at',
              'votes'
            );
          });
      });
      it('GET it should accept query sort_by and order set to desc or asc', () =>
        request
          .get('/api/articles/1/comments?sort_by=author&order=asc')
          .expect(200)
          .then(res => {
            expect(res.body.comments[0].author).to.equal('butter_bridge');
            expect(res.body.comments).to.be.ascendingBy('author');
          }));
    });

    describe('PATCH /:comment_id', () => {
      it('PATCH it should increment votes in given comment ', () => {
        const input = {
          inc_votes: 1
        };
        return request
          .patch('/api/comments/1')
          .send(input)
          .expect(200)
          .then(res => {
            expect(res.body.patchedComment.comment_id).to.equal(1);
            expect(res.body.patchedComment.votes).to.equal(17);
          });
      });
      it('DELETE it should delete comment by its id', () =>
        request
          .delete('/api/comments/1')
          .expect(204)
          .then(() => request.get('/api/comments/1').expect(404)));
    });
  });
  describe('/users', () => {
    it('POST wrong request returns an error with status 400', () =>
      request
        .post('/api/users/')
        .send({
          name: 'tom',
          avatar_url:
            'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4'
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('invalid value');
        }));
    it('error 404 on non existent route on /users ', () =>
      request
        .get('/users/bad-route')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Route not Found');
        }));

    it('error 405 method patch not allowed', () =>
      request
        .patch('/api/users')
        .expect(405)
        .then(response => {
          expect(response.body.msg).to.equal('method not allowed');
        }));
    it('error 405 method delete not allowed', () =>
      request
        .delete('/api/users')
        .expect(405)
        .then(response => {
          expect(response.body.msg).to.equal('method not allowed');
        }));
    describe('GET/ /api/users', () => {
      it('GET it should return all users from database', () =>
        request
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body.users[0]).to.contain.keys(
              'username',
              'avatar_url',
              'name'
            );
          }));
      it('GET user by username', () =>
        request
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(res => {
            expect(res.body.user.username).to.equal('butter_bridge');
          }));
      it('send status 404 with msg route not found when no existent user', () =>
        request
          .get('/api/users/no-exist')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Route not Found');
          }));
      it('POST user in to users', () => {
        const input = {
          username: 'tomTheking',
          name: 'Tom',
          avatar_url:
            'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4'
        };
        return request
          .post('/api/users/')
          .send(input)
          .expect(200)
          .then(res => {
            expect(res.body.user.username).to.equal('tomTheking');
          });
      });
    });
  });
  describe('/API ', () => {
    describe('JSON /api', () => {
      it('GET it should return an file in json format explaining endpoints', () => {
        request
          .get('/api')
          .expect(200)
          .then(res => {
            expect(typeof res.body === 'object').to.be.true;
          });
      });
    });
  });
});
