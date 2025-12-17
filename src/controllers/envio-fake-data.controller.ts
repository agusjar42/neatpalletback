import {
  repository,
} from '@loopback/repository';
import {
  post,
  del,
  param,
  requestBody,
  response,
} from '@loopback/rest';
import {service} from '@loopback/core';
import {
  EnvioRepository,
  EnvioContenidoRepository,
  EnvioMovimientoRepository,
  EnvioPalletRepository,
  EnvioParadaRepository,
  EnvioSensorRepository,
  PalletRepository,
  TipoSensorRepository,
  EnvioConfiguracionRepository,
  EnvioContenidoPalletRepository,
  LugarParadaRepository,
} from '../repositories';
import {
  Envio,
  EnvioContenido,
  EnvioMovimiento,
  EnvioPallet,
  EnvioParada,
  EnvioSensor,
  Pallet,
  EnvioContenidoPallet,
} from '../models';
import {EnvioConfiguracionService} from '../services/envio-configuracion.service';
import * as path from 'path';
import * as fs from 'fs';

// Cargar datos desde archivos JSON
const DATA_PATH = path.join(process.cwd(), 'src/data');
const ciudadesOrigen: string[] = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'ciudades-origen.json'), 'utf-8'));
const ciudadesDestino: string[] = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'ciudades-destino.json'), 'utf-8'));
const productos: string[] = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'productos.json'), 'utf-8'));
const prefijosRef: string[] = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'prefijos-referencia.json'), 'utf-8'));
const ciudadesParada: string[] = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'ciudades-parada.json'), 'utf-8'));
const nombresOperarios: string[] = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'nombres-operarios.json'), 'utf-8'));
const calles: string[] = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'calles.json'), 'utf-8'));
const dominiosEmail: string[] = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'dominios-email.json'), 'utf-8'));

interface FakeDataRequest {
  usuarioCreacion: number;
  empresaId: number;
}

export class EnvioFakeDataController {
  constructor(
    @repository(EnvioRepository)
    public envioRepository: EnvioRepository,
    @repository(EnvioContenidoRepository)
    public envioContenidoRepository: EnvioContenidoRepository,
    @repository(EnvioMovimientoRepository)
    public envioMovimientoRepository: EnvioMovimientoRepository,
    @repository(EnvioPalletRepository)
    public envioPalletRepository: EnvioPalletRepository,
    @repository(EnvioParadaRepository)
    public envioParadaRepository: EnvioParadaRepository,
    @repository(EnvioSensorRepository)
    public envioSensorRepository: EnvioSensorRepository,
    @repository(EnvioConfiguracionRepository)
    public envioConfiguracionRepository: EnvioConfiguracionRepository,
    @repository(PalletRepository)
    public palletRepository: PalletRepository,
    @repository(TipoSensorRepository)
    public tipoSensorRepository: TipoSensorRepository,
    @repository(EnvioContenidoPalletRepository)
    public envioContenidoPalletRepository: EnvioContenidoPalletRepository,
    @repository(LugarParadaRepository)
    public lugarParadaRepository: LugarParadaRepository,
    @service(EnvioConfiguracionService)
    public envioConfiguracionService: EnvioConfiguracionService,
  ) {}

