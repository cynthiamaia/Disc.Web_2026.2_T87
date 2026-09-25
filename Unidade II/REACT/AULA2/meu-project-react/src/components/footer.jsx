function Footer() { //indica a seção de rodapé da página 
   return (
     <footer className="rodape">
       <p> &copy; {new Date().getFullYear()}Todos os direitos reservados</p>
     </footer>
     
   );
 }

  export default Footer;
//&copy -> representa o simbolo de copyright
//new date - criar a data atual
//.getFullYear() - pega apenas o ano da data