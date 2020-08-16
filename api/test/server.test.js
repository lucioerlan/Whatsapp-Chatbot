/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');

describe('GET /api', function () {
  it('respond with json', function (done) {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
