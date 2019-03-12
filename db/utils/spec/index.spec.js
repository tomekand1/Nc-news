const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-datetime'));
const {
  dataToSql,
  dataToSqlComments,
  newCommentsObj,
} = require('../helperFunctions');

describe('dataToSql', () => {
  it('it should convert miliseconds to sql format data', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const expected = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: new Date(input[0].created_at),
        votes: 100,
      },
    ];
    expect(dataToSql(input)).to.eql(expected);
  });
});

describe('newCommentsObj()', () => {
  it('it should return new formated object', () => {
    const obj = { 'Tomasz king of the universe': 1 };
    const input = [
      {
        body: 'haha',
        belongs_to: 'Tomasz king of the universe',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932,
      },
    ];
    const expected = [
      {
        body: 'haha',
        article_id: 1,
        author: 'tickle122',
        votes: -1,
        created_at: new Date(input[0].created_at),
      },
    ];
    expect(newCommentsObj(input, obj)).to.eql(expected);
  });
});
