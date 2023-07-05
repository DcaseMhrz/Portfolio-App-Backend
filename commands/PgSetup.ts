import { BaseCommand } from '@adonisjs/core/build/standalone'
import Env from '@ioc:Adonis/Core/Env'

export default class PgSetup extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'pg:setup'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Setup PostgreSQL database'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run() {
    const db = {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST', 'localhost'),
        port: Env.get('PG_PORT', '5432'),
        user: Env.get('PG_USER', 'root'),
        database: Env.get('PG_DB_NAME', 'postgres'),
        password: Env.get('PG_PASSWORD', 'sheishei00'),
      },
    }
    const dbName = Env.get('PG_DB_NAME', 'adonis')

    const action = await this.prompt.choice('Select an action', [
      {
        name: 'Create',
        hint: `Create ${dbName} database`,
      },
      {
        name: 'Drop',
        hint: `Drop ${dbName} database`,
      },
    ])

    const knex = require('knex')(db)

    switch (action) {
      case 'Create':
        try {
          await knex.raw(`CREATE DATABASE ${dbName}`)
          this.logger.success('Database Created')
        } catch (e) {
          this.logger.error(e)
        }
        break
      case 'Drop':
        try {
          await knex.raw(`DROP DATABASE ${dbName}`)
          this.logger.success('Database Dropped')
        } catch (e) {
          this.logger.error(e)
        }
        break
    }
  }
}
