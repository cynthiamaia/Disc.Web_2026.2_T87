import express from "express"; //É uma biblioteca do Node.js que facilita a criação de servidores e APIs.
import mysql from "mysql2/promise";
//Cria a aplicação do backend.
const app = express();
const db = await mysql.createConnection({//criar conexão com o banco MySQ
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "Aula_Web",
});
app.use(express.json());//Prepara o Express para interpretar corpos de requisições JSON.

app.get("/", (req, res) => {//Define o que responder quando alguém acessar a rota inicial.
  res.send("API com MySQL rodando!");
});

app.post("/posts", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Campos obrigatorios: title, content"
      });
    }

    await db.execute(
      "INSERT INTO autores (title, content, author) VALUES (?, ?, ?)",
      [title, content, author]
    );
    //Os ? são placeholders. Funcionam como: espaços reservados.
    res.status(200).json({
      message: "Post criado com sucesso!"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
});
const PORT = 4000;
//Escolhem a porta e iniciam o servidor.
app.listen(PORT, () => {//Faz o Express começar a escutar as requisições que chegam à porta 4000.
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
