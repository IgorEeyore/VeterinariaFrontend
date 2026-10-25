
export type Rol = "Admin" | "Cliente";

export interface UsuarioSesion {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
}
