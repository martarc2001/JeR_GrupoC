package es.urjc.code.juegosenred;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/sesion/")
public class ControllerDeMensaje {

	Lobby miLobby = new Lobby();

	// Postear un jugador
	@PostMapping()
	public Usuario nuevoUser(@RequestBody String miNombreUser) {
		Usuario miUser = new Usuario(miNombreUser);
		miLobby.anadirUsuario(miUser);
		return miUser;
	}

	// Postear un mensaje
	@PostMapping("/{texto}")
	@ResponseStatus(HttpStatus.CREATED)
	public Mensaje nuevoMensaje(@RequestBody Mensaje miMensaje) {

		miLobby.anadirMensaje(miMensaje);
		System.out.println(miMensaje.getTexto());
		miLobby.ficheroMensaje();
		return miMensaje;

	}

	// Get de todos los mensajes
	@GetMapping("/{texto}")
	public List<Mensaje> getMensajes() {

		// COGER QUÉ USUARIO ESTÁ HACIENDO ESTE GET
		// SET LA CONEXION DE ESE USUARIO A TRUE

		return miLobby.misMensajes;
	}

	
	@PutMapping
	public ResponseEntity<String> salirPartida(@RequestBody String nombreUsuario) {
		System.out.println("BORRAR USUARIO");
		return new ResponseEntity<String>(nombreUsuario+": se ha des-cow-nectado",HttpStatus.OK);
	}

	
	
	
	
	/*
	 * // Get de todos los usuarios
	 * 
	 * @GetMapping() public ResponseEntity<Usuario> getUsuarios() { for(int i=0;
	 * i<miLobby.misUsers.size();i++) { if (miLobby.misUsers.get(i)==null) { return
	 * new ResponseEntity<>(miLobby.misUsers.get(i).getNombre(),
	 * HttpStatus.NOT_FOUND); }
	 * 
	 * }
	 * 
	 * }
	 */

	/*
	 * public WebClient webClient() { return WebClient.builder()
	 * .baseUrl("http://localhost:8080") .clientConnector(new
	 * ReactorClientHttpConnector(
	 * HttpClient.create().responseTimeout(Duration.ofMillis(250)) )) .build(); }
	 * 
	 * @GetMapping("/author/webclient") public String getWithWebClient(@RequestParam
	 * String title) { return webClient.get() .uri(uriBuilder ->
	 * uriBuilder.path("/author/transactional").queryParam("title", title).build())
	 * .retrieve().bodyToMono(String.class).block(); }
	 */
}
