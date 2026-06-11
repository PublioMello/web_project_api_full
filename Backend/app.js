require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate, Joi, errors } = require("celebrate");
const logRequests = require("./middlewares/requestLogger");
const logErrors = require("./middlewares/errorLogger");
const PORT = process.env.PORT || 3001;
const { postUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");

const { validateURL } = require("./utils/validation");

const app = express();

app.use(cors());
// app.options("/*", cors());

app.use(express.json());
app.use(logRequests);
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

// Rotas protegidas
app.use(auth);

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

// 404
app.use((req, res) => {
  res.status(404).send({
    message: "A solicitação não foi encontrada",
  });
});
app.use(logErrors);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch((err) => console.error("Erro Mongo:", err));

module.exports = app;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
