const express = require("express")
const cors = require('cors');
const router = express.Router();
router.use(cors());
const conectarMongodb = require('../dataBase/mongodb.js');
const mongoose = require('mongoose');
// const mongoose = require('mongoose');

// Definir o esquema do quarto
const quartoSchema = new mongoose.Schema({
  id: Number,
  titulo: String,
  imagem: String,
  nome: String,
  descricao: String,
  botao: String
});

// Criar o modelo do quarto
const Quarto = mongoose.model('Quarto', quartoSchema);

async function salvarQuartos() {
  try {
    // Configurar a URL de conexão do MongoDB
    const url = 'mongodb+srv://wesleybrum0000:wesleybrum123@banco--lux.ch5w90g.mongodb.net/?retryWrites=true&w=majority';

    // Conectar ao banco de dados
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Definir os quartos a serem salvos
    const quartos = [
      {
        id: 0
      },
      {
        id: 1,
        titulo: "LUXO MAX",
        imagem: "https://media-cdn.tripadvisor.com/media/photo-s/0b/4a/0a/0b/quarto-hotel-curi.jpg",
        nome: "SUITE BLACK 1",
        descricao: "Esse quarto é o melhor que oferemos",
        botao: "RESERVA 1"
      },
      {
        id: 2,
        titulo: "LUXO LIBRARY",
        imagem: "https://i.pinimg.com/736x/3e/4c/6a/3e4c6af8c9f3d41318bc4949095202f0.jpg",
        nome: "SUITE BLACK 2",
        descricao: "Descrição do segundo quarto",
        botao: "RESERVA 2"
      },
      // Adicione mais quartos aqui
      {
        id: 10,
        titulo: "LUXO LITY",
        imagem: "https://meulugar.quintoandar.com.br/wp-content/uploads/2022/10/quarto-luxo-7-1024x576.jpg",
        nome: "SUITE BLACK 10",
        descricao: "Descrição do décimo quarto",
        botao: "RESERVA 10"
      }
    ];

    const resultado = await Quarto.insertMany(quartos);
    console.log(`${resultado.length} quartos foram inseridos.`);

    // Fechar a conexão com o banco de dados
    await mongoose.connection.close();
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

// Chamar a função para salvar os qu

router.get("/testelux", async (req,res)=>{
  try{
   conectarMongodb();
    salvarQuartos();
  }
  catch(error){
    console.log("nao foi possivel",error)
  }
})

module.exports = router;