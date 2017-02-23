function funcion_Inicio()
{
	 $("#txtFormato2_Nombre").on("change keyup paste", function()
    {
        $("#lblFormato2_Nombre").text($(this).val())
        if ($(this).val() == "")
        {
            $(this).css("width", "175px");
        } else
        {
            $(this).css("width", $(this).val().length * 9  + "px");
        }
    });
    $("#txtFormato2_Cedula").on("change keyup paste", function()
    {
        $("#lblFormato2_Cedula").text($(this).val());
        if ($(this).val() == "")
        {
            $(this).css("width", "265px");
        } else
        {
            $(this).css("width", $(this).val().length * 12  + "px");
        }
    });
    $("#txtFormato2_Ciudad").on("change keyup paste", function()
    {
        if ($(this).val() == "")
        {
            $(this).css("width", "340px");
        } else
        {
            $(this).css("width", $(this).val().length * 9  + "px");
        }
    });

    var f = new Date();
    $(".lblElAnio").text(f.getFullYear());
    $(".lblElMes").text(obtenerMes());
    $(".lblElDia").text(CompletarConCero(f.getDate(), 2));

    $("#frmFormato2").on("submit", function(evento)
	{
		evento.preventDefault();
		if (!$("#txtFormato2_Check").is(":checked"))
		{
			swal({
	            title: "Hey!",
	            text: "Es importante aceptar los términos y condiciones del Formato!",
	            type: "error"
	        });
		} else
		{
			var objs = $("#frmFormato2 [required]");
			var validacion = true;
			$.each(objs, function(index, val) 
			{
				 if ($(val).val() == "" || $(val).val() == 0)
				 {
				 	validacion = false;
				 }
			});

			if (validacion)
			{
				$("#frmFormato2").generarDatosEnvio("txtFormato2_", function(datos)
				{
					$.post('../server/php/guardarFormato.php', {Usuario : Usuario.id, datos : datos}, function(data, textStatus, xhr) 
					{
						if (data.Error == "")
						{
							swal({
		                        title: "El formato ha sido guardado",
		                        text: "Desea ir al inicio o continuar?",
		                        type: "success",
		                        showCancelButton: true,
		                        confirmButtonColor: "#e67e22",
		                        confirmButtonText: "Ir al Inicio!",
		                        cancelButtonColor : "#9b59b6",
		                        cancelButtonText: "No, quedarse aquí!",
		                        closeOnConfirm: true,
		                        closeOnCancel: true },
		                    function (isConfirm) {
		                        if (isConfirm) 
		                        {
		                            window.location.replace("../home.html");
		                        } else {
		                            
		                        }
		                    });
						} else
						{
							swal({
					            title: "Error!",
					            text: data.Error,
					            type: "error"
		        			});
						}
					}, 'json').fail(function()
					{
						swal("Error", "Hubo un error con el Servidor y no es posible guardar el formato en éste momento", "error");
					});
				});
			} else
			{
				swal("Hey", "Faltan campos del Formato por diligenciar", "error");
			}
		}
	});
}