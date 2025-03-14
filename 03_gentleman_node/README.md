# 03_gentleman_node

Configuracion inicial de un proyecto de Node.js con bun.

## Getting Started

```bash
bun install

```

## Instalamos eslint y la inicializamos

```bash
bunx eslint --init
```

## Instalamos las librerias y dependencias necesarias

```bash
 bun add bcrypt cors jsonwebtoken valibot
 ```

## Instalamos las depemdecias para desarrollo que se necesitan para el proyecto

```bash
bun add -D @eslint/js @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-config-airbnb-base-typescript eslint-plugin-unused-imports
 
```

## Instalamos los paquetes de tipo de datos y plugins de eslint

```bash
bun add -D eslint-plugin-import eslint-plugin @types/bcrypt @types/cors @types/node @types/jsonwebtoken
```
