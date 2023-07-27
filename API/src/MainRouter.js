const express = require('express');
const quartos = require('../routers/quatosRouter.js')
const registrar = require('../auth/registrar.js')
const login = require('../auth/login.js')
const cliente = require("../routers/cliente.js")
const cors = require('cors');



const router = express.Router();
router.use(cors());
router.use(cliente)
router.use(quartos)
router.use(registrar)
router.use(login)
// router.use(filmesRouter);
// router.use(seriesRouter);
// router.use(usuariosRouter);


router.get("/", (req,res)=>{
  try{
  res.status(200).send({
   status:"SUCESSO"
    
  })
  }
  catch(error){
    res.status(500).send({
      error:'erro',
      messagem:"nao foi posssivel acessar a API"
    })
  }
})

router.route('/')
.post((req,res)=>{
  try{
  res.status(400).send({
   status:"a rota solicitada nao é possivel realizar o metado POST"
  })
  }
  catch(error){
    res.status(400).send({
      error:'nao é possivel, vefique se indicou o metado certo',error
    })
  }
})
.put((req,res)=>{
  try{
    res.send({
      status:"a rota solicitada nao é possivel realizar o metado PUT"
    })
  }
  catch(error){
    res.send({
      error:'nao é possivel, vefique se indicou o metado certo',error
    })
  }
})
.delete((req,res)=>{
   try{
    res.send({
      status:"a rota solicitada nao é possivel realizar o metado DELETE"
    })
  }
  catch(error){
    res.send({
      error:'nao é possivel, vefique se indicou o metado certo',error
    })
  }
})



module.exports = router;


