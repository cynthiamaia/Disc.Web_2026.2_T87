import  { useState, useEffect } from "react";
import api from "../services/api";

function RegisterPost() {
  const [posts, setPosts] = useState([]);//variavel posts que guarda varios posts vindos da API, posts começa como array vazio
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");//o valor inicial é uma string vazia.
  const [editingId, setEditingId] = useState(null);//é um estado porque ele muda ao longo do tempo (
  //posts = []
  //buscar todos os posts
  const fetchPosts = async () => {//Essa função busca os posts no backend.
    try {
      //await api.get("/buscar"); 
      const response = await api.get("/buscar");
      setPosts(response.data);//pega os dados vindos da API e coloca dentro do posts
      console.log(response.data)
    }catch (error){
      console.log("Erro")
    }
  };
  useEffect(() => {  //Quando a tela carregar, execute fetchPosts()
     fetchPosts();//// busca os posts lá no backend
    }, []);//Lista vazia = nada pra observar = roda só na abertura
//verificar com dependencias especificas - 3 tipos de effect
  const handleDelete = async (id) => {
  if (!window.confirm("Tem certeza que deseja excluir este post?")) return;
  try{
    await api.delete(`/delete/${id}`)
    setMessage("Post deletado com sucesso")
    await fetchPosts();
  } catch (error){
    setMessage("Erro ao deletar o post")
  }
}
//comeca aqui 
const handleSubmit = async (e) => { 
    e.preventDefault(); //evitar comportamento de recarregar pagina
   try {// Verifica se estamos editando um post existente
       if (editingId) {//Se editingId tem um valor (não é null), significa que estamos editando um post existente.
        await api.put(`/put/${editingId}`, { title, content, author });//Manda uma requisição PUT pro backend, atualizando o post com aquele ID, enviando os dados novos.
        setMessage("Post atualizado com sucesso!");  // Se tem editingId (UPDATE)
        setEditingId(null);/// Limpa o ID, voltando ao modo criação
        await fetchPosts();
      } else {
        // Criar novo post
        await api.post("/posts", { title, content, author });//Manda uma requisição POST pro backend criando um novo post com os dados do formulário.
        setMessage("Post cadastrado com sucesso!");
        await fetchPosts();//Busca a lista atualizada do backend para refletir a mudança na tela.
      }
      //Limpa os campos do formulário após salvar, independente de ser criação ou edição.
        setTitle("");
        setContent("");
        setAuthor("");
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      setMessage("Erro ao salvar o post.");
    }
  };
  const handleEdit = (post) => {//Função chamada quando o usuário clica em “Editar” em um post.
    setTitle(post.title);//Preenche os campos do formulário com os dados do post que vai ser editado.
    setContent(post.content);
    setAuthor(post.author);
    setEditingId(post.id);//Guarda o ID do post sendo editado — é isso que faz o if (editingId) ser verdadeiro.
    setMessage("Editando post...");
  };
  //ate aqui
 return (
   <div>
      <h2>Cadastro de Livros</h2>
      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Conteúdo</label>
          <textarea
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label>Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit"> {editingId ? "Atualizar" : "Cadastrar"}</button>          
        </div>
      <div>{message}</div>
       </form> 
        {/* Lista de Posts */}
      <hr />

      <h3>Livros Cadastrados</h3>
      <div>
        {posts.map((post) => ( /*O map percorre cada item do array.O .map() pega a lista e passa por cada item, um por um.*/
          <div key={post.id}> 
            <h5>Titulo: {post.title}</h5>
            <p>Content: {post.content}</p>
            <small>Autor: {post.author || "Anônimo"} </small>
          
           <button
                  onClick={() => handleEdit(post)}
                >
                   Editar
                </button>

          <button
                  onClick={() => handleDelete(post.id)}>Deletar
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegisterPost;
