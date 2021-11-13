import { CountryNames } from '~types/countries';

const femaleNames = [
	'Abigail', 'Agustina', 'Ainhoa', 'Alice', 'Alison', 'Alondra', 'Amalia', 'Amanda', 'Amelia', 'Amparo', 'Amy',
	'Anaís', 'Angela', 'Antonella', 'Antonia', 'Ashley', 'Aurora', 'Aylin', 'Belén', 'Bárbara', 'Camila', 'Carla',
	'Carolina', 'Catalina', 'Celeste', 'Colomba', 'Constanza', 'Consuelo', 'Danae', 'Daniela', 'Dominga', 'Dominique',
	'Elena', 'Elisa', 'Elizabeth', 'Eloísa', 'Ema', 'Emilia', 'Emily', 'Emma', 'Esperanza', 'Fernanda', 'Florencia',
	'Francisca', 'Gabriela', 'Génesis', 'Ignacia', 'Isabel', 'Isabella', 'Isidora', 'Javiera', 'Josefa', 'Josefina',
	'Julieta', 'Laura', 'Leonor', 'Luciana', 'Lucía', 'Luna', 'Lía', 'Magdalena', 'Maite', 'Mariana', 'Martina',
	'María', 'Matilda', 'Matilde', 'Mayra', 'Mayte', 'Mia', 'Millaray', 'Monserrat', 'Montserrat', 'Noelia', 'Noemí',
	'Olivia', 'Paloma', 'Pascal', 'Pascale', 'Paula', 'Paz', 'Pía', 'Rafaela', 'Rayén', 'Renata', 'Rocío', 'Samantha',
	'Sara', 'Sofía', 'Sophia', 'Trinidad', 'Valentina', 'Victoria', 'Violeta', 'Ámbar'
];

const maleNames = [
	'Aaron', 'Agustín', 'Alan', 'Alejandro', 'Alex', 'Alexander', 'Alexis', 'Alfonso', 'Alonso', 'Amaro', 'Andrés',
	'Angel', 'Antonio', 'Arturo', 'Bastián', 'Benjamín', 'Bruno', 'Camilo', 'Carlos', 'Claudio', 'Clemente', 'Cristian',
	'Cristóbal', 'Damián', 'Daniel', 'Dante', 'David', 'Diego', 'Dylan', 'Eduardo', 'Elías', 'Emiliano', 'Emilio',
	'Esteban', 'Fabián', 'Facundo', 'Felipe', 'Fernando', 'Francisco', 'Franco', 'Gabriel', 'Gaspar', 'Gonzalo',
	'Guillermo', 'Gustavo', 'Héctor', 'Ian', 'Ignacio', 'Isaac', 'Isaias', 'Javier', 'Jean', 'Jesús', 'Joaquín',
	'Jorge', 'Josue', 'José', 'Juan', 'Julián', 'Kevin', 'Leonardo', 'León', 'Liam', 'Lucas', 'Luciano', 'Luis',
	'Lukas', 'Manuel', 'Marcelo', 'Mariano', 'Martín', 'Mateo', 'Mathias', 'Matías', 'Maximiliano', 'Miguel', 'Máximo',
	'Nicolás', 'Oscar', 'Pablo', 'Patricio', 'Pedro', 'Rafael', 'Renato', 'Ricardo', 'Rodrigo', 'Salvador', 'Samuel',
	'Santiago', 'Sebastián', 'Sergio', 'Simón', 'Thomas', 'Tomás', 'Valentín', 'Vicente', 'Víctor', 'Álvaro'
];

const lastNames = [
	'Alexandra', 'Alonsos', 'Alvarez', 'Araya', 'Atlas', 'Augustin', 'Azizi', 'Barbara', 'Bastian', 'Benjamin',
	'Bentlee', 'Bravo', 'Camila', 'Carla', 'Carolina', 'Carrasco', 'Castillo', 'Castro', 'Catalina', 'Chichi',
	'Contreras', 'Cortes', 'Cristobal', 'Daniel', 'Diaz', 'Diego', 'Diem', 'Emilia', 'Espinoza', 'Felipe', 'Fernanda',
	'Fernandez', 'Figueroa', 'Florencia', 'Flores', 'Francisco', 'Fuentes', 'Gabriel', 'Gabriela', 'Garcia', 'Gomez',
	'Gonzalez', 'Gutierrez', 'Hernandez', 'Herrera', 'Ignacio', 'Isabella', 'Jara', 'Javier', 'Joaquin', 'Jose',
	'Juan', 'Julieta', 'Laura', 'Lopez', 'Luis', 'Magdalena', 'Maria', 'Martin', 'Martina', 'Martinez', 'Mateo',
	'Matias', 'Matilde', 'Maximiliano', 'Maximo', 'Miranda', 'Monserrat', 'Morales', 'Munoz', 'Nicolas', 'Nunez',
	'Pascal', 'Paula', 'Paz', 'Perez', 'Pia', 'Ramirez', 'Renato', 'Reyes', 'Rivera', 'Rocio', 'Rodriguez', 'Rojas',
	'Sanchez', 'Sebastian', 'Sepulveda', 'Silva', 'Sofia', 'Soto', 'Soto', 'Tapia', 'Testudines', 'Thiarre', 'Tomas',
	'Torres', 'Trinidad', 'Valentina', 'Valenzuela', 'Vargas', 'Vasquez', 'Vega', 'Vera', 'Vergara', 'Vicente',
	'Victoria', 'Zavala', 'Zuniga'
];

const namesData: CountryNames = {
	femaleNames,
	maleNames,
	lastNames
};

export default namesData;
