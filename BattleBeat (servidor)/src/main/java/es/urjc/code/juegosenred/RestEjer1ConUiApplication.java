package es.urjc.code.juegosenred;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;





@SpringBootApplication
@EnableWebSocket
public class RestEjer1ConUiApplication implements WebSocketConfigurer { 

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoHandler(), "/conexion").setAllowedOrigins("*");
	}
	
	@Bean
	public WebsocketEchoHandler echoHandler() {
		return new WebsocketEchoHandler();
	}
	
	
	public static void main(String[] args) {
		SpringApplication.run(RestEjer1ConUiApplication.class, args);
	}

}



