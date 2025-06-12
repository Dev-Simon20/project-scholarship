#
## Clonar el proyecto

1. Instala pg admin4 (al instalr guarda muy bien tu usuario y contraseña)
2. Crea una base de datos(solo eso no hagas nada mas )
3. clona el proyceto desde el repositorio deSDE github [HAS CLICK AQUI](https://github.com/Dev-Simon20/project-scholarship.git)
4. Ejecuta el nomando 
```
   npm install
```
5. Agrega el archivo .env que pasare por whatsapp al proyecto 

6. Edita la variable DATABASE_URL agregando los datos de tu base de datos: tu usuario, tu contraseña y el nombre de la base de datos que creaste en el primer punto DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_de_bd"
7. Ejecuta el comando para crear todas las tablas en la bd
```
   npx prisma migrate deploy

```
8. Ejecuta el coandno para generar el cliente de prisma
```
   npx prisma generate

```
9. levanta el servidor ejecutando el comando:
```
   npx run dev

```

10. Ve a la siguiente pagina y registra un usuario 
http://localhost:3000/sign-in

11. Abre tu base de datos y cambia el rol del usuario que creaste a admin

12. ve ala pagina de icio de sessionhttp://localhost:3000/log-in

13. ya puedes navegar por todas las rutas 

## Modelado del Sistema

### Requerimiento del sistema

-  Requerimientos funcionales
   | Código | Requerimiento funcional | Prioridad |
   |--------|-------------------------------------------------------------------------------------------------------------|-----------|
   | RF 1 | El sistema debe mostrar una pantalla de inicio de sesión. | Alta |
   | RF 2 | El sistema debe mostrar un panel principal tras el inicio de sesión. | Alta |
   | RF 3 | El sistema debe permitir al administrador crear procesos de beca. | Alta |
   | RF 4 | El sistema debe permitir al administrador editar el proceso solo si aún no hay alumnos registrados. | Alta |
   | RF 5 | El sistema debe mostrar al administrador una pantalla con una tabla de los inscritos a su proceso de beca.| Alta |
   | RF 6 | El sistema debe permitir al administrador cambiar el estado del proceso de una postulación a aprobado, rechazado o necesita cambios.| Alta |
   | RF 7 | El sistema debe permitir al administrador cambiar el estado de revisión de un documento del proceso de un alumno.| Alta |
   | RF 8 | El sistema debe permitir al usuario ver los procesos de becas disponibles. | Alta |
   | RF 9 | El sistema debe permitir al usuario inscribirse a un proceso de beca. | Alta |
   | RF 10 | El sistema debe permitir al usuario subir los documentos necesarios para cumplir con el proceso de beca.| Alta |
    | RF 11 | El sistema debe permitir al usuario corregir su proceso si el administrador asi lo indica.| Alta |


## Authenticación con Auth.js

<https://authjs.dev/>

## Estructura del proyecto

```plaintext
📂 proyecto-becas-de-alimentos/
 ┣ 📂 src/
 ┃ ┣ 📂 app/
 ┃ ┃ ┣ 📂 login/          ← Vista de inicio de sesión
 ┃ ┃ ┣ 📂 signin/          ← Vista de inicio de sesión
 ┃ ┃ ┣ 📂 dashboard/      ← Panel principal del estudiante
 ┃ ┃ ┣ 📂 profile/        ← Perfil del usuario
 ┃ ┃ ┗ 📜 layout.tsx      ← Estructura general de la app
 ┃ ┣ 📂 api/
 ┃ ┃ ┣ 📂 auth/           ← Módulo de autenticación
 ┃ ┃ ┣ 📂 becas/          ← Endpoints para gestión de becas
 ┃ ┃ ┣ 📂 solicitudes/    ← Endpoints para envío de solicitudes
 ┃ ┃ ┗ 📜 index.ts
 ┃ ┣ 📂 lib/
 ┃ ┃ ┣ 📜 validators.ts   ← Validaciones de formularios
 ┃ ┃ ┣ 📜 auth.config.ts  ← Configuración de autenticación
 ┃ ┃ ┗ 📜 prisma.ts       ← Conexión a la base de datos
 ┣ 📂 prisma/
 ┃ ┗ 📜 schema.prisma     ← Definición del modelo de datos
 ┣ 📜 tsconfig.json
 ┣ 📜 package.json
 ┣ 📜 .env
 ┗ 📜 README.md
```



### 1- Instalación

```
npm install next-auth@beta
```

### 2- Setup Envionment

Crear la variable AUTH_SECRET con la repuesta del comando

```
npx auth secret
```

### 3- Configuración

Crear el archivo y el objeto Authjs

-  Crear un arcivo con el nombre auth.ts guardar en la raiz del proyecto:
   ```
   import NextAuth from "next-auth"
   export const { handlers, signIn, signOut, auth } = NextAuth({
       providers: [],
   })
   ```
-  Agregar un Manejador de rutas en src/app/api/auth/[...nextauth]/route.ts.
   ```bash
   import { handlers} from "@/auth" //Referencia al auth.ts que se acaba de crear
   export const {GET,POST} = handlers
   ```
-  Agregue Middleware opcional para mantener viva la sesión, esto actualizará la caducidad de la sesión cada vez que se llame.
   ```bash
   export {auth as middleware} from "@/auth"
   ```

## Configurar Prisma

### 1-Instalación

```
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
```

### 2-Crear esquema inicial

Esto nos creará una carpeta con un esquema inicial de prisma y una variable .env como ejemplo de conexión ala BD postgress

```
npx prisma init
```

### 3- configurar cliente Prisma

Para mejorar el rendimiento , podemos configurar la instancia de Prisma en **src/lib/db.ts** para garantizar que solo se cree una instancia a lo largo del proyecto y luego importarla desde cualquier archivo según sea necesario.
configuración de archivos.

```
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prismaDb = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaDb
```

### 4- Importamos la instancia de prisma

Finalmente, podemos importar la instancia de Prisma desde el auth.ts

```bash
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prismaDb } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaDb),
  providers: [],
})
```

### 5- Mejorar la compatibilidad de Prisma con [Edge compatibility](https://authjs.dev/guides/edge-compatibility)

-  Creamos en la raiz el archivo auth.config.ts

   ```bash
    #  Configuración común de Auth.js (sin adaptador de base de datos)
    #  Esto es solo un objeto, no una instancia completa de Auth.js
    import type {NextAuthConfig} from "next-auth"
    export default {
        providers: [],
    } satisfies NextAuthConfig

   ```

-  Instancia completa de Auth.js con adaptador y JWT

   En el archivo auth.ts importamos la configuración anterior, pero además le agregamos el adaptador Prisma y configuramos la estrategia de sesión con JWT:

   ```bash
   import NextAuth from "next-auth"
   import authConfig from "./auth.config"
   import { PrismaAdapter} from "@auth/prisma-adapter"
   import { prismaDb} from "@/lib/db"

   export const {handlers,auth,signIn,signOut} = NextAuth({
       adapter: PrismaAdapter(prismaDb),
       session: {strategy: "jwt"},
       ...authConfig,
   })
   ```

-  Nuestro Middleware, que luego importaría la configuración sin el adaptador de base de datos e instanciar a su propio cliente Auth.js.
   ```bash
   import NextAuth from "next-auth"
   import authConfig from "./auth.config"
   export const {auth:middleware} = NextAuth(authConfig)
   ```
-  Agregamos el matcher para el middelware.ts
   ```bash
   export const config = {
      matcher:["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
   };
   ```

### 6 Agregamos un esquema inicial para la base de datos

<details>
<summary>Ver todo</summary>

```bash
generator client {
  provider = "prisma-client-js"

}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


enum Role {
  user
  admin
}
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  emailVerified DateTime?
  image         String?
  role          Role      @default(user)

  accounts Account[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([provider, providerAccountId])
}

model VerificationToken {
  identifier String   @unique
  token      String
  expires    DateTime

  @@id([identifier])
}
```

</details>

-  Crear la base de datos postgresSQL haciendo uso de pgadmin4, **No hacer nada más**
-  Editamos la variable de entorno de la conexion ala base de datos que se habia creado con **_npx prisma init_**
   ```bash
   #DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   DATABASE_URL="postgresql://postgres:4545@localhost:5432/scholarships?schema=public"
   ```
-  Ejecutamos los siguiente comandos:
   ```bash
   npx prisma generate
   #Luego
   npx prisma db push
   ```
-  Con eso ya estaria creado la base de datos regresca pg admin para ver los cambios

### 7- Configuramos el metodo de autenticacion [Credenciales](https://authjs.dev/getting-started/authentication/credentials)

```bash
#configuramos el archivo auth.config.ts
#Esto es solo una simulación de login
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prismaDb } from "@/lib/db";
import bcrypt from "bcryptjs";
export default {
   providers: [
      Credentials({
         authorize: async (credentials) => {
            let user = null
            const user = await prismaDb.user.findUnique({
               where: {
                  email: credentials.email,
               },
            });
            if (!user || !user.password) {
                throw new Error("No user found");
            }
            const isValid = await bcrypt.compare(credentials.password, user.password);

            if (!isValid) {
              throw new Error("Incorrect password");
            }

            return user;
         },
      }),
   ],
} satisfies NextAuthConfig;
```
