/**
 * Cuando se ejecuta el middleware
 * Next.js detecta automáticamente cualquier archivo llamado middleware.ts (o .js) en la raíz del proyecto 
 * (o del directorio src/) y lo ejecuta en cada solicitud de las rutas especificadas en el matcher.
 * 
 */

import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const {auth:middleware} = NextAuth(authConfig);
//👉 Aquí se está renombrando auth (de NextAuth) como middleware y exportándolo.
//👉 Luego Next.js lo encuentra, lo reconoce por su nombre (middleware) y lo ejecuta automáticamente en cada request que coincida con el matcher.
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
//Tu matcher aplica el middleware en:

//Todas las rutas visibles del usuario (excepto archivos y rutas internas)
//La ruta raíz /
//Rutas de API (/api/...) y de llamadas RPC (/trpc/...)



// 📦 ¿Qué hace `auth` de NextAuth internamente?
// La función `auth` (que renombramos como `middleware`) realiza los siguientes pasos:

// 1. Lee la cookie de sesión (`next-auth.session-token`) del request.
// 2. Verifica si existe una sesión válida para ese token.
// 3. Si NO hay sesión válida:
//    - Redirige automáticamente al usuario a la página de login 
//      (según la propiedad `pages.signIn` definida en `auth.config.ts`).
// 4. Si SÍ hay sesión válida:
//    - Permite que el request continúe hacia la ruta protegida.
