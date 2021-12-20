package es.urjc.code.juegosenred;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebsocketEchoHandler extends TextWebSocketHandler {
	
	
	private Map<String, WebSocketSession> sesiones = new ConcurrentHashMap<>();
	private AtomicInteger contadorSesiones=new AtomicInteger(-1);
	

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		
		String msg = message.getPayload();
		session.sendMessage(new TextMessage(msg));
	}
	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		contadorSesiones.set(contadorSesiones.get()+1);
		sesiones.put(session.getId(), session);
		
		if(contadorSesiones.get()==0) {
			session.sendMessage(new TextMessage("Lexi"));			
		}else if(contadorSesiones.get()==1) {
			session.sendMessage(new TextMessage("Mat"));
		}else {}
		
	}
	
	
	
	
}
