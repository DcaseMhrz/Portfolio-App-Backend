import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Portfolio from './Portfolio'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ columnName: "firstName" })
  public firstName: string

  @column({ columnName: "lastName" })
  public lastName: string

  @column({ columnName: "phoneNumber" })
  public phoneNumber: string

  @column({ columnName: "address" })
  public address: string

  @column({ columnName: "rememberMeToken" })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @hasMany(() => Portfolio, {
    foreignKey: "userId"
  })
  public portfolios: HasMany<typeof Portfolio>

}
