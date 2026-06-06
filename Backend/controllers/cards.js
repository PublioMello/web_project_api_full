const Card = require("../models/cards");

// Busca os cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

//Cria os cards
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  // console.log(req.user._id);

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados inválidos";
      }

      next(err);
    });
};

//deleta o card
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        const err = new Error("Cartão não encontrado");
        err.statusCode = 404;
        return next(err);
      }

      if (card.owner.toString() !== req.user._id) {
        const err = new Error(
          "Você não tem permissão para excluir este cartão",
        );
        err.statusCode = 403;
        return next(err);
      }

      return Card.findByIdAndDelete(cardId).then(() => {
        res.send({
          message: "Cartão deletado",
        });
      });
    })
    .catch(next);
};

// da like no card
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Cartão não encontrado";
      }

      next(err);
    });
};

//unlike no card
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Cartão não encontrado";
      }

      next(err);
    });
};
