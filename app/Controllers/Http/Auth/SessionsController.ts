// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { rules, schema } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User"
import UserValidator from "App/Validators/UserValidator"

export default class SessionsController {
  //Register

  public async register({ request, response, auth }) {

    const { email, password, rememberMeToken } = await request.validate(UserValidator)


    const user = new User()
    user.email = email;
    user.password = password;
    user.rememberMeToken = rememberMeToken;

    try {
      //try saving the details
      const registeredUser = await user.save()
      console.log(registeredUser)

      //login to get the token
      const token = await auth.use('api').login(registeredUser, { expiresIn: "1day" })
      // console.log(token)

      //get the user details right after login
      const userInfo = auth.use('api').user!

      //if the user is successfuly registered return token and user Details
      return { token, userInfo }


    } catch (error) {
      return response.status(400).json({
        message: "failed to register",
        error: error.message
      })
    }
  }

  public async login({ request, response, auth }) {
    const { email, password } = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.normalizeEmail({
            allLowercase: true,
            gmailRemoveDots: true
          })
        ]),
        password: schema.string()
      })
    })

    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: "1 day" })
      const userInfo = auth.use('api').user!
      return { token, userInfo }

    } catch (error) {
      return response.status(400).json({
        message: "Login Failed",
        error: error.message
      })
    }


  }

}
