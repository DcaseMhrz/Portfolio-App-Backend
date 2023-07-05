import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("projectName").nullable()
      table.integer('portfolioId').notNullable().unsigned().references('id').inTable('portfolios').onDelete('CASCADE')
      table.string('projectSize').nullable()
      table.string('projectDescription').nullable()
      table.string('clientName').nullable()
      table.date('startDate').nullable()
      table.date('endDate').nullable()
      table.string('teamSize').nullable()
      table.string('role').nullable()
      table.string('cloud').nullable()
      table.string('contribution')
      table.string('outcome')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
