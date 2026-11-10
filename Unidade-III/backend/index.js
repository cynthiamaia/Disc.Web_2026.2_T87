import express from "express"; //É uma biblioteca do Node.js que facilita a criação de servidores e APIs.
import mysql from "mysql2/promise";
import cors from "cors";

//Cria a aplicação do backend.
const app = express();
const db = await mysql.createConnection({//criar conexão com o banco MySQ
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "Aula_Web",
});
app.use(express.json());//Prepara o Express para interpretar corpos de requisições JSON.
app.use(cors());

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
app.put("/put/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const { title, content, author } = req.body;

    await db.execute(
      "UPDATE autores SET title = ?, content = ?, author = ? WHERE id = ?",
      [title, content, author, id]
    );

    res.status(200).json({
      message: "put atualizado com sucesso"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Erro interno do servidor"
    });

  }
});
app.delete("/delete/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await db.execute(
      "DELETE FROM autores WHERE id = ?",
      [id]
    );

    res.status(200).json({
      message: "Post deletado com sucesso"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Erro interno do servidor"
    });

  }

});
app.get("/buscar", async (req, res) => {

  try {

    const [rows] = await db.execute(//rows é o resultado das linhas retornadas pela consulta SQL.
      "SELECT * FROM autores"
    );

    res.json(rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      erro: "Erro no servidor"
    });

  }

});
const PORT = 4000;
//Escolhem a porta e iniciam o servidor.
app.listen(PORT, () => {//Faz o Express começar a escutar as requisições que chegam à porta 4000.
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
