import request from 'supertest'
import App from 'App/Providers/AppProvider'
import User from 'App/Models/User'

describe('PortfoliosController', () => {
  let user: User
  let token: string

  // Set up the test suite
  beforeAll(async () => {
    // Create a test user
    user = new User()
    user.email = 'test@example.com'
    user.password = 'password'
    await user.save()

    // Log in to get a token
    const res = await request(App)
      .post('/login')
      .send({ email: user.email, password: 'password' })

    token = res.body.token
  })

  // Test the index method
  it('should return all portfolios for the authenticated user', async () => {
    const res = await request(App)
      .get('/portfolios')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.portfolio)).toBe(true)
  })

  // Test the store method
  it('should create a new portfolio', async () => {
    const res = await request(App)
      .post('/portfolios')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Portfolio' })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Successfully created new portfolio')
  })

  // Test the update method
  it('should update an existing portfolio', async () => {
    const portfolio = await user.related('portfolios').firstOrFail()

    const res = await request(App)
      .put(`/portfolios/${portfolio.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Portfolio' })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Updated Portfolio')
  })

  // Test the destroy method
  it('should delete an existing portfolio', async () => {
    const portfolio = await user.related('portfolios').firstOrFail()

    const res = await request(App)
      .delete(`/portfolios/${portfolio.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Porfolio Successfully deleted')
  })

  // Clean up after the tests
  afterAll(async () => {
    await user.related('portfolios').query().delete()
    await user.delete()
  })
})
