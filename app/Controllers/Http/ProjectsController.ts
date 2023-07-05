import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Portfolio from 'App/Models/Portfolio'
import Project from 'App/Models/Project'
import User from 'App/Models/User'
import ProjectValidator from 'App/Validators/ProjectValidator'


export default class ProjectsController {

  //CREATE
  public async store({ request }: HttpContextContract) {

    const validatedData = request.validate(ProjectValidator)

  }

  //READ ALL
  public async index({ auth }: HttpContextContract) {


    //return all projects 
    const userId = auth.user?.id

    const user = await User.findOrFail(userId) //find user 
    const portfolios = await user.related('portfolios').query() //get all portolios


    //map over all portolios to get all projects SPECIFICALLY THEIR IDS
    const projectIds = await Promise.all(portfolios.map(async (portfolio) => {
      const pids = await portfolio.related('projects').query().select('id')
      return pids.flatMap((p) => p.id)
    }))
    console.log(projectIds)

    //query over all those ids and return projects
    const projects = await Project.query().whereIn('id', projectIds)
    return projects || null
  }


  //READ ONE
  public async show({ }: HttpContextContract) {

  }

  //UPDATE
  public async update({ params }: HttpContextContract) {
    const projectId = params.id


  }

  //DELETE
  public async destroy({ }: HttpContextContract) {

  }


}
