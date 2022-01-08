package es.urjc.code.juegosenred;

import java.util.ArrayList;

import org.springframework.web.socket.WebSocketSession;

public class GestionSalas {

	public ArrayList<Sala> salas = new ArrayList<Sala>();
	private int contador = 0;

	public Sala nuevaSala() {
		Sala newSala = new Sala(contador);
		contador++;
		return newSala;
	}

	public boolean addUsuario(WebSocketSession session) {
		for (int i = 0; i < this.salas.size(); i++) {
			if (this.salas.get(i).usuarios.size() < 2) {
				this.salas.get(i).anadir(session);
				System.out.println("Sala: " + this.salas.get(i).id + " // Usuarios conectados: "
						+ this.salas.get(i).usuarios.size());
				return true;
			}
		}
		Sala newSala = this.nuevaSala();
		newSala.anadir(session);
		this.salas.add(newSala);
		System.out.println("Sala: " + newSala.id + " // Usuarios conectados: " + newSala.usuarios.size());
		return false;
	}

	public void quitarSala(WebSocketSession session) {
		for (int i = 0; i < this.salas.size(); i++) {
			for (int j = 0; j < 2; j++) {
				if (this.salas.get(i).usuarios.get(j).getId().equals(session.getId())) {
					this.salas.remove(i);

					System.out.println("Sala borrada");

				}

			}
		}
	}

	public int salaMiJugador(WebSocketSession session) {
		for (int i = 0; i < this.salas.size(); i++) {
			for (int j=0; j<2;j++) {
				if (this.salas.get(i).usuarios.get(j).getId().equals(session.getId())) {
					return i;
				} 
			}
		}
		return -1;
	}
}
