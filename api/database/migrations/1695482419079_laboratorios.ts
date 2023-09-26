import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'laboratorios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('nombre', 50).notNullable();
      table.integer('edad').notNullable();
      table.float('porcentaje_azucar').notNullable();
      table.float('porcentaje_grasa').notNullable();
      table.float('porcentaje_oxigeno').notNullable();
      table.string('resultado', 128).nullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
