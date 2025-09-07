

# Proyecto IMC - Backend

Backend desarrollado con NestJS que expone una API REST para calcular el Índice de Masa Corporal (IMC).
Este proyecto forma parte del trabajo práctico integrador de la cátedra Ingeniería y Calidad de Software - UTN FRVM.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)


---

## Instalación y ejecución en local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/crekss97/-tpi_imc_back_ic_2025.git
   cd -tpi_imc_back_ic_2025
    ```
2. Instalar dependencias:
```bash
yarn install
```
3. Ejecutar en modo desarrollo:
```bash
yarn start:dev
```
La API quedará disponible en:
http://localhost:3000

4. Ejecutar en modo desarrollo:
Ejecutar las pruebas con:
```bash
yarn test
```

## Despliegue de la Aplicación

Se utilizó Vercel para el despliegue de la Aplicación

Pasos para el despliegue de una aplicación en Vercel

1. Crear una cuenta en [Vercel](https://vercel.com/signup)
2. Importar este repositorio desde GitHub.
3. Configuraciones a realizar
- Build Command: yarn test && yarn build
- Output Directory: .dist
- Install Command:  yarn install
- Development Command: none
4. Guardar y desplegar.

Cada vez que se haga push a la rama main, Vercel ejecutará los tests y, si pasan, desplegará automáticamente.

##  Colaboración en equipo
- La rama principal de despliegue es main.
- Se utiliza la rama test para la subida de cambios, luego se pasan a la rama main mediante un merge.