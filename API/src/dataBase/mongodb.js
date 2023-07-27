const mongoose = require('mongoose')
const url = "mongodb+srv://wesleybrum0000:wesleybrum123@banco--lux.ch5w90g.mongodb.net/?retryWrites=true&w=majority";
async function conectarMongo() {
  try{
  mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true})
    console.log("conectado com sucesso \n \n")
  }catch(error){
    console.log(error)
  }

}
module.exports = conectarMongo;