  @post('/envios/generar-datos-fake')
  @response(200, {
    description: 'Genera datos fake para las tablas de envío',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async generarDatosFake(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['usuarioCreacion', 'empresaId'],
            properties: {
              usuarioCreacion: {type: 'number'},
              empresaId: {type: 'number'},
            },
          },
        },
      },
    })
    request: FakeDataRequest,
  ): Promise<object> {
    const {usuarioCreacion, empresaId} = request;

    // Crear envío fake
    const envio = await this.crearEnvioFake(empresaId, usuarioCreacion);

    // Crear contenidos fake (2-4 contenidos por envío)
    const numContenidos = this.randomInt(2, 4);
    const contenidos = [];
    for (let i = 0; i < numContenidos; i++) {
      const contenido = await this.crearEnvioContenidoFake(envio.id!, usuarioCreacion);
      contenidos.push(contenido);
    }

    // Obtener pallets disponibles para la empresa
    const pallets = await this.palletRepository.find({where: {empresaId}});

    // Crear envío_pallet fake (10-30 pallets por envío)
    const numPallets = Math.min(this.randomInt(10, 30), pallets.length);
    const envioPallets = [];
    for (let i = 0; i < numPallets && i < pallets.length; i++) {
      const envioPallet = await this.crearEnvioPalletFake(envio.id!, pallets[i].id!, usuarioCreacion);
      envioPallets.push(envioPallet);
    }

    // Crear paradas fake (según paradas previstas)
    const numParadas = envio.paradasPrevistas || this.randomInt(1, 3);
    const paradas = [];
    for (let i = 0; i < numParadas; i++) {
      const parada = await this.crearEnvioParadaFake(envio.id!, usuarioCreacion);
      paradas.push(parada);
    }

    // Obtener tipos de sensores disponibles
    const tiposSensores = await this.tipoSensorRepository.find();

    // Crear sensores fake (2-5 sensores por envío)
    const numSensores = Math.min(this.randomInt(2, 5), tiposSensores.length);
    const sensores = [];
    for (let i = 0; i < numSensores && i < tiposSensores.length; i++) {
      const sensor = await this.crearEnvioSensorFake(envio.id!, tiposSensores[i].id!, usuarioCreacion);
      sensores.push(sensor);
    }

    // Crear movimientos fake (50-100 movimientos por envío)
    const numMovimientos = this.randomInt(50, 100);
    const movimientos = [];
    for (let i = 0; i < numMovimientos; i++) {
      // Seleccionar un tipo de sensor aleatorio (pueden repetirse)
      const tipoSensorAleatorio = this.randomElement(tiposSensores);
      const movimiento = await this.crearEnvioMovimientoFake(envio.id!, tipoSensorAleatorio.id!, usuarioCreacion);
      movimientos.push(movimiento);
    }

    // Crear configuraciones desde empresa
    await this.envioConfiguracionService.insertEnvioConfiguracion(envio.id!, empresaId, usuarioCreacion);

    // Asociar pallets con contenidos (distribuir pallets entre contenidos)
    const envioContenidoPallets = [];
    for (const envioPallet of envioPallets) {
      // Asignar cada pallet a un contenido aleatorio
      const contenidoAleatorio = this.randomElement(contenidos);
      const envioContenidoPallet = await this.crearEnvioContenidoPalletFake(
        contenidoAleatorio.id!,
        envioPallet.palletId!,
        usuarioCreacion
      );
      envioContenidoPallets.push(envioContenidoPallet);
    }

    return {
      mensaje: 'Datos fake generados exitosamente',
      envio,
      contenidos,
      envioPallets,
      envioContenidoPallets,
      paradas,
      sensores,
      movimientos,
    };
  }

  @del('/envios/{id}/borrar-cascada')
  @response(204, {
    description: 'Borra un envío y todas sus tablas relacionadas en cascada',
  })
  async borrarEnvioCascada(
    @param.path.number('id') id: number,
  ): Promise<void> {
    // Borrar en orden: primero las tablas hijas, luego la tabla padre

    // 1. Borrar envio_contenido_pallet usando el método del repositorio
    await this.envioContenidoPalletRepository.deleteByEnvioId(id);

    // 2. Borrar envio_contenido
    await this.envioContenidoRepository.deleteAll({envioId: id});

    // 3. Borrar envio_movimiento
    await this.envioMovimientoRepository.deleteAll({envioId: id});

    // 4. Borrar envio_pallet
    await this.envioPalletRepository.deleteAll({envioId: id});

    // 5. Borrar envio_parada
    await this.envioParadaRepository.deleteAll({envioId: id});

    // 6. Borrar envio_sensor
    await this.envioSensorRepository.deleteAll({envioId: id});

    // 7. Borrar envio_configuracion
    await this.envioConfiguracionRepository.deleteAll({envioId: id});

    // 8. Finalmente, borrar el envío
    await this.envioRepository.deleteById(id);
  }

  private async crearEnvioFake(empresaId: number, usuarioCreacion: number): Promise<Envio> {
    const fechaSalida = this.generarFechaAleatoria();
    const fechaLlegada = this.generarFechaAleatoria(fechaSalida);

    const envio = {
      empresaId,
      origenRuta: this.randomElement(ciudadesOrigen),
      fechaLlegada: this.formatearFecha(fechaLlegada),
      gpsRutaOrigen: this.generarCoordenadas(),
      destinoRuta: this.randomElement(ciudadesDestino),
      gpsRutaDestino: this.generarCoordenadas(),
      fechaSalida: this.formatearFecha(fechaSalida),
      paradasPrevistas: this.randomInt(1, 5),
      usuarioCreacion,
    };

    return this.envioRepository.create(envio);
  }

  private async crearEnvioContenidoFake(envioId: number, usuarioCreacion: number): Promise<EnvioContenido> {
    const contenido = {
      envioId,
      producto: this.randomElement(productos),
      referencia: `${this.randomElement(prefijosRef)}-${this.randomInt(1000, 9999)}`,
      pesoKgs: this.randomDecimal(10, 500),
      pesoTotal: this.randomDecimal(100, 2000),
      medidas: `${this.randomInt(50, 200)}x${this.randomInt(50, 200)}x${this.randomInt(50, 200)} cm`,
      usuarioCreacion,
    };

    return this.envioContenidoRepository.create(contenido);
  }

  private async crearEnvioMovimientoFake(envioId: number, tipoSensorId: number, usuarioCreacion: number): Promise<EnvioMovimiento> {
    const movimiento = {
      envioId,
      tipoSensorId,
      fecha: this.formatearFecha(this.generarFechaAleatoria()),
      gps: this.generarCoordenadas(),
      valor: this.generarValorSensor(tipoSensorId),
      usuarioCreacion,
    };

    return this.envioMovimientoRepository.create(movimiento);
  }

  private async crearEnvioPalletFake(envioId: number, palletId: number, usuarioCreacion: number): Promise<EnvioPallet> {
    const envioPallet = {
      envioId,
      palletId,
      usuarioCreacion,
    };

    return this.envioPalletRepository.create(envioPallet);
  }

  private async crearEnvioParadaFake(envioId: number, usuarioCreacion: number): Promise<EnvioParada> {
    // Obtener un lugar de parada aleatorio de la base de datos
    const lugaresParada = await this.lugarParadaRepository.find();
    const lugarParadaId = lugaresParada.length > 0 ? lugaresParada[this.randomInt(0, lugaresParada.length - 1)].id : undefined;
    
    const parada = {
      envioId,
      fecha: this.formatearFecha(this.generarFechaAleatoria()),
      lugarParadaId,
      lugarParadaGps: this.generarCoordenadas(),
      direccion: `${this.randomElement(calles)}, ${this.randomInt(1, 999)}`,
      nombreOperario: this.randomElement(nombresOperarios),
      telefonoOperario: `+34 ${this.randomInt(600, 799)} ${this.randomInt(100, 999)} ${this.randomInt(100, 999)}`,
      emailOperario: this.generarEmail(this.randomElement(nombresOperarios)),
      usuarioCreacion,
    };

    return this.envioParadaRepository.create(parada);
  }

  private async crearEnvioSensorFake(envioId: number, tipoSensorId: number, usuarioCreacion: number): Promise<EnvioSensor> {
    const sensor = {
      envioId,
      tipoSensorId,
      valor: this.generarValorSensor(tipoSensorId),
      usuarioCreacion,
    };

    return this.envioSensorRepository.create(sensor);
  }

  private async crearEnvioContenidoPalletFake(envioContenidoId: number, palletId: number, usuarioCreacion: number): Promise<EnvioContenidoPallet> {
    const envioContenidoPallet = {
      envioContenidoId,
      palletId,
      usuarioCreacion,
    };

    return this.envioContenidoPalletRepository.create(envioContenidoPallet);
  }

  // Funciones auxiliares para generar datos aleatorios

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomDecimal(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  }

  private randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private generarFechaAleatoria(fechaBase?: Date): Date {
    const fecha = fechaBase ? new Date(fechaBase) : new Date();
    fecha.setDate(fecha.getDate() + this.randomInt(1, 30));
    fecha.setHours(this.randomInt(0, 23));
    fecha.setMinutes(this.randomInt(0, 59));
    return fecha;
  }

  private formatearFecha(fecha: Date): string {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${año}-${mes}-${dia}`;
  }

  private generarCoordenadas(): string {
    const lat = this.randomDecimal(36, 43);
    const lng = this.randomDecimal(-9, 3);
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }

  private generarValorSensor(tipoSensorId: number): string {
    // Generar valores según el tipo de sensor
    // Por simplicidad, generamos valores genéricos
    const tiposValores = [
      `${this.randomDecimal(-5, 35)}°C`,
      `${this.randomInt(20, 80)}%`,
      `${this.randomDecimal(0, 100)} km/h`,
      `${this.randomInt(0, 1) === 1 ? 'Activo' : 'Inactivo'}`,
      `${this.randomDecimal(0, 1000)} lux`,
    ];
    return this.randomElement(tiposValores);
  }

  private generarEmail(nombre: string): string {
    const nombreLimpio = nombre.toLowerCase().replace(/\s+/g, '.');
    return `${nombreLimpio}@${this.randomElement(dominiosEmail)}`;
  }
}
