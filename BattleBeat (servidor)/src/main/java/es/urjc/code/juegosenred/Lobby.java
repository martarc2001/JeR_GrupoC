package es.urjc.code.juegosenred;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.io.*;
import java.util.List;
import java.util.ArrayList;
import javax.swing.Timer;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Lobby {

	List<Usuario> misUsers = new ArrayList<>();
	List<Mensaje> misMensajes = new ArrayList<>();
	LocalDateTime miFecha;
	LocalTime miHora;
	String FechaConFormato;

	int tiempoDeRefresco = 3000; // 3 segundos entre get y get

	Timer temporizador = new Timer(tiempoDeRefresco, new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			//ficheroMensaje();
			System.out.println("Funciona Timer");

			for (int i = 0; i < misUsers.size(); i++) {

				if (misUsers.get(i).getConexion() == true) {
					misUsers.get(i).setConexion(false);
				}else {
					misUsers.remove(i);
					//SACAR POR CAJA CHAT EL QUE ESTE USUARIO SE HA SALIDO
				}
				
				
				

				// System.out.print("Timer " + misUsers.get(i).getConexion());

				// if (misUsers.get(i).getConexion() == true) {

				// misUsers.get(i).setTiempo1unidad();

				// if (misUsers.get(i).getTiempo() == 2) {
				// misUsers.get(i).setConexion(false);
				// misUsers.get(i).resetTiempo();
				// }

				// } else {

				// System.out.println(misUsers.get(i).getNombre() + "se desconectó");
				// }
			}
		}

	});

	public Lobby() {
		 this.temporizador.start();
		 
		 miFecha=LocalDateTime.now();
		 miHora=LocalTime.now();
		 DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("dd-MM-yyyy-HH-mm-ss");
		 FechaConFormato = miFecha.format(formatoFecha);
	}

	public void anadirUsuario(Usuario user) {
		/*
		 * boolean flag = false;
		 * 
		 * for (int i = 0; i < misUsers.size(); i++) { if (user.getNombre() !=
		 * misUsers.get(i).getNombre()) { flag = true; } }
		 * 
		 * if (flag == true) { misUsers.add(user); return "Usuario añadido"; } else
		 * {return "Usuario ya está en la lista";}
		 */
		misUsers.add(user);
	}

	public void anadirMensaje(Mensaje miMensaje) {
		misMensajes.add(miMensaje);
	}

	public void ficheroMensaje() {
		System.out.println(miFecha);
		System.out.println(miHora);
		try {
			PrintStream flujo;
			//flujo = new PrintStream(new FileOutputStream("mensajes"+LocalDate.now()+miHora+".txt"));
			flujo = new PrintStream(new FileOutputStream("mensajes"+FechaConFormato+".txt"));

			for (int i = 0; i < misMensajes.size(); i++) {
				flujo.println(misMensajes.get(i).getUser()+": "+misMensajes.get(i).getTexto());
			}
			
			flujo.close();

		} catch (FileNotFoundException e) {
			System.out.println("Archivo no encontrado");
		} catch (IOException exc) {
			System.out.println("Otro tipo de excepción");
		}

	}
}