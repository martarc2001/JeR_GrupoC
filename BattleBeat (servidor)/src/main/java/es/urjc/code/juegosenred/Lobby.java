package es.urjc.code.juegosenred;

import java.util.List;
import java.util.ArrayList;
import javax.swing.Timer;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Lobby {

	List<Usuario> misUsers = new ArrayList<>();
	List<Mensaje> misMensajes = new ArrayList<>();

	int tiempoDeRefresco = 3000; // 3 segundos entre get y get

	Timer temporizador = new Timer(tiempoDeRefresco, new ActionListener() {
		public void actionPerformed(ActionEvent e) {
			for (int i = 0; i < misUsers.size(); i++) {
				if (misUsers.get(i).getConexion() == true) {

					misUsers.get(i).setTiempo1segundo();

					if (misUsers.get(i).getTiempo() == 10) {
						misUsers.get(i).setConexion(false);
						misUsers.get(i).resetTiempo();
					}

				} else {
					System.out.println(misUsers.get(i).getNombre() + "se desconectó"); ///////////// HACER UN DELETE????
				}
			}
		}

	});

	public Lobby() {
		this.temporizador.start();
	}

	
	
	public String anadirUsuario(Usuario user) {
		boolean flag = false;

		for (int i = 0; i < misUsers.size(); i++) {
			if (user.getNombre() != misUsers.get(i).getNombre()) {
				flag = true;
			}
		}

		if (flag == true) {
			misUsers.add(user);
			return "Usuario añadido";
		} else {return "Usuario ya está en la lista";}

	}
	
	public void anadirMensaje(Mensaje miMensaje) {
		misMensajes.add(miMensaje);
	}

}
