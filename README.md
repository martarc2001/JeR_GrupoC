# JeR_GrupoC
Juegos en Red, 3º GDDV 2021-22 URJC Madrid-Quintana, Grupo C (Cuadra Crew)

-**Nombre del juego:** BattleBeat

-**Temática:** Juego de ritmo donde los jugadores se enfrentan entre ellos. Quien consiga más puntuación, gana.

-**Integrantes:**

* *Marta Rodríguez Castillo (correo: m.rodriguezca.2019@alumnos.urjc.es // GitHub: @martarc2001)*
  
  
* *Elena Lopez-Negrete Burón (correo: e.lopeznegrete.2019@alumnos.urjc.es) // GitHub @Elenalopezz)*


* *Laura Fouz García (correo: l.fouz.2019@alumnos.urjc.es // GitHub: @fouzgar)*


* *Isabel Escudero Orden (correo: i.escudero.2019@alumnos.urjc.es // GitHub: @Isaeo22)*

<br>

## Documento de Diseño del Juego

### 1 Introducción

Este es el documento de diseño del videojuego BattleBeat, el videojuego de ritmo para PC creado por el equipo CuadraCrew.


#### 1.1 Concepto del juego

BattleBeat es un videojuego de ritmo musical donde dos jugadores se enfrentan en una batalla de baile. Enmarcado en el contexto del concurso de baile en la granja del DJ BoViiNo, el vencedor será aquel que consiga la mayor puntuación, es decir, quien logre acertar el mayor número de pasos de baile.


#### 1.2 Género

Rítmico y de coordinación.


#### 1.3 Estilo visual

El juego cuenta con un estilo cartoon en 2D.


#### 1.4 Público

Orientado a un público joven que busca simplemente pasar el rato, con partidas cortas y dinámicas.

<br>

### 2 Mecánicas del juego

#### 2.1 Jugabilidad

BattleBeat se dividirá en partidas, en las que dos personas deberán competir por quién recibe más puntos. Por pantalla saldrán unas flechas desde el medio hasta la parte superior de la pantalla. Para ganar puntos, los jugadores deben pulsar las teclas WASD en el momento justo cuando la flecha coincida con la silueta de la flecha.   

El juego consiste en una batalla de baile entre dos personajes. En cada lado de la pantalla aparecerá un personaje (cada uno representando a un jugador). El jugador como tal no controla al personaje, sino que se trata de un elemento ornamental. Cuando el jugador sigue bien el ritmo con las teclas, el personaje marcará los pasos de baile. Se trata de un estímulo visual para los jugadores, a modo de retroalimentación. 

El objetivo del juego es acabar con mayor puntuación que la de tu rival y así ganar la batalla de baile. Ambos jugadores tendrán la misma combinación de teclas para que la dificultad de la partida sea equitativa, marcada por la velocidad de las flechas. Además, los jugadores no serán derrotados por fallar varias veces seguidas para que el juego no acabe demasiado pronto, y así puedan remontar.


#### 2.2 Flujo de juego

En este apartado comentaremos el desarrollo de una partida de Battle Beat.

Al jugador, inicialmente, se le presenta el menú principal del juego. Si desea crear una partida, deberá seleccionar el botón “Crear partida”,  lo que hará que el juego genere un código para que otro jugador pueda introducirlo al seleccionar “Unirse a partida”  y jugar juntos. 

Ambos jugadores serán llevados a una sala de espera, y cuando los dos jugadores confirmen que están listos, aparecerá por pantalla una imagen a modo de tutorial explicando cómo jugar. Finalmente, se encontrarán en la partida y comenzará la música.

Cada jugador tiene en la parte superior cuatro huecos en forma de flechas (arriba, abajo, derecha e izquierda). Cuando se inicie la música, flechas de distintos colores irán subiendo y el jugador debe seleccionar la dirección correspondiente cuando coincida con el hueco. Por ejemplo, cuando una flecha hacia la derecha coincida con el hueco de flecha a la derecha, ambos jugadores deberán pulsar la tecla D. Dependiendo de cuan exacto coincida la flecha de color con el hueco establecido, saldrá por pantalla un mensaje (“good”, “great” o “perfect”).
Cuando la canción termine, se anunciará el jugador que haya conseguido el mayor número de puntos y la partida finalizará, devolviendo a los jugadores a la sala de espera.

<br>

### 3 Interfaz

Vamos ahora a mostrar cómo serán las pantallas que componen a BattleBeat, así como sus transiciones. Se usará para, dar más detalle, bocetos de las mismas.

#### 3.1 Diagrama de flujo
![Diagrama de Flujo](/Imágenes%20archivo%20README/1-%20GDD/3-%20Interfaz/Diagrama.png)

*Imagen 1: Diagrama de flujo de BattleBeat*

#### 3.2 Menú principal
![Menú Principal](/Imágenes%20archivo%20README/1-%20GDD/3-%20Interfaz/Plantilla%20Chrome%20Menú.jpg)

*Imagen 2: Interfaz menú principal*

La pantalla inicial del juego mostrará el logo del juego en la cabecera, y botones simples para que los jugadores puedan crear una partida o unirse a una ya creada de manera sencilla. Con el propósito de ambientar el menú y atraer más público, se colocará una imagen de DJ BoViiNo.

#### 3.3 Sala de espera
![Sala de espera 1](/Imágenes%20archivo%20README/1-%20GDD/3-%20Interfaz/Plantilla%20Chrome%20Sala%20espera%201.jpg)
![Sala de espera 2](/Imágenes%20archivo%20README/1-%20GDD/3-%20Interfaz/Plantilla%20Chrome%20Sala%20espera%202.jpg)

*Imágenes 3 y 4: Interfaz Sala de espera, vista de jugador creador de la partida*

Para que un jugador pueda crear un código que compartir con su compañero de juego, se crea una sala de espera, para que los usuarios puedan saber que la configuración de la partida es correcta y está lista para ser jugada.

En esta sala, si el jugador accedió a través de “Crear partida” en el menú principal, se mostrará un código. Por otro lado, si accedió a través de “Unirse a partida”, se le mostrará un espacio donde debe escribir ese código. Cuando ambos jugadores estén conectados, se mostrará un botón de empezar a cada uno, que deben pulsar para pasar a las pantallas de tutorial y, más tarde, partida.

#### 3.4 Tutorial y partida
![Tutorial](/Imágenes%20archivo%20README/1-%20GDD/3-%20Interfaz/Plantilla%20Chrome%20Tutorial.jpg)
![Partida](/Imágenes%20archivo%20README/1-%20GDD/3-%20Interfaz/Plantilla%20Chrome%20Partida.jpg)

*Imágenes 5 y 6: Interfaces de tutorial pre-partida y partida*

Antes de comenzar una partida, se mostrará a los jugadores durante un breve tiempo un tutorial simple de los controles y de la mecánica principal del juego:

W - Flecha apuntando arriba

A - Flecha apuntando a la izquierda

S - Flecha apuntando abajo

D - Flecha apuntando a la derecha

Tras esto, comenzará la partida, que transcurrirá fluidamente hasta que finalice la batalla de baile, donde se comparará la puntuación para decidir al ganador.

<br>

### 4 Arte

#### 4.1 Sonido y Música 

En este juego, la música tiene mucha importancia, pues es un juego centrado en el baile. En el menú inicial estará reproduciéndose una canción marchosa, que ayuda a crear el ambiente de una batalla de baile. Por otra parte, en la sala de espera se reproducirá una canción menos enérgica.
En el transcurso de la partida, habrá una canción de fondo, que ayuda a marcar el compás del sonido de las flechas.

En cuanto a los efectos de sonido, los más importantes a destacar son aquellos que se producen cuando las flechas llegan a su lugar exacto. Estos sonidos crearán un ritmo con el que los personajes bailan.

* Sonido de flechas: Cada flecha tiene una nota distinta.

* Sonido al terminar la partida: Aplausos (aparecen cuando se dice qué jugador ha ganado).

* Sonido al pulsar un botón en los menús: Sonido de DJ.


#### 4.2 Arte 2D

* Logo: Logo del juego con el texto “BattleBeat”

![Logo BattleBeat](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/BattleBeat%20logo.png)

* Flechas
![Diseño flechas](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Flechas.png)

* Personajes
  * DJ BoViiNo (NPC)
![DJ BoViiNo](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/DJ%20BoViiNo%20final.png)

  * Lexi (Jugador 1)
![Lexi](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Lexi%20final.png)

  * Mat (Jugador 2)
![Mat](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Mat%20final.png)

* Escenarios
![Granja Día](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Fondo%20pista%20de%20baile%20de%20dia%20final.png)
![Granja Noche](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Fondo%20pista%20de%20baile%20de%20noche%20final.png)

#### 4.2 Arte conceptual
![Concepto BattleBeat](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Concept%20art%20BattleBeat.jpeg)
![Concepto Lexi](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Concept%20art%20Lexi.jpeg)
![Concepto Mat](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Concept%20art%20Mat.jpeg)
![Concepto DJ BoViiNo](/Imágenes%20archivo%20README/1-%20GDD/4-%20Arte/Concept%20art%20DJ%20BoViiNo.png)
