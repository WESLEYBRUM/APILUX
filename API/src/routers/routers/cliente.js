const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
router.use(cors());
const conectarMongodb = require('../dataBase/mongodb');

const userSchema = new mongoose.Schema({
  nomeUser: String,
});

const hoteis = mongoose.model('Usuarios', userSchema);

router.get('/loadCliente', async (req, res) => {
  const user = req.params.buscasHotel;
  try {
    await conectarMongodb();
     hoteis.findOne({ id:1})
      .then(buscasHotel => {
        if(buscasHotel){
        res.json(buscasHotel);
          console.log(buscasHotel, "hoteis existentes")
        }else{
          res.json("buscas nao existe")
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao conectar ao MongoDB' });
  }
});

module.exports = router;
