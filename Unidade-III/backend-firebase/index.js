import express from "express";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";
import cors from "cors";

// extrai o diretorio
const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccount = JSON.parse(
  readFileSync(`${__dirname}/project-web-87-firebase-adminsdk-fbsvc-4b3e08319e.json`, "utf-8")
);

initializeApp({
  credential: cert(serviceAccount)
});//Conecta a aplicação ao Firebase 
const db = getFirestore();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sejam bem vindo!");
});

app.post("/posts", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Campos obrigatorios: title, content" });
    }
    await db.collection("posts").add({
      title,
      content,
      author: author || "Anonimo",
      createdAt: FieldValue.serverTimestamp(),
    });
    res.status(200).json({ message: "Post criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor!" });
  }
});

app.put("/put/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, author } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (author) updateData.author = author;
    updateData.updatedAt = FieldValue.serverTimestamp();
    const postRef = db.collection("posts").doc(id);
    await postRef.update(updateData);
    res.status(200).json({ message: "Post atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postRef = db.collection("posts").doc(id);
    await postRef.delete();
    res.status(200).json({ message: "Deletado com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro servidor" });
  }
});

app.get("/buscar", async (req, res) => {
  try {
    const resul = await db.collection("posts").orderBy("createdAt", "desc").get();
    if (resul.empty) {
      return res.status(200).json({ message: "Nenhum post encontrado" });
    }
    const posts = resul.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        author: data.author,
      };
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));