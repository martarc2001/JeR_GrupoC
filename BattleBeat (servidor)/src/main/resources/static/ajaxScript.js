function createUsuario(miUsuario) {
	$.ajax({
		method: "POST",
		url: window.location.href+"sesion/",
		data: miUsuario,
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done(function(entrada) {
		entrada=miUsuario.nombre;

		$('#info').empty();
		$('#info').append(
			"<input id='value-input2' type='text'><button id='add-button2'>Mandar mensaje al chat</button>")

		$('#add-button2').click(
			function() {
				if ($('#value-input2').val() != "") {
					var esteMensaje={user:entrada, texto:$('#value-input2').val()}
					//var esteMensaje = new Mensaje(esteUsuario, $('value-input2').val());
					createMensaje(esteMensaje)
					$('#value-input2').val("");
				}
			}
		)

		setInterval(function() { loadMensajes(); }, 3000); //Comprueba cada 3 segundos



	})
}



function loadMensajes() {
	$.ajax({
		url: window.location.href +"sesion/texto" //Poner el jugador???
	}).done(function(texto) {
		console.log('Mensajes cargados: ' + JSON.stringify(texto));
		$('#cajaChat').empty();
		for (var i = 0; i < texto.length; i++) {
			showMensaje(texto[i]);
		}


	})
}

//Crear mensaje
function createMensaje(miMensaje, callback) {
	$.ajax({
		method: "POST",
		url: window.location.href + 'sesion/texto',
		data: JSON.stringify(miMensaje),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done(function(miMensaje) {
		console.log("Nuevo mensaje: " + JSON.stringify(miMensaje));
		showMensaje(miMensaje);
	})
}

//Show item in page
function showMensaje(miMensaje) {
	//$('#cajaChat').append('<div>' + miMensaje.user.getNombre() + ": " + miMensaje.texto + '</div>')
	$('#cajaChat').append('<div>' + miMensaje.user.nombre + ": " + miMensaje.texto + '</div>')

}




/////////////////////////////////

$(document).ready(function() {
	var input = $('#value-input');
	var info = $('#info');

	//Handle add button
	$("#add-button").click(function() {

		var value = input.val();
		input.val('');

		var esteUsuario = { nombre: value };

		createUsuario(esteUsuario);


	})
})