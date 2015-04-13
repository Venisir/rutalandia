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
    if(xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //var res = xmlhttp.getResponseHeader('resultado');

            var res = xmlhttp.responseText.split('"');
            if(res[3]=="ok"){
                alert("Te has registrado");
                location.href="/rutalandia/login.html";
            }else{
                alert("ERROR: " + res[7]);
            }   
        }
    }
    return false;
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