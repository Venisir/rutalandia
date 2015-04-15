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
function cargaRuta(ruta) {
    
    var xmlhttp=new XMLHttpRequest();
    
    var string="rest/ruta/"+ruta.toString();

    xmlhttp.open("GET",string,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
    {
    if(xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //var res = xmlhttp.getResponseHeader('resultado');

            var res = xmlhttp.responseText.split('"');
            alert(res);
        }
    }
    return false;
}