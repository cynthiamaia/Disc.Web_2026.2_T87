import express from "express"; //É uma biblioteca do Node.js que facilita a criação de servidores e APIs.

//Cria a aplicação do backend.
const app = express();
app.use(express.json());//Prepara o Express para interpretar corpos de requisições JSON.

app.get("/", (req, res) => {//Define o que responder quando alguém acessar a rota inicial.
  res.send("API com MySQL rodando!");
});


const PORT = 4000;
//Escolhem a porta e iniciam o servidor.
app.listen(PORT, () => {//Faz o Express começar a escutar as requisições que chegam à porta 4000.
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
