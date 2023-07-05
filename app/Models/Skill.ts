import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Project from './Project'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "type" })
  public type: string

  @column({ columnName: "name" })
  public name: string

  @column({ columnName: "projectId" })
  public projectId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>
}
