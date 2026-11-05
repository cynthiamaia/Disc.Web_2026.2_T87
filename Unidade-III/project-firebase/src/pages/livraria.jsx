import  { useState, useEffect } from "react";
import api from "../services/api";

function RegisterPost() {
  const [posts, setPosts] = useState([]);//variavel posts que guarda varios posts vindos da API, posts começa como array vazio
  const fetchPosts = async () => {//Essa função busca os posts no backend.
    try {
      await api.get("/buscar");
    }catch (error){
      console.log("Erro")
    }
  };

 return (
   <div>
      <h3>Livros Cadastrados</h3>
      <div>
          <div >
          <div >
            <h5>Titulo:</h5>
            <p>Content: </p>
            <small>Autor:  </small>
          </div>

          </div>
      </div>
    </div>
  );
}

export default RegisterPost;