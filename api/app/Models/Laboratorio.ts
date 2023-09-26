import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Laboratorio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string;

  @column()
  public numero_identificacion: number;

  @column()
  public edad: number;

  @column()
  public porcentaje_azucar: number;

  @column()
  public porcentaje_grasa: number;

  @column()
  public porcentaje_oxigeno: number;

  @column()
  public resultado: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
