const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

//  GET /users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

//  GET /users/:id
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("Nenhum User encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      }
      next(err);
    });
};

// Post /user (create)
module.exports.postUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).send(userResponse);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados inválidos";
      }

      next(err);
      return res.status(500).send({
        message: "Erro no servidor",
      });
    });
};

// atualizar perfil
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Usuário não encontrado";
      }

      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados inválidos";
      }

      next(err);
    });
};

// atualizar avatar
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Usuário não encontrado";
      }

      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "URL inválida";
      }

      next(err);
    });
};

// POST /signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("Email ou senha incorretos");
        err.statusCode = 401;
        return next(err);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res.status(401).send({
            message: "Email ou senha incorretos",
          });
        }

        const token = jwt.sign({ _id: user._id }, "super-secret-key", {
          expiresIn: "7d",
        });

        return res.send({ token });
      });
    })
    .catch(() => {
      res.status(500).send({
        message: "Erro no servidor",
      });
    });
};

//Get the current user
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new Error("Usuário não encontrado");
        err.statusCode = 404;
        return next(err);
      }

      return res.send(user);
    })
    .catch(next);
};
