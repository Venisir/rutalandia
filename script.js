/*
function enviar() {

    var usuario = document.getElementById("user").value;
    var contrasenya = document.getElementById("password").value;
    var recordarLogin = document.getElementById("recordarLogin").value;

    usuario = usuario.replace(/\s/g,'');
    contrasenya = contrasenya.replace(/\s/g,'');

    if(usuario==""){
        alert("No has introducido el usuario");
        return;
    }

    if(contrasenya==""){
        alert("No has introducido la contraseña");
        return;
    }
    document.getElementById("formularioLogin").submit();
}

function abrirDesplegable() {

    if(document.getElementById("formularioLogin").style.display == "block"){
        document.getElementById("formularioLogin").style.display = "none";
    }else{
        document.getElementById("formularioLogin").style.display = "block";
    }   
}

function cerrarDesplegable() {
    document.getElementById("formularioLogin").style.display = "none";
}

function salir() {
    document.getElementById("formularioLogin").submit();
}

function verPerfil() {
    document.getElementById("formularioLogin").submit();
}
*/
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
            alert("Estas logueado como " + sessionStorage.getItem("login") + " con clave " + sessionStorage.getItem("pass"));
        }else{
            alert("No estas logueado!");
        }
    }
}

function ponerCabecera(){
    if(window.localStorage){
        //alert("Va");
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...

            //document.getElementById("navWrapper1").innerHTML = '<li><a href="index.html"><i class="icon-home"></i>Inicio</a></li>';
            /*
            <li><a href="rutas.html"><i class="icon-bicycle"></i> Rutas</a></li>
            <li><a href="nueva_ruta.html"><i class="icon-list-add"></i>Nueva ruta</a></li>
            <li><a href="javascript:cerrarSesion();"><i class="icon-logout"></i>Logout</a></li>
            ';

            document.getElementById("navWrapper2").innerHTML = '
            <li><a href="index.html"><i class="icon-home"></i></a></li>
            <li><a href="rutas.html"><i class="icon-bicycle"></i></a></li>
            <li><a href="nueva_ruta.html"><i class="icon-list-add"></i></a></li>
            <li><a href="javascript:cerrarSesion();"><i class="icon-logout"></i></a></li>
            ';
*/
        }else{

            //document.getElementById("navWrapper1").innerHTML = '<li><a href="index.html"><i class="icon-home"></i>Inicio</a></li><li><a href="rutas.html"><i class="icon-bicycle"></i> Rutas</a></li>';
            /*
            <li><a href="registro.html"><i class="icon-plug"></i>Registro</a></li>
            <li><a href="login.html"><i class="icon-login"></i>Login</a></li>
            ';

            document.getElementById("navWrapper2").innerHTML = '
            <li><a href="index.html"><i class="icon-home"></i></a></li>
            <li><a href="rutas.html"><i class="icon-bicycle"></i></a></li>
            <li><a href="registro.html"><i class="icon-plug"></i></a></li>
            <li><a href="login.html"><i class="icon-login"></i></a></li>
            ';
*/
        }
    }
}

function cerrarSesion(){ // Se comprueba si hay soporte para Web Storage
    if(window.localStorage){
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage ...
            alert("Cerrando sesión...");
            sessionStorage.removeItem("login");
            sessionStorage.removeItem("pass");
        }else{
            alert("¡No puedes cerrar sesión!");
        }
    }
}

/*
function aviso() {

    var r = confirm("¡ATENCIÓN!\nSe perderán todos los datos no guardados. ¿Salir?");
    if (r == true) {
        return true;
    } else {
        return false;
    }
}

function avisoBorrado() {

    var r = confirm("¡ATENCIÓN!\nTu cuenta será eliminada PERMANENTEMENTE. \n\n¿Estás seguro?");
    if (r == true) {
        return true;
    } else {
        return false;
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
*/