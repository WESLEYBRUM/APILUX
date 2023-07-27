const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const router = express.Router();

// Configurar o middleware
router.use(bodyParser.json());
router.use(cors());

// Definir o esquema do usuário
const userSchema = new mongoose.Schema({
  _id: {
    type: String, // Alteração aqui
    unique: true
  },
  nomeUser: String,
  nomePersonalizado: String,
  numeroContato: String,
  senha: String,
  cpf: String,
  num_pessoas: Number,
  alugados: [{ // Alteração aqui
    id: Number,
    horaEntrada: String,
    horaSaida: String
  }]
});

// Criar o modelo do usuário
const Usuario = mongoose.model('Usuario', userSchema);

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://wesleybrum0000:wesleybrum123@banco--lux.ch5w90g.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

// Rota para cadastrar um novo usuário
router.post('/cadastro', async (req, res) => {
  const { nomeuser, senha, nomepersonalizado, datanascimento, cpf } = req.body;
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  try {
    const verificar = await Usuario.findOne({ nomeUser: nomeuser });

    if (verificar) {
      console.log('Usuário ou senha já existe');
      return res.status(400).json('Usuário ou senha já existe');
    }

    if (nomeuser === '' || senha === '') {
      console.log('Campo não preenchido corretamente');
      return res.status(400).json('Campo não preenchido corretamente');
    }

    const currentDate = new Date();
    const userr = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      nomeUser: nomeuser || null,
      nomePersonalizado: nomepersonalizado || 'usuario_prisma',
      numeroContato: null,
      senha: senhaCriptografada,
      dataNascimento: datanascimento || null,
      cpf: cpf || null,
      num_pessoas: null,
      alugados: [{
        id: 1,
        horaEntrada: currentDate.toISOString(),
        horaSaida: currentDate.toISOString()
      }]
    };

    const savedUser = await Usuario.create(userr);
    console.log('Usuário inserido com sucesso:', savedUser);

    res.json('Usuário cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir o usuário:', error);
    res.status(500).json('Erro ao cadastrar o usuário');
  }
});

module.exports = router;
