import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//importando o arquivo do CSS do bootstrap
import Button from './components/button'
import Footer from './components/footer'
function App() {
  return (
    <>
   <Button label="Clique aqui!"/>
   <Footer/>
   </>
  )
}

export default App
//npm create vite@latest project-bootstrap
