// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import { HttpErrors } from '@loopback/rest';
import isemail from 'isemail';
import { Usuario } from '../models';
import { Credentials } from '../repositories/usuario.repository';

export function validateCredentials(credentials: Credentials) {
  // Validate Email
  if (!isemail.validate(credentials.mail)) {
    throw new HttpErrors.UnprocessableEntity('Formato de Email invalido');
  }

  // Validate Password Length
  if (!credentials.password || credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'La contraseña debe ser minimo de 8 carácteres',
    );
  }
}

export function validatePassword(password: string) {

  // Validate Password Length
  if (password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'La contraseña debe ser minimo de 8 carácteres',
    );
  }
}

export function accessAccordingRole(user: Usuario, role: string) {
    if (!user.rol_id.includes(role)) {
        throw new HttpErrors.NotFound(`Usuario con mail ${user.mail} no encontrado.`)
    }
}