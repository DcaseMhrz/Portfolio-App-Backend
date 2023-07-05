import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Portfolio from 'App/Models/Portfolio'
import PortfolioValidator from 'App/Validators/PortfolioValidator'

export default class PortfoliosController {

  public async index({ auth, response }: HttpContextContract) {
    //get all portoflios related to user
    const portfolio = await Portfolio.query().where({ userId: auth.user?.id })
    return response.status(200).json({ portfolio })
  }

  public async show({ params, auth }: HttpContextContract) {

    //getting id from params and querying it preloading everything related to it
    const id = Number(params.id)
    const portfolio = await auth.user!.related('portfolios').query().preload('projects').preload('skill').preload('education').where({ id: id })
    return portfolio
  }

  public async store({ request, auth, response }: HttpContextContract) {

    //validate the request using the validator 
    //***  control click on PortfolioValidator to check the validator File  **//
    const portfolio = await request.validate(PortfolioValidator)


    const newPortfolio = new Portfolio() //creating a new portfolio instance and saving to the variable
    const id = auth.user!.id    //saving userId in a variable
    newPortfolio.userId = id    //saving that userid in the userId column of the porfolio table
    newPortfolio.name = portfolio.name    //saving the name
    try {
      await newPortfolio.save()   //NOW FINALLY SAVING THE PORTOLFIO instance inside the try block 
      return response.status(201).json({ message: "Successfully created new portfolio" }) //if successful send success
    } catch (error) {
      return response.json({
        message: "failed to create",
        error: error.message
      })      //error message
    }

  }

  public async update({ request, response, params, auth }: HttpContextContract) {

    // get the data form the request
    // validate the data 
    const validatedData = await request.validate(PortfolioValidator)

    //try updating the data
    try {
      await auth.user!.related('portfolios').query().where({ id: params.id }).update('name', validatedData.name)
      return response.status(201).json({ message: "Updated Portfolio" })

    } catch (error) {
      return response.json({ message: "Failed to create", error: error.message })

    }



  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    //getting id from the url params
    const id = params.id

    try {
      //finding the portfolios related to the user where id is equal to id the user sent in the url
      const check = await auth.user!.related('portfolios').query().where({ id: id })
      console.log(check)

      //if its empty
      if (check.length === 0) return response.status(404).json({ message: "portfolio Not found" })

      //delete the portfolio
      await auth.user?.related('portfolios').query().where({ id: id }).delete()

      return response.status(200).json({ message: "Porfolio Successfully deleted" })

    } catch (error) {
      //return error if any 
      return response.status(500).json({ message: "Failed to delete", error: error })

    }
  }
}
