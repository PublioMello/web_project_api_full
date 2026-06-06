const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { postUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

//rotas sign and signup
app.post("/signup", postUser);
app.post("/signin", login);

app.use(auth);

// rotas principais
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

//Error handler
app.use(errorHandler);
const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");

const { postUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");

const { validateURL } = require("./utils/validation");

const app = express();

app.use(express.json());

// Signup
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  postUser,
);

// Signin
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

// Middleware de autenticação
app.use(auth);

// Rotas protegidas
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

// Rota inexistente
app.use((req, res, next) => {
  const err = new Error("A solicitação não foi encontrada");
  err.statusCode = 404;

  next(err);
});

// Middleware do Celebrate
app.use(errors());

// Middleware global de erros
app.use(errorHandler);

// Banco de dados
mongoose.connect("mongodb://localhost:27017/aroundb");

// Servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
// fallback 404
app.use((req, res) => {
  res.status(404).send({
    message: "A solicitação não foi encontrada",
  });
});

mongoose.connect("mongodb://localhost:27017/aroundb");

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
