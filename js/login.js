ready_login();

function ready_login()
{
  $("#cntCargando").hide();
  
  $("#btnEntrar").on("click", frmLogin_submit);
  $("#frmLogin").on("submit", frmLogin_submit);

  /**
   * Fragmento para controlar si la sesión está activa
  **/

  var Usuario = JSON.parse(localStorage.getItem('wsp_temis'));  

  var objDate = 16;
  if (Usuario == null)
  {
    sessionFlag = false;
  } else
  {
    var objUser = JSON.parse(localStorage.getItem('wsp_temis'));
    var cDate = new Date();
    var sessionFlag = true;
  
    var pDate = new Date(objUser.cDate);
  
    objDate = cDate - pDate;  
  }

  
  if (Math.round((objDate/1000)/60) < 60 && sessionFlag)
  {
    objUser.cDate = cDate;
    localStorage.setItem("wsp_temis", JSON.stringify(objUser));    
  } else
  {
    delete localStorage.wsp_temis;    
  }
}
/**
 * Evento que se llama cuando el usuario hace submit para Iniciar Sesión
**/
function frmLogin_submit(event)
{
  event.preventDefault();
  var cDate = new Date();

  $("#cntCargando").show();
  $.post("server/php/validarUsuario.php", 
    {
      pUsuario : $("#txtLogin_Usuario").val(),
      pClave : $("#txtLogin_Clave").val(),
      pFecha : cDate
    }, function (data)
    {
      $("#cntCargando").hide();
      if (data != 0)
      {
        localStorage.setItem("wsp_temis", JSON.stringify(data));  
        window.location.replace("home.html");
      } else
      {
        swal({
            title: "!",
            text: "Acceso Denegado!",
            type: "error"
        });
      }
    }, 'json').fail(function()
    {
      $("#cntCargando").hide();
      swal({
            title: "!",
            text: "No hay acceso al Servidor, por favor revisa tu conexión a red.!",
            type: "error"
        });
    });
}