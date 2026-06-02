const express = require("express");
const app = express();
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
app.use(express.json());

//  middleware DEVE vir antes das rotas
app.use((req, res, next) => {
  req.user = {
    _id: "69e6ae04c5607f361702b87c",
  };
  next();
});

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
