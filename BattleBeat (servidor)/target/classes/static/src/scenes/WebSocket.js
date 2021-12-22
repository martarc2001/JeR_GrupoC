export class WebSocket {


	socket(){
			this.connection = new WebSocket('ws://' + window.location.hostname + ':8080/conexion');

		
		var that = this;

		this.connection.onmessage = function(msg) {
			console.log("WS message: " + msg.data);
				
				
				if (msg.data == "Lexi") {					
					flag=true;

				}
				else if (msg.data == "Mat") {
					flag=false;
					juegosConectados=true;
					connection.send(juegosConectados);
				}
				else if(msg.data == "Conexion"){
					juegosConectados=true;
				}
				else if (msg.data == "EmpezarPartida") {
					flag = true;
					

				}
				else{
					
					this.scene.add('miMenu', new Menu);
					this.scene.launch('miMenu');
					this.scene.remove();

				}
				console.log(flag);


		}

		
		this.connection.onerror = function(e){ console.log("WS error: " + e); }
    }

}