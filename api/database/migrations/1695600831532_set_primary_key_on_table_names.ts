import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SetPrimaryKey extends BaseSchema {
  protected tableName = 'laboratorios'

  public async up() {
    await Database.rawQuery('ALTER TABLE laboratorios DROP CONSTRAINT PK__laborato__3213E83F1F88C546;')
    await Database.rawQuery('ALTER TABLE laboratorios ADD PRIMARY KEY (numero_identificacion);')
  }
}
