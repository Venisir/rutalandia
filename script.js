//Esta funcion pone diferentes menus de navegacion dependiendo de si el usuario esta logueado.
function ponerCabecera(){
    
    if(window.localStorage){
        //alert("Va");
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...

            document.getElementById("navWrapper1").innerHTML = '<li><a href="index.html"><i class="icon-home"></i>Inicio</a></li><li><a href="rutas.html"><i class="icon-bicycle"></i> Rutas</a></li><li><a href="nueva_ruta.html"><i class="icon-list-add"></i>Nueva ruta</a></li><li><a href="javascript:cerrarSesion();"><i class="icon-logout"></i>Logout</a></li>';

            document.getElementById("navWrapper2").innerHTML = '<li><a href="index.html"><i class="icon-home"></i></a></li><li><a href="rutas.html"><i class="icon-bicycle"></i></a></li><li><a href="nueva_ruta.html"><i class="icon-list-add"></i></a></li><li><a href="javascript:cerrarSesion();"><i class="icon-logout"></i></a></li>';

        }else{

            document.getElementById("navWrapper1").innerHTML = '<li><a href="index.html"><i class="icon-home"></i>Inicio</a></li><li><a href="rutas.html"><i class="icon-bicycle"></i> Rutas</a></li><li><a href="registro.html"><i class="icon-plug"></i>Registro</a></li><li><a href="login.html"><i class="icon-login"></i>Login</a></li>';

            document.getElementById("navWrapper2").innerHTML = '<li><a href="index.html"><i class="icon-home"></i></a></li><li><a href="rutas.html"><i class="icon-bicycle"></i></a></li><li><a href="registro.html"><i class="icon-plug"></i></a></li><li><a href="login.html"><i class="icon-login"></i></a></li>';

        }
    }
}

