import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Portfolio from './Portfolio'

export default class Education extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "degreeName" })
  public degreeName: string

  @column({ columnName: "portfolioId" })
  public portfolioId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Portfolio)
  public portfolio: BelongsTo<typeof Portfolio>
}
