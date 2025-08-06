let numeroSecreto = 0; //le da un valor inicial que cambia con la función
let intentos = 0; //también cambia con la función condicionesIniciales
let arrayNumeroAleatorio = [];
let numeroMaximo = 10; //para cambiar el número máximo más fácilmente

function asignarTextoElemento(elemento, texto) { //crea una función con parámetros que pueden ser asignados y ejecutados más tarde
    let elementoHTML = document.querySelector(elemento); //esto crea una variable llamada elementoHTML y a través de document lo asocia a "elemento" que puede ser definido más adelante
    elementoHTML.innerHTML = texto; //con innerHTML dice que elementoHTML debe mostrar "texto" directamente a la página, "texto" también es asignado más tarde
    return;
}

function verificarIntento() { //usa la función traída de HTML (botón intentar) y la explica en las llaves
    let numeroUsuario = parseInt(document.getElementById("valorUsuario").value); //con getElementById en vez del tipo, en el paréntesis va la id del objeto a usar y value vuelve disponible el valor escrito

    if(numeroUsuario === numeroSecreto) {
        asignarTextoElemento("p", `Acertaste el número en ${intentos} ${(intentos == 1) ? "intento" : "intentos"}.`); //si el número es igual se muestra esto en pantalla && si intentos es igual a uno muestra "intento", caso contrario es plural
        document.getElementById("reiniciar").removeAttribute("disabled"); //cuando adivino se borra el atributo "disabled" y se activa la función del botón 
    } else { //se ejecuta si no adivina
        if(numeroUsuario < numeroSecreto) {
            asignarTextoElemento("p", "El número secreto es mayor.") //si no es igual y es menor que el número secreto se muestra esto
        } else {
            asignarTextoElemento("p", "El número secreto es menor.") //si no es igual y es mayor que el número secreto se muestra esto
        }
        intentos++;
        borrarNumero(); //borra el numero siempre que no se adivina
    }
    return;
}

function borrarNumero() {
    //let valorNumero = document.querySelector("#valorUsuario"); //para indicar que es una id hay que poner un # al principio
    //valorNumero.value = ""; //cada vez que se ejecuta esta función el "value" de la caja se borra
    document.querySelector("#valorUsuario").value = ""; //para reducir el código anterior, en vez de crear una variable y darle una función, usamos la función directamente
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1; //crea la función numeroGenerado que equivale a la cuenta matemática para el mismo
    //console.log(numeroGenerado);
    //console.log(arrayNumeroAleatorio);

    if(arrayNumeroAleatorio.length == numeroMaximo) {
        asignarTextoElemento("p", "¡Felicidades, adivinaste todos los números posibles!"); //cuando se generen todos los números posibles termina el juego y se ve este mensaje
    } else { //en caso de que queden números por sortear, el juego sigue
        if(arrayNumeroAleatorio.includes(numeroGenerado)) { //si en el array ya está el mismo valor que el número generado
        return generarNumeroSecreto(); //la línea de comando vuelve a entrar a la función en la que ya estamos, reiniciando su proceso hasta generar un número válido, esto es recursividad
        } else { //en caso contrario ya se puede devolver el número generado para seguir jugando y de paso se agrega el mismo al array para que no se repita
        arrayNumeroAleatorio.push(numeroGenerado);
        return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento("h1", "Juego del número secreto"); //poniendo los parámetros en el paréntesis se ejecuta la función creada más arriba
    asignarTextoElemento("p", `Elija un número del 1 al ${numeroMaximo}:`)
    numeroSecreto = generarNumeroSecreto(); //crea la variable numeroSecreto y le da la función de generarNumeroSecreto
    intentos = 1;
}

function reiniciarJuego() { //reinicia todo y genera un nuevo número
    borrarNumero();
    condicionesIniciales();
    document.querySelector("#reiniciar").setAttribute("disabled", true);
}

condicionesIniciales();