//Envia el registro al servidor.
function enviarRegistro() {
    
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    
    var nombreUsuario = document.getElementById("usu").value;
    var password1 = document.getElementById("pwd1").value;
    var password2 = document.getElementById("pwd2").value;
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value; 

    if (password1 == password2){

        xmlhttp.open("POST","rest/registro/",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("usu="+nombreUsuario+"&pwd1="+password1+"&nombre="+nombre+"&email="+email);

        xmlhttp.onreadystatechange=function()
        {
        if(xmlhttp.readyState==4)
            {   
                var res = window.JSON.parse(xmlhttp.responseText);

                if(res.resultado.localeCompare("ok")==0){

                    avisoRegistro("correcto");
                }else{
                    avisoRegistro("incorrecto");
                }   
            }
        }

    }else{
        alert("Las claves no coinciden.");
    }
    return false;
}

function avisoRegistro(valor) {

    var textoBoton;
    var textoP;

/*
    document.getElementById("contenedor").style.zIndex = "99999";
    document.getElementById("contenedor").style.visibility = "visible";
    document.getElementById("contenedor").style.position = "fixed";
*/
    var divAviso = document.createElement("DIV");
    divAviso.setAttribute("id", "divAviso");
    divAviso.setAttribute("style", "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 1; background-color: #7F7F7F; border-style: solid; z-index: 99999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;");


    if(valor.localeCompare("correcto")==0){
        textoBoton = "Ir a Login";
        textoP = "Registro completado.";
    }else{
        textoBoton = "Volver";
        textoP = "Error en el registro.";
    }

    var texto = document.createElement("P");
    texto.textContent = textoP;

    divAviso.appendChild(texto);

    var boton = document.createElement("INPUT");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", textoBoton);
    
    if(valor.localeCompare("correcto")==0){
        boton.setAttribute("onclick", "redireccionaLogin()");
    }else{
        boton.setAttribute("onclick", "cerrarVentana();");
    }

    divAviso.appendChild(boton);
    divAviso.style = "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 1; background-color: grey; border-style: solid; z-index: 999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;";
    document.body.appendChild(divAviso);

    fadeIn(document.getElementById("divAviso"));
}

function redireccionaIndex(){
    location.href="/rutalandia/index.html";
    //return false;
}

function redireccionaLogin(){
    location.href="/rutalandia/login.html";
    //return false;
}

function cerrarVentana(){
    document.getElementById("contenedor").style.visibility = "hidden";
    //document.getElementById("divAviso").style.visibility = "hidden";


    fadeOut(document.getElementById("divAviso"));

    //return false;
}

//Envia el logueo al servidor.
function enviarLogin() {
    
    var xmlhttp;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    
    var nombreUsuario = document.getElementById("usu").value;
    var password1 = document.getElementById("pwd").value;
    
    xmlhttp.open("POST","rest/login/",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("usu="+nombreUsuario+"&pwd="+password1);

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
        {
            var res = window.JSON.parse(xmlhttp.responseText);

            if(res.resultado.localeCompare("ok")==0){

                avisoLogin("correcto");

                if(window.localStorage){ // Se comprueba si hay soporte para Web Storage
                    sessionStorage.setItem("login", res.login);
                    sessionStorage.setItem("pass", res.clave);

                    if(document.getElementById("recordarLogin").checked){
                        localStorage.setItem("login", res.login);
                        localStorage.setItem("pass", res.clave);
                    }
                }
            }else{
                avisoLogin("incorrecto");
            }   
        }
    }
    return false;
}

//Comprueba que el login este disponible.
function comprobarDispLogin() {
    
    var xmlhttp;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    
    xmlhttp.open("GET","rest/login/{LOGIN}",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
        {
            var res = window.JSON.parse(xmlhttp.responseText);

            if(res.resultado.localeCompare("ok")==0){
                if(res.disponible.localeCompare("true")==0){
                    document.getElementById("loginDisp").innerHTML = "El login está disponible";
                }else{
                    document.getElementById("loginDisp").innerHTML = "Lo sentimos, el login no está disponible.";
                } 
            }else{
                alert("Ha fallado la petición AJAX.");
            }   
        }
    }
}

//Si se ha marcado la opcion "recordar", autorellena los campos.
function rellenar(){ // Se comprueba si hay soporte para Web Storage
    if(window.localStorage){
        var frm = document.getElementById("formLogin");
        if(localStorage.getItem("login")){
            frm.usu.value = localStorage.getItem("login");
            //frm.pwd.value = localStorage.getItem("pass");
        }
    }
}

function avisoLogin(valor) {

    var textoBoton;
    var textoP;
/*
    document.getElementById("contenedor").style.zIndex = "99999";
    document.getElementById("contenedor").style.visibility = "visible";
    document.getElementById("contenedor").style.position = "fixed";
*/
    var divAviso = document.createElement("DIV");
    divAviso.setAttribute("id", "divAviso");
    divAviso.setAttribute("style", "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 1; background-color: #7F7F7F; border-style: solid; z-index: 99999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;");


    if(valor.localeCompare("correcto")==0){
        textoBoton = "Ir a Inicio";
        textoP = "Login correcto!";
    }else{
        textoBoton = "Volver";
        textoP = "Datos incorrectos.";
    }

    var texto = document.createElement("P");
    texto.textContent = textoP;

    divAviso.appendChild(texto);

    var boton = document.createElement("INPUT");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", textoBoton);
    
    if(valor.localeCompare("correcto")==0){
        boton.setAttribute("onclick", "redireccionaIndex()");
    }else{
        boton.setAttribute("onclick", "cerrarVentana();");
    }

    divAviso.appendChild(boton);
    divAviso.style = "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 1; background-color: grey; border-style: solid; z-index: 999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;";
    document.body.appendChild(divAviso);

    fadeIn(document.getElementById("divAviso"));
}

//Commprueba la sesion (boton de index).
function comprobarSesion(){
    if(window.localStorage){

        //alert("Va");
        avisoRegistroCorrecto();

        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...
            alert("Estas logueado como " + sessionStorage.getItem("login") + " con clave de sesión " + sessionStorage.getItem("pass"));
        }else{
            alert("No estas logueado!");
        }
    }

}

//Cierra sesion.
function cerrarSesion(){

    var textoBoton;
    var textoP;
/*
    document.getElementById("contenedor").style.zIndex = "99999";
    document.getElementById("contenedor").style.visibility = "visible";
    document.getElementById("contenedor").style.position = "fixed";
*/
    var divAviso = document.createElement("DIV");
    divAviso.setAttribute("id", "divAviso");
    divAviso.setAttribute("style", "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 0; background-color: #7F7F7F; border-style: solid; z-index: 99999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px; transition: opacity .25s ease-in-out; -moz-transition: opacity .25s ease-in-out; -webkit-transition: opacity .25s ease-in-out; ");

    if(sessionStorage.getItem("login")){
        textoBoton = "Volver";
        textoP = "Sesión terminada.";

        sessionStorage.removeItem("login");
        sessionStorage.removeItem("pass");


    }else{
        textoBoton = "Volver";
        textoP = "No puedes cerrar sesión.";
    }

    var texto = document.createElement("P");
    texto.textContent = textoP;

    divAviso.appendChild(texto);

    var boton = document.createElement("INPUT");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", textoBoton);
    
    if(sessionStorage.getItem("login")){
        boton.setAttribute("onclick", "redireccionaIndex();");
    }else{
        boton.setAttribute("onclick", "recargarPag();");
    }

    divAviso.appendChild(boton);    
    divAviso.style = "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 0; background-color: #7F7F7F; border-style: solid; z-index: 99999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;";

    //document.getElementById("contenedor").appendChild(divAviso);
    //document.getElementById('padre').insertBefore(nuevo_parrafo,segundo_p);
    document.body.appendChild(divAviso);

    fadeIn(document.getElementById("divAviso"));
    //document.getElementById("divAviso").style.opacity = "0";
}

