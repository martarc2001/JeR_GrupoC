package es.urjc.code.juegosenred;

import java.util.ArrayList;

import org.springframework.web.socket.WebSocketSession;

public class Sala {

	public int id;
	public ArrayList<WebSocketSession> usuarios = new ArrayList<WebSocketSession>();
	
	public Sala(int id) {
		this.id= id;
	}
	
	public void anadir(WebSocketSession session) {
		usuarios.add(session);
	}
	
	public void quitar(WebSocketSession session) {
		usuarios.remove(session);
	}
	
}

