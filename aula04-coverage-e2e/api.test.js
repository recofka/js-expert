const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite test', () => {
  describe('/contact', () => {
    it('Should request contact page and return HTTP status 200', async () => {
      const response = await request(app).get('/contact').expect(200)
      assert.deepStrictEqual(response.text, 'contact us page')
    })
  })

  describe('/hello', () => {
    it('Should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app).get('/hi').expect(200)
      assert.deepStrictEqual(response.text, 'Hello World!')
    })
  })

  describe('/login', () => {
    it('Should login successfully on the login route and return HTTP status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'DeniseRecofka', password: '123' })
        .expect(200)

      assert.deepStrictEqual(response.text, 'Logging has succeeded!')
    })

    it('Should fail the login route and return HTTP status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'DeniseRecofka', password: '321' })
        .expect(401)
      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Logging failed!')
    })
  })
})