function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);


    document.getElementById(element).style.visibility = "hidden";
}

function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
        //alert("here");
    }, 10);
}

function recargarPag(){
    document.location.href = document.location.href;
}

//Redirecciona si estas logueado.
function redireccionaSiEstasLogueado(){
    
    if(window.localStorage){
        //alert("Va");
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...
            alert("Estas logueado. No puedes estar aquí.");
            location.href="/rutalandia/index.html";
        }else{

        }
    }
}

//Redirecciona si no estas logueado.
function redireccionaSiNoEstasLogueado(){
        
    if(window.localStorage){
        //alert("Va");
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...
            
        }else{
            alert("No estas logueado. No puedes estar aquí.");
            location.href="/rutalandia/login.html";
        }
    }
}

//Sistema de valoracion de estrellas en nueva_ruta.
function dificultad(n){

    document.getElementById("dificultadEscrita").innerHTML = n;

    var a = document.getElementById("dificultadEscrita").innerHTML;

    for(var i=1; i<=5; i++){
        document.getElementById(i+"e").style.color = "rgb(136, 136, 136)";
    }

    for(var i=1; i<=n; i++){
        document.getElementById(i+"e").style.color = "rgb(242, 232, 42)";
    }

    //alert(a);
}

//Envia una nueva ruta al servidor.
function enviarNuevaRuta() {
        
    var fd = new FormData(document.getElementById("formNuevaRuta"));
    var xhr = new XMLHttpRequest();

    var fecha = document.getElementById("fecha").value;
    var titulo = document.getElementById("titulo").value;
    var recorrido = document.getElementById("recorrido").value;
    var descripcion = document.getElementById("descripcion").value;
    var distancia = document.getElementById("distancia").value; 
    var dificultad = document.getElementById("dificultadEscrita").innerHTML;
    var distancia = document.getElementById("distancia").value;

    var piefoto = new Array(numFotos.innerHTML);

    for(var j=1; j<=numFotos.innerHTML; j++){
        piefoto[j-1] = document.getElementById("midescrip"+j).value;
    }

    var fotos = new Array(numFotos.innerHTML);

    for(var k=1; k<=numFotos.innerHTML; k++){
        fotos[k-1] = document.getElementById("imagen"+k).files[0];
    }
/*
    document.getElementById("contenedor").style.zIndex = "99999";
    document.getElementById("contenedor").style.visibility = "visible";
    document.getElementById("contenedor").style.position = "fixed";
*/
    fd.append('clave',sessionStorage.getItem("pass"));
    fd.append('login',sessionStorage.getItem("login"));
    fd.append('fecha', fecha);
    fd.append('nombre', titulo);
    fd.append('recorrido', recorrido);
    fd.append('descripcion', descripcion);
    fd.append('dificultad', dificultad);
    fd.append('distancia', distancia);
    fd.append('piefoto', piefoto);
    fd.append('fotos', fotos);

    xhr.onreadystatechange = function(){
        //if(xhr.readyState==3)
         //   alert(xhr.responseText);

        if(xhr.readyState==4)
        {
            var res = window.JSON.parse(xhr.responseText);

            if(res.resultado.localeCompare("ok")==0){
                avisoNuevaRuta("correcto");
            }else{
                avisoNuevaRuta("incorrecto");
            }   
        }
    };

    xhr.open('POST', 'rest/ruta/', true);
    xhr.send(fd);



    return false;   
}

function avisoNuevaRuta(valor) {

    var textoBoton;

    var divAviso = document.createElement("DIV");
    divAviso.setAttribute("id", "divAviso");
    divAviso.setAttribute("style", "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 1; background-color: #7F7F7F; border-style: solid; z-index: 99999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;");

    if(valor.localeCompare("correcto")==0){
        textoBoton = "Ir a Index";
        
        var texto1 = document.createElement("P");
        texto1.textContent = "Ruta añadida correctamente.";
        var texto2 = document.createElement("P");
        texto2.textContent = "Nombre de la ruta: " + document.getElementById("titulo").value;
        var texto3 = document.createElement("P");
        texto3.textContent = "Descripción: " + document.getElementById("descripcion").value;

        divAviso.appendChild(texto1);
        divAviso.appendChild(texto2);
        divAviso.appendChild(texto3);

    }else{
        textoBoton = "Volver";

        var texto11 = document.createElement("P");
        texto11.textContent = "Error creando la ruta.";
        var texto22 = document.createElement("P");
        texto22.textContent = "Vuelve a intentarlo.";

        divAviso.appendChild(texto11);
        divAviso.appendChild(texto22);
    }

    var boton = document.createElement("INPUT");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", textoBoton);
    
    if(valor.localeCompare("correcto")==0){
        boton.setAttribute("onclick", "redireccionaIndex()");
    }else{
        boton.setAttribute("onclick", "cerrarVentana();");
    }

    divAviso.appendChild(boton);
    divAviso.style = "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 1; background-color: grey; border-style: solid; z-index: 999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;";
    document.body.appendChild(divAviso);

    fadeIn(document.getElementById("divAviso"));
}

