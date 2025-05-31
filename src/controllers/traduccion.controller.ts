import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,  HttpErrors,} from '@loopback/rest';
import {Traduccion} from '../models';
import {TraduccionRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class TraduccionController {
  constructor(
    @repository(TraduccionRepository)
    public traduccionRepository : TraduccionRepository,
  ) {}

  @post('/traducciones')
  @response(200, {
    description: 'Traduccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Traduccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Traduccion, {
            title: 'NewTraduccion',
            exclude: ['id'],
          }),
        },
      },
    })
    traduccion: Omit<Traduccion, 'id'>,
  ): Promise<Traduccion> {
    return this.traduccionRepository.create(traduccion);
  }

  @get('/traducciones/count')
  @response(200, {
    description: 'Traduccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Traduccion) where?: Where<Traduccion>,
  ): Promise<Count> {
    return this.traduccionRepository.count(where);
  }

  @get('/traducciones')
  @response(200, {
    description: 'Array of Traduccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Traduccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Traduccion) filter?: Filter<Traduccion>,
  ): Promise<Traduccion[]> {
    return this.traduccionRepository.find(filter);
  }

  @patch('/traducciones')
  @response(200, {
    description: 'Traduccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Traduccion, {partial: true}),
        },
      },
    })
    traduccion: Traduccion,
    @param.where(Traduccion) where?: Where<Traduccion>,
  ): Promise<Count> {
    return this.traduccionRepository.updateAll(traduccion, where);
  }

  @get('/traducciones/{id}')
  @response(200, {
    description: 'Traduccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Traduccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Traduccion, {exclude: 'where'}) filter?: FilterExcludingWhere<Traduccion>
  ): Promise<Traduccion> {
    return this.traduccionRepository.findById(id, filter);
  }

  @patch('/traducciones/{id}')
  @response(204, {
    description: 'Traduccion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Traduccion, {partial: true}),
        },
      },
    })
    traduccion: Traduccion,
  ): Promise<void> {
    await this.traduccionRepository.updateById(id, traduccion);
  }

  @put('/traducciones/{id}')
  @response(204, {
    description: 'Traduccion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() traduccion: Traduccion,
  ): Promise<void> {
    await this.traduccionRepository.replaceById(id, traduccion);
  }

  @del('/traducciones/{id}')
  @response(204, {
    description: 'Traduccion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      //Obtiene la traduccion
      const dataSource = this.traduccionRepository.dataSource;
      let query = `SELECT * FROM traduccion WHERE id = ?`;
      const result = await dataSource.execute(query, [id]);
      if (result.length === 0) {
        throw new HttpErrors.NotFound('No se encontró la traducción con el ID proporcionado.');
      }
      const traduccion = result[0];
      //Borra las traducciones con la misma clave
      query = `DELETE FROM traduccion WHERE clave = '${traduccion.clave}'`;
      await dataSource.execute(query);
    } catch (e) {
      if (e.errno === 1451) {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro porque tiene otros registros relacionados.');
      } else {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro.');
      }
    }
  }
      
  @get('/vistaTraduccionIdioma')
  @response(200, {
    description: 'Devuelve las traducciones y sus idiomas',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async vistaTraduccionIdioma(@param.filter(Traduccion) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.traduccionRepository.dataSource;
    
    // Obtiene los idiomas activos ordenados alfabéticamente
    const idiomasQuery = `SELECT id, iso, nombre FROM idioma ORDER BY nombre ASC`;
    const idiomas = await dataSource.execute(idiomasQuery);
    
    // Construye la consulta dinámica de pivote
    let selectColumns = 't.clave, MIN(t.id) as id';  // Agregamos el ID del primer registro
    let pivotColumns = '';
    
    // Ordena los idiomas alfabéticamente antes de procesarlos
    const idiomasOrdenados = [...idiomas].sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    for (const idioma of idiomasOrdenados) {
      // Usa el nombre del idioma como alias de columna, reemplazando espacios con guiones bajos
      const columnName = idioma.nombre.replace(/\s+/g, '_').toLowerCase();
      // Agrega el valor de la traducción
      selectColumns += `, MAX(CASE WHEN t.idioma_id = ${idioma.id} THEN t.valor END) as "${columnName}"`;
      // Agrega el ID del registro de traducción
      selectColumns += `, MAX(CASE WHEN t.idioma_id = ${idioma.id} THEN t.id END) as "${columnName}Id"`;
      pivotColumns += ` LEFT JOIN traduccion t${idioma.id} ON t.clave = t${idioma.id}.clave AND t${idioma.id}.idioma_id = ${idioma.id}`;
    }

    // Construye la consulta base con el orden correcto de las cláusulas
    let query = `
      SELECT ${selectColumns}
      FROM traduccion t
      ${pivotColumns}
    `;

    // Aplica la cláusula WHERE si existen filtros
    if (filter?.where) {
      query += ` WHERE 1=1`;
      for (const [key] of Object.entries(filter?.where)) {
        if (key === 'and' || key === 'or') {
          {
            let first = true;
            for (const [subKey, subValue] of Object.entries((filter?.where as any)[key])) {
              if (subValue !== '' && subValue != null) {
                if (!first) {
                  if (key === 'and') {
                    query += ` AND`;
                  } else {
                    query += ` OR`;
                  }
                } else {
                  query += ' AND (';
                }
                if (/^-?\d+(\.\d+)?$/.test(subValue as string)) {
                  query += ` t.${subKey} = ${subValue}`;
                } else {
                  query += ` t.${subKey} LIKE '%${subValue}%'`;
                }
                first = false;
              }
            }
            if (!first) {
              query += `)`;
            }
          }
        }
      }
    }

    // Agrega la cláusula GROUP BY
    query += ` GROUP BY t.clave`;

    // Agrega la cláusula ORDER BY
    if (filter?.order) {
      query += ` ORDER BY ${filter.order}`;
    } else {
      query += ` ORDER BY t.clave ASC`;
    }

    // Agrega LIMIT y OFFSET para la paginación
    if (filter?.limit) {
      query += ` LIMIT ${filter?.limit}`;
    }
    if (filter?.offset) {
      query += ` OFFSET ${filter?.offset}`;
    }

    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/vistaTraduccionIdiomaCount')
  @response(200, {
    description: 'Devuelve las traducciones y sus idiomas',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async vistaTraduccionIdiomaCount(@param.where(Traduccion) where?: Where<Traduccion>,): Promise<Traduccion[]> {
    const dataSource = this.traduccionRepository.dataSource;
    //Aplicamos filtros
    let filtros = '';
    //Obtiene los filtros
    filtros += ` WHERE 1=1`
    if (where) {
      for (const [key] of Object.entries(where)) {
        if (key === 'and' || key === 'or') {
          {
            let first = true
            for (const [subKey, subValue] of Object.entries((where as any)[key])) {
              if (subValue !== '' && subValue != null) {
                if (!first) {
                  if (key === 'and') {
                    filtros += ` AND`;
                  }
                  else {
                    filtros += ` OR`;
                  }
                }
                else {
                  filtros += ' AND ('
                }
                if (/^-?\d+(\.\d+)?$/.test(subValue as string)) {
                  filtros += ` ${subKey} = ${subValue}`;
                }
                else {
                  filtros += ` ${subKey} LIKE '%${subValue}%'`;
                }
                first = false
              }
            }
            if (!first) {
              filtros += `)`;
            }
          }
        }

      }
    }
      const query = `SELECT COUNT(*) AS count FROM vista_traducciones${filtros}`;
      const registros = await dataSource.execute(query, []);
      return registros[0];
  }

  @get('/buscarTraduccion')
  @response(200, {
    description: 'Devuelve la traducción basada en el código ISO',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async buscarTraduccion(
    @param.query.string('iso') iso: string,
  ): Promise<object | null> {
    try {
      const dataSource = this.traduccionRepository.dataSource;
      const query = `SELECT * FROM vista_traduccion_idioma WHERE iso = ?`;
      const result = await dataSource.execute(query, [iso]);
      return result.length > 0 ? result : null;
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Error executing query');
    }
  }

}
