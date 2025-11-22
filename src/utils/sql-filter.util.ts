import { Filter, Where } from '@loopback/repository';

export class SqlFilterUtil {
  /**
   * Construye los filtros SQL a partir de un objeto where de LoopBack
   * @param where - Objeto where de LoopBack
   * @returns String con los filtros SQL
   */
  static construirClausulaWhere(where?: Where<any>): string {
    let filtros = ' WHERE 1=1';
    
    if (where) {
      for (const [key] of Object.entries(where)) {
        if (key === 'and' || key === 'or') {
          let first = true;
          for (const [subKey, subValue] of Object.entries((where as any)[key])) {
            if (subValue !== '' && subValue != null) {
              if (!first) {
                if (key === 'and') {
                  filtros += ' AND';
                } else {
                  filtros += ' OR';
                }
              } else {
                filtros += ' AND (';
              }
              
              if (/^-?\d+(\.\d+)?$/.test(subValue as string)) {
                filtros += ` ${subKey} = ${subValue}`;
              } else {
                filtros += ` ${subKey} LIKE '%${subValue}%'`;
              }
              first = false;
            }
          }
          if (!first) {
            filtros += ')';
          }
        }
      }
    }
    
    return filtros;
  }

  /**
   * Construye la cláusula ORDER BY
   * @param order - Array de orden de LoopBack o string
   * @returns String con la cláusula ORDER BY
   */
  static construirClausulaOrder(order?: string[] | string): string {
    if (!order) {
      return '';
    }
    
    if (Array.isArray(order) && order.length > 0) {
      return ` ORDER BY ${order.join(', ')}`;
    } else if (typeof order === 'string' && order.trim().length > 0) {
      return ` ORDER BY ${order}`;
    }
    
    return '';
  }

  /**
   * Construye las cláusulas de paginación LIMIT y OFFSET
   * @param limit - Límite de registros
   * @param offset - Offset de registros
   * @returns String con las cláusulas de paginación
   */
  static construirClausulaPaginacion(limit?: number, offset?: number): string {
    let pagination = '';
    
    if (limit) {
      pagination += ` LIMIT ${limit}`;
    }
    
    if (offset) {
      pagination += ` OFFSET ${offset}`;
    }
    
    return pagination;
  }

  /**
   * Construye la query completa SQL para COUNT
   * @param tableName - Nombre de la tabla
   * @param where - Objeto where de LoopBack
   * @returns Query SQL completa para COUNT
   */
  static construirQueryCount(tableName: string, where?: Where<any>): string {
    const whereClause = this.construirClausulaWhere(where);
    return `SELECT COUNT(*) AS count FROM ${tableName}${whereClause}`;
  }

  /**
   * Construye la query completa SQL para SELECT
   * @param tableName - Nombre de la tabla
   * @param filter - Objeto filter de LoopBack
   * @param selectFields - Campos a seleccionar (por defecto *)
   * @returns Query SQL completa para SELECT
   */
  static construirQuerySelect(tableName: string, filter?: Filter<any>, selectFields: string = '*'): string {
    const whereClause = this.construirClausulaWhere(filter?.where);
    const orderClause = this.construirClausulaOrder(filter?.order);
    const paginationClause = this.construirClausulaPaginacion(filter?.limit, filter?.offset);
    
    return `SELECT ${selectFields} FROM ${tableName}${whereClause}${orderClause}${paginationClause}`;
  }

  /**
   * Ejecuta una query de COUNT y retorna el resultado
   * @param dataSource - DataSource de LoopBack
   * @param tableName - Nombre de la tabla
   * @param where - Objeto where de LoopBack
   * @returns Promesa con el resultado del COUNT
   */
  static async ejecutarQueryCount(dataSource: any, tableName: string, where?: Where<any>): Promise<any> {
    const query = this.construirQueryCount(tableName, where);
    const resultado = await dataSource.execute(query, []);
    return resultado[0];
  }

  /**
   * Ejecuta una query de SELECT y retorna los resultados
   * @param dataSource - DataSource de LoopBack
   * @param tableName - Nombre de la tabla
   * @param filter - Objeto filter de LoopBack
   * @param selectFields - Campos a seleccionar (por defecto *)
   * @returns Promesa con los resultados del SELECT
   */
  static async ejecutarQuerySelect(dataSource: any, tableName: string, filter?: Filter<any>, selectFields: string = '*'): Promise<any[]> {
    const query = this.construirQuerySelect(tableName, filter, selectFields);
    return await dataSource.execute(query);
  }
}