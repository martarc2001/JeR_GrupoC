package es.urjc.code.juegosenred;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

//import es.urjc.code.juegosenred.rest.ejer2.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketEchoHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sesiones = new ConcurrentHashMap<>();
	private AtomicInteger contadorSesiones = new AtomicInteger(-1);
	private ObjectMapper mapper = new ObjectMapper();

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());

		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());

		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("name", node.get("name").asText());
		newNode.put("message", node.get("message").asText());

		for (WebSocketSession participant : sesiones.values()) {
			if (!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		contadorSesiones.set(contadorSesiones.get() + 1);
		sesiones.put(session.getId(), session);

		if (contadorSesiones.get() == 0) {
			session.sendMessage(new TextMessage("Lexi"));
		} else if (contadorSesiones.get() == 1) {
			session.sendMessage(new TextMessage("Mat"));

			for (WebSocketSession participant : sesiones.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage("Conexion"));
				}
			}

		} else {
		}

	}

}
