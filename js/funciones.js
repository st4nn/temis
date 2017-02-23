var Usuario = null;
var Permisos = null;

$(document).ready(function() {
  functiones();
});
function functiones()
{
  Usuario = JSON.parse(localStorage.getItem('wsp_temis'));

  if (Usuario == null || Usuario === undefined)
  {
    cerrarSesion();
  } else
  {
    funcion_Inicio();
    $(document).delegate('.lnkCerrarSesion', 'click', function(event) 
    {
      event.preventDefault();
      cerrarSesion();
    });
  }
}

$.fn.generarDatosEnvio = function(restricciones, callback)
{
  if (callback === undefined)
    {callback = function(){};}

    var obj = $(this).find(".guardar");
  var datos = {};

  $.each(obj, function(index, val) 
  {
    if ($(val).attr("id") != undefined)
    {
      if ($(val).attr("type") == 'checkbox')
      {
          datos[$(val).attr("id").replace(restricciones, "")] = $(val).is(':checked');
      } else
      {
        datos[$(val).attr("id").replace(restricciones, "")] = $(val).val();
      }
    }
  });
  datos = JSON.stringify(datos);  

  callback(datos);
}
function Mensaje(Titulo, Mensaje)
{
  if (Titulo == "Error")
  {
    alertify.error(Mensaje);
  } else if (Titulo == "Ok")
  {
    alertify.success(Mensaje);
  } else if (Titulo == "Hey")
  {
    alertify.success(Mensaje);
  } else
  {
    alertify.message(Mensaje);
  }
}

function obtenerFecha()
{
  var f = new Date();
    return f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 2);
}

function obtenerPrefijo()
{
  var f = new Date();
  return f.getFullYear() + CompletarConCero(f.getMonth() +1, 2) + CompletarConCero(f.getDate(), 2) + CompletarConCero(f.getHours(), 2) + CompletarConCero(f.getMinutes(), 2) + CompletarConCero(f.getSeconds(), 2) + CompletarConCero(Usuario.id, 3);
}
function CompletarConCero(n, length)
{
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}
function cerrarSesion()
{
  delete localStorage.wsp_temis;
  window.location.replace("index.html");
}

function obtenerMes(numeroDelMes)
{
  if (isNaN(numeroDelMes) || numeroDelMes == 0 || numeroDelMes == "" || numeroDelMes == undefined)
  {
    var f = new Date();
    numeroDelMes = f.getMonth() +1;
  }

  var meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return meses[numeroDelMes];
}