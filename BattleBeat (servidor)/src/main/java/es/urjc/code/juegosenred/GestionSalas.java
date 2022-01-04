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
				System.out.println("Room: " + this.salas.get(i).id + "Size: " + this.salas.get(i).usuarios.size());
				return true;
			}
		}
		Sala newSala = this.nuevaSala();
		newSala.anadir(session);
		this.salas.add(newSala);
		System.out.println("New Room: " + newSala.id);
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
}
