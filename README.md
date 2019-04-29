# BE2-NC-Knews

## Northcoders News API

### Background

API to use in the Northcoders News Sprint during the Front End block of the course.

Database written in PSQL, and interacts with it using [Knex](https://knexjs.org).

### Step 1

Download repo
open in Vs code or similar

### Step 2 - Create Knex file

In main directory create file named knexFile.js

### add/copy that code:

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
client: 'pg',
migrations: {
directory: './migrations',
},
seeds: {
directory: './db/seeds',
},
};

const dbConfig = {
production: {
connection: `${DB_URL}?ssl=true`,
},
development: {
client: 'pg',
connection: {
database: 'nc_news',
username: 'your username for Db',
password: 'your password for Db',
},
seeds: {
directory: './db/seeds',
migrations: {
directory: './db/migrations',
},
},
},
test: {
client: 'pg',
connection: {
database: 'nc_news_test',
username: 'your username for Db',
password: 'your password for Db',
},
seeds: {
directory: './db/seeds',
migrations: {
directory: './db/migrations',
},
},
},
};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
```

(if u are using Mac Os delete username and password from test and development)

#### Step 3 - Run scripts in your terminal in that order:

1. npm run setupDb
2. npm run migrate
3. npm run seed
4. npm run testApp (to see written tests)
5. npm start (to start local server)

#### Routes

```http
GET /api/topics
POST /api/topics

GET /api/articles
POST /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id
DELETE /api/articles/:article_id

GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api/users
POST /api/users

GET /api/users/:username

GET /api
```

---

#### You can test App in insomnia or postman, web browser, etc.

just copy and paste url: http://localhost:9090/api/

#### Route Description

```http
GET /api/topics
```

##### Responds with

- an array of topic objects, each of which should have the following properties:
  - `slug`
  - `description`

---

```http
POST /api/topics
```

##### Request body accepts

- an object containing the following properties:
  - `slug` which must be unique
  - `description`

##### Responds with

- the posted topic object

---

```http
GET /api/articles
```

##### Responds with

- an `articles` array of article objects, each of which should have the following properties:
  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this

##### Should accept queries

- `author`, which filters the articles by the username value specified in the query
- `topic`, which filters the articles by the topic value specified in the query
- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

##### If time (the following will make pagination easier when you get to building your front-end application)

- accept the following queries:
  - `limit`, which limits the number of responses (defaults to 10)
  - `p`, stands for page which specifies the page at which to start (calculated using limit)
- add a `total_count` property, displaying the total number of articles (this should display the total number of articles with any filters applied, discounting the limit)

---

```http
POST /api/articles
```

##### Request body accepts

- an object containing the following properties:
  - `title`
  - `body`
  - `topic`
  - `username`

##### Responds with

- the posted article

---

```http
GET /api/articles/:article_id
```

##### Responds with

- an article object, which should have the following properties:
  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `body`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this

---

```http
PATCH /api/articles/:article_id
```

##### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -100 }` would decrement the current article's vote property by 100

##### Responds with

- the updated article

---

```http
DELETE /api/articles/:article_id
```

##### Should

- delete the given article by `article_id`

##### Responds with

- status 204 and no content

---

```http
GET /api/articles/:article_id/comments
```

##### Responds with

- an array of comments for the given `article_id` of which each comment should have the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author` which is the `username` from the users table
  - `body`

##### Accepts queries

- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

##### If time (the following will make pagination easier when you get to building your front-end application)

- accept the following queries:
  - `limit`, which limits the number of responses (defaults to 10)
  - `p`, stands for page which specifies the page at which to start (calculated using limit)

---

```http
POST /api/articles/:article_id/comments
```

##### Request body accepts

- an object with the following properties:
  - `username`
  - `body`

##### Responds with

- the posted comment

---

```http
PATCH /api/comments/:comment_id
```

##### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -1 }` would decrement the current article's vote property by 1

##### Responds with

- the updated comment

---

```http
DELETE /api/comments/:comment_id
```

##### Should

- delete the given comment by `comment_id`

##### Responds with

- status 204 and no content

---

```http
GET /api/users
```

##### Responds with

- an array of user objects, each of which should have the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

```http
POST /api/users
```

##### Request body accepts

- an object containing the following properties:
  - `username`
  - `avatar_url`
  - `name`

##### Responds with

- the posted user

---

```http
GET /api/users/:username
```

##### Responds with

- a user object which should have the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

```http
GET /api
```

##### Responds with

- JSON describing all the available endpoints on your API.
