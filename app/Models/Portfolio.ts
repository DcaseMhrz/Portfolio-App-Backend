import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, afterCreate, beforeSave, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Project from './Project'
import Education from './Education'
import Skill from './Skill'

export default class Portfolio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'userId', serializeAs: "userId" })
  public userId: number

  @column()
  public name?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Project, {
    localKey: 'id',
    foreignKey: "portfolioId"
  })
  public projects: HasMany<typeof Project>


  @hasMany(() => Education, {
    localKey: 'id',
    foreignKey: "portfolioId"
  })
  public education: HasMany<typeof Education>




}
