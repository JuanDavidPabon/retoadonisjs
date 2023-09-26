import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TestDbController {
  public async index({ response }: HttpContextContract) {
    try {
      await Database.raw('SELECT 1 + 1 as result')
      return response.json({ message: 'Conexión a la base de datos exitosa' })
    } catch (error) {
      console.error('Error de conexión a la base de datos:', error.message)
      return response.status(500).json({ error: 'Error de conexión a la base de datos' })
    }
  }
}
