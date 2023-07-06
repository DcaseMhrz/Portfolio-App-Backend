// Import the HttpContextContract type from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// Import the Portfolio model from 'App/Models/Portfolio'
import Portfolio from 'App/Models/Portfolio'
// Import the PortfolioValidator from 'App/Validators/PortfolioValidator'
import PortfolioValidator from 'App/Validators/PortfolioValidator'

// Define the PortfoliosController class
export default class PortfoliosController {

  // Function to handle the index route (READ ALL)
  public async index({ auth, response }: HttpContextContract) {
    // Query the Portfolio model, filtering for portfolios that have a userId matching the id of the authenticated user
    const portfolio = await Portfolio.query().where({ userId: auth.user?.id })
    // Send a HTTP response with a status code of 200 and a JSON payload containing the portfolio data
    return response.status(200).json({ portfolio })
  }

  // Function to handle the show route (GET ONE portfolio by id)
  public async show({ params, auth }: HttpContextContract) {
    // Convert the id parameter from the URL to a number
    const id = Number(params.id)
    // Query for portfolios associated with the authenticated user, preloading associated projects, skills, and education, and filtering for the specified id
    const portfolio = await auth.user!.related('portfolios').query().preload('projects').preload('skill').preload('education').where({ id: id })
    // Return the resulting portfolio
    return portfolio
  }

  // Function to handle the store route (POST)
  public async store({ request, auth, response }: HttpContextContract) {
    // Validate the incoming request data against the PortfolioValidator rules
    const portfolio = await request.validate(PortfolioValidator)
    // Create a new instance of the Portfolio model
    const newPortfolio = new Portfolio()
    // Get the id of the authenticated user
    const id = auth.user!.id
    // Assign the authenticated user's id to the userId property of the new portfolio
    newPortfolio.userId = id
    // Assign the validated name from the request data to the name property of the new portfolio
    newPortfolio.name = portfolio.name
    // Attempt to save the new portfolio to the database
    try {
      await newPortfolio.save()
      // If successful, respond with a status code of 201 and a success message
      return response.status(201).json({ message: "Successfully created new portfolio" })
    } catch (error) {
      // If an error occurs, respond with a JSON payload containing the error message
      return response.json({
        message: "failed to create",
        error: error.message
      })
    }
  }

  // Function to handle the update route (PUT)
  public async update({ request, response, params, auth }: HttpContextContract) {
    // Validate the incoming request data against the PortfolioValidator rules
    const validatedData = await request.validate(PortfolioValidator)
    // Attempt to update the portfolio in the database
    try {
      await auth.user!.related('portfolios').query().where({ id: params.id }).update('name', validatedData.name)
      // If successful, respond with a status code of 201 and a success message
      return response.status(201).json({ message: "Updated Portfolio" })
    } catch (error) {
      // If an error occurs, respond with a JSON payload containing the error message
      return response.json({ message: "Failed to create", error: error.message })
    }
  }

  // Function to handle the destroy route (DELETE)
  publicasync destroy({ params, auth, response }: HttpContextContract) {
    // Extract the portfolio ID from the URL parameters
    const id = params.id

    // Use a try-catch block to handle potential errors
    try {
      // Query to find the portfolios related to the authenticated user where the ID matches the ID from the URL
      const check = await auth.user!.related('portfolios').query().where({ id: id })
      // Log the result of the check
      console.log(check)

      // If the check returns an empty array (i.e., no portfolio was found with the given ID), return a 404 status code and error message
      if (check.length === 0) return response.status(404).json({ message: "portfolio Not found" })

      // If a portfolio with the given ID is found, delete it from the database
      await auth.user?.related('portfolios').query().where({ id: id }).delete()

      // Return a 200 status code and success message
      return response.status(200).json({ message: "Porfolio Successfully deleted" })

    } catch (error) {
      // If an error occurs, return a 500 status code and the error message
      return response.status(500).json({ message: "Failed to delete", error: error })
    }
  }
}
