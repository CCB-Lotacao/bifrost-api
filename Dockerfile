# Use Node.js 20 Alpine como base (versão mais recente e segura)
FROM node:20-alpine

# Habilitar Corepack para usar a versão correta do Yarn
RUN corepack enable

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e yarn.lock
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar código fonte
COPY . .

# Reinstalar dependências após copiar código (para garantir que tudo está correto)
RUN yarn install --frozen-lockfile

# Compilar TypeScript
RUN yarn build

# Expor porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start:prod"]