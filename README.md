# Tripleten web_project_api_full

https://web-project-api-full-gamma.vercel.app/signin

# Web Project API Full

Projeto Full Stack desenvolvido como Sprint Final do curso, com foco em autenticação de usuários, autorização via JWT, validação de dados, tratamento centralizado de erros, logs, implantação em nuvem e integração entre Front-end e Back-end.

## 📋 Sobre o Projeto

Esta aplicação permite que usuários realizem:

- Cadastro de conta
- Login com autenticação JWT
- Edição de perfil
- Atualização de avatar
- Criação de cartões
- Exclusão de cartões próprios
- Curtir e remover curtidas de cartões

Toda a comunicação entre cliente e servidor ocorre através de uma API REST protegida.

---

## 🚀 Tecnologias Utilizadas

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- celebrate / Joi
- validator
- Winston
- Express-winston
- CORS
- PM2

### Frontend

- React
- JavaScript ES6+
- CSS

### Infraestrutura

- Nginx
- HTTPS (Let's Encrypt)
- PM2
- Linux Server
- Cloud Hosting

---

## 📁 Estrutura do Projeto

```text
.
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── errors/
│   ├── utils/
│   └── app.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── build/
│
├── README.md
└── .gitignore
```
