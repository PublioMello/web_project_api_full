const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer",
  },

  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%-]+#?$/.test(
          v,
        );
      },
      message: "URL inválida para o avatar",
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Formato de email inválido",
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
