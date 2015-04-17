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

    xmlhttp.open("POST","rest/registro/",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("usu="+nombreUsuario+"&pwd1="+password1+"&nombre="+nombre+"&email="+email);

    xmlhttp.onreadystatechange=function()
    {
    if(xmlhttp.readyState==4)
        {   
            var res = window.JSON.parse(xmlhttp.responseText);

            if(res.resultado.localeCompare("ok")==0){
                //alert("Te has registrado");

                /*
                document.getElementById("contenedor").style.zIndex = "999999";
                document.getElementById("contenedor").style.visibility = "visible";
                document.body.style.overflow = "hidden";
                */
                alert("Te has registrado");

                location.href="/rutalandia/login.html";
            }else{
                alert("Error. No se ha podido completar el registro.");
            }   
        }
    }
    return false;
}

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
                alert("Te has logueado. Bienvenido, "+res.login);

                if(window.localStorage){ // Se comprueba si hay soporte para Web Storage
                
                    //var frm = document.querySelectorAll("form")[0];
                    //if(frm.recordarLogin.checked){ // Si se ha marcado guardar datos ...
                        sessionStorage.setItem("login", res.login);
                        //sessionStorage["pass"] = res.clave; // modo alternativo
                        sessionStorage.setItem("pass", res.clave);
                    //}
                }

                location.href="/rutalandia/index.html";
            }else{
                alert("Error. No se ha podido completar el logueo.");
            }   
        }
    }
    return false;
}

/*
function comprobar(){
    if(window.localStorage){ // Se comprueba si hay soporte para Web Storage
    var frm = document.querySelectorAll("form")[0];
        if(frm.ckbGuardar.checked){ // Si se ha marcado guardar datos ...
            localStorage.setItem("login", frm.login.value);
            localStorage["pass"] = frm.pass.value; // modo alternativo
        }
    }
}
*/


/*
function rellenar(){ // Se comprueba si hay soporte para Web Storage
    if(window.localStorage){
        var frm = document.querySelectorAll("form")[0];
        if(localStorage.getItem("login")){ // Si hay datos en loginStorage ...
            frm.login.value = localStorage.getItem("login");
            frm.pass.value = localStorage.pass; // modo alternativo
        }
    }
}
*/

function comprobarSesion(){
    if(window.localStorage){
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...
            alert("Estas logueado como " + sessionStorage.getItem("login") + " con clave de sesión " + sessionStorage.getItem("pass"));
        }else{
            alert("No estas logueado!");
        }
    }
}

function cerrarSesion(){ // Se comprueba si hay soporte para Web Storage
    if(window.localStorage){
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...
            alert("Cerrando sesión...");
            sessionStorage.removeItem("login");
            sessionStorage.removeItem("pass");
            location.href="/rutalandia/index.html";
        }else{
            alert("¡No puedes cerrar sesión!");
        }
    }
}

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

