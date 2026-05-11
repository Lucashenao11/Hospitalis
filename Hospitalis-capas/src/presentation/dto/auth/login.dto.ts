/**
 * CAPA DE PRESENTACIÓN — DTO LoginDto
 *
 * Un DTO (Data Transfer Object) define la forma del JSON que llega en el body.
 * class-validator valida automáticamente antes de que el método del controller se ejecute.
 * Los DTOs pertenecen a presentación: describen el "contrato" HTTP, no el dominio.
 */
import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email!: string;

  @IsString()
  password!: string;
}
