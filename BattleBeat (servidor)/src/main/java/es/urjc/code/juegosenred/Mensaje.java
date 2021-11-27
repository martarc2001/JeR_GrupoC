package es.urjc.code.juegosenred;

public class Mensaje {

	private Usuario user;
	private String texto;

	
	
	public Mensaje(Usuario miUser, String miTexto){
		this.user=miUser;
		this.texto=miTexto;
	}
	

	public String getTexto() {
		return texto;
	}

	public void setTexto(String miTexto) {
		this.texto = miTexto;
	}

	public Usuario getUser() {
		return user;
	}

	public void setUser(Usuario miUser) {
		this.user = miUser;
	}

	
	@Override
	public String toString() {
		return "Usuario "+ user.getNombre() + ": "+ texto;
	}

}
