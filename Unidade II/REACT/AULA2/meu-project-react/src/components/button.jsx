function Button({ label, onClick, classname, id}){ //criar um componente funcional chamado de Button
    //Props (de properties = propriedades) são dados que você passa para um componente.
    return (
        <button  className= {classname} onClick={onClick} id={id}>{label}</button>
    );
            
}
export default Button; 