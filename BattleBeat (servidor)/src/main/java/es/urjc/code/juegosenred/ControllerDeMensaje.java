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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;



@RestController
@RequestMapping("/sesion/")
public class ControllerDeMensaje {

	Lobby miLobby=new Lobby();
	
	//Postear un jugador
	@PostMapping
	public Usuario nuevoUser(@RequestBody String miNombreUser) {
		Usuario miUser=new Usuario(miNombreUser);
		miLobby.anadirUsuario(miUser);
		return miUser;
	}
		

	//Postear un mensaje
	@PostMapping("/{texto}")
	@ResponseStatus(HttpStatus.CREATED)
	public Mensaje nuevoMensaje(@RequestBody Mensaje miMensaje) {

		miLobby.anadirMensaje(miMensaje);
		System.out.println(miMensaje.getTexto());
		return miMensaje;
		
	}
	

	
	//Get de todos los mensajes
	@GetMapping("/{texto}")
	public List<Mensaje> getMensajes(){ //(@PathVariable long id)
		return miLobby.misMensajes;		
	}
	
	/*
	public List<String> getMensajes(){
		return miLobby.misMensajes.getUser
	}
	*/

	

}
