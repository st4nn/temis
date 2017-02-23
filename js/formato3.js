function funcion_Inicio()
{
	 $("#txtFormato3_Nombre").on("change keyup paste", function()
    {
        $("#lblFormato3_Nombre").text($(this).val())
        if ($(this).val() == "")
        {
            $(this).css("width", "175px");
        } else
        {
            $(this).css("width", $(this).val().length * 9  + "px");
        }
    });

    $("#txtFormato3_Cedula").on("change keyup paste", function()
    {
        $("#lblFormato3_Cedula").text($(this).val());

        if ($(this).val() == "")
        {
            $(this).css("width", "265px");
        } else
        {
            $(this).css("width", $(this).val().length * 12  + "px");
        }
    });

    $("#txtFormato3_Ciudad").on("change keyup paste", function()
    {
        if ($(this).val() == "")
        {
            $(this).css("width", "340px");
        } else
        {
            $(this).css("width", $(this).val().length * 9  + "px");
        }
    });

    $("#btnFormato3_AgregarFila").on("click", function(evento)
    {
        evento.preventDefault();

        var tds = "";

        tds += '<tr>';
            tds += '<td><input type="text" placeholder="Nombre de la sociedad" class="form-control" required></td>';
            tds += '<td><input type="text" placeholder="NIT" class="form-control" required></td>';
            tds += '<td><input type="text" placeholder="Domicilio" class="form-control" required></td>';
            tds += '<td><input type="text" placeholder="Acciones o cargo directivo" class="form-control" required></td>';
            tds += '<td>';
                tds += '<button class="btn btn-danger btn-block btnFormato3_QuitarFila">';
                    tds += '<i class="fa fa-close"></i>        ';
                tds += '</button>';
            tds += '</td>';
        tds += '</tr>';

        $("#tblFormato3_Listado tbody").append(tds);
    });

    $(document).delegate('.btnFormato3_QuitarFila', 'click', function(evento) {
        evento.preventDefault();
        $(this).parent("td").parent("tr").remove();
    });

    var f = new Date();
    $(".lblElAnio").text(f.getFullYear());
    $(".lblElMes").text(obtenerMes());
    $(".lblElDia").text(CompletarConCero(f.getDate(), 2));

    $("#frmFormato3").on("submit", function(evento)
	{
		evento.preventDefault();
		if (!$("#txtFormato3_Check").is(":checked"))
		{
			swal({
	            title: "Hey!",
	            text: "Es importante aceptar los términos y condiciones del Formato!",
	            type: "error"
	        });
		} else
		{
			var objs = $("#frmFormato3 [required]");
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
				
				var lista = $("#tblFormato3_Listado tbody tr");
				var objListado = [];
				var objTD = {};
				$.each(lista, function(index, val) 
				{
					objTD = $(val).find("input");
					 objListado[index] = {};
					 objListado[index].Nombre =  $(objTD[0]).val();
					 objListado[index].Nit = $(objTD[1]).val();
					 objListado[index].Domicilio = $(objTD[2]).val();
					 objListado[index].Cargo = $(objTD[3]).val();
				});

				$("#txtFormato3_Listado").val(JSON.stringify(objListado));

				$("#frmFormato3").generarDatosEnvio("txtFormato3_", function(datos)
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