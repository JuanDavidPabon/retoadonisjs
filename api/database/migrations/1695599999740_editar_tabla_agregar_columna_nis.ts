import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'laboratorios'

  public async up() {
    this.schema.table('laboratorios', (table) => {
      table.integer('numero_identificacion', 255)  // Agrega una nueva columna de tipo string
    })
  }
}
