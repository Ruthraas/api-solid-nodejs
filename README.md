# api-solid-nodejs

API REST em Node.js para uma aplicacao no estilo GymPass, desenvolvida com TypeScript, Fastify, Prisma e PostgreSQL. O projeto aplica principios de SOLID, separacao por casos de uso e repositorios intercambiaveis para manter as regras de negocio isoladas da camada HTTP e da persistencia.

## Stack

- Node.js com TypeScript
- Fastify para a camada HTTP
- Prisma ORM com PostgreSQL
- Zod para validacao de contratos de entrada
- JWT e refresh token via cookie HTTP
- Vitest para testes unitarios e E2E
- Docker Compose para o banco local
- TSUP para build de producao

## Arquitetura

O codigo segue uma organizacao orientada a casos de uso:

- `src/http`: controllers, rotas e middlewares HTTP.
- `src/use-cases`: regras de negocio e fluxos da aplicacao.
- `src/repositories`: contratos de persistencia e implementacoes Prisma/in-memory.
- `src/use-cases/factories`: composicao das dependencias usadas em runtime.
- `prisma`: schema, migrations e ambiente customizado para testes E2E.

Essa separacao permite testar regras de negocio sem depender de servidor HTTP ou banco real, alem de trocar implementacoes de repositorio sem alterar os casos de uso.

## Funcionalidades

- Cadastro e autenticacao de usuarios.
- Perfil do usuario autenticado.
- Refresh token.
- Cadastro de academias por administradores.
- Busca de academias por nome.
- Busca de academias proximas ao usuario.
- Criacao de check-ins.
- Historico e metricas de check-ins do usuario.
- Validacao de check-ins por administradores.

## Endpoints

| Metodo | Rota | Autenticacao | Descricao |
| --- | --- | --- | --- |
| `POST` | `/users` | Publica | Cadastra um usuario |
| `POST` | `/sessions` | Publica | Autentica um usuario |
| `PATCH` | `/token/refresh` | Refresh token | Renova o token JWT |
| `GET` | `/me` | JWT | Retorna o perfil do usuario |
| `GET` | `/gyms/search` | JWT | Busca academias por nome |
| `GET` | `/gyms/nearby` | JWT | Lista academias proximas |
| `POST` | `/gyms` | JWT + ADMIN | Cadastra uma academia |
| `POST` | `/gyms/:gymId/check-ins` | JWT | Cria um check-in |
| `GET` | `/check-ins/history` | JWT | Retorna o historico de check-ins |
| `GET` | `/check-ins/metrics` | JWT | Retorna metricas de check-ins |
| `PATCH` | `/check-ins/:checkInId/validate` | JWT + ADMIN | Valida um check-in |

## Regras de negocio

- Um usuario nao pode ser cadastrado com e-mail duplicado.
- A senha do usuario deve ser armazenada como hash.
- Um usuario pode realizar apenas um check-in por dia.
- O check-in so pode ser criado quando o usuario estiver a ate 100 metros da academia.
- Um check-in so pode ser validado em ate 20 minutos apos sua criacao.
- Apenas administradores podem cadastrar academias.
- Apenas administradores podem validar check-ins.
- Listagens devem ser paginadas com 20 itens por pagina.

## Banco de dados

Principais entidades:

- `User`: usuario da aplicacao, com perfil `MEMBER` ou `ADMIN`.
- `Gym`: academia cadastrada, com coordenadas geograficas.
- `CheckIn`: registro de presenca de um usuario em uma academia.

Indices foram adicionados para consultas frequentes de check-ins por usuario/data, academias por titulo e busca por coordenadas.

## Variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
NODE_ENV=dev
PORT=3333
JWT_SECRET=your-secret
DATABASE_URL="postgresql://docker:docker@localhost:5432/ignitenode03?schema=public"
```

## Como executar

Instale as dependencias:

```bash
npm install
```

Suba o PostgreSQL:

```bash
docker compose up -d
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Inicie a API em modo desenvolvimento:

```bash
npm run start:dev
```

A aplicacao ficara disponivel em `http://localhost:3333`.

## Testes

Execute os testes unitarios dos casos de uso:

```bash
npm test
```

Execute os testes E2E da camada HTTP:

```bash
npm run test:e2e
```

Gere cobertura de testes:

```bash
npm run test:coverage
```

## Build

Gere a versao de producao:

```bash
npm run build
```

Execute a aplicacao compilada:

```bash
npm start
```
