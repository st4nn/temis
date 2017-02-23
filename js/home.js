function funcion_Inicio()
{
	$("#lblHome_NomUsuario").text(Usuario.Nombre);
	$.post('server/php/cargarConsolidado.php', {Usuario : Usuario.id}, function(data, textStatus, xhr) 
	{
		$.each(data, function(index, val) 
		{
			$("#lblHome_CantF" + val.id).text(val.Cantidad);
			 $("#lblHome_FechaF" + val.id).text(val.Fecha);
		});
	}, 'json');
}

