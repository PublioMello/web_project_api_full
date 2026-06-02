const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { postUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
app.use(express.json());

//rotas sign and signup
app.post("/signup", postUser);
app.post("/signin", login);

app.use(auth);

// rotas principais
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

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
