const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const conectarMongodb = require('../dataBase/mongodb');
// const autenticar = require('../middleware/verificarAuth');

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

const url = "mongodb+srv://wesleybrum0000:wesleybrum123@banco--lux.ch5w90g.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  nomeUser: String,
  senha: String
});
const User = mongoose.model('usuarios', userSchema);

router.post('/login', async (req, res) => {
  const { Name, Senha } = req.body;

  try {
    await conectarMongodb();
    console.log('Conectado com o banco');
  } catch (error) {
    console.log(error);
  }

  User.findOne({ nomeUser: Name })
    .then(async (usuario) => {
      if (usuario) {
        const senhaCorreta = await bcrypt.compare(Senha, usuario.senha);
        if (senhaCorreta) {
          console.log(usuario);
          res.json("Usuário encontrado");
        } else {
          console.log('Senha incorreta');
          res.json("Senha incorreta");
        }
      } else {
        console.log('Usuário não encontrado');
        res.json("Usuário não encontrado");
      }
    })
    .catch((error) => {
      console.error('Erro ao encontrar:', error);
    });
})

module.exports = router;