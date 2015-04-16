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

