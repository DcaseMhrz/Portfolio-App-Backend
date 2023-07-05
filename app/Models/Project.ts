import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Portfolio from './Portfolio'
import Skill from './Skill'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // column to hold the portfolio it is related to 
  @column({ columnName: "portfolioId" })
  public portfolioId: number

  @column({ columnName: "projectName" })
  public projectName: string

  @column({ columnName: "projectSize" })
  public projectSize: string

  @column({ columnName: "projectDescription" })
  public projectDescription: string


  @column({ columnName: "clientName" })
  public clientName: string

  @column({ columnName: "startDate" })
  public startDate: DateTime

  @column({ columnName: "endDate" })
  public endDate: DateTime

  @column({ columnName: "teamSize" })
  public teamSize: string

  @column({ columnName: "role" })
  public role: string

  @column({ columnName: "cloud" })
  public cloud: string

  @column({})
  public contribution: string

  @column({})
  public outcome: string




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Portfolio)
  public portfolio: BelongsTo<typeof Portfolio>

  @hasMany(() => Skill, {
    localKey: 'id',
    foreignKey: "projectId"
  })
  public skills: HasMany<typeof Skill>


}
