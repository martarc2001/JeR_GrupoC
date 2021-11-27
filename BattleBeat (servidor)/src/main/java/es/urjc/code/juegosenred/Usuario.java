package es.urjc.code.juegosenred;

public class Usuario {

	private String nombre;
	private int id;
	private boolean estaConectado;
	private int tiempoConectado;
	//Sala chat

	
	public Usuario() {}
	
	public Usuario(String nombre) {
		this.nombre=nombre;
		this.id=0;
		this.estaConectado=true;
		this.tiempoConectado=0;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String miNombre) {
		this.nombre = miNombre;
	}

	public int getID() {
		return id;
	}

	public void setID(int miID) {
		this.id = miID;
	}
	
	public boolean getConexion() {
		return estaConectado;
	}

	public void setConexion (boolean miConexion) {
		this.estaConectado = miConexion;
	}
	
	public int getTiempo() {
		return tiempoConectado;
	}
	public void resetTiempo() {
		this.tiempoConectado=0;
	}
	public void setTiempo1segundo() {
		this.tiempoConectado+=1;
	}

	
	@Override
	public String toString() {
		return "Usuario "+ id + ": "+ nombre;
	}

}
