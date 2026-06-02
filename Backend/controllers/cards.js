const Card = require("../models/cards");

// Busca os cards
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Erro no servidor" }));
};

//Cria os cards
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  // console.log(req.user._id);

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(() => res.status(400).send({ message: "Dados inválidos" }));
};

//deleta o card
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Cartão não encontrado" });
      }
      res.send({ message: "Cartão deletado" });
    })
    .catch(() => res.status(500).send({ message: "Erro no servidor" }));
};

// da like no card
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Cartão não encontrado" });
      }
      res.status(500).send({ message: "Erro no servidor" });
    });
};

//unlike no card
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Cartão não encontrado" });
      }
      res.status(500).send({ message: "Erro no servidor" });
    });
};
