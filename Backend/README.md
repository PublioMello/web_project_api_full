🚀 Projeto: Web Project Around Express (Back-end)
📌 Descrição

Este projeto consiste na construção de um servidor back-end utilizando Node.js e Express, como evolução do projeto front-end "EUA Afora".

O objetivo principal é criar uma API RESTful capaz de:

- Gerenciar usuários
- Gerenciar cards
- Simular persistência de dados com arquivos JSON
- Preparar a base para autenticação e banco de dados futuramente

Este projeto marca a transição do desenvolvimento front-end para o full stack, com foco em criação de APIs e estruturação de servidores.

🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- ESLint (Airbnb Style Guide)
- Nodemon
- JavaScript (ES6+)

📌 Setup

- git clone <repo>
- cd web_project_around_express
- npm init -y
- npm install express
- npm install nodemon eslint@8.56.0 eslint-config-airbnb-base eslint-plugin-import --save-dev

▶️ Scripts (package.json)

"scripts": {
"start": "node app.js",
"dev": "nodemon app.js",
"lint": "npx eslint ."
}

▶️ Rodar o projeto

- npm run dev

Servidor:

http://localhost:3000

📡 Endpoints

- GET /users
- GET /cards
- GET /users/:id

📂 Estrutura
routes/
data/
app.js

⚙️ ESLint (.eslintrc)
{
"extends": "airbnb-base",
"rules": {
"no-underscore-dangle": "off",
"no-console": "off",
"linebreak-style": "off"
}
}

🧠 Conceitos Aplicados

- Criação de servidor com Express
- Rotas REST
- Modularização de código
- Manipulação de arquivos com fs
- Uso de path.join para compatibilidade entre sistemas
- Padronização de código com ESLint
- Hot reload com Nodemon

🚧 Melhorias Futuras

- Integração com banco de dados (MongoDB)
- Autenticação de usuários (JWT)
- Middleware de validação
- Deploy em servidor remoto
- Integração com front-end