//Coloca o borra el formulario de comentarios si el usuario no esta logueado.
function comprobarFormularioComentarios(){
        
    if(window.localStorage){
        //alert("Va");
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...
            
        }else{

            document.getElementById("contenidoFormComentarios").innerHTML = "Necesitas estar logueado para comentar."

        }
    }
}

//Funciones para nueva ruta
function muestrafoto(event) {
    var selectedFile = event.target.files[0];
    if(selectedFile.size>500*1024){
        borrarFoto(event);
        var newDiv=masfoto();
        p=newDiv.childNodes[1];
        p.textContent="Error: Tamaño máximo de foto: 500KB";
        
        //alert("Error: Tamaño máximo de foto: 500KB");
        //location.href="/rutalandia/nueva_ruta.html";
    }
    else{
        var reader = new FileReader();
        var inputs = document.getElementsByName("imagen"+numFotos.innerHTML);
        var imagelist = document.images;
        var id=imagelist.length-1;
        var arrayLength = inputs.length;
        
        for (var i = 0; i < arrayLength; i++) {
            if (inputs[i]==event.target){
                id=i+1;
            }
        }
        //Aqui se elimina el mensaje de error
        var newDiv=document.getElementById(id-1);
        p=newDiv.childNodes[1];
        p.textContent="";
        var imgtag = imagelist[id];
        imgtag.title = selectedFile.name;

        reader.onload = function(event) {
          imgtag.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
    }
}

function borrarFoto(event) {

    document.getElementById("numFotos").innerHTML = parseInt(document.getElementById("numFotos").innerHTML) - 1;

    var toDelete=document.getElementById(event.target.parentNode.id);
    document.getElementById("listafotos").removeChild(toDelete);
    var arrayLength = document.getElementById("listafotos").childNodes.length;
    for(var i = 0; i < arrayLength; i++){
        var element = document.getElementById("listafotos").childNodes[i];
        element.id=i-1;
    }
}

function masfoto() {

    document.getElementById("numFotos").innerHTML = parseInt(document.getElementById("numFotos").innerHTML) + 1;

    var newdiv = document.createElement("DIV");
    newdiv.setAttribute("name", "fotoUp");
    var fotoN = document.getElementsByName("fotoUp").length;
    newdiv.setAttribute("id", fotoN)
    var newimg = document.createElement("IMG");
    newimg.setAttribute("id", "mifoto");
    newimg.setAttribute("style", "max-height: 400px; max-width: 95%; border:0");
    newdiv.appendChild(newimg);
    var p = document.createElement("P");
    p.setAttribute("id", "error");
    newdiv.appendChild(p);
    var borraboton = document.createElement("BUTTON");
    borraboton.textContent="Borrar Foto";
    borraboton.setAttribute("type", "button");
    borraboton.setAttribute("onclick", "borrarFoto(event)");
    newdiv.appendChild(borraboton);
    var br = document.createElement("BR");
    newdiv.appendChild(br);
    var ta = document.createElement("TEXTAREA");
    ta.setAttribute("id", "midescrip"+numFotos.innerHTML);
    ta.setAttribute("name", "piefoto[]");
    ta.setAttribute("placeholder", "Descripción de la foto");
    ta.setAttribute("title", "Describe la foto");
    newdiv.appendChild(ta);
    var br = document.createElement("BR");
    newdiv.appendChild(br);
    var br = document.createElement("BR");
    newdiv.appendChild(br);
    var elige = document.createTextNode("Elige una foto:");
    newdiv.appendChild(elige);
    var imginput = document.createElement("INPUT");
    imginput.setAttribute("type", "file");
    imginput.setAttribute("name", "fotos[]");
    imginput.setAttribute("id", "imagen"+numFotos.innerHTML);
    imginput.setAttribute("onchange", "muestrafoto(event)")
    newdiv.appendChild(imginput);
    var br = document.createElement("BR");
    newdiv.appendChild(br);
    var br = document.createElement("BR");
    newdiv.appendChild(br);
    document.getElementById("listafotos").appendChild(newdiv);
    return newdiv;
}

//Funciones para ruta
function cargaRuta() {

    if(window.localStorage){

        if(sessionStorage.getItem("rutaID")){ // Si hay datos en loginStorage ...
            var ruta=sessionStorage.getItem("rutaID");
            //sessionStorage.removeItem("rutaID");
        }else{
            //alert("No se ha especificado una ruta.");
            location.href="/rutalandia/index.html";
        }
    }
    
    var xmlhttp=new XMLHttpRequest();
    
    var string="rest/ruta/"+ruta.toString();

    xmlhttp.open("GET",string,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
        {
            var res = window.JSON.parse(xmlhttp.responseText);
            document.getElementById("nombre").textContent=res[0].NOMBRE;
            document.getElementById("fecha").textContent=res[0].FECHA;
            var dist="Distancia Recorrida: "+res[0].DISTANCIA+" km";
            document.getElementById("distancia").textContent=dist;
            var dif="Dificultad: ";
            for(var i=0; i<res[0].DIFICULTAD; i++){
                dif=dif+" ★"
            }
            document.getElementById("dificultad").textContent=dif;
            document.getElementById("recorrido").textContent=res[0].RECORRIDO;
            document.getElementById("descripcion").textContent=res[0].DESCRIPCION;
            cargaImagenesRuta(ruta);
            cargaComentariosRuta(ruta);
        }
    return false;
    }
}

function cargaImagenesRuta(ruta){
var xmlhttp=new XMLHttpRequest();
    
    var string="rest/foto/?idr="+ruta.toString();

    xmlhttp.open("GET",string,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
        {
            var res = window.JSON.parse(xmlhttp.responseText);

            var arrayImagenes= new Array();

            for(var i=0; i<res.length; i++){
            arrayImagenes[i] = new Image();
            arrayImagenes[i].src="fotos/"+res[i].ARCHIVO;
            arrayImagenes[i].alt=res[i].DESCRIPCION;
            document.getElementById("fotoruta").appendChild(arrayImagenes[i]);
            }
            setTimeout("cambiaImagen()", 1);
            setInterval("cambiaImagen()", 7000);
        }
    return false;
    }
}

var iterador=0;

function cambiaImagen(){
    var fotoRuta=document.getElementById("fotoruta");

    //document.getElementById("fotolink").href=fotoruta.childNodes[iterador].src;
    fotoRuta.src=fotoRuta.childNodes[iterador].src;
    fotoRuta.alt=fotoRuta.childNodes[iterador].alt;

    if(iterador<fotoRuta.childNodes.length-1){
        iterador++;
    }
    else {
        iterador=0;
    }
}

function skipLeft(){
    iterador=iterador-2;
    if(iterador<0){
        iterador=(document.getElementById("fotoruta").childNodes.length)+iterador;
    }
    cambiaImagen();
}

function skipRight(){
    cambiaImagen();
}

function cargaComentariosRuta(ruta){
var xmlhttp=new XMLHttpRequest();
    
    var string="rest/comentario/?idr="+ruta.toString();

    xmlhttp.open("GET",string,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
        {
            var res = window.JSON.parse(xmlhttp.responseText);
            comentarios = document.getElementById("comentarios");
            for(var i=0; i<res.length; i++){
                var newdiv = document.createElement("DIV");
                newdiv.setAttribute("class", "bloqueSinPuntos");
                var h4=document.createElement("H4");
                var titulo=document.createElement("A");
                titulo.setAttribute("href", "javascript:enlaceRuta("+res[i].ID_RUTA+")");
                titulo.textContent=res[i].TITULO;
                h4.appendChild(titulo);
                newdiv.appendChild(h4);

                var detalles = document.createTextNode("Publicado por "+res[i].LOGIN+" el día "+ res[i].FECHA);
                newdiv.appendChild(detalles);

                var p = document.createElement("P");
                p.textContent=res[i].TEXTO;
                newdiv.appendChild(p);


                comentarios.appendChild(newdiv);
                var br = document.createElement("BR");
                comentarios.appendChild(br);
            }

        }
    return false;
    }
}

function enlaceRuta(id){
    sessionStorage.setItem("rutaID", id);
    location.href="/rutalandia/ruta.html";
}

function cargaUltimasRutas(){
var xmlhttp=new XMLHttpRequest();
    
    var string="rest/ruta/?u=6";

    xmlhttp.open("GET",string,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

    xmlhttp.onload=function()
    {
        if(xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var res = window.JSON.parse(xmlhttp.responseText);
            ultimasRutas = document.getElementById("ultimasRutas");

            while( ultimasRutas.hasChildNodes() ){
                ultimasRutas.removeChild(ultimasRutas.lastChild);
            }

            var h3=document.createElement("H3");
            h3.textContent="Últimas Rutas";
            
            var reload=document.createElement("A");
            reload.setAttribute("href", "javascript:cargaUltimasRutas()");
            reload.textContent="↻";
            reload.setAttribute("style","font-size:30px; text-decoration: none; float: right; vertical-align: top;");
            h3.appendChild(reload);

            ultimasRutas.appendChild(h3);

            for(var i=0; i<res.length; i++){
                var article = document.createElement("ARTICLE");

                var h4=document.createElement("H4");
                var titulo=document.createElement("A");
                titulo.setAttribute("href", "javascript:enlaceRuta("+res[i].ID+")");
                titulo.textContent=res[i].NOMBRE;
                h4.appendChild(titulo);
                article.appendChild(h4);

                var figure =  document.createElement("FIGURE");
                var imagen = document.createElement("IMG");
                imagen.setAttribute("class", "flip1");
                imagen.setAttribute("src", "fotos/"+res[i].ARCHIVO);
                imagen.setAttribute("alt", "Imagen de "+res[i].NOMBRE);
                figure.appendChild(imagen);
                var figcaption = document.createElement("FIGCAPTION");
                figcaption.setAttribute("class", "flip");
                figcaption.innerHTML=res[i].DISTANCIA+" km <br/>"

                for(var j=0; j<res[i].DIFICULTAD; j++){
                    figcaption.innerHTML=figcaption.innerHTML+"★ ";
                }
                figcaption.innerHTML= figcaption.innerHTML+"<br/>"+res[i].NFOTOS+" Fotos <br/>"+res[i].NCOMENTARIOS+" Comentarios"
                figure.appendChild(figcaption);
                article.appendChild(figure);

            

                var recorrido = document.createElement("P");
                recorrido.textContent=res[i].RECORRIDO;
                article.appendChild(recorrido);

                var descripcion = document.createElement("P");
                descripcion.textContent=res[i].DESCRIPCION;
                article.appendChild(descripcion);


                ultimasRutas.appendChild(article);
                var br = document.createElement("BR");
                ultimasRutas.appendChild(br);
            }

        }
    return false;
    }
}


function cargaUltimosComentarios(){

    var xmlhttp=new XMLHttpRequest();
    
    var string="rest/comentario/?u=10";

    xmlhttp.open("GET",string,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
        {
            var res = window.JSON.parse(xmlhttp.responseText);
            comentarios = document.getElementById("comentarios");

            while( comentarios.hasChildNodes() ){
                comentarios.removeChild(comentarios.lastChild);
            }

            

            var h3=document.createElement("H3");
            h3.textContent="Comentarios";
            

            var reload=document.createElement("A");
            reload.setAttribute("href", "javascript:cargaUltimosComentarios()");
            reload.textContent="↻";
            reload.setAttribute("style","font-size:30px; text-decoration: none; float: right; vertical-align: top;");
            h3.appendChild(reload);

            comentarios.appendChild(h3);

            for(var i=0; i<res.length; i++){
                
                var newdiv = document.createElement("DIV");
                newdiv.setAttribute("class", "bloque");
                var h4=document.createElement("H4");
                var titulo=document.createElement("A");
                titulo.setAttribute("href", "javascript:enlaceRuta("+res[i].ID_RUTA+")");
                titulo.textContent=res[i].TITULO;
                h4.appendChild(titulo);
                newdiv.appendChild(h4);

                var detalles = document.createTextNode("Publicado por "+res[i].LOGIN+" el día "+ res[i].FECHA);
                newdiv.appendChild(detalles);

                var p = document.createElement("P");
                p.textContent=res[i].TEXTO;
                newdiv.appendChild(p);


                comentarios.appendChild(newdiv);
                var br = document.createElement("BR");
                comentarios.appendChild(br);
            }

        }
    return false;
    }
}

function enviarComentario(){

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }

    var clave = sessionStorage.getItem("pass");
    var login = sessionStorage.getItem("login");    
    var titulo = document.getElementById("titulo").value;
    var texto = document.getElementById("texto").value;
    var idruta = sessionStorage.getItem("rutaID");
/*
    document.getElementById("contenedor").style.zIndex = "99999";
    document.getElementById("contenedor").style.visibility = "visible";
    document.getElementById("contenedor").style.position = "fixed";
*/
    xmlhttp.open("POST","rest/comentario/",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("clave="+clave+"&login="+login+"&titulo="+titulo+"&texto="+texto+"&idruta="+idruta);

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
        {   
            var res = window.JSON.parse(xmlhttp.responseText);

            if(res.resultado.localeCompare("ok")==0){

                avisoComentario("correcto");;

                document.getElementById("titulo").value = "";
                document.getElementById("texto").value = "";

            }else{
                avisoComentario("incorrecto");
            }   
        }
    }
    return false;
}

function avisoComentario(valor) {

    var textoBoton;
    var textoP;

    var divAviso = document.createElement("DIV");
    divAviso.setAttribute("id", "divAviso");
    divAviso.setAttribute("style", "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 0; background-color: #7F7F7F; border-style: solid; z-index: 99999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;");

    if(valor.localeCompare("correcto")==0){
        textoBoton = "Cerrar";
        textoP = "Comentario añadido correctamente.";
    }else{
        textoBoton = "Volver";
        textoP = "Error añadiendo el comentario.";
    }

    var texto = document.createElement("P");
    texto.textContent = textoP;

    divAviso.appendChild(texto);

    var boton = document.createElement("INPUT");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", textoBoton);
    
    if(valor.localeCompare("correcto")==0){
        boton.setAttribute("onclick", "cerrarVentana();");
    }else{
        boton.setAttribute("onclick", "cerrarVentana();");
    }

    divAviso.appendChild(boton);
    //divAviso.style = "position: fixed; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; opacity: 1; background-color: grey; border-style: solid; z-index: 999999; padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px;";
    document.body.appendChild(divAviso);

    fadeIn(document.getElementById("divAviso"));
}

function agrandarSlideshow(){
    if(document.getElementById("closebutton")==undefined){
    var slideshow = document.getElementById("slideshow");
    slideshow.setAttribute("style", "position:absolute; left:10%; top:15%; min-width:80%;");
    var closebutton = document.createElement("BUTTON");
    closebutton.setAttribute("id", "closebutton");
    closebutton.setAttribute("onclick", "cerrarSlideshow()");
    closebutton.setAttribute("style", "position:absolute; right:10%; top:0px; font-weight: bold; font-size:30px");
    closebutton.textContent="x";
    slideshow.appendChild(closebutton);
    overlayOn();
    }
}

function cerrarSlideshow(){
    var slideshow = document.getElementById("slideshow");
    slideshow.setAttribute("style", "");
    slideshow.removeChild(document.getElementById("closebutton"));
    overlayOff();
}

function overlayOff()
{
    document.getElementById("darkLayer").style.display = "none";
}
function overlayOn()
{
    document.getElementById("darkLayer").style.display = "";
}

//Buscador

function ruta(ID, FECHA, NOMBRE, RECORRIDO, DESCRIPCION, LOGIN, DIFICULTAD, DISTANCIA, ARCHIVO, NFOTOS, NCOMENTARIOS) {
    this.id = ID;  
    this.fecha = FECHA;
    this.nombre = NOMBRE;
    this.recorrido = RECORRIDO;
    this.descripcion = DESCRIPCION;
    this.login = LOGIN;
    this.dificultad = DIFICULTAD;
    this.distancia = DISTANCIA;
    this.archivo = ARCHIVO;
    this.nfotos = NFOTOS;
    this.ncomentarios = NCOMENTARIOS;

    this.getId = function () {
        return this.id;
    }

    this.getFecha = function () {
        return this.fecha;
    }

    this.getNombre = function () {
        return this.nombre;
    }

    this.getRecorrido = function () {
        return this.recorrido;
    }

    this.getDescripcion = function () {
        return this.descripcion;
    }

    this.getLogin = function () {
        return this.login;
    }

    this.getDificultad = function () {
        return this.dificultad;
    }

    this.getDistancia = function () {
        return this.distancia;
    }

    this.getArchivo = function () {
        return this.archivo;
    }

    this.getNfotos = function () {
        return this.nfotos;
    }
    this.getNcomentarios = function () {
        return this.ncomentarios;
    }
}


function buscaRutas(){

    var xmlhttp=new XMLHttpRequest();

    var titulo=document.getElementById("titulo").value;
    var recorrido=document.getElementById("recorrido").value;
    var descripcion=document.getElementById("descripcion").value;
    var fi=document.getElementById("fechaDesde").value;
    var ff=document.getElementById("fechaHasta").value;
    var di=document.getElementById("distancia").value;
    var df=document.getElementById("distanciaHasta").value;
    var dfi=document.getElementById("dfi").value;
    var dff=document.getElementById("dff").value;


    
    var string="rest/ruta/?";
    if(titulo){
        string+=("&t="+titulo);
    }
    if(recorrido){
        string+=("&r="+recorrido);
    }
    if(descripcion){
        string+=("&d="+descripcion);
    }
    if(fi && ff){
        string+=("&fi="+fi+"&ff="+ff);
    }
    if(di && df){
        string+=("&di="+di+"&df="+df);
    }
    if(dfi && dff){
        string+=("&dfi="+dfi+"&dff="+dff);
    }

    xmlhttp.open("GET",string,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
        {
            var res = window.JSON.parse(xmlhttp.responseText);
            arrayRutas = new Array();

            for(var i=0; i<res.length; i++){
                arrayRutas[i]=new ruta(res[i].ID, res[i].FECHA, res[i].NOMBRE, res[i].RECORRIDO, res[i].DESCRIPCION, res[i].LOGIN, res[i].DIFICULTAD, res[i].DISTANCIA, res[i].ARCHIVO, res[i].NFOTOS, res[i].NCOMENTARIOS);
            }

            muestraResultadoBusqueda();
        }
    return false;
    }
}


function muestraResultadoBusqueda(){

    ultimasRutas = document.getElementById("ultimasRutasBusqueda");

    while( ultimasRutas.hasChildNodes() ){
        ultimasRutas.removeChild(ultimasRutas.lastChild);
    }

    var h3=document.createElement("H3");
    h3.textContent="Resultados";
    var ordenarPor = document.createElement("SELECT");
    ordenarPor.setAttribute("id", "orden");
    ordenarPor.setAttribute("style", "float:right");
    ordenarPor.setAttribute("onchange", "ordenarResultados()");

    var opcion = document.createElement("option");
    opcion.text = "Ordenar por...";
    ordenarPor.add(opcion);

    var opcion = document.createElement("option");
    opcion.text = "Título Ascendente";
    ordenarPor.add(opcion);

    var opcion = document.createElement("option");
    opcion.text = "Título Descendente";
    ordenarPor.add(opcion);

    var opcion = document.createElement("option");
    opcion.text = "Fecha Ascendente";
    ordenarPor.add(opcion);

    var opcion = document.createElement("option");
    opcion.text = "Fecha Descendente";
    ordenarPor.add(opcion);

    var opcion = document.createElement("option");
    opcion.text = "Dificultad Ascendente";
    ordenarPor.add(opcion);

    var opcion = document.createElement("option");
    opcion.text = "Dificultad Descendente";
    ordenarPor.add(opcion);

    var opcion = document.createElement("option");
    opcion.text = "Distancia Ascendente";
    ordenarPor.add(opcion);

    var opcion = document.createElement("option");
    opcion.text = "Distancia Descendente";
    ordenarPor.add(opcion);

    h3.appendChild(ordenarPor);
    ultimasRutas.appendChild(h3);

    if(arrayRutas.length==0){
        var mensaje = document.createElement("P");
        mensaje.textContent="No se han encontrado rutas con estos parámetros.";
        h3.removeChild(h3.lastChild);
        ultimasRutas.appendChild(mensaje);
    }
    else{
        for(var i=0; i<arrayRutas.length; i++){

            var article = document.createElement("ARTICLE");
            var h4=document.createElement("H4");
            var titulo=document.createElement("A");
            titulo.setAttribute("href", "javascript:enlaceRuta("+arrayRutas[i].getId()+")");
            titulo.textContent=arrayRutas[i].getNombre();
            h4.appendChild(titulo);
            article.appendChild(h4);

            var figure =  document.createElement("FIGURE");
            var imagen = document.createElement("IMG");
            imagen.setAttribute("class", "flip1");
            imagen.setAttribute("src", "fotos/"+arrayRutas[i].getArchivo());
            imagen.setAttribute("alt", "Imagen de "+arrayRutas[i].getNombre());
            figure.appendChild(imagen);
            var figcaption = document.createElement("FIGCAPTION");
            figcaption.setAttribute("class", "flip");
            figcaption.innerHTML=arrayRutas[i].getDistancia()+" km <br/>"
            for(var j=0; j<arrayRutas[i].getDificultad(); j++){
                figcaption.innerHTML=figcaption.innerHTML+"★ ";
            }
            figcaption.innerHTML= figcaption.innerHTML+"<br/>"+arrayRutas[i].getNfotos()+" Fotos <br/>"+arrayRutas[i].getNcomentarios()+" Comentarios"
            figure.appendChild(figcaption);
            article.appendChild(figure);
        
            var recorrido = document.createElement("P");
            recorrido.textContent=arrayRutas[i].getRecorrido();
            article.appendChild(recorrido);
            var descripcion = document.createElement("P");
            descripcion.textContent=arrayRutas[i].getDescripcion();
            article.appendChild(descripcion);
            ultimasRutas.appendChild(article);
            var br = document.createElement("BR");
            ultimasRutas.appendChild(br);
        }
    }
}

function ordenarResultados(){

var ordenar_por = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}


    switch(document.getElementById("orden").selectedIndex) {
    case 1:
        arrayRutas.sort(ordenar_por('nombre', false, function(a){return a.toUpperCase()}));
        muestraResultadoBusqueda();
        break;
    case 2:
        arrayRutas.sort(ordenar_por('nombre', true, function(a){return a.toUpperCase()}));
        muestraResultadoBusqueda();
        break;
    case 3:
        arrayRutas.sort(ordenar_por('fecha', false, String));
        muestraResultadoBusqueda();
        break;
    case 4:
        arrayRutas.sort(ordenar_por('fecha', true, String));
        muestraResultadoBusqueda();
        break;
    case 5:
        arrayRutas.sort(ordenar_por('dificultad', false, parseInt));
        muestraResultadoBusqueda();
        break;
    case 6:
        arrayRutas.sort(ordenar_por('dificultad', true, parseInt));
        muestraResultadoBusqueda();
        break;
    case 7:
        arrayRutas.sort(ordenar_por('distancia', false, parseFloat));
        muestraResultadoBusqueda();
        break;
    case 8:
        arrayRutas.sort(ordenar_por('distancia', true, parseFloat));
        muestraResultadoBusqueda();
        break;
    }

}
