/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('register', 'Auth/SessionsController.register').as('register')
  Route.post('login', 'Auth/SessionsController.login').as('login')
}).prefix('auth')
  .as('auth')

Route.group(() => {
  Route.resource('portfolio', 'PortFoliosController').apiOnly()
  Route.resource('project', 'ProjectsController').apiOnly()
  Route.resource('education', 'EducationsController').apiOnly()
  Route.resource('skill', 'SkillsController').apiOnly()
}).middleware('auth')