# Bifrost API

API REST desenvolvida com NestJS, TypeORM e MySQL.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **MySQL** - Banco de dados
- **TypeScript** - Linguagem de programação

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL (versão 8.0 ou superior)
- Yarn (gerenciador de pacotes)

## 🛠️ Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd bifrost-api
   ```

2. **Instale as dependências**

   ```bash
   yarn install
   ```

3. **Configure o banco de dados**

   - Crie um banco de dados MySQL chamado `bifrost_db`
   - Configure as variáveis de ambiente:

   ```bash
   yarn setup
   ```

   - Edite o arquivo `.env` com suas configurações de banco:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=bifrost_db
   ```

4. **Execute a aplicação**

   ```bash
   # Desenvolvimento
   yarn start:dev

   # Produção
   yarn build
   yarn start:prod
   ```

## 📚 Estrutura do Projeto

```
src/
├── config/           # Configurações
├── domain/           # Entidades e enums
├── modules/          # Módulos da aplicação
│   └── user/        # Módulo de usuários
├── app.module.ts    # Módulo principal
└── main.ts          # Arquivo de entrada
```

## 🔗 Endpoints

### Usuários

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `POST /users` - Criar novo usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário (soft delete)

## 🗄️ Banco de Dados

A aplicação usa TypeORM com MySQL. As entidades são automaticamente sincronizadas em modo de desenvolvimento.

### Entidade CustomerUser

- `id` (UUID) - Identificador único
- `name` (string) - Nome do usuário
- `phone` (number) - Telefone
- `role` (enum) - Papel do usuário
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização
- `deletedAt` - Data de exclusão (soft delete)

## 🚀 Scripts Disponíveis

- `yarn setup` - Configurar arquivo .env
- `yarn start:dev` - Executar em modo desenvolvimento
- `yarn build` - Compilar para produção
- `yarn start:prod` - Executar em modo produção

## 📝 Variáveis de Ambiente

| Variável      | Descrição          | Padrão      |
| ------------- | ------------------ | ----------- |
| `DB_HOST`     | Host do MySQL      | localhost   |
| `DB_PORT`     | Porta do MySQL     | 3306        |
| `DB_USERNAME` | Usuário do MySQL   | root        |
| `DB_PASSWORD` | Senha do MySQL     | -           |
| `DB_DATABASE` | Nome do banco      | bifrost_db  |
| `PORT`        | Porta da aplicação | 3000        |
| `NODE_ENV`    | Ambiente           | development |

# 1. Subir apenas o banco (não a aplicação):

docker-compose up -d mysql phpmyadmin

# 2. Rodar sua aplicação localmente:

yarn start:dev
