//var arrayMensajesJSON=[];

function createUsuario(miUsuario) {
	$.ajax({
		method: "POST",
		url: window.location.href + "sesion/",
		data: miUsuario,
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done(function(entrada) {
		entrada = miUsuario.nombre;

		$('#info').empty();
		$('#info').append(
			"<input id='value-input2' type='text' style='font-family: Impact;'><button id='add-button2' style='font-family: Impact;'>Mandar mensaje al chat</button>")

		$('#add-button2').click(
			function() {
				if ($('#value-input2').val() != "") {
					var esteMensaje = { user: entrada, texto: $('#value-input2').val() }
					createMensaje(esteMensaje)
					$('#value-input2').val("");
				}
			}
		)
		setInterval(function() { loadMensajes(); /*loadJugadores();*/ }, 3000); //Comprueba cada 3 segundos

		var inicioSesion = { user: entrada, texto: "Se ha cow-nectado al servidor" }
		createMensaje(inicioSesion)

	})
}



function loadMensajes() {
	$.ajax({
		url: window.location.href + "sesion/texto"
	}).done(function(texto) {
		console.log('Mensajes cargados: ' + JSON.stringify(texto));


		$('#cajaChat').empty();
		
		/*
		for(var i=0; i<arrayMensajesJSON[i].length;i++){
			console.log("ESTE MENSAJE:"+arrayMensajesJSON[i]);
			$('#cajaChat').append('<div>'+arrayMensajesJSON[i].user+": "+arrayMensajesJSON[i].texto+ '</div>');
		}
		*/
		
		for (var i = 0; i < texto.length; i++) {
			showMensaje(texto[i]);
		}


	}).fail(function() {
		console.log("ERROR: SERVIDOR DESCONECTADO");
		$('#cajaChat').append('<div>SERVIDOR DESCONECTADO. ESPERANDO RECONEXIÓN.</div>');

	})
}

/*
function loadJugadores() {		
		$.ajax({
			method: 'GET',
			url: window.location.href + "sesion/"
		}).done(function(jugadores) {
			console.log("Jugadores conectados: " + JSON.stringify(jugadores))
		}).fail(function(i) {
			console.log("Jugador con id " + i + " no encontrado")
		})


	}
*/

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
		//arrayMensajesJSON.push(miMensaje);
		showMensaje(miMensaje);
		//callback(miMensaje);
	})
}

//Show item in page
function showMensaje(miMensaje) {
	$('#cajaChat').append('<div>' + miMensaje.user.nombre + ": " + miMensaje.texto + '</div>')

}

function showMensajeConexion(miMensaje) {
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