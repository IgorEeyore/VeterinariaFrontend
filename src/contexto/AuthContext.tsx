import {
  createContext,
  useContext,
  useState
} from "react";

import type { ReactNode } from "react";
import type { UsuarioSesion } from "../Tipos/Usuarios";

interface AuthContextType {
  usuario: UsuarioSesion | null;
  iniciarSesion: (usuario: UsuarioSesion) => void;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [usuario, setUsuario] = useState<UsuarioSesion | null>(
    () => {
      try {
        const datos = sessionStorage.getItem("usuarioSesion");
        return datos ? JSON.parse(datos) as UsuarioSesion : null;
      } catch {
        return null;
      }
    }
  );

  function iniciarSesion(nuevoUsuario: UsuarioSesion) {
    setUsuario(nuevoUsuario);

    sessionStorage.setItem(
      "usuarioSesion",
      JSON.stringify(nuevoUsuario)
    );
  }

  function cerrarSesion() {
    setUsuario(null);
    sessionStorage.removeItem("usuarioSesion");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return contexto;
}