package es.urjc.code.juegosenred;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

//import es.urjc.code.juegosenred.rest.ejer2.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketEchoHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sesiones = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	private GestionSalas admin = new GestionSalas();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		JsonNode node = mapper.readTree(message.getPayload());

		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {


		ObjectNode newNode = mapper.createObjectNode();
		//newNode.put("name", node.get("name").asText());
			newNode.put("arriba", node.get("arriba").asText());
			newNode.put("izquierda", node.get("izquierda").asText());
			newNode.put("abajo", node.get("abajo").asText());
	        newNode.put("derecha", node.get("derecha").asText());
	        newNode.put("score",node.get("score").asText());
	        newNode.put("miss",node.get("miss").asText());
	        newNode.put("good",node.get("good").asText());
	        newNode.put("great",node.get("great").asText());
	        newNode.put("perfect",node.get("perfect").asText());
	        
	       

		for (WebSocketSession participant : sesiones.values()) {
			if (!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		
		sesiones.put(session.getId(), session);
		
		admin.addUsuario(session);
		
		for(int i = 0; i<this.admin.salas.size();i++) {
       	 for(int j = 0; j<2 ; j++) {
           if(this.admin.salas.get(i).usuarios.get(0).getId().equals(session.getId())){
        	   session.sendMessage(new TextMessage("Lexi"));
           }else if (this.admin.salas.get(i).usuarios.get(1).getId().equals(session.getId())) {
        	   session.sendMessage(new TextMessage("Mat"));
        	   
        	   for (WebSocketSession participant : this.admin.salas.get(i).usuarios) {
   				if (!participant.getId().equals(session.getId())) {
   					participant.sendMessage(new TextMessage("Conexion"));
   				}
   			}
           }
       	 }
		}
	
      }
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("DESCONEXION");
		sesiones.remove(session.getId());
		admin.quitarSala(session);
		
		for(int i = 0; i<this.admin.salas.size();i++) {
			for(int j = 0; j<2 ; j++) {
		           if(this.admin.salas.get(i).usuarios.get(j).getId().equals(session.getId())){
		for (WebSocketSession participant : this.admin.salas.get(i).usuarios) {
			if (!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage("Desconexion"));
			}
		}
		}
		}
	}
}
}
