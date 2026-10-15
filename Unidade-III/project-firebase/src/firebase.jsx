// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth" //inclui isso tambem, está relacionado à configuração da autenticação do Firebase no seu projeto React.
// Your web app's Firebase configuration
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAF_J4v1hS--eyU6o44tpFSMM7lU7hO2U",
  authDomain: "project-web-87.firebaseapp.com",
  projectId: "project-web-87",
  storageBucket: "project-web-87.firebasestorage.app",
  messagingSenderId: "388378912693",
  appId: "1:388378912693:web:df607661ec5554fbe3dbfc",
  measurementId: "G-1XE2YC456T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//inclui isso
const auth = getAuth(app) //Criando a instância da autenticação
export {auth, app} //Exportando para outros arquivos