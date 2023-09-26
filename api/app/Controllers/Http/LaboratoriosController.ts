import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Laboratorio from 'App/Models/Laboratorio';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

function evaluarRiesgo(porcentaje_azucar: number, porcentaje_grasa: number, porcentaje_oxigeno: number): string {
  if (
    (porcentaje_azucar > 100 || porcentaje_azucar < 0) ||
    (porcentaje_grasa > 100 || porcentaje_grasa < 0) ||
    (porcentaje_oxigeno > 100 || porcentaje_oxigeno < 0)
  ) {
    return 'Porcentajes no válidos';
  } else if (porcentaje_azucar > 70 && porcentaje_grasa > 88.5 && porcentaje_oxigeno < 60) {
    return 'ALTO';
  } else if (
    (porcentaje_azucar > 50 && porcentaje_azucar <= 70) &&
    (porcentaje_grasa > 62.2 && porcentaje_grasa <= 88.5) &&
    (porcentaje_oxigeno >= 60 && porcentaje_oxigeno <= 70)
  ) {
    return 'MEDIO';
  } else if (porcentaje_azucar <= 50 && porcentaje_grasa <= 62.2 && porcentaje_oxigeno > 70) {
    return 'BAJO';
  } else {
    return 'NORMALES'; // Agregamos esta condición para los casos normales
  }
}


export default class LaboratorioController {
  public async index({ response }: HttpContextContract) {
    try {
      const lab = await Laboratorio.all();
      response.ok({ msg: "Datos recuperados correctamente", data: lab });
    } catch (e) {
      console.error(e);
      response.status(500).send("Error al recuperar los datos");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      numero_identificacion: schema.number(),
      nombre: schema.string(),
      edad: schema.number(),
      porcentaje_azucar: schema.number([
        rules.range(0, 100),
      ]),
      porcentaje_grasa: schema.number([
        rules.range(0, 100),
      ]),
      porcentaje_oxigeno: schema.number([
        rules.range(0, 100),
      ])
    });

    try {
      const validatedData = await request.validate({
        schema: validationSchema
      });

      // Verificar si el número de identificación ya existe
      const existe = await Laboratorio.findBy('numero_identificacion', validatedData.numero_identificacion);

      if (existe) {
        return response.badRequest('El número de identificación ya existe.');
      }

      const resultado = evaluarRiesgo(
        validatedData.porcentaje_azucar,
        validatedData.porcentaje_grasa,
        validatedData.porcentaje_oxigeno
      );

      if (resultado === 'Porcentajes no válidos.') {
        return response.badRequest('Porcentajes no válidos.');
      }

      const lab = new Laboratorio();
      lab.numero_identificacion = validatedData.numero_identificacion;
      lab.nombre = validatedData.nombre;
      lab.edad = validatedData.edad;
      lab.porcentaje_azucar = validatedData.porcentaje_azucar;
      lab.porcentaje_grasa = validatedData.porcentaje_grasa;
      lab.porcentaje_oxigeno = validatedData.porcentaje_oxigeno;
      lab.resultado = resultado;
      await lab.save();
      response.ok({ msg: "El registro se creó correctamente", data: lab });
    } catch (e) {
      console.error('Error en store:', e.messages);  // Modificar esta línea
      console.error('Error Stack Trace:', e);  // Agregar esta línea
      response.status(500).send("Error al crear el registro");
    }
  }
}