function enviarCambioDatos() {
    
    var nombreUsuario = document.getElementById("nombreUsuario").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var email = document.getElementById("email").value; 

    var fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value);
    var diaNacimiento = parseInt(fechaNacimiento.getDate());
    var mesNacimiento = parseInt(fechaNacimiento.getMonth());
    var anyoNacimiento = parseInt(fechaNacimiento.getFullYear());

    var fechaHoy = new Date();
    var diaHoy = parseInt(fechaHoy.getDate());
    var mesHoy = parseInt(fechaHoy.getMonth());
    var anyoHoy = parseInt(fechaHoy.getFullYear());

    document.getElementById("nombreUsuario").style.background = 'white';
    document.getElementById("password1").style.background = 'white';
    document.getElementById("password2").style.background = 'white';
    document.getElementById("email").style.background = 'white';
    document.getElementById("fechaNacimiento").style.background = 'white';

    if(esEspacios(nombreUsuario)){
        document.getElementById("nombreUsuario").style.background = 'Crimson';
        alert("No has introducido el usuario");
        return;
    }

    if(!esLetrasyNumeros(nombreUsuario)){
        document.getElementById("nombreUsuario").style.background = 'Crimson';
        alert("Nombre de usuario incorrecto. Sólo se permiten letras y números");
        return;
    }

    if(!esLongitud(nombreUsuario, 3, 15)){
        document.getElementById("nombreUsuario").style.background = 'Crimson';
        alert("Nombre de usuario incorrecto. Tiene que tener entre 3 y 15 carácteres");
        return;
    }

    if(esEspacios(password1)){
        document.getElementById("password1").style.background = 'Crimson';
        alert("No has introducido la contraseña");
        return;
    }

    if(!esLetrasyNumerosSub(password1)){
        document.getElementById("password1").style.background = 'Crimson';
        alert("Contraseña incorrecta. Sólo se permiten letras, números y subrayado");
        return;
    }

    if(!esLongitud(password1, 6, 15)){
        document.getElementById("password1").style.background = 'Crimson';
        alert("Contraseña incorrecta. Tiene que tener entre 6 y 15 carácteres");
        return;
    }

    if(!contieneMayMinNum(password1)){
        document.getElementById("password1").style.background = 'Crimson';
        alert("Contraseña incorrecta. Tiene que contener al menos una letra mayúscula, una minúscula y un número");
        return;
    }

    if(esEspacios(password2)){
        document.getElementById("password2").style.background = 'Crimson';
        alert("No has introducido la confirmación de contraseña");
        return;
    }

    if(!(password1==password2)){
        document.getElementById("password2").style.background = 'Crimson';
        alert("Las contraseñas no coinciden");
        return;
    }

    if(esEspacios(email)){
        document.getElementById("email").style.background = 'Crimson';
        alert("No has introducido el correo");
        return;
    }

    if(!esEmail(email)){
        document.getElementById("email").style.background = 'Crimson';
        alert("La dirección de correo no es válida");
        return;
    }

    if(fechaNacimiento=="Invalid Date"){
        document.getElementById("fechaNacimiento").style.background = 'Crimson';
        alert("No has introducido la fecha");
        return;
    }

    if(fechaNacimiento > fechaHoy){
        document.getElementById("fechaNacimiento").style.background = 'Crimson';
        alert("Fecha inválida");
        return;
    }
    document.getElementById("formularioDatos").submit();
}


// Funciones para nueva ruta
function muestrafoto(event) {
    var selectedFile = event.target.files[0];
    if(selectedFile.size>500*1024){
        borrarFoto(event);
        var newDiv=masfoto();
        p=newDiv.childNodes[1];
        p.textContent="Error: Tamaño máximo de foto: 500KB";
        //alert("Error: Tamaño máximo de foto: 500KB")
    }
    else{
        var reader = new FileReader();
        var inputs = document.getElementsByName("imagen");
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
    var toDelete=document.getElementById(event.target.parentNode.id);
    document.getElementById("listafotos").removeChild(toDelete);
    var arrayLength = document.getElementById("listafotos").childNodes.length;
    for(var i = 0; i < arrayLength; i++){
        var element = document.getElementById("listafotos").childNodes[i];
        element.id=i-1;
    }
}

function masfoto() {
    var newdiv = document.createElement("DIV");
    newdiv.setAttribute("name", "fotoUp");
    var fotoN = document.getElementsByName("fotoUp").length;
    newdiv.setAttribute("id", fotoN)
    var newimg = document.createElement("IMG");
    newimg.setAttribute("id", "mifoto");
    //newimg.setAttribute("src", "img/foto1.jpg");
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
    ta.setAttribute("id", "midescrip");
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
    imginput.setAttribute("name", "imagen");
    imginput.setAttribute("id", "imagen");
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
            fotoActual=document.getElementById("fotoruta");
            document.getElementById("fotolink").href="img/"+res[0].ARCHIVO;
            fotoActual.src="img/"+res[0].ARCHIVO;
            fotoActual.alt=res[0].DESCRIPCION;
        }
    return false;
    }
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

    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4)
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
            h3.textContent="Últimos Comentarios";
            

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