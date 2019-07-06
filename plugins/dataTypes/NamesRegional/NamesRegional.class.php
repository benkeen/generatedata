<?php

/**
 * @package DataTypes
 *
 * This Data Type provides some more fine-tuning of names (first + last) so that they're mapped to whatever
 * country the row happens to contain. If the $regionalNames private var doesn't contain names for the
 * current country, it defaults to loading ANY name pulled from the database - just like with the Names plugin.
 */

class DataType_NamesRegional extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Names, Regional";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 15;
	protected $processOrder = 2;
	protected $jsModules = array("NamesRegional.js");

	private $letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private $regionalNames = array(
		"italy" => array(
			"firstNamesFemale" => array(
				"Alessandra", "Alessia", "Alice", "Angela", "Anna", "Arianna", "Aurora", "Beatrice", "Camilla",
				"Caterina", "Chiara", "Claudia", "Cristina", "Debora", "Elena", "Eleonora", "Elisa", "Emma", "Erica",
				"Erika", "Federica", "Francesca", "Gaia", "Giada", "Ginevra", "Giorgia", "Giulia", "Giulietta", "Greta",
				"Ilaria", "Irene", "Jessica", "Lara", "Laura", "Lisa", "Lucia", "Manuela", "Margherita", "Maria",
				"Marta", "Martina", "Matilde", "Michela", "Monica", "Nicole", "Nicoletta", "Noemi", "Paola", "Rebecca",
				"Roberta", "Sara", "Serena", "Silvia", "Simona", "Sofia", "Stefania", "Valentina", "Valeria", "Vanessa",
				"Veronica", "Viola", "Vittoria"
			),
			"firstNamesMale" => array(
				"Alberto", "Alessandro", "Alessio", "Alex", "Andrea", "Angelo", "Antonio", "Armando", "Augusto",
				"Christian", "Claudio", "Cristian", "Cristiano", "Daniele", "Dario", "Davide", "Diego", "Domenico",
				"Edoardo", "Emanuele", "Enrico", "Fabio", "Federico", "Filippo", "Francesco", "Gabriele", "Giacomo",
				"Gianluca", "Gianni", "Gianpaolo", "Gianpiero", "Giorgio", "Giovanni", "Giulio", "Giuseppe", "Jacopo",
				"Leonardo", "Lorenzo", "Luca", "Lucio", "Luigi", "Manuel", "Marco", "Mario", "Marcello", "Matteo",
				"Mattia", "Michele", "Mirko", "Nicola", "Nicolò", "Paolo", "Pietro", "Riccardo", "Roberto", "Salvatore",
				"Samuel", "Samuele", "Simone", "Stefano", "Tommaso", "Valerio", "Vincenzo"
			),
			"lastNames" => array(
				"Agostini", "Aiello", "Albanese", "Amato", "Antonelli", "Arena", "Baldi", "Barbieri", "Barone", "Basile",
				"Battaglia", "Bellini", "Benedetti", "Bernardi", "Bianchi", "Bianco", "Brambilla", "Bruni", "Bruno",
				"Calabrese", "Caputo", "Carbone", "Caruso", "Castelli", "Catalano", "Cattaneo", "Cavallo", "Ceccarelli",
				"Cirillo", "Colombo", "Conte", "Conti", "Coppola", "Costa", "Costantini", "De Angelis", "De Luca",
				"De Rosa", "De Santis", "De Simone", "Di Stefano", "Donati", "Esposito", "Fabbri", "Farina", "Ferrante",
				"Ferrara", "Ferrari", "Ferraro", "Ferrero", "Ferretti", "Ferri", "Ferro", "Fiore", "Fontana", "Franco",
				"Fumagalli", "Fusco", "Galli", "Gallo", "Gargiulo", "Garofalo", "Gatti", "Gentile", "Giordano", "Giorgi",
				"Giuliani", "Grassi", "Grasso", "Greco", "Grimaldi", "Guerra", "Guidi", "Leone", "Lombardi", "Lombardo",
				"Longo", "Lorusso", "Mancini", "Marchetti", "Marchi", "Mariani", "Marini", "Marino", "Marra", "Martinelli",
				"Martini", "Martino", "Mazza", "Mele", "Meloni", "Messina", "Milani", "Monaco", "Montanari", "Monti",
				"Morelli", "Moretti", "Moro", "Napolitano", "Neri", "Olivieri", "Orlando", "Pace", "Pagano", "Palmieri",
				"Palumbo", "Parisi", "Pastore", "Pellegrini", "Pellegrino", "Pepe", "Perrone", "Piazza", "Piccolo",
				"Pinna", "Piras", "Poli", "Pozzi", "Proietti", "Ricci", "Ricciardi", "Rinaldi", "Riva", "Rizzi", "Rizzo",
				"Romano", "Romeo", "Rossetti", "Rossi", "Ruggeri", "Ruggiero", "Russo", "Sala", "Sanna", "Santini",
				"Santoro", "Sartori", "Serra", "Silvestri", "Sorrentino", "Testa", "Valente", "Valentini", "Villa",
				"Villani", "Vitale", "Vitali", "Volpe", "Zanetti"
			)
		),
		"france" => array(
			"firstNamesFemale" => array(
				"Agathe", "Alexandra", "Alexia", "Alice", "Alicia", "Amandine", "Ambre", "Amélie", "Anaël", "Anaëlle",
				"Anaïs", "Angelina", "Anna", "Bienvenue", "Candice", "Capucine", "Carla", "Catherine", "Charlotte",
				"Chaïma", "Chloé", "Clara", "Clotilde", "Cloé", "Clémence", "Célia", "Edwige", "Elsa", "Emma", "Eva",
				"Fanny", "Françoise", "Guillemette", "Inès", "Jade", "Jasmine", "Jeanne", "Julia", "Julie", "Juliette",
				"Justine", "Katell", "Kimberley", "Lamia", "Lana", "Laura", "Lauriane", "Lena", "Lilou", "Lily", "Lina",
				"Lisa", "Loane", "Lola", "Lou", "Louise", "Louna", "Lucie", "Luna", "Lutécia", "Léa", "Léane", "Léonie",
				"Maelys", "Manon", "Margaux", "Margot", "Marie", "Marine", "Marion", "Maryam", "Mathilde", "Maéva",
				"Maëlle", "Maïlé", "Maïwenn", "Mélanie", "Mélissa", "Nina", "Noémie", "Océane", "Pauline", "Romane",
				"Rosalie", "Rose", "Salomé", "Sara", "Sarah", "Solene", "Syrine", "Tatiana", "Valentine", "Yasmine",
				"Yüna", "Zoé", "Élisa", "Élise", "Éloïse", "Éléna", "Émilie"
			),
			"firstNamesMale" => array(
				"Aaron", "Adam", "Adrian", "Adrien", "Alexandre", "Alexis", "Amine", "Anthony", "Antoine", "Antonin",
				"Arthur", "Baptiste", "Bastien", "Benjamin", "Bruno", "Clément", "Colin", "Constant", "Corentin",
				"Cédric", "Davy", "Diego", "Dimitri", "Dorian", "Dylan", "Enzo", "Erwan", "Esteban", "Ethan", "Evan",
				"Florentin", "Florian", "Félix", "Gabin", "Gabriel", "Gaspard", "Gilbert", "Grégory", "Guillaume",
				"Hugo", "Jordan", "Jules", "Julien", "Jérémy", "Kevin", "Kilian", "Killian", "Kylian", "Kyllian",
				"Lilian", "Loevan", "Lorenzo", "Louis", "Lucas", "Léo", "Léon", "Léonard", "Macéo", "Malik", "Malo",
				"Martin", "Marwane", "Mathieu", "Mathis", "Mathéo", "Mattéo", "Maxence", "Maxime", "Mehdi", "Mohamed",
				"Nathan", "Nicolas", "Noah", "Nolan", "Noë", "Paul", "Pierre", "Quentin", "Renaud", "Robin", "Romain",
				"Roméo", "Rémi", "Samuel", "Simon", "Thibault", "Thomas", "Théo", "Timothée", "Timéo", "Titouan",
				"Tom", "Tristan", "Valentin", "Victor", "Yanis", "Yohan", "Zacharis", "Élouan", "Émile"
			),
			"lastNames" => array(
				"Adam", "Albert", "Andre", "Arnaud", "Aubert", "Aubry", "Bailly", "Barbier", "Baron", "Barre", "Benoit",
				"Berger", "Bernard", "Bertrand", "Blanc", "Blanchard", "Bonnet", "Boucher", "Boulanger", "Bourgeois",
				"Bouvier", "Boyer", "Breton", "Brun", "Brunet", "Caron", "Carpentier", "Carre", "Charles", "Charpentier",
				"Chevalier", "Chevallier", "Clement", "Colin", "Collet", "Collin", "Cordier", "Cousin", "Daniel",
				"David", "Denis", "Deschamps", "Dubois", "Dufour", "Dumas", "Dumont", "Dupont", "Dupuis", "Dupuy",
				"Durand", "Duval", "Etienne", "Evrard", "Fabre", "Faure", "Fernandez", "Fleury", "Fontaine", "Fournier",
				"Francois", "Gaillard", "Garcia", "Garnier", "Gauthier", "Gautier", "Gay", "Gerard", "Germain", "Gillet",
				"Girard", "Giraud", "Gomez", "Gonzalez", "Guerin", "Guillaume", "Guillot", "Guyot", "Henry", "Herve",
				"Hubert", "Huet", "Humbert", "Jacob", "Jacquet", "Jean", "Joly", "Julien", "Klein", "Lacroix", "Laine",
				"Lambert", "Laurent", "Le gall", "Le goff", "Le roux", "Lebrun", "Leclerc", "Leclercq", "Lecomte",
				"Lefebvre", "Lefevre", "Legrand", "Lemaire", "Lemoine", "Leroux", "Leroy", "Leveque", "Lopez", "Louis",
				"Lucas", "Maillard", "Mallet", "Marchal", "Marchand", "Marechal", "Marie", "Martin", "Martinez",
				"Marty", "Masson", "Mathieu", "Menard", "Mercier", "Meunier", "Meyer", "Michel", "Millet", "Moreau",
				"Morel", "Morin", "Moulin", "Muller", "Nguyen", "Nicolas", "Noel", "Olivier", "Paris", "Pasquier",
				"Paul", "Pereira", "Perez", "Perrin", "Perrot", "Petit", "Philippe", "Picard", "Pierre", "Poirier",
				"Pons", "Poulain", "Prevost", "Remy", "Renard", "Renaud", "Renault", "Rey", "Richard", "Riviere",
				"Robert", "Robin", "Roche", "Rodriguez", "Roger", "Rolland", "Rousseau", "Roussel", "Roux", "Roy",
				"Royer", "Sanchez", "Schmitt", "Schneider", "Simon", "Thomas", "Vasseur", "Vidal", "Vincent", "Weber"
			)
		),
		"chile" => array(
			"firstNamesFemale" => array(
				"Martina", "Sofía", "Florencia", "Valentina", "Isidora", "Antonella", "Antonia", "Emilia", "Catalina",
				"Fernanda", "Constanza", "María", "Javiera", "Maite", "Francisca", "Agustina", "Josefa", "Amanda", "Camila",
				"Monserrat", "Ignacia", "Trinidad", "Belén", "Paz", "Anaís", "Laura", "Victoria", "Pía", "Magdalena",
				"Renata", "Isabella", "Daniela", "Julieta", "Matilda", "Rocío", "Emily", "Gabriela", "Mia", "Josefina",
				"Bárbara", "Matilde", "Paula", "Carolina", "Pascal", "Thiare", "Anahis", "Paloma", "Alejandra", "Millaray",
				"Carla", "Colomba", "Mariana", "Alondra", "Krishna", "Consuelo", "Montserrat", "Gianella", "Angela", "Ámbar",
				"Alexandra", "Mayra", "Rayen", "Genesis", "Danae", "Katalina", "Ana", "Sophia", "Karla", "Tamara", "Isabel",
				"Rafaela", "Denisse", "Nicole", "Noelia", "Esperanza", "Elizabeth", "Claudia", "Violeta", "Valeria", "Dafne",
				"Kiara", "Leonor", "Rosario", "Noemí", "Maura", "Pascale", "Andrea", "Amalia", "Antonela", "Katherine",
				"Dominique", "Angelina", "Amparo", "Aylin", "Estefanía", "Amelia", "Maira", "Sara", "Alison", "Romina",
				"Paulina", "Elena", "Almendra", "Celeste", "Dominga", "Ashley", "Cristina", "Emma", "Michelle", "Amaya",
				"Mayte", "Samantha", "Jhendelyn", "Natalia", "Luciana", "Ema", "Beatriz", "Damaris", "Eloísa", "Abigail",
				"Diana", "Jazmín", "Amaral", "Tiare", "Macarena", "Sofia", "Lucía", "Anastasia", "Karen", "Marcela", "Jade",
				"Anahi", "Luz", "Francesca", "Ayleen", "Alexia", "Aracely", "Patricia", "Allison", "Ayelen", "Rafaella",
				"Franchesca", "Scarlett", "Nayareth", "Maria", "Yuliana", "Elisa", "Madeleine", "Fiorella", "Olivia",
				"Karina", "Agatha", "Dayana", "Yasmin", "Fabiana", "Paola", "Aurora", "Pilar", "Angie", "Bianca", "Dania",
				"Luna", "Estrella", "Sayen", "Scarleth", "Vanessa", "Evelyn", "Maily", "Tania", "Miley", "Rosa", "Anthonella",
				"Monserratt", "Lía", "Xiomara", "Sol", "Melanie", "Alicia", "Darling", "Verónica", "Ailyn", "Kimberly",
				"Margarita", "Alanis", "Helen", "Samira", "Geraldine", "Nicol", "Tatiana", "Blanca", "Sarai", "Helena", "Amy",
				"Pamela", "Angélica", "Grace", "Vania", "Amara", "Aranza", "Clara", "Jennifer", "Juliana", "Saray",
				"Giuliana", "Mía", "Anahí", "Lissette", "Ariana", "Darlyn", "Marthina", "Melany", "Yaritza", "Alisson",
				"Kamila", "Adriana", "Monserrath", "Araceli", "Madelaine", "Maitte", "Mónica", "Rebeca", "Scarlet", "Stephanie",
				"Analia", "Danitza", "Nayaret", "Maithe", "Alice", "Loreto", "Amaia", "Brenda", "Janis", "Kathalina", "Melissa",
				"Paulette", "Ruth", "Ariela", "Leticia", "Thais", "Francoise", "Priscila", "Ximena", "Emely", "Fabiola",
				"Génesis", "Pascuala", "Raquel", "Aline", "Mariela", "Jacinta", "Jasmín", "Paskal", "Yanara", "Amelie",
				"Solange", "Tabata", "Sophie", "Carmen", "Evolet", "Isis", "Luisa", "Sabrina", "Sandra", "Eva", "Jessica",
				"Maida", "Rayén", "Ashly", "Lorena", "Arantza", "Daphne", "Ivana", "Mathilda", "Anays", "Ariadna", "Dannae",
				"Hellen", "Anahís", "Samanta", "Anita", "Debora", "Isabela", "Jael", "Tabita", "Teresa", "Yazmin", "Ailin",
				"Ayelén", "Madeline", "Marión", "Simona", "Alexa", "Zoe", "Anyelina", "Bernardita", "Ivanna", "Naomí", "Yanira",
				"Damary", "Silvia", "Viviana", "Eliana", "Esmeralda", "Nayeli", "Polett", "Amira", "Erika", "Isadora", "Lisette",
				"Lourdes", "Massiel", "Susana", "Cecilia", "Daira", "Denise", "Eimy", "Gloria", "Josepha", "Natasha",
				"Cathalina", "Emiliana", "Manuela", "Nataly", "Anais", "Annais", "Stephania", "Aileen", "Astrid", "Dominic",
				"Francheska", "Marina", "Alaniz", "Alyson", "Crishna", "Estela", "Lisbeth", "Sonia", "Aracelly", "Julia",
				"Krisna", "Maythe", "Siomara", "Abril", "Anastacia", "Anthonia", "Arlette", "Charlotte", "Graciela", "Joaquina",
				"Maytte", "Polet", "Selena", "Escarlet", "Guadalupe", "Keyla", "Lilian", "Milagros", "Muriel", "Natacha",
				"Roxana", "Thayra", "Yanela", "Mabel", "Milena", "Pascalle", "Polette", "Sabina", "Ayline", "Ivania", "Zamira",
				"Ainara", "Aymar", "Barbara", "Flor", "Ingrid", "Mailen", "Mya", "Sarah", "Tabatha", "Tamar", "Thiara",
				"Alma", "Caroline", "Dana", "Darinka", "Estefany", "Francia", "Jacqueline", "Katrina", "Kelly", "Kendra",
				"Leslie", "Mila", "Naomi", "Silvana", "Stefania", "Tais", "Ágata", "Aylen", "Belen", "Cristel", "Damari",
				"Damarys", "Danahe", "Dayanna", "Denis", "Giulianna", "Lidia", "Marisol", "Maritza", "Sigrid", "Angeles",
				"Antonieta", "Ester", "Flavia", "Giselle", "Judith", "Lindsay", "Lizbeth", "Nadia", "Ninoska", "Úrsula",
				"Valeska", "Yesenia", "Alessandra", "Daniella", "Juana", "Juliette", "Kristel", "Kyara", "Madelein", "Nathalie",
				"Priscilla", "Sophía", "Vanesa", "Yasna", "Alba", "Analy", "Arantxa", "Avril", "Leyla", "Liliana", "Linda",
				"Liz", "Madeleyn", "Mayda", "Scarlette", "Simoney", "Tayra", "Teresita", "Vaitiare", "Anna", "Aynara",
				"Estefani", "Jenifer", "Jocelyn", "Lucero", "Moira", "Perla", "Rachel", "Soledad", "Catherine", "Dennis",
				"Edith", "Elisabet", "Eluney", "Joyce", "Karin", "Karol", "Mercedes", "Octavia", "París", "Rocio", "Valery",
				"Amapola", "Anahys", "Britany", "Ines", "Ivonne", "Kathia", "Konstanza", "Marianela", "Nathaly", "Piera",
				"Salomé", "Samara", "Yadira", "Yenifer", "Alexsandra", "Allyson", "Anahy", "Cynthia", "Giannella", "Gisela",
				"Gladys", "Juanita", "Keily", "Lesly", "Lucila", "Maríajosé", "Milagro", "Miriam", "Natalie", "Selene", "Yael",
				"Yanella", "Yarela", "Yendelin", "Yendelyn", "Alina", "Arianna", "Darlin", "Elsa", "Issidora", "Maciel", "Mailyn",
				"Marcia", "Mariel", "Raffaella", "Thyare", "Tiara", "Yamila", "Yessenia", "Aixa", "Deyanira", "Eileen",
				"Evelin", "Mara", "Maribel", "Marthyna", "Mical", "Nelly", "Oriana", "Rose", "Sharon", "Yhendelyn", "Ambar",
				"Anabella", "Anahiz", "Carol", "Cristal", "Dayra", "Dayris", "Katia", "Marta", "Maylen", "Pola", "Yolanda",
				"Ainhoa", "Anaiz", "Analía", "Arely", "Bianka", "Cinthia", "Dayanne", "Escarleth", "Irene", "Jhendelin", "Lya",
				"Martinna", "Masiel", "Micaela", "Nallely", "Rubí", "Soraya", "Stefany", "Susan", "Yamilet", "Yanina", "Yoselin",
				"Zahira", "Amaranta", "Annette", "Anthonela", "Darlyng", "Dayan", "Emili", "Gisella", "Iara", "Isamar", "Jimena",
				"Letizia", "Martha", "Maylin", "Mikaela", "Nahiara", "Naiara", "Norma", "Rosita", "Savka", "Tihare", "Abby",
				"Angeline", "Ashlie", "Aymara", "Betsabé", "Brithany", "Brittany", "Carola", "Cindy", "Cintia", "Doménica",
				"Evoleth", "Fanny", "Fátima", "Fransheska", "Gianela", "Johana", "Kasandra", "Katherin", "Liset", "Makarena",
				"Marian", "Mariapaz", "Martyna", "Melani", "Melody", "Miranda", "Nancy", "Nayra", "Ornella", "Stephany", "Tonka",
				"Vannia", "Zaira", "Ada", "Aída", "Alfonsina", "Asunción", "Dámaris", "Danna", "Dennise", "Dulce", "Elba",
				"Estefania", "Faloon", "Jossefa", "Lorenza", "Luana", "Milenka", "Naira", "Nayara", "Noemy", "Pia", "Roberta",
				"Thaís", "Vaithiare", "Yennifer", "Adela", "Amélie", "Angely", "Ania", "Aracelli", "Berenice", "Clarita", "Dafnne",
				"Dailyn", "Dakota", "Dominik", "Emilie", "Gabriella", "Guisela", "Iris", "Ivannia", "Jendelyn", "Jenny",
				"Kassandra", "Katherina", "Keila", "Lara", "Leah", "Mariangel", "Maya", "Naomy", "Nathalia", "Nayadeth",
				"Nayarett", "Nazareth", "Rebecca", "Rouse", "Sarita", "Skarleth", "Soffia", "Yessica", "Aimar", "Aleli", "Alysson",
				"Anabel", "Anastassia", "Augusta", "Baythiare", "Betzabeth", "Carolaine", "Casandra", "Cinthya", "Constansa",
				"Daiana", "Dalia", "Deisy", "Escarlett", "Franciska", "Geanella", "Giarella", "Gisselle", "Guianella", "Jasmine",
				"Johanna", "Karlita", "Lauryn", "Leonora", "Lisset", "Madelyn"
			),
			"firstNamesMale" => array(
				"Benjamín", "Vicente", "Martín", "Matías", "Joaquín", "Agustín", "Maximiliano", "Cristóbal", "Sebastián",
				"Tomás", "Diego", "José", "Nicolás", "Felipe", "Lucas", "Juan", "Alonso", "Bastián", "Gabriel", "Ignacio",
				"Francisco", "Renato", "Mateo", "Máximo", "Javier", "Luis", "Daniel", "Gaspar", "Carlos", "Angel",
				"Fernando", "Franco", "Emilio", "Pablo", "Santiago", "Cristian", "David", "Esteban", "Jorge", "Rodrigo",
				"Alexander", "Camilo", "Amaro", "Luciano", "Bruno", "Damián", "Alexis", "Alejandro", "Víctor", "Manuel",
				"Pedro", "Fabián", "Julián", "Kevin", "Miguel", "Simón", "Ian", "Thomas", "Eduardo", "Cristopher",
				"Andrés", "Dylan", "León", "Rafael", "Gustavo", "Leonardo", "Jean", "Gonzalo", "Álvaro", "Sergio", "Dante",
				"Ricardo", "Lukas", "Marcelo", "Alan", "Elías", "Oscar", "Mauricio", "Claudio", "Clemente", "Jesús",
				"Patricio", "Samuel", "Héctor", "Alex", "Ariel", "Emiliano", "Axel", "Roberto", "César", "Isaac", "Johan",
				"Jonathan", "Antonio", "Guillermo", "Mario", "Cristofer", "Ivan", "Aaron", "Christopher", "Justin",
				"Brayan", "Benjamin", "Marco", "Leandro", "Dilan", "Angelo", "Brandon", "Facundo", "Ezequiel", "Mathias",
				"Alfonso", "Isaias", "Raúl", "Christian", "Moisés", "Jordán", "Demian", "Enzo", "Josue", "Jaime", "Jeremy",
				"Valentín", "Raimundo", "Julio", "Bryan", "Exequiel", "Baltazar", "Ismael", "Salvador", "Giovanni",
				"Aníbal", "Gastón", "Matias", "Sebastian", "Marcos", "Abraham", "Arturo", "Williams", "Hans", "Martin",
				"Darío", "Joseph", "Erick", "Michael", "Jeremías", "Hugo", "Joshua", "Emanuel", "Joel", "Hernán", "Nelson",
				"John", "Thomás", "Anthony", "Octavio", "Bayron", "Cristobal", "Lorenzo", "Domingo", "Mauro", "Richard",
				"William", "Cristián", "Johans", "Amaru", "Josué", "Leonel", "Piero", "Joan", "Enrique", "Milovan", "Omar",
				"Rubén", "Jairo", "Gerardo", "Germán", "Andy", "Mariano", "Augusto", "Danilo", "Edgar", "Nicolas",
				"Alfredo", "Jose", "Aarón", "Paulo", "Rodolfo", "Oliver", "Félix", "Iker", "Max", "Paolo", "Jhon",
				"Steven", "Alberto", "Misael", "Joaquin", "Israel", "Adolfo", "Gerald", "Agustin", "Borja", "Maicol",
				"Said", "Edison", "Nahuel", "Tomas", "Alain", "Ángel", "Brian", "Maximo", "Bastian", "Eric", "Osvaldo",
				"Edward", "Lautaro", "René", "Bernardo", "Ethan", "Thiago", "Wladimir", "Boris", "Byron", "Jadiel",
				"Patrick", "Aquiles", "Bairon", "Emmanuel", "Juaquin", "Paul", "Abel", "Adrián", "Evan", "Ronald", "Alen",
				"Andrew", "Cristhian", "Iván", "Giovanny", "Jacob", "Robert", "Román", "Wilson", "Alessandro", "Branco",
				"Erik", "Iñaki", "Johann", "Lian", "Lionel", "Yohan", "Damian", "Jordan", "Maikol", "Mark", "Matteo",
				"Walter", "Yordan", "Aron38", "Stefano38", "Yeremi38", "Ernesto", "Gael", "Giuliano", "Jimmy", "Jason",
				"Orlando", "Aldo", "Emerson", "Evans", "Henry", "Samir", "Victor", "Jair", "Elian", "Federico", "Freddy",
				"Harold", "Italo", "Jonatan", "Rolando", "Xavier", "Yair", "Adán", "Alonzo", "Amir", "Braulio", "Dariel",
				"Renzo", "Valentino", "Didier", "Edgardo", "Ramón", "Santino", "Eidan", "Erwin", "Fabian", "Jostin",
				"Nikolas", "Robinson", "Vladimir", "Eydan", "Isaías", "Abdiel", "Cristhofer", "Darien", "Eloy", "Franko",
				"Jhonatan", "Luca", "Vincent", "Yonathan", "Efraín", "Gino", "Natanael", "Nehemias", "Yahir", "Yeremy",
				"Aidan", "Alvaro", "Jastin", "Julian", "Yastin", "Anderson", "Cesar", "Lucian", "Ramiro", "Tiago", "Edson",
				"Giordano", "Guido", "Juliano", "Maykol", "Milton", "Pascual", "Yadiel", "Yoel", "Carlo", "Darwin",
				"Flavio", "Frank", "Ihan", "Jhoan", "Roger", "Saúl", "Tristán", "Yerko", "Yoan", "Adiel", "Allan", "Antony",
				"Gerson", "Inti", "Liam", "Reinaldo", "André", "Andres", "Antoine", "Christofer", "Danny", "Derek",
				"Dorian", "Dustin", "Eliseo", "Elliot", "Gianfranco", "Heber", "Elias", "Fabio", "Jeison", "Jeremi",
				"Josias", "Leonidas", "Marcial", "Mirko", "Yeral", "Abner", "Alexsander", "Armando", "Austin", "Gary",
				"Iñigo", "Joao", "Jonas", "Jordano", "Mathías", "Nicholas", "Ulises", "Basthian", "Benito", "Dereck",
				"Dyland", "Edgard", "Edwin", "Jan", "Jesus", "Lucio", "Luckas", "Michel", "Nataniel", "Raphael", "Tobías",
				"Vittorio", "Anthuan", "Antuan", "Fredy", "Humberto", "Jhonny", "Matheo", "Néstor", "Simon", "Teo", "Uriel",
				"Alexi", "Antu", "Caleb", "Chris", "Gadiel", "Genaro", "Gerard", "Herman", "Jefferson", "Marlon", "Matthew",
				"Milan", "Yamil", "Yeison", "Yojan", "Yuliano", "Adonis", "Adriano", "Andre", "Apolo", "Branko", "Eder",
				"Edinson", "Emir", "Fabricio", "Gregorio", "James", "Jared", "Joakin", "Johao", "Kurt", "Marcel", "Maycol",
				"Naim", "Philippe", "Yulian", "Adam", "Allen", "Ander", "Cristofher", "Eduard", "Estefano", "Francesco",
				"Gian", "Jack", "Karim", "Luka", "Marthin", "Massimo", "Mattias", "Segundo", "Yan", "Yojhan", "Yoshua",
				"Yostin", "Baltasar", "Bautista", "Cristiano", "Denzel", "Eithan", "Fermín", "Franz", "Giancarlo", "Jahir",
				"Jeferson", "Jerson", "Lucciano", "Maickol", "Matia", "Noah", "Randy", "Santos", "Vasco", "Yamir", "Adriel",
				"Alén", "Angello", "Anyelo", "Axl", "Bruce", "Christobal", "Danko", "Dastin", "Dixon", "Elvis", "Eythan",
				"Fabiano", "Gregory", "Hector", "Iann", "Jeremmy", "Jim", "Kenneth", "Maikel", "Nicanor", "Ostin",
				"Silvestre", "Albert", "Christián", "Dayron", "Eleazar", "Eugenio", "Ever", "Farid", "Leo", "Lucca",
				"Lyan", "Miguelangel", "Roque", "Sandro", "Stefan", "Stiven", "Yohans", "Alexandre", "Aramis", "Benyamin",
				"Bladimir", "Blas", "Davor", "Deivid", "Favio", "Felix", "Fidel", "George", "Ían", "Isai", "Jerónimo",
				"Lenin", "Nathan", "Nathaniel", "Roy", "Tommy", "Willian", "Yeiko", "Yerson", "Adrian", "Ali", "Anibal",
				"Beltrán", "Billy", "Darian", "Davis", "Deivy", "Eduar", "Eliel", "Estiven", "Fabrizio", "Geremy",
				"Gianluca", "Giovani", "Ithan", "Ivo", "Jeremias", "Jhordan", "José-Tomás", "Josías", "Juanpablo", "Leon",
				"Lisandro", "Logan", "Moises", "Nahir", "Nain", "Neftalí", "Nehemías", "Neil", "Norman", "Pierre", "Raymond",
				"Remigio", "Renatto", "Roberth", "Roman", "Ronaldo", "Ryan", "Theo", "Valentin", "Vincenzo", "Yhan",
				"Yonatan", "Zahir", "Airon", "Aitor", "Américo", "Anton", "Armin", "Arthur", "Cristhoper", "Dan", "Demis",
				"Demyan", "Diogo", "Edwards", "Eliezer", "Franklin", "Geovanny", "Heydan", "Horacio", "Jeanpierre",
				"Jeyson", "Jhoel", "Johaquin", "Junior", "Kamilo", "Kevyn", "Kristopher", "Maiquel", "Marc", "Marck",
				"Martyn", "Mikel", "Nickolas", "Owen", "Raul", "Sami", "Stephano", "Stevens", "Tarek", "Yael", "Yerald",
				"Yovani", "Ademir", "Akiles", "Arnaldo", "Bástian", "Bernabé", "Dastyn", "Doménico", "Donovan", "Dusan",
				"Duvan", "Eber", "Eitan", "Elmer", "Exzequiel", "Goran", "Jans", "Jhans", "Jheremy", "Jhosep", "Johnny",
				"Jostyn", "Jovany", "Juan-Pablo", "Kai", "Kristobal", "Lenny", "Leopoldo", "Lester", "Luccas", "Magdiel",
				"Marko", "Mathyas", "Matthias", "Maykel", "Milán", "Nabih", "Nahum", "Nawel", "Noel", "Ociel", "Otoniel",
				"Pascal", "Pau", "Philip", "Phillip", "Romeo", "Ronal", "Salomón", "Sean", "Stephan", "Viktor", "Waldo",
				"Wilfredo", "Willians", "Yordano", "Zaid", "Zamir", "Aleen", "Alexandro", "Aliro", "Anakin", "Ariki", "Axcel",
				"Balthazar", "Bastían", "Benjamyn", "Braian", "Cristhobal", "Cristiàn", "Dámian", "Damir", "Deivi", "Demmian",
				"Deylan", "Eliam", "Elián", "Elio", "Eliot", "Eluney", "Fabrizzio", "Gamaliel", "Gaston", "Gean",
				"Geremías", "Giancarlos", "Giorgio", "Gorka", "Hernan", "Isaak", "Jacobo", "Jeans", "Jhostin", "Jordi",
				"Josep", "Josthyn", "Josúe", "Juanjose", "Kelvin", "Kenny", "Kilian", "Kristian", "Louis", "Manu", "Markus",
				"Mattia", "Maxi", "Maximilian", "Mijael", "Miqueas", "Mitchell", "Nahim", "Nair", "Nibaldo", "Nikolás",
				"Robin", "Rudy", "Sebastían", "Silvio", "Tiziano", "Vincen", "Yazid", "Yeferson", "Yeray", "Yosef", "Abrahan",
				"Abram", "Alann", "Aldair", "Amador", "Ancel", "Andriu", "Antü", "Antwan", "Arístides", "Augustin", "Aydan",
				"Ayron", "Bryam", "Cain", "Celso", "Chriss", "Christhian", "Crescente", "Dario", "Darko", "Daud", "Démian",
				"Dennis", "Dian", "Dieter", "Dominic", "Duban", "Dylann", "Eddie", "Elioth", "Ervin", "Ezekiel", "Gerónimo",
				"Gilberto", "Giuseppe", "Henrry", "Heriberto", "Ibrahim", "Ilian", "Isaí"
			),
			"lastNames" => array(
				"González", "Muñoz", "Rojas", "Díaz", "Pérez", "Soto", "Contreras", "Silva", "Martínez", "Sepúlveda",
				"Morales", "Rodríguez", "López", "Fuentes", "Hernández", "Torres", "Araya", "Flores", "Espinoza", "Valenzuela",
				"Castillo", "Ramírez", "Reyes", "Gutiérrez", "Castro", "Vargas", "Álvarez", "Vásquez", "Tapia", "Fernández",
				"Sánchez", "Carrasco", "Gómez", "Cortés", "Herrera", "Núñez", "Jara", "Vergara", "Rivera", "Figueroa",
				"Riquelme", "García", "Miranda", "Bravo", "Vera", "Molina", "Vega", "Campos", "Sandoval", "Orellana", "Zúñiga",
				"Olivares", "Alarcón", "Gallardo", "Ortiz", "Garrido", "Salazar", "Guzmán", "Henríquez", "Saavedra", "Navarro",
				"Aguilera", "Parra", "Romero", "Aravena", "Pizarro", "Godoy", "Peña", "Cáceres", "Leiva", "Escobar", "Yáñez",
				"Valdés", "Vidal", "Salinas", "Cárdenas", "Jiménez", "Ruiz", "Lagos", "Maldonado", "Bustos", "Medina", "Pino",
				"Palma", "Moreno", "Sanhueza", "Carvajal", "Navarrete", "Sáez", "Alvarado", "Donoso", "Poblete", "Bustamante",
				"Toro", "Ortega", "Venegas", "Guerrero", "Paredes", "Farías", "San Martín"
			)
		),
		"sweden" => array(
			"firstNamesFemale" => array(
				"Anna", "Maria", "Sofia", "Magdalena", "Sanna", "Sara", "Märta", "Eva", "Camilla",
				"Catarina", "Elena", "Eleonor", "Lisa", "Emma", "Erica",
				"Erika", "Silvia"
			),
			"firstNamesMale" => array(
				"Erik", "Anders", "Per", "Pär", "Hans", "Peter", "Petter", "Stefan", "Henrik",
				"Christian", "Kristian", "Fredrik", "Daniel", "Tomas", "Thomas"
			),
			"lastNames" => array(
				"Andersson", "Ericsson", "Eriksson", "Samuelsson", "Svensson", "Persson", "Staffansson", "Carlsson", "Karlsson", "Bodin"
			)
		),
		"india" => array(
			"firstNamesFemale" => array(
				"Aashika", "Abha", "Abhati", "Abhaya", "Abhidha", "Abhidhya", "Abhijna", "Abhilasa", "Abhilasha", "Abhinithi", "Abhiprithi", "Abhirathi", "Abhisri", "Abhithi", "Abja", "Aboil", "Achala", "Acira", "Adarsha", "Adhira", "Adishree", "Aditha", "Adithi", "Aditi", "Adrija", "Adrika", "Advika", "Adya", "Aghanashini", "Agrata", "Agrima", "Ahalya", "Ahilya", "Ahladita", "Ahladitha", "Aishani", "Aishwarya", "Ajala", "Ajanta", "Ajeeta", "Akalka", "Akanksha", "Akhila", "Akriti", "Akshaya", "Akshita", "Aksithi", "Akuti", "Alaka", "Alka", "Alaknanda", "Alisha", "Alka", "Almas", "Alopa", "Alpa", "Alpana", "Amala", "Amla", "Amani", "Amari", "Amarta", "Amba", "Ambalika", "Ambika", "Ambu", "Ambuda", "Ambuja", "Amita", "Amithi", "Amiya", "Amoda", "Amodini", "Amrapali", "Amrita", "Amritkala", "Amrusha", "Amshula", "Amulya", "Anagha", "Anahita", "Anala", "Anamika", "Anandalakshmi", "Anandamayi", "Anandi", "Anandini", "Anandita", "Anantha", "Anantya", "Ananya", "Anarghya", "Anasuya", "Anathi", "Anavi", "Anchal", "Anchita", "Angana", "Angarika", "Anhithi", "Anindita", "Aninditha", "Anisha", "Anita", "Anjali", "Anjalika", "Anjana", "Anju", "Anjushri", "Anjushree", "Ankita", "Ankitha", "Annapurna", "Anokhi", "Anshula", "Antara", "Antini", "Anuga", "Anula", "Anulekha", "Anumati", "Anunitha", "Anupama", "Anuprabha", "Anuradha", "Anuragini", "Anurati", "Anusha", "Anushri", "Anusri", "Anuva", "Anwesha", "Anya", "Apala", "Aparajita", "Aparijita", "Aparna", "Apeksha", "Apsara", "Apurva", "Apoorva", "Aradhana", "Arati", "Arati", "Aaarti", "Archa", "Archan", "Archana", "Archisha", "Archita", "Ariktha", "Arpana", "Arpita", "Arshia", "Aruna", "Arundhathi", "Arundhati", "Aruni", "Arunima", "Arushi", "Asavari", "Aseema", "Ashima", "Asgari", "Asha", "Ashakiran", "Ashalata", "Ashavari", "Ashis", "Ashna", "Ashoka", "Ashritha", "Ashwini", "Asita", "Aslesha", "Asmita", "Asvika", "Atasi", "Atmaja", "Atreyi", "Avani", "Avani", "Abani", "Avanti", "Avantika", "Ayesha", "Ayushmati",
				"Bageshri", "Bakula", "Bala", "Bandhura", "Bani", "Bhagyalakshmi", "Bhairavi", "Bhanuja", "Bharati", "Bhavana", "Bhavani", "Bhavya", "Bhuvana", "Bina", "Bindiya", "Brinda",
				"Cauvery", "Chadna", "Chahana", "Chaitali", "Chaitaly", "Chaitanya", "Chakori", "Chakrika", "Chameli", "Champa", "Champabati", "Champakali", "Champakavathi", "Champamalini", "Champika", "Chanasya", "Chanchala", "Chanda", "Chandalini", "Chandana", "Chandani", "Chandanika", "Chandika", "Chandni", "Chandrabali", "Chandrabhaga", "Chandrabindu", "Chandraja", "Chandrakala", "Chandraki", "Chandrakin", "Chandraleksha", "Chandramathi", "Chandramukhi", "Chandrani", "Chandratara", "Chandravathi", "Chandrika", "Chandrima", "Changuna", "Chapala", "Charita", "Charitra", "Charu", "Charulata", "Charulekha", "Charumati", "Charuprabha", "Charusheela", "Charusila", "Charvi", "Chatura", "Chayana", "Chellam", "Chetana", "Chhabi", "Chhavvi", "Chhaya", "Chimayi", "Chinmayi", "Chintan", "Chintana", "Chintanika", "Chiti", "Chitkala", "Chitra", "Chitragandha", "Chitralekha", "Chitrali", "Chitramala", "Chitramaya", "Chitrangada", "Chitrani", "Chitrarathi", "Chitrarekha", "Chitrita", "Chumban",
				"Dadhija", "Daksha", "Dakshakanya", "Dakshata", "Dakshayani", "Dakshina", "Dalaja", "Damayanti", "Damini", "Darika", "Darpana", "Darpanika", "Darshana", "Darshini", "Daya", "Dayamayee", "Dayanita", "Dayita", "Debanshi", "Deeba", "Deepa", "Deepabali", "Deepali", "Deepamala", "Deepana", "Deepanwita", "Deepaprabha", "Deepashikha", "Deepika", "Deepitha", "Deepta", "Deepti", "Deeptikana", "Deeptimoyee", "Deshna", "Devahuti", "Devak", "Devakanya", "Devaki", "Devalatha", "Devalekha", "Devamati", "Devamayi", "Devangana", "Devasmitha", "Devasree", "Devika", "Devina", "Devya", "Devyani", "Dhanalakshmi", "Dhanapriya", "Dhanashri", "Dhanishta", "Dhanya", "Dhanyata", "Dhara", "Dharani", "Dharini", "Dharitri", "Dhatri", "Dhitha", "Dhithi", "Dhriti", "Dhuthi", "Diksha", "Dilber", "Dilshad", "Disha", "Diti", "Divena", "Divya", "Doyel", "Draupadi", "Dristi", "Druthi", "Dulari", "Durga", "Durva", "Durba", "Dwipavati",
				"Ecchumati", "Edhitha", "Ehimaya", "Eka", "Ekadhana", "Ekaja", "Ekantha", "Ekanthika", "Ekaparana", "Ekata", "Ektaa", "Ekavali", "Ekisha", "Ekta", "Ela", "Elampirai", "Elavarasi", "Elili", "Enakshi", "Esha", "Eshana", "Eshanika", "Eshanya", "Eshika", "Eshita", "Ethaha", "Etasha",
				"Faiza", "Fajyaz", "Falguni", "Phalguni", "Farha", "Faria", "Farida", "Fatima", "Fatma", "Fawiza", "Firoza", "Foolan", "Phoolan", "Foolwati", "Phoolwati", "Fulki", "Fullara",
				"Gagana", "Gaganadipika", "Gaganasindhu", "Gajagamini", "Gajalakshmi", "Gajra", "Ganda", "Gandha", "Gandhali", "Gandhara", "Gandhari", "Gandharika", "Gandhini", "Ganga", "Ganga", "Gangotri", "Gangika", "Ganitha", "Garati", "Gargi", "Gathika", "Gatita", "Gauhar", "Gaura", "Gauri", "Gaurika", "Gautami", "Gayana", "Gayanthika", "Gayatri", "Gazala", "Geena", "Geeta", "Geeti", "Geetika", "Geshna", "Girija", "Girika", "Gita", "Gitali", "Gitanjali", "Gitika", "Godavari", "Gomati", "Gool", "Gopa", "Gopi", "Gopika", "Gopika", "Gorochana", "Gourangi", "Govindi", "Grhalakshmi", "Grhitha", "Gudiya", "Gulab", "Gulika", "Gunasundari", "Gunitha", "Gunjana", "Gunjika", "Gunjita", "Gunwanti", "Gurjari", "Gyanada",
				"Habiba", "Hafiza", "Haimavati", "Hamsa", "Hanima", "Hansa", "Hansanandini", "Hansaveni", "Hansika", "Hansini", "Hariganga", "Harijatha", "Harimanti", "Harinakshi", "Harini", "Haripriya", "Harita", "Harithi", "Harmya", "Harsha", "Harshada", "Harshini", "Harshita", "Harshitha", "Hasanthi", "Hasika", "Hasina", "Hasita", "Hasna", "Hasumati", "Hatisha", "Heera", "Hema", "Hemakshi", "Hemangi", "Hemangini", "Hemanti", "Hemanya", "Hemavati", "Hemlata", "Hena", "Henna", "Hetal", "Hima", "Himagouri", "Himani", "Hina", "Hindola", "Hiral", "Hiranmayi", "Hiranya", "Hiranyadha", "Hirkani", "Hita", "Hiya", "Holika", "Hoor", "Hradha", "Husna",
				"Ibha", "Idhika", "Idhitri", "Iha", "Ihina", "Ihitha", "Iksha", "Ikshana", "Ikshitha", "Ikshu", "Ila", "Ilampirai", "Ilavalagi", "Ilavenil", "Ilisha", "Ina", "Inayat", "Indira", "Indiya", "Indrakshi", "Indrani", "Indrasena", "Indratha", "Indrayani", "Indu", "Induja", "Indukala", "Indulala", "Induleksh", "Induma", "Indumati", "Indumukhi", "Inika", "Iniya", "Inkurali", "Ipsa", "Ipsita", "Ira", "Iraja", "Iravati", "Isai", "Isha", "Ishana", "Ishani", "Ishanika", "Ishanya", "Ishika", "Ishita", "Ishrat", "Ishwari", "Ivy", "Iyalisai",
				"Jabeen", "Jagadamba", "Jagathi", "Jagavi", "Jagrati", "Jagriti", "Jahanara", "Jaheel", "Jahnavi", "Jailekha", "Jaiman", "Jaimathi", "Jaipriya", "Jaishree", "Jaisudha", "Jaiwanti", "Jalabala", "Jaladhi", "Jaladhija", "Jalahasini", "Jalaja", "Jalanhili", "Jalela", "Jamini", "Jamuna", "Janaki", "Janani", "Janhavi", "Janhitha", "Janitha", "Jansi", "Januja", "Janya", "Jasoda", "Jasodhara", "Jaya", "Jayalakshmi", "Jayalalita", "Jayamala", "Jayani", "Jayanti", "Jayantika", "Jayaprada", "Jayashree", "Jayashri", "Jayati", "Jayita", "Jayitri", "Jayshri", "Jeeval", "Jeevankala", "Jeevanlata", "Jeevika", "Jenya", "Jetashri", "Jharna", "Jhilmil", "Jhinuk", "Jigya", "Jithya", "Jivika", "Joel", "Joshita", "Jowaki", "Juhi", "Jui", "Juily", "Jyoti", "Jyotibala", "Jyotika", "Jyotirmoyee", "Jyotishmati", "Jyotsna",
				"Kaandhal", "Kadambari", "Kadambini", "Kadhiroli", "Kahini", "Kaishori", "Kajal", "Kajjali", "Kajri", "Kakali", "Kala", "Kalaimagal", "Kalaka", "Kalandhika", "Kalanidhi", "Kalavati", "Kali", "Kalika", "Kalindi", "Kallol", "Kalpana", "Kalpini", "Kalpita", "Kalya", "Kalyani", "Kamadha", "Kamakshi", "Kamala", "Kamalakshi", "Kamali", "Kamalika", "Kamalini", "Kamalkali", "Kamana", "Kamika", "Kamini", "Kamitha", "Kamna", "Kampana", "Kamya", "Kana", "Kanak", "Kanaka", "Kanaka", "Kanakabati", "Kanaklata", "Kanakpriya", "Kanan", "Kananbala", "Kanchan", "Kanchana", "Kanchi", "Kandhara", "Kangana", "Kanika", "Kanimoli", "Kanitha", "Kanjari", "Kankana", "Kanmani", "Kanta", "Kanti", "Kanya", "Kanyana", "Kapalini", "Kapardini", "Kapila", "Kapotakshi", "Karabi", "Karishma", "Karuka", "Karuna", "Karunamayi", "Karunya", "Kashi", "Kashmira", "Kasturi", "Katyayani", "Kaumudi", "Kaushalya", "Kaushika", "Kavana", "Kaveri", "Kavika", "Kavini", "Kavita", "Kavya", "Kayalvili", "Keertana", "Kesar", "Kesari", "Keshi", "Keshika", "Keshini", "Ketaki", "Ketana", "Keya", "Khyati", "Kilimoli", "Kimaya", "Kiran", "Kiranmala", "Kirtana", "Kirti", "Kishori", "Kiya", "Kokila", "Komal", "Komala", "Koyel", "Krandasi", "Kranti", "Kripa", "Krishna", "Krishnaa", "Krishnakali", "Krithi", "Krithya", "Kriti", "Krittika", "Kriya", "Krupa", "Ksema", "Kshama", "Kshanika", "Kshithi", "Kumari", "Kumkum", "Kumud", "Kumudini", "Kunda", "Kundan", "Kundanika", "Kundini", "Kunjal", "Kunjalata", "Kunjana", "Kuntal", "Kuntala", "Kunti", "Kurangi", "Kurinji", "Kushala", "Kusum", "Kusuma", "Kusumanjali", "Kusumavati", "Kusumita", "Kusumlata", "Kuvalai", "Kuyil", "Kuyilsai",
				"Labangalata", "Laboni", "Lajja", "Lajjawati", "Lajwanti", "Lajwati", "Laksha", "Lakshana", "Lakshmi", "Lakshmishree", "Lalan", "Lalana", "Lali", "Lalima", "Lalita", "Lata", "Latangi", "Latika", "Lavali", "Lavangi", "Lavanya", "Leela", "Leelamayee", "Leelavati", "Leena", "Lekha", "Lily", "Lipi", "Lipika", "Lochan", "Lochana", "Lohita", "Lola", "Lona", "Lopa", "Lopamudra",
				"Madhavi", "Madhavilata", "Madhu", "Madhubala", "Madhuchhanda", "Madhuja", "Madhuksara", "Madhula", "Madhulata", "Madhulekha", "Madhulika", "Madhumalati", "Madhumati", "Madhumita", "Madhunisha", "Madhur", "Madhura", "Madhuri", "Madhurima", "Madhushri", "Madira", "Madirakshi", "Madri", "Madura", "Mahadevi", "Mahaganga", "Mahagauri", "Mahajabeen", "Mahalakshmi", "Mahamaya", "Mahasweta", "Mahati", "Mahi", "Mahijuba", "Mahika", "Mahima", "Mahitha", "Mahiya", "Mahua", "Mahubala", "Maina", "Maithili", "Mythili", "Maitra", "Maitreya", "Maitreyi", "Maitri", "Makshi", "Mala", "Malarvili", "Malashree", "Malati", "Malavika", "Malaya", "Malika", "Malina", "Malini", "Malliga", "Mallika", "Malti", "Mamata", "Manadha", "Manaka", "Manal", "Manali", "Manana", "Mananya", "Manasa", "Manasi", "Manasika", "Manasvi", "Manavi", "Manayi", "Manda", "Mandakini", "Mandakranta", "Mandana", "Mandara", "Mandarmalika", "Mandira", "Manditha", "Mandra", "Mangai", "Mangala", "Mangalya", "Manideepa", "Manik", "Manika", "Manikuntala", "Manimala", "Manimekhala", "Manini", "Manisha", "Manisha", "Mohisha", "Manisi", "Manisila", "Manisitha", "Manitha", "Maniya", "Manjari", "Manjira", "Manjistha", "Manju", "Manjubala", "Manjula", "Manjulika", "Manjusha", "Manjushri", "Manjusri", "Manjyot", "Manmayi", "Manorama", "Manoritha", "Manthika", "Manushri", "Manya", "Marala", "Marichi", "Marisa", "Markandeya", "Marudham", "Masilmani", "Matangi", "Maushmi", "Mausumi", "Maya", "Mayil", "Mayukhi", "Mayura", "Mayuri", "Mayurika", "Medha", "Medhani", "Medhya", "Medini", "Meena", "Meenakshi", "Meera", "Megha", "Meghamala", "Meghana", "Mehal", "Mehbooba", "Meher", "Mehrunissa", "Mehul", "Mekhala", "Mena", "Menaka", "Menitha", "Menmoli", "Mihika", "Milana", "Milika", "Minakshi", "Minal", "Minati", "Minnoli", "Mirium", "Mita", "Mitali", "Mithi", "Mithra", "Mohana", "Mohini", "Mohitha", "Moksha", "Monisha", "Mridula", "Mriganayani", "Mrinal", "Mrinali", "Mrinalini", "Mrinmayi", "Mrudani", "Mrudu", "Mudra", "Mudrika", "Mugdha", "Mukta", "Mukti", "Mukul", "Mullai", "Muniya", "Muskan", "Muthammal", "Mutholi", "Muthunagai", "Mythily",
				"Naaz", "Nabhanya", "Nabhitha", "Nabhya", "Nachni", "Nadira", "Naganandini", "Naganika", "Nagina", "Naima", "Naina", "Najma", "Nalina", "Nalini", "Namita", "Namrata", "Namya", "Nanda", "Nandana", "Nandika", "Nandini", "Nandita", "Nangai", "Narayani", "Narmada", "Narois", "Nartan", "Naseen", "Natun", "Nauka", "Navaneeta", "Naveena", "Naviya", "Navya", "Nayana", "Nayantara", "Nazima", "Neeharika", "Neela", "Neelabja", "Neelakshi", "Neelam", "Neelanjana", "Neelkamal", "Neepa", "Neeraja", "Neeta", "Neeti", "Neha", "Nehal", "Netra", "Netravati", "Nidhi", "Nidhyana", "Nidhyathi", "Nidra", "Niharika", "Nikhila", "Nikhita", "Nila", "Nilasha", "Nilavoli", "Nilaya", "Nileen", "Nilima", "Niloufer", "Nimisha", "Nina", "Niraimadhi", "Niral", "Niranjana", "Nirmala", "Nirmayi", "Nirmitha", "Nirupa", "Nirupama", "Nisha", "Nishithini", "Nishtha", "Nita", "Nitha", "Nithilam", "Niti", "Nitima", "Nitya", "Nityapriya", "Nivedita", "Nivritti", "Niyati", "Noopur", "Noor", "Noorjehan", "Nupura", "Nusrat", "Nutan", "Nuti",
				"Odathi", "Ojal", "Ojaswini", "Omala", "Omana", "Omvati", "Oviya",
				"Padma", "Padmaja", "Padmajai", "Padmakali", "Padmal", "Padmalaya", "Padmalochana", "Padmaroopa", "Padmavati", "Padmini", "Pakhi", "Pakshi", "Pallavi", "Pallavini", "Panchali", "Pankaja", "Panna", "Panya", "Parama", "Parameshwari", "Paramita", "Pari", "Paridhi", "Parinita", "Parnal", "Parnashri", "Parni", "Parnik", "Parnika", "Parthivi", "Parul", "Parvani", "Parvati", "Parveen", "Patmanjari", "Patralekha", "Pavana", "Pavani", "Payal", "Payoja", "Phiroza", "Phoolan", "Pia", "Piki", "Pingala", "Pival", "Piyali", "Pooja", "Poonam", "Poorbi", "Poornima", "Poorvi", "Poushali", "Prabha", "Prabhati", "Prachi", "Pradeepta", "Pradnaya", "Pragati", "Pragya", "Pragyaparamita", "Pragyawati", "Prama", "Pramada", "Pramila", "Pramiti", "Pranati", "Prapti", "Prarthana", "Prasana", "Prashansa", "Prashanti", "Prathysha", "Pratibha", "Pratigya", "Pratima", "Pratishtha", "Preeti", "Prem", "Prema", "Premala", "Premila", "Prerana", "Preyasi", "Prita", "Pritha", "Priti", "Pritika", "Pritikana", "Pritilata", "Priya", "Priyadarshini", "Priyal", "Priyam", "Priyamvada", "Priyanka", "Priyasha", "Puja", "Pujita", "Puloma", "Punam", "Poonam", "Punarnava", "Punita", "Punthali", "Purnima", "Purva", "Purvaja", "Pushpa", "Pushpanjali", "Pushpita", "Pusti", "Putul",
				"Quarrtulain", "Quasar",
				"Raakhi", "Rabia", "Rachana", "Rachita", "Rachna", "Radha", "Radhana", "Radhani", "Radhika", "Ragini", "Rajalakshmi", "Rajani", "Rajanigandha", "Rajata", "Rajdulari", "Rajeshwari", "Rajhans", "Rajitha", "Rajivini", "Rajkumari", "Rajnandhini", "Rajshri", "Raka", "Rakhi", "Raksha", "Rama", "Ramana", "Ramani", "Rambha", "Rameshwari", "Ramila", "Ramita", "Ramya", "Rangana", "Rangitha", "Ranhitha", "Rani", "Ranita", "Ranjana", "Ranjika", "Ranjini", "Ranjita", "Ranvitha", "Ranya", "Rashi", "Rashmi", "Rashmika", "Rasika", "Rasna", "Rathika", "Rati", "Ratna", "Ratnabala", "Ratnabali", "Ratnajyouti", "Ratnalekha", "Ratnali", "Ratnamala", "Ratnangi", "Ratnaprabha", "Ratnapriya", "Ratnavali", "Raviprabha", "Rehwa", "Rekha", "Renu", "Renuka", "Resham", "Reshma", "Reshmi", "Reva", "Revati", "Riddhi", "Riju", "Rijuta", "Rishika", "Rithika", "Riti", "Ritu", "Riya", "Rohini", "Rolee", "Roma", "Roshan", "Roshni", "Rubaina", "Ruchi", "Ruchira", "Ruchitha", "Rudrani", "Rudrapriya", "Ruhika", "Rujula", "Rujuta", "Rukma", "Rukmini", "Ruksana", "Ruma", "Rupa", "Rupali", "Rupashi", "Rupashri",
				"Sabita", "Sachi", "Sachika", "Sachita", "Sadaf", "Sadgati", "Sadguna", "Sadhan", "Sadhana", "Sadhika", "Sadhri", "Sadhvi", "Sadhya", "Sadiqua", "Saeeda", "Safia", "Sagari", "Sagarika", "Saguna", "Sahana", "Saheli", "Sahiba", "Sahila", "Sahitha", "Sai", "Sajala", "Sajili", "Sajni", "Sakhi", "Sakina", "Salena", "Salila", "Salima", "Salma", "Samata", "Sameena", "Samhita", "Samidha", "Samika", "Samiksha", "Samit", "Samita", "Sammathi", "Sampada", "Sampatti", "Sampriti", "Samrithi", "Sana", "Sananda", "Sanchali", "Sanchaya", "Sanchita", "Sandhaya", "Sandhya", "Sangita", "Sanika", "Sanithi", "Saniya", "Sanjana", "Sanjivani", "Sanjukta", "Sanjula", "Sanjushree", "Sankari", "Sankul", "Sannidhi", "Sanskriti", "Santawana", "Santayani", "Sanvali", "Sanwari", "Sanyakta", "Sanyukta", "Saparna", "Saphala", "Sapna", "Sarada", "Sarakshi", "Sarala", "Sarama", "Sarani", "Saranya", "Sarasa", "Sarasi", "Sarasvati", "Saraswati", "Saravati", "Sarayu", "Sarbani", "Sarika", "Sarit", "Sarita", "Sarjana", "Saroj", "Saroja", "Sarojini", "Saruprani", "Sarvari", "Sarvika", "Saryu", "Sashi", "Sasmita", "Sati", "Satya", "Satyarupa", "Satyavati", "Saudamini", "Saujanya", "Saumya", "Savarna", "Savita", "Savitashri", "Savitri", "Sawini", "Sayeeda", "Seema", "Seemanti", "Seemantini", "Seerat", "Sejal", "Selma", "Semanti", "Serena", "Sevati", "Sevita", "Shabab", "Shabalini", "Shabana", "Shabari", "Shabnum", "Shachi", "Shagufta", "Shaheena", "Shaila", "Shailaja", "Shaili", "Shakambari", "Shakeel", "Shakeela", "Shakti", "Shakuntala", "Shalaka", "Shalin", "Shalini", "Shalmali", "Shama", "Shambhavi", "Shameena", "Shamim", "Shamita", "Shampa", "Shankari", "Shankhamala", "Shanta", "Shantala", "Shanti", "Sharada", "Sharadini", "Sharanya", "Sharika", "Sharmila", "Sharmistha", "Sharvani", "Sharvari", "Shashi", "Shashibala", "Shashirekha", "Shaswati", "Shatarupa", "Sheela", "Sheetal", "Shefali", "Shefalika", "Shejali", "Shekhar", "Shevanti", "Shibani", "Shikha", "Shilavati", "Shilpa", "Shilpita", "Shinjini", "Shipra", "Shirin", "Shishirkana", "Shiuli", "Shivangi", "Shivani", "Shivanne", "Shobha", "Shobhana", "Shobhita", "Shobhna", "Shorashi", "Shraddha", "Shradhdha", "Shravana", "Shrabana", "Shravani", "Shravanti", "Shravasti", "Shree", "Shreela", "Shreemayi", "Shreeparna", "Shrestha", "Shreya", "Shreyashi", "Shri", "Shridevi", "Shridula", "Shrigauri", "Shrigeeta", "Shrijani", "Shrikirti", "Shrikumari", "Shrilata", "Shrilekha", "Shrimati", "Shrimayi", "Shrivalli", "Shruti", "Shubha", "Shubhada", "Shubhangi", "Shubhra", "Shuchismita", "Shuchita", "Shukla", "Shukti", "Shulka", "Shweta", "Shyama", "Shyamal", "Shyamala", "Shyamali", "Shyamalika", "Shyamalima", "Shyamangi", "Shyamari", "Shyamasri", "Shyamlata", "Shyla", "Sibani", "Siddheshwari", "Siddhi", "Siddhima", "Sikata", "Sikta", "Simran", "Smaram", "Simrit", "Smrita", "Sindhu", "Sinsapa", "Sita", "Sitara", "SivaSankari", "Siya", "Smita", "Smriti", "Sneh", "Sneha", "Snehal", "Snehalata", "Snigdha", "Sohalia", "Sohana", "Sohni", "Soma", "Somalakshmi", "Somansh", "Somatra", "Sona", "Sonakshi", "Sonal", "Sonali", "Sonam", "Sonia", "Sonika", "Soorat", "Soumya", "Sourabhi", "Sphatika", "Sragvi", "Sristi", "Sriya", "Stavita", "Stuti", "Subarna", "Subhadra", "Subhaga", "Subhagya", "Subhashini", "Subhuja", "Subrata", "Suchandra", "Sucharita", "Sucheta", "Suchi", "Suchira", "Suchita", "Suchitra", "Sudakshima", "Sudarshana", "Sudeepa", "Sudeepta", "Sudeshna", "Sudevi", "Sudha", "Sudhamayi", "Sudhira", "Sudhithi", "Sudipta", "Sudipti", "Sugita", "Sugouri", "Suhag", "Suhaila", "Suhasini", "Suhela", "Suhina", "Suhitha", "Suhrita", "Sujala", "Sujata", "Sujaya", "Sukanya", "Sukeshi", "Sukriti", "Suksma", "Sukthi", "Sukumari", "Sulabha", "Sulakshana", "Sulalita", "Sulekh", "Suloch", "Sulochana", "Sultana", "Sumana", "Sumanolata", "Sumati", "Sumedha", "Sumita", "Sumitra", "Sunanda", "Sunandini", "Sunandita", "Sunaya", "Sunayana", "Sunayani", "Sundari", "Sundha", "Suneeti", "Sunetra", "Sunila", "Sunita", "Suniti", "Suparna", "Suprabha", "Supriti", "Supriya", "Surabhi", "Suraksha", "Surama", "Suranjana", "Suravinda", "Surekha", "Surina", "Surotama", "Suruchi", "Surupa", "Surya", "Suryakanti", "Sushama", "Sushanti", "Sushila", "Sushma", "Sushmita", "Sushobhana", "Susita", "Susmita", "Sutanuka", "Sutapa", "Suvarna", "Suvarnaprabha", "Suvarnarekha", "Suvarnmala", "Swagata", "Swaha", "Swapna", "Swapnali", "Swapnasundari", "Swarnalata", "Swarupa", "Swasti", "Swati", "Sweta", "Swetha",
				"Tabassum", "Talikha", "Tamali", "Tamalika", "Tamanna", "Tamasa", "Tamasi", "Tambura", "Tanaya", "Tanika", "Tanima", "Tanmaya", "Tannishtha", "Tanseem", "Tanu", "Tanuja", "Tanuka", "Tanushri", "Tanvi", "Tapani", "Tapasi", "Tapati", "Tapi", "Tapti", "Tara", "Taraka", "Tarakeshwari", "Tarakini", "Tarala", "Tarana", "Tarangini", "Tarannum", "Tarika", "Tarini", "Tarjani", "Taru", "Tarulata", "Taruni", "Tarunika", "Tarunima", "Tatini", "Teertha", "Teesta", "Tehzeeb", "Teja", "Tejal", "Tejashree", "Tejaswi", "Tejaswini", "Thamarai", "ThamilSelvi", "ThenMoli", "Thenral", "Thulasi", "Thumri", "Tilaka", "Tilottama", "Timila", "Titiksha", "Toral", "Treya", "Tridhara", "Triguna", "Triguni", "Trikaya", "Trilochana", "Trinayani", "Trinetra", "Triparna", "Tripta", "Tripti", "Tripurasundari", "Tripuri", "Trisha", "Trishala", "Trishna", "Triveni", "Triya", "Triyama", "Trupti", "Trusha", "Tuhina", "Tulasi", "Tulika", "Tusharkana", "Tusti", "Tvarika", "Tvesa",
				"Udaya", "Udita", "Uditi", "Ujas", "Ujjanini", "Ujjwala", "Ujwala", "Ujjala", "Ulka", "Ulupi", "Uma", "Umika", "Umrao", "Unnati", "Upala", "Upama", "Upasana", "Ura", "Urja", "Urmi", "Urmila", "Urmila", "Urmil", "Urmimala", "Urna", "Urshita", "Urvashi", "Urvasi", "Urvi", "Usha", "Ushakiran", "Ushashi", "Ushma", "Usri", "Uthami", "Utpala", "Utpalini", "Utsa", "Uttara",
				"Vagdevi", "Vahini", "Vaidehi", "Vaijayanti", "Vaijayantimala", "Vaishali", "Vaishavi", "Vaishnodevi", "Vajra", "Vallari", "Valli", "Vallika", "Vama", "Vanadurga", "Vanaja", "Vanamala", "Vanani", "Vanathi", "Vanca", "Vandana", "Vanhi", "Vanhishikha", "Vani", "Vanita", "Vanmala", "Vanshika", "Varada", "Varana", "Vari", "Varija", "Varsha", "Varuna", "Varuni", "Vasanta", "Vasanti", "Vasavi", "Vasudha", "Vasudhara", "Vasumati", "Vasundhara", "Vatsala", "Vedi", "Vedika", "Vedvalli", "Veena", "Veenapani", "VeeraSundari", "Vela", "Vennela", "Vetravati", "Vibha", "Vibhavari", "Vibhuti", "Vidhut", "Vidula", "Vidya", "Vidyul", "Vidyut", "Vijaya", "Vijayalakshmi", "Vijeta", "Vijul", "Vilasini", "Vilina", "Vimala", "Vinanti", "Vinata", "Vinaya", "Vindhya", "Vineeta", "Vinita", "Vinoda", "Vinodini", "Vinodini", "Vinutha", "Vipasa", "Vipula", "Virata", "Visala", "Vishakha", "Vishala", "Vishalakshi", "Vishaya", "Vishnumaya", "Vishnupriya", "Viveka", "Vrajabala", "Vrinda", "Vritti", "Vyanjana", "Vyjayanti",
				"Waheeda", "Wamika", "Wamil",
				"Yaalini", "Yaalisai", "Yajna", "Yamini", "Yamuna", "Yamya", "Yashawanthi", "Yashawini", "Yashila", "Yashoda", "Yogini", "Yogita", "Yosana", "Yuktha", "Yuthika", "Yuvika"
			),
			"firstNamesMale" => array(
				"Aachman", "Aadesh", "Aadi", "Aafreen", "Aakar", "Aakash", "Aalap", "Aandaleeb", "Aashish", "Abeer", "Abhay", "Abhayananda", "Abhayaprada", "Abheek", "Abhi", "Abhibhava", "Abhicandra", "Abhidi", "Abhihita", "Abhijat", "Abhijaya", "Abhijit", "Abhijvala", "Abhilash", "Abhimand", "Abhimani", "Abhimanyu", "Abhimanyusuta", "Abhimoda", "Abhinabhas", "Abhinanda", "Abhinandana", "Abhinatha", "Abhinav", "Abhinava", "Abhirup", "Abhishek", "Abhisoka", "Abhisumat", "Abhisyanta", "Abhivira", "Abhra", "Abhrakasin", "Abhyagni", "Abhyudaya", "Abhyudita", "Abjayoni", "Abjit", "Acalapati", "Acalendra", "Acalesvara", "Acanda", "Acarya", "Acaryanandana", "Acaryasuta", "Acaryatanaya", "Acchindra", "Achal", "Achintya", "Achyut", "Achyuta", "Acintya", "Acyutaraya", "Adalarasu", "Adarsh", "Adesh", "Adhik", "Adhikara", "Adhipa", "Adhita", "Adikavi", "Adil", "Adinath", "Adit", "Aditeya", "Aditya", "Adityanandana", "Adityavardhana", "Adripathi", "Adwaita", "Adway", "Adwaya", "Aftab", "Agasti", "Agendra", "Agha", "Agharna", "Aghat", "Agneya", "Agnikumara", "Agniprava", "Agrim", "Agriya", "Ahijit", "Ahilan", "Ahmad", "Ahsan", "Aijaz", "Aiman", "Ainesh", "Ajamil", "Ajatashatru", "Ajay", "Ajinkya", "Ajit", "Ajitabh", "Ajitesh", "Ajmal", "Akalmash", "Akalpa", "Akash", "Akhil", "Akhilesh", "Akmal", "Akram", "Akroor", "Akshan", "Akshar", "Akshat", "Akshath", "Akshay", "Akshit", "Akul", "Alagan", "Alagarasu", "Alam", "Alamgir", "Alhad", "Alok", "Aloke", "Amal", "Amalendu", "Amalesh", "Amanath", "Amanda", "Amar", "Amartya", "Ambar", "Ambarish", "Ambuj", "Ameya", "Amil", "Amish", "Amit", "Amitabh", "Amitabha", "Amitava", "Amitbikram", "Amitesh", "Amitiyoti", "Amitrasudan", "Amiya", "Amlankusum", "Ammar", "Amod", "Amogh", "Amoha", "Amol", "Amolik", "Amrit", "Amrit", "Amulya", "Anadi", "Anamitra", "Anand", "Ananda", "Ananga", "Ananmaya", "Anant", "Ananta", "Anantram", "Anarghya", "Anbarasu", "Anbu", "Anbuchelvan", "Anbumadi", "Angad", "Angada", "Angamuthu", "Anil", "Animish", "Anirudhha", "Anirvan", "Anisa", "Anish", "Aniteja", "Anjasa", "Anjum", "Anjuman", "Ankit", "Ankur", "Ankush", "Anmol", "Anoop", "Anshu", "Anshul", "Anshuman", "Anshumat", "Anu", "Anugya", "Anuha", "Anuj", "Anunay", "Anup", "Anupam", "Anurag", "Anurag", "Anuttam", "Anwar", "Apoorva", "Apparajito", "Apurva", "Arav", "Aravali", "Aravan", "Archan", "Archit", "Ardhendu", "Arghya", "Arham", "Arhant", "Arihant", "Arijit", "Arindam", "Arivalagan", "Arivali", "Arivarasu", "Arivoli", "Arivuchelvan", "Arivumadhi", "Arivumani", "Arivunambi", "Arjit", "Arjun", "Arka", "Arnav", "Arnesh", "Arokya", "Arshad", "Arul", "Arulchelvan", "Arumugan", "Arun", "Arun", "Aruni", "Arvind", "Arvinda", "Arya", "Aryaman", "Asao", "Asgar", "Ashis", "Ashok", "Ashraf", "Ashu", "Ashutosh", "Ashvin", "Ashwatthama", "Ashwin", "Ashwini", "Asit", "Aslesh", "Atal", "Atanu", "Atiya", "Atma", "Atmaja", "Atmajyoti", "Atmananda", "Atralarasu", "Atreya", "Atul", "Atul", "Atulya", "Avadhesh", "Avanindra", "Avanish", "Avatar", "Avikshit", "Avinash", "Avkash", "Ayog", "Ayushman", "Ayyapan",
				"Badal", "Badri", "Badrinath", "Badriprasad", "Bahubali", "Bahuleya", "Bahumanya", "Bahurai", "Bajrang", "Bakhtawar", "Balaaditya", "Balachandra", "Balachandrav", "Baladhi", "Baladhitya", "Balagovind", "Balaji", "Balakrishna", "Balakumar", "Balamani", "Balamohan", "Balamurugan", "Balan", "Balanath", "Balaraj", "Balaram", "Balaravi", "Balbir", "Baldev", "Balgopal", "Balram", "Balvindra", "Balwant", "Banbihari", "Bandhu", "Bandhul", "Bankebihari", "Bankim", "Bankimchandra", "Bansi", "Bansilal", "Barid", "Baridbaran", "Barindra", "Barun", "Basanta", "Basavaraj", "Basistha", "Basudha", "Bhadrak", "Bhadraksh", "Bhadrang", "Bhadranidhi", "Bhagaditya", "Bhagat", "Bhagirat", "Bhagirath", "Bhagwant", "Bhagyanandana", "Bhairav", "Bhajan", "Bhanu", "Bhanudas", "Bhanuprasad", "Bharadwaj", "Bharat", "Bhargava", "Bhargyaraj", "Bhaskar", "Bhaumik", "Bhavamanyu", "Bhavesh", "Bhim", "Bhishma", "Bhojaraja", "Bhooshan", "Bhooshit", "Bhudev", "Bhumi", "Bhupathi", "Bhupen", "Bhupendra", "Bhushan", "Bhuvan", "Bhuvanesh", "Bibek", "Bibhas", "Bibhavasu", "Bijal", "Bikram", "Bilva", "Bimal", "Bindusar", "Bipin", "Birbal", "Bitasok", "Bodhan", "Boudhayan", "Brahmabrata", "Brahmadutt", "Bratindra", "Brijesh", "Brijmohan", "Buddhadev", "Buddhadeva", "Budhil", "Bukka",
				"Chaitanya", "Chakor", "Chakradev", "Chakradhar", "Chakrapani", "Chakshu", "Chaman", "Chamanlal", "Champak", "Chanakya", "Chanchal", "Chandak", "Chandan", "Chandra", "Chandrabhan", "Chandrachur", "Chandrahas", "Chandrak", "Chandrakanta", "Chandrakiran", "Chandrakirthi", "Chandrakishore", "Chandrakumar", "Chandramohan", "Chandran", "Chandranath", "Chandraprakash", "Chandraraj", "Chandrashekar", "Chandrashekhar", "Chandratha", "Chandresh", "Chandrodaya", "Chanyana", "Chapal", "Charan", "Charanjit", "Charu", "Charudatta", "Charudutta", "Charuvardhana", "Charuvindha", "Chaturbhuj", "Cheliyan", "Chellamani", "Chellamuthu", "Chellapan", "Chemmal", "Chetan", "Chetana", "Chevatkodiyon", "Chhandak", "Chidambar", "Chidambaram", "Chidananda", "Chiman", "Chinmay", "Chinmayananda", "Chinnadurai", "Chintamani", "Chintan", "Chinthanaichelvan", "Chintya", "Chirag", "Chiranjeev", "Chirantan", "Chirayu", "Chirtrang", "Chithayu", "Chitrabhanu", "Chitragupta", "Chitraksh", "Chitral", "Chitrarath", "Chitrasen", "Chitresh", "Chitta", "Chittaprasad", "Chittaranjan", "Chittaswarup", "Chittesh", "Chudamani",
				"Dabeet", "Daha", "Daivya", "Daiwik", "Daksha", "Dakshesh", "Dakshi", "Dakshina", "Dalajit", "Dalapathi", "Dalbhya", "Daman", "Damian", "Damodar", "Danuj", "Danvir", "Darpak", "Darpan", "Darshan", "Daruka", "Dasharath", "Dasharathi", "Dasmaya", "Dattatreya", "Dayada", "Dayakara", "Dayanand", "Dayanidhi", "Dayasagara", "Dayashankar", "Debashis", "Debashish", "Deenabandhu", "Deep", "Deepak", "Deepan", "Deepankar", "Deependra", "Deependu", "Deepesh", "Deepit", "Deeptanshu", "Deeptendu", "Deeptiman", "Deeptimoy", "Dev", "Dev", "Devabrata", "Devachandra", "Devadarshan", "Devadas", "Devadatta", "Devadhipa", "Devadutt", "Devadyumna", "Devajyoti", "Devak", "Devakantha", "Devamadana", "Devanand", "Devang", "Devaraj", "Devarpana", "Devarsi", "Devarya", "Devdas", "Devdutta", "Devendra", "Devesh", "Deveshwar", "Devilal", "Deviprasad", "Devnarayan", "Devnath", "Devraj", "Devya", "Dhanajit", "Dhananjay", "Dhanesh", "Dhanraj", "Dhansukh", "Dhanvant", "Dharanidhar", "Dharendra", "Dharma", "Dharmachandra", "Dharmadas", "Dharmadev", "Dharmaditya", "Dharmanand", "Dharmendra", "Dharmendu", "Dharmesh", "Dharmpal", "Dharmveer", "Dhaval", "Dhavalachandra", "Dhawal", "Dheeman", "Dheemant", "Dheer", "Dheeran", "Dheerendra", "Dheivamani", "Dhevan", "Dhevaneyan", "Dhikshit", "Dhinakar", "Dhinanta", "Dhipin", "Dhiraj", "Dhiren", "Dhirendra", "Dhritiman", "Dhruv", "Dhvanya", "Dhwani", "Dhyana", "Dhyanesh", "Digamber", "Dilawar", "Dilip", "Dinanath", "Dinapati", "Dinar", "Dindayal", "Dinesh", "Dinkar", "Divakar", "Divyanga", "Divyendu", "Divyesh", "Drupad", "Dulal", "DuraiMurugan", "Duranjaya", "Durjaya", "Dushyanta", "Dwaipayan", "Dwijaraj", "Dwijendra", "Dwijesh", "Dyumani", "Dyutit",
				"Edhas", "Edi", "Ednit", "Eeshwar", "Egaiarasu", "Eha", "Ehimay", "Eka", "Ekachandra", "Ekachith", "Ekagrah", "Ekaksha", "Ekalavya", "Ekalinga", "Ekambar", "Ekana", "Ekanath", "Ekanga", "Ekansh", "Ekapad", "Ekaraj", "Ekatan", "Eknath", "Ekram", "Elango", "Elil", "Elilarasan", "Elilarasu", "Elilvendan", "Ellu", "Elumalai", "Eshwar", "Etash", "Evyavan",
				"Faakhir", "Faaris", "Faarooq", "Fadi", "Fadl", "Fadl", "Fahad", "Faisal", "Faiyaz", "Faiz", "Fakhry", "Falak", "Falgu", "Falguni", "Fanibhusan", "Fanindra", "Fanish", "Fanishwar", "Faraz", "Fareed", "Farhad", "Farhat", "Farid", "Faris", "Farukh", "Fateen", "Fateh", "Fatik", "Fawaz", "Fidaa", "Firdaus", "Firoz", "Fravash", "Fuad",
				"Gagan", "Gaganvihari", "Gajanan", "Gajanand", "Gajendra", "Ganaka", "Ganapati", "Ganaraj", "Gandesha", "Gandhar", "Gandharaj", "Gandharva", "Gandhik", "Gandira", "Ganendra", "Ganesh", "Gangadhar", "Gangadutt", "Gangesh", "Gangeya", "Gangol", "Ganjan", "Garisht", "Gaurang", "Gaurav", "Gaurinath", "Gautam", "Gavisht", "Gayak", "Gayan", "Geet", "Ghalib", "Ghanashyam", "Giri", "Giridari", "Giridhar", "Girik", "Girilal", "Girindra", "Giriraj", "Girish", "Gokul", "Gopal", "Gopan", "Gopesh", "Gopichand", "Gorakh", "Gourishankar", "Govind", "Govinda", "Grahish", "Granthik", "Grihith", "Gudakesha", "Gulab", "Gulfam", "Gulzar", "Gulzarilal", "Gunalan", "Gunaratna", "Gunayukth", "Gunjan", "Gunwant", "Gupil", "Gurbachan", "Gurcharan", "Gurdayal", "Gurdeep", "Gurmeet", "Gurnam", "Gurpreet", "Gursharan", "Guru", "Gurudas", "Gurudutt", "Gyan", "Gyandev",
				"Habib", "Hafiz", "Hakesh", "Hamid", "Hamir", "Hans", "Hansaraj", "Hanuman", "Hanumant", "Hardik", "Harekrishna", "Harendra", "Haresh", "Hari", "Haridas", "Harigopal", "Harihar", "Harikanth", "Harilal", "Harinaksh", "Harinarayan", "Hariom", "Hariprasad", "Hariraj", "Hariram", "Harish", "Harishankar", "Harishchandra", "Haritbaran", "Harith", "Harjeet", "Harkrishna", "Harmendra", "Haroon", "Harsh", "Harsha", "Harshad", "Harshal", "Harshaman", "Harshavardhan", "Harshil", "Harshit", "Harshul", "Harshvardhan", "Hashmat", "Hasit", "Hassan", "Heer", "Hem", "Hemachandra", "Hemadri", "Hemamdar", "Heman", "Hemang", "Hemanga", "Hemant", "Hemaraj", "Hemendra", "Hemendu", "Heramba", "Himachal", "Himadri", "Himaghna", "Himanshu", "Himmat", "Himnish", "Hiranmay", "Hiranya", "Hirendra", "Hiresh", "Hitendra", "Hriday", "Hridayanand", "Hridayesh", "Hridaynath", "Hridik", "Hriman", "Hrishikesh", "Hritish", "Hurditya", "Hussain",
				"Ibhanan", "Ibhya", "Ibrahim", "Idris", "Iham", "Ihit", "Ikshu", "Ilaiyavan", "Ilamporai", "Ilamurugu", "Ilancheliyan", "Ilandevan", "Ilango", "Ilanthirayan", "Ilavalagan", "Ilavarasan", "Ilavenil", "Ilesh", "Iman", "Imaran", "Imtiaz", "Inakanta", "Inbanathan", "Indeever", "Indivar", "Indra", "Indradutt", "Indrajeet", "Indrajit", "Indrakanta", "Indraneel", "Indrasena", "Indrasuta", "Indratan", "Indubhushan", "Induhasan", "Indukanta", "Indulal", "Indumat", "Indushekhar", "Inesh", "Iniyavan", "Intekhab", "Iqbal", "Iraiyavan", "Irfan", "Iri", "Irshaad", "Irya", "Isaiarasu", "Isaivalan", "Isar", "Ishan", "Ishrat", "Ishwar", "Itish", "Iyyappan", "Izhar",
				"Jadhav", "Jag", "Jagachandra", "Jagad", "Jagadayu", "Jagadbandu", "Jagadeep", "Jagadev", "Jagadhidh", "Jagadip", "Jagadish", "Jagajeet", "Jagajeevan", "Jagan", "Jaganmay", "Jagannath", "Jagath", "Jagesh", "Jagjeevan", "Jagmohan", "Jahan", "Jai", "Jaichand", "Jaidayal", "Jaidev", "Jaigath", "Jaigopal", "Jaikrishna", "Jaimini", "Jainarayan", "Jaipal", "Jairaj", "Jaisal", "Jaishankar", "Jaisukh", "Jaitra", "Jaiwant", "Jalad", "Jalal", "Jalendra", "Jalendu", "Jalil", "Jalindra", "Janak", "Janamejay", "Janardan", "Janav", "Janith", "Janya", "Japa", "Japan", "Japendra", "Japesh", "Jasamit", "Jasapal", "Jasbeer", "Jashan", "Jashun", "Jaspal", "Jasraj", "Jasveer", "Jaswant", "Jatan", "Jatin", "Jatya", "Javed", "Javin", "Jawahar", "Jayad", "Jayadeep", "Jayaditya", "Jayant", "Jayanta", "Jayashekhar", "Jaysukh", "Jeemutbahan", "Jeevan", "Jehangir", "Jenya", "Jhoomer", "Jignesh", "Jihan", "Jinendra", "Jishnu", "Jitendra", "Jivitesh", "Jnyandeep", "Jnyaneshwar", "Jogindra", "Jograj", "Jugnu", "Jujhar", "Jusal", "Jyotichandra", "Jyotiprakash", "Jyotiranjan", "Jyotirdhar", "Jyotirmoy",
				"Kabir", "Kailas", "Kailash", "Kailashchandra", "Kailashnath", "Kalapriya", "Kalash", "Kalicharan", "Kalidas", "Kalimohan", "Kalipada", "Kaliranjan", "Kalith", "Kalpa", "Kalya", "Kalyan", "Kamadev", "Kamal", "Kamalakar", "Kamalapati", "Kamalesh", "Kamalnayan", "Kaman", "Kamat", "Kamik", "Kamlesh", "Kamod", "Kamraj", "Kamran", "Kamukh", "Kanad", "Kanak", "Kanal", "Kanan", "Kanchan", "Kandan", "Kandarpa", "Kanha", "Kanhaiya", "Kanhaiyalal", "Kanishka", "Kanishta", "Kantilal", "Kantimoy", "Kanu", "Kanvar", "Kanwal", "Kanwaljeet", "Kanwalkishore", "Kapil", "Kapish", "Karan", "Kareem", "Karna", "Karnik", "Kartar", "Kartik", "Kartikeya", "Karun", "Karunakar", "Karunamay", "Karunashankar", "Kashif", "Kashinath", "Kashiprasad", "Kashyap", "Kathith", "Kaunteya", "Kausar", "Kaushal", "Kaushik", "Kaustav", "Kaustubh", "Kavan", "Kavi", "Kaviraj", "Kedar", "Kedarnath", "Keshav", "Ketan", "Kevalkishore", "Kevalkumar", "Keyur", "Khadim", "Khajit", "Khalid", "Khazana", "Khemchand", "Khemprakash", "Khushal", "Kinshuk", "Kiran", "Kiranmay", "Kirik", "Kirit", "Kirtikumar", "Kishore", "Kishorekumar", "Kotijit", "Kovida", "Kriday", "Kripal", "Krishanu", "Krishna", "Krishnachandra", "Krishnadeva", "Krishnakanta", "Krishnakumar", "Krishnala", "Krishnamurari", "Krishnamurthy", "Krishnaroop", "Krishnendu", "Kshaunish", "Kuber", "Kuberchand", "Kularanjan", "Kulbhushan", "Kuldeep", "Kulik", "Kumar", "Kunal", "Kundan", "Kundanlal", "Kundir", "Kunja", "Kunjabihari", "Kush", "Kushal", "Kusumakar",
				"Lagan", "Lakshin", "Lakshman", "Lakshmibanta", "Lakshmidhar", "Lakshmigopal", "Lakshmikanta", "Lalit", "Lalitaditya", "Lalitchandra", "Lalitkishore", "Lalitkumar", "Lalitmohan", "Lambodar", "Lankesh", "Latafat", "Latif", "Lav", "Lavana", "Lochan", "Lohitaksha", "Lokajit", "Lokesh", "Loknath", "Lokprakash", "Lokranjan",
				"Madan", "Madanapal", "Madangopal", "Madhav", "Madhavdas", "Madhu", "Madhuk", "Madhukanta", "Madhukar", "Madhumay", "Madhup", "Madhur", "Madhusudan", "Madhusudhana", "Madin", "Madur", "Magadh", "Magan", "Mahabahu", "Mahabala", "Mahadev", "Mahaj", "Mahanidhi", "Mahaniya", "Mahanth", "Maharath", "Maharth", "Mahavir", "Maheepati", "Mahendra", "Mahesh", "Maheshwar", "Mahijith", "Mahin", "Mahindra", "Mahipal", "Mahir", "Mahish", "Mahith", "Mahmud", "Mahtab", "Mainak", "Maitreya", "Makarand", "Makul", "Makur", "Malay", "Manajith", "Manas", "Manasi", "Manasyu", "Manav", "Manavendra", "Mandan", "Mandar", "Mandeep", "Mandhatri", "Mandin", "Mandir", "Mandith", "Manendra", "Mangal", "Mangesh", "Mani", "Manibhushan", "Manik", "Manikandan", "Manindra", "Maniram", "Manish", "Manishankar", "Manith", "Manjeet", "Manmatha", "Manmohan", "Mannan", "Mannath", "Mannith", "Manohar", "Manoj", "Manonith", "Manoranjan", "Manoth", "Manprasad", "Mansukh", "Manth", "Manu", "Manuj", "Manyu", "Mardav", "Mareechi", "Markandeya", "Martand", "Martanda", "Marut", "Maruti", "Matsendra", "Mayank", "Mayanka", "Mayur", "Megh", "Megha", "Meghashyam", "Meghdutt", "Meghnad", "Mehboob", "Mehdi", "Mehmood", "Mehul", "Mekhal", "Meru", "Mihir", "Milan", "Milap", "Milind", "Milun", "Mirza", "Misal", "Mitesh", "Mithil", "Mithilesh", "Mithun", "Mitra", "Mitul", "Mohajit", "Mohak", "Mohal", "Mohamad", "Mohan", "Mohin", "Mohit", "Mohnish", "Mohul", "Monish", "Moti", "Motilal", "Moulik", "Mriganka", "Mrigankamouli", "Mrigankasekhar", "Mrigendra", "Mrigesh", "Mrityunjay", "Mubarak", "Mudita", "Muhamad", "Mukesh", "Muktananda", "Mukul", "Mukunda", "Mukut", "Mulkraj", "Mumtaz", "Muni", "Murad", "Murali", "Muralidhar", "Muralimanohar", "Murari", "Murarilal", "Musheer",
				"Nabarun", "Nabendu", "Nabhanyu", "Nabhas", "Nabhi", "Nabhith", "Nabhya", "Nachiketa", "Nadal", "Nadin", "Nadir", "Nagarin", "Nagarjun", "Nagendra", "Nagesh", "Nahusha", "Nairit", "Naishadh", "Nakshatra", "Nakul", "Nalin", "Nalinaksha", "Naman", "Namasyu", "Nambi", "Namdev", "Nanak", "Nand", "Nanda", "Nandakishor", "Nandan", "Nandi", "Nandin", "Naotau", "Narahari", "Narasimha", "Narayan", "Narayana", "Narendra", "Naresh", "Narhari", "Narinder", "Narmad", "Narottam", "Narsimha", "Nartan", "Narun", "Natesh", "Nathan", "Nathin", "Natraj", "Natwar", "Naval", "Navalan", "Navaneet", "Naveen", "Navin", "Navnit", "Navrang", "Navroz", "Nayan", "Nayath", "Nedumaan", "Nedumaran", "Neel", "Neeladri", "Neelam", "Neelambar", "Neelanjan", "Neelesh", "Neelkanta", "Neelkanth", "Neelmadhav", "Neelmani", "Neelotpal", "Neeraf", "Neeraj", "Nibodh", "Nidhish", "Nigam", "Nihal", "Nihar", "Niket", "Nikhat", "Nikhil", "Nikhilesh", "Nikunj", "Nikunja", "Nilay", "Nilesh", "Nimai", "Nimish", "Ninad", "Nipun", "Nirad", "Niraj", "Nirajit", "Niral", "Niramay", "Niramitra", "Niranjan", "Nirav", "Nirbhay", "Nirijhar", "Nirmal", "Nirmalya", "Nirmanyu", "Nirmit", "Nirmohi", "Nirupam", "Nirvan", "Nischal", "Nischith", "Nishad", "Nishanath", "Nishant", "Nishesh", "Nishikanta", "Nishit", "Nishita", "Nishith", "Nishkama", "Nishok", "Nissim", "Niteesh", "Nithik", "Nithilan", "Nitin", "Nitish", "Nityagopal", "Nityanand", "Nityananda", "Nityasundar", "Nivrutti", "Niyath", "Nripa", "Nripendra", "Nripesh",
				"Oha", "Ohas", "Ojas", "Om", "Omanand", "Omar", "Omja", "Omkar", "Omprakash", "Omrao", "Omswaroop", "Oojam", "Oorjit", "Oppilmani", "Ori", "Osman", "Ottakoothan", "Oviyan",
				"Paavan", "Pachai", "Pachaimani", "Pachaimuthu", "Padman", "Padmanabh", "Padmanabha", "Padmapati", "Palak", "Palani", "Palaniappan", "Palanikumar", "Palanimurugan", "Palanisami", "Palanivel", "Palash", "Palashkusum", "Palashranjan", "Pallav", "Panchanan", "Pandhari", "Panduranga", "Panini", "Pankaj", "Panmoli", "Pannalal", "Parag", "Parakram", "Param", "Paramananda", "Paramartha", "Paramesh", "Parameshwar", "Paramhansa", "Paramjeet", "Paranjay", "Parantapa", "Paras", "Parashar", "Parashuram", "Parasmani", "Paravasu", "Parees", "Paresh", "Pari", "Parijat", "Pariket", "Parikshit", "Parimal", "Parin", "Parindra", "Paritosh", "Parnad", "Partha", "Parthapratim", "Parvatinandan", "Parvesh", "Pasupati", "Patakin", "Patanjali", "Pathik", "Pathin", "Patralika", "Pavak", "Pavalan", "Pavan", "Pavani", "Pavitra", "Payas", "Payod", "Peeyush", "Perumal", "Phalgun", "Phaninath", "Phanindra", "Phanishwar", "Phenil", "Phoolendu", "Pinak", "Pinaki", "Pirmohammed", "Pitambar", "Piyush", "Ponnan", "Poojan", "Poojit", "Poorna", "Poornachandra", "Prabal", "Prabhakar", "Prabhas", "Prabhat", "Prabhav", "Prabir", "Prabodh", "Prabodhan", "Prabuddha", "Prachetas", "Prachur", "Pradeep", "Pradnesh", "Pradosh", "Pradyot", "Pradyumna", "Pradyun", "Praful", "Prafulla", "Pragun", "Prahlad", "Prajeet", "Prajesh", "Prajin", "Prajit", "Prakash", "Prakash", "Prakat", "Prakriti", "Pralay", "Pramath", "Pramesh", "Pramit", "Pramod", "Pran", "Pranav", "Pranay", "Pranet", "Pranit", "Pranjal", "Pranjivan", "Pransukh", "Prasad", "Prasanna", "Prasata", "Prasenjit", "Prasham", "Prashant", "Prashanta", "Prasiddhi", "Prasoon", "Prasun", "Pratap", "Prateek", "Prateep", "Prateet", "Pratik", "Pratiti", "Pratosh", "Pratul", "Praval", "Pravar", "Praveen", "Praver", "Pravir", "Prayag", "Preetish", "Prem", "Premal", "Premanand", "Premendra", "Pritam", "Prithu", "Prithvi", "Prithvijaj", "Prithviraj", "Priya", "Priyabrata", "Priyaranjan", "Pugal", "Pugalendhi", "Pujit", "Pukhraj", "Pulak", "Pulakesh", "Pulastya", "Pulin", "Pulish", "Pundalik", "Pundarik", "Puneet", "Punit", "Punyabrata", "Punyasloka", "Purandar", "Puranjay", "Purnanada", "Purnendu", "Puru", "Purujit", "Purumitra", "Pururava", "Purushottam", "Pushkar", "Pushpak", "Puskara", "Pyarelal", "Pyaremohan",
				"Qatadah", "Quamar", "Quasim", "Qudamah", "Qutub",
				"Radhak", "Radhakanta", "Radhakrishna", "Radhatanaya", "Radhavallabh", "Radheshyam", "Radheya", "Rafat", "Raghav", "Raghavendra", "Raghu", "Raghunandan", "Raghunath", "Raghupati", "Raghuvir", "Rahas", "Raheem", "Rahman", "Rahul", "Raivath", "Raj", "Raja", "Rajak", "Rajam", "Rajan", "Rajani", "Rajanikant", "Rajanikanta", "Rajanya", "Rajarshi", "Rajas", "Rajat", "Rajatshubhra", "Rajdulari", "Rajeev", "Rajendra", "Rajendrakumar", "Rajendramohan", "Rajesh", "Rajit", "Rajiv", "Rajkumar", "Rajyeshwar", "Rakesh", "Raksha", "Rakshan", "Ram", "Ramakanta", "Raman", "Ramanuja", "Ramashray", "Ramavatar", "Ramchandra", "Ramesh", "Rameshwar", "Ramith", "Ramkishore", "Ramkrishna", "Ramkumar", "Rammohan", "Ramnath", "Ramprasad", "Rampratap", "Ramratan", "Ramswaroop", "Ranajay", "Ranajit", "Randhir", "Rangan", "Ranganath", "Rangith", "Ranjan", "Ranjeet", "Ranjit", "Rasaraj", "Rasbihari", "Rasesh", "Rashmil", "Rasik", "Rasul", "Ratan", "Ratannabha", "Rathik", "Rathin", "Ratish", "Ratnakar", "Ratul", "Ravi", "Ravikiran", "Ravinandan", "Ravindra", "Ravishu", "Raza", "Razak", "Rebanta", "Rehman", "Rehmat", "Riddhiman", "Rijul", "Ripudaman", "Rishabh", "Rishi", "Rishikesh", "Rituparan", "Rituraj", "Ritvik", "Riyaz", "Rizvan", "Rochak", "Rochan", "Rohan", "Rohanlal", "Rohit", "Rohitasva", "Ronak", "Roshan", "Ruchir", "Rudra", "Rujul", "Rukma", "Rupak", "Rupesh", "Rupin", "Rushil", "Rustom", "Rutajit", "Rutujit",
				"Sabarinathan", "Sabhya", "Sacchidananda", "Sachet", "Sachetan", "Sachin", "Sachit", "Sadaiappan", "Sadanand", "Sadashiva", "Sadeepan", "Sadhan", "Sadiq", "Saeed", "Sagar", "Sagun", "Sahaj", "Sahas", "Sahay", "Sahdev", "Sahib", "Sahil", "Sainath", "Saipraasad", "Saipratap", "Sajal", "Sajan", "Saket", "Salaman", "Salarjung", "Saleem", "Salil", "Salim", "Samantha", "Samar", "Samarendra", "Samarendu", "Samarjit", "Samarth", "Sambaran", "Sambhav", "Sambhddha", "Sambit", "Sameen", "Sameer", "Samendra", "Samgram", "Samir", "Samiran", "Sammath", "Sampat", "Samrat", "Samudra", "Samudragupta", "Samudrasen", "Samvath", "Samyak", "Sanabhi", "Sanam", "Sanat", "Sanatan", "Sanchay", "Sanchit", "Sandananda", "Sandeep", "Sandeepan", "Sangupt", "Sanjan", "Sanjay", "Sanjith", "Sanjiv", "Sanjivan", "Sanjog", "Sankalpa", "Sankara", "Sankarshan", "Sanket", "Sanobar", "Santosh", "Sanwariya", "Sanyog", "Sapan", "Saquib", "Saral", "Sarang", "Saras", "Sarasija", "Sarasvat", "Sarat", "Saravanan", "Sarbajit", "Sarfaraz", "Saroj", "Sartaj", "Sarthak", "Sarup", "Sarvadaman", "Sarvanavel", "Sarvesh", "Sarwar", "Sashreek", "Satindra", "Satish", "Satrijit", "Satvamohan", "Satyajit", "Satyakam", "Satyaki", "Satyamurty", "Satyanarayan", "Satyankar", "Satyaprakash", "Satyapriya", "Satyasheel", "Satyavan", "Satyavrat", "Satyavrata", "Satyendra", "Saurabh", "Saurav", "Savanth", "Savar", "Savitendra", "Sawan", "Sayam", "Sayed", "Seemanta", "Selvakumaran", "Selvan", "Senajit", "Sendhil", "SendhilNathan", "Sengannan", "Senmal", "Senthamarai", "Sevak", "Shaan", "Shachin", "Shadab", "Shaheen", "Shahid", "Shailendra", "Shailesh", "Shaistakhan", "Shakib", "Shaktidhar", "Shakunt", "Shakyasinha", "Shalin", "Shambhu", "Shameek", "Shami", "Shamindra", "Shams", "Shamshu", "Shandar", "Shankar", "Shankha", "Shanmukha", "Shantanu", "Shantashil", "Shantimay", "Shantinath", "Shantiprakash", "Shantipriya", "Sharad", "Sharad", "Sharadchandra", "Sharadindu", "Sharan", "Sharang", "Shardul", "Shariq", "Shashank", "Shashanka", "Shashee", "Shashibhushan", "Shashidhar", "Shashikant", "Shashikiran", "Shashimohan", "Shashishekhar", "Shashwat", "Shatrughna", "Shatrujit", "Shatrunjay", "Shattesh", "Shaukat", "Shaunak", "Sheetal", "Sheil", "Shekhar", "Shesh", "Shevantilal", "Shikha", "Shikhar", "Shirish", "Shiromani", "Shirshirchandra", "Shishir", "Shishirkumar", "Shishupal", "Shiv", "Shivendra", "Shivendu", "Shivesh", "Shivlal", "Shivraj", "Shivshankar", "Shobhan", "Shoorsen", "Shravan", "Shravankumar", "Shrenik", "Shreshta", "Shreyas", "Shridhar", "Shrigopal", "Shrihari", "Shrikanta", "Shrikrishna", "Shrikumar", "Shrinath", "Shrinivas", "Shripad", "Shripal", "Shripati", "Shriram", "Shriranga", "Shrish", "Shrivatsa", "Shriyans", "Shubha", "Shubhang", "Shubhankar", "Shubhashis", "Shubhendu", "Shubhranshu", "Shuddhashil", "Shulabh", "Shvetang", "Shvetank", "Shyam", "Shyamal", "Shyamsundar", "Siddhanta", "Siddharth", "Siddhartha", "Siddheshwar", "Singaravelan", "Siraj", "Sitakanta", "Sitanshu", "Sitikantha", "Sivakumaran", "Sivanta", "Smarajit", "Smaran", "Smritiman", "Smyan", "Snehal", "Snehanshn", "Snehin", "Sohail", "Soham", "Sohan", "Sohil", "Som", "Soman", "Somansh", "Somendra", "Someshwar", "Somnath", "Sopan", "Soumil", "Soumyakanti", "Sourabh", "Souren", "Sourish", "Sragvibhushan", "Srijan", "Srikant", "Srinivas", "Sriram", "Sual", "Subal", "Subash", "Subbarao", "Subhan", "Subhash", "Subinay", "Subodh", "Subramani", "Subrata", "Suchir", "Sudama", "Sudarshan", "Sudeep", "Sudesh", "Sudesha", "Sudeva", "Sudhakar", "Sudhamay", "Sudhan", "Sudhanshu", "Sudhanssu", "Sudhi", "Sudhindra", "Sudhir", "Sudhish", "Sudhith", "Sudip", "Sugata", "Sugreev", "Sugriva", "Suhail", "Suhas", "Suhrid", "Suhrit", "Sujan", "Sujash", "Sujay", "Sujit", "Sukant", "Sukesh", "Suketu", "Sukhamay", "Sukhdev", "Sukrit", "Sukumar", "Sulalit", "Sulekh", "Sulochan", "Sultan", "Suman", "Sumant", "Sumanta", "Sumantra", "Sumedh", "Sumeet", "Sumit", "Sumitra", "Sunanda", "Sunasi", "Sundar", "Sundaravel", "Suneet", "Sunil", "Sunirmal", "Suparna", "Suprakash", "Supratik", "Supratim", "Supriya", "Sur", "Suraj", "Surajit", "Suranjan", "Surdeep", "Suren", "Suresh", "Surya", "Suryabhan", "Suryakant", "Suryakanta", "Suryashankar", "Sushanta", "Sushil", "Sushobhan", "Sushrut", "Sushruta", "Sutej", "Sutejas", "Suvan", "Suvimal", "Suvrata", "Suyash", "Swagat", "Swami", "Swaminath", "Swapan", "Swapnil", "Swaraj", "Swarup", "Swayambhu", "Swetaketu", "Syamantak",
				"Tahir", "Taizeen", "Taj", "Tajdar", "Talat", "Talib", "Talleen", "Tamal", "Tamkinat", "Tamonash", "Tanay", "Tanmay", "Tanuj", "Tanveer", "Tapan", "Tapas", "Tapasendra", "Tapasranjan", "Tapomay", "Tarachand", "Tarak", "Tarakeshwar", "Taraknath", "Taral", "Taran", "Tarang", "Taranga", "Taraprashad", "Tarik", "Tariq", "Tarit", "Tarpan", "Tarun", "Taruntapan", "Tathagata", "Tausiq", "Teerth", "Teerthankar", "Tej", "Tejas", "Tejeshwar", "Tejomay", "Thakur", "Thangabalu", "Thangadurai", "Thangamani", "Thangarajan", "Thangasami", "Thangavel", "Thayanban", "Theeran", "Thenappan", "Thevan", "Thinakaran", "Thirugnanam", "Thirumal", "Thirumalai", "Thirumani", "Thiruvalluvar", "Thooyavan", "Tilak", "Timin", "Timir", "Timirbaran", "Tirtha", "Titir", "Toshan", "Trailokva", "Trambak", "Tribhuvan", "Tridib", "Trigun", "Trilochan", "Trilok", "Trilokesh", "Tripurari", "Trishanku", "Trishul", "Trivikram", "Tufan", "Tuhin", "Tuhinsurra", "Tukaram", "Tula", "Tulasidas", "Tulsidas", "Tungar", "Tungesh", "Turanyu", "Tushar", "Tusharkanti", "Tusharsuvra", "Tyagraja",
				"Udar", "Uday", "Udayachal", "Udayan", "Udayasooriyan", "Uddhar", "Uddhav", "Udeep", "Udit", "Udyam", "Udyan", "Ujagar", "Ujala", "Ujesh", "Ujwal", "Ulagan", "Ulagappan", "Ulhas", "Umanand", "Umanant", "Umang", "Umaprasad", "Umashankar", "Umed", "Umesh", "Umrao", "Unmaivilambi", "Unmesh", "Unnat", "Upagupta", "Upamanyu", "Upendra", "Urjita", "Ushakanta", "Utanka", "Utkarsh", "Utkarsha", "Utpal", "Utsav", "Uttal", "Uttam", "Uttar", "Uttiya",
				"Vachan", "Vachaspati", "Vaibhav", "Vaijnath", "Vaikunth", "Vajra", "Vajradhar", "Vajramani", "Vajrapani", "Valavan", "Vallabh", "Valmiki", "Vaman", "Vanajit", "Vandan", "Vaninath", "Vardhaman", "Varij", "Varindra", "Varun", "Vasant", "Vasava", "Vasistha", "Vasu", "Vasudev", "Vasuman", "Vatsal", "Ved", "Vedanga", "Vedavrata", "Vedmohan", "Vedprakash", "Veer", "Veera", "Velan", "Vendan", "Vengai", "Veni", "Venimadhav", "Vetrival", "Vibhas", "Vibhat", "Vibhishan", "Vibhu", "Vidur", "Vidyacharan", "Vidyadhar", "Vidyaranya", "Vidyasagar", "Vidyut", "Vighnesh", "Vihanga", "Vijay", "Vijendra", "Vikas", "Vikesh", "Vikram", "Vikramaditya", "Vikramajit", "Vikramendra", "Vikrant", "Vikranta", "Vilas", "Vilok", "Vilokan", "Vimal", "Vinay", "Vinayak", "Vineet", "Vinesh", "Vinod", "Vipan", "Vipin", "Viplab", "Viplav", "Vipra", "Vipul", "Vir", "Viraj", "Viral", "Virat", "Virendra", "Viresh", "Virochan", "Vishal", "Vishesh", "Vishnu", "Vishram", "Vishva", "Vishvajit", "Vishvakarma", "Vishvatma", "Vishwambhar", "Vishwamitra", "Vishwanath", "Vishwas", "Vishwesh", "Vismay", "Viswanath", "Viswas", "Vithala", "Vivek", "Vivekananda", "Vrajakishore", "Vrajamohan", "Vrajanadan", "Vrajesh", "Vrishin", "Vyasa", "Vyomesh",
				"Wadee", "Wajeeh", "Wali", "Waman", "Wasan",
				"Yadav", "Yadavendra", "Yadunandan", "Yadunath", "Yaduraj", "Yaduvir", "Yagna", "Yahyaa", "Yajat", "Yajnadhar", "Yajnarup", "Yajnesh", "Yamajith", "Yash", "Yashodhan", "Yashodhara", "Yashpal", "Yashwant", "Yatin", "Yatindra", "Yayin", "Yoganand", "Yogendra", "Yogesh", "Yudhajit", "Yudhisthir", "Yugma", "Yukta", "Yuvaraj", "Yuyutsu"
			),
			"lastNames" => array(
				"Kumar", "Raj", "Jain", "Khan", "Ismail", "Patel", "Singh"
			)
		)
	);
	private $generalMaleNames   = array();
	private $generalFemaleNames = array();
	private $generalFirstNames  = array();
	private $generalLastNames   = array();


	/**
	 * @param string $runtimeContext "generation" or "ui"
	 */
	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			self::initFirstNames();
			self::initLastNames();
			self::combineRegionalFirstNames();
		}
	}

	public function generate($generator, $generationContextData) {
		$placeholderStr = $generationContextData["generationOptions"];
		$selectedCountryPlugins = $generator->getCountries();

		$rowCountryInfo = array();
		while (list($key, $info) = each($generationContextData["existingRowData"])) {
			if ($info["dataTypeFolder"] == "Country") {
				$rowCountryInfo = $info;
				break;
			}
		}

		$maleNames   = $this->generalMaleNames;
		$femaleNames = $this->generalFemaleNames;
		$firstNames  = $this->generalFirstNames;
		$lastNames   = $this->generalLastNames;

		// if there's a country for this row
		$countrySlug = "";

		if (!empty($rowCountryInfo) && isset($rowCountryInfo["randomData"]["slug"])) {
			if (array_key_exists($rowCountryInfo["randomData"]["slug"], $this->regionalNames)) {
				$countrySlug = $rowCountryInfo["randomData"]["slug"];
			}
		} else if (!empty($selectedCountryPlugins)) {

			$availableRegionalCountries = array_keys($this->regionalNames);

			// weirdly, array_intersect preserves keys as well - even when the array's not a hash, like here
			$inBothWithKeys = array_intersect($availableRegionalCountries, $selectedCountryPlugins);
			$inBoth = array_values($inBothWithKeys);

			if (!empty($inBoth)) {
				$countrySlug = $inBoth[mt_rand(0, count($inBoth) - 1)];
			}
		}

		if (!empty($countrySlug)) {
			$maleNames   = $this->regionalNames[$countrySlug]["firstNamesMale"];
			$femaleNames = $this->regionalNames[$countrySlug]["firstNamesFemale"];
			$firstNames  = $this->regionalNames[$countrySlug]["firstNames"];
			$lastNames   = $this->regionalNames[$countrySlug]["lastNames"];
		}

		while (preg_match("/MaleName/", $placeholderStr)) {
			$placeholderStr = preg_replace("/MaleName/", $this->getRandomFirstName($maleNames), $placeholderStr, 1);
		}
		while (preg_match("/FemaleName/", $placeholderStr)) {
			$placeholderStr = preg_replace("/FemaleName/", $this->getRandomFirstName($femaleNames), $placeholderStr, 1);
		}
		while (preg_match("/Name/", $placeholderStr)) {
			$placeholderStr = preg_replace("/Name/", $this->getRandomFirstName($firstNames), $placeholderStr, 1);
		}
		while (preg_match("/Surname/", $placeholderStr)) {
			$placeholderStr = preg_replace("/Surname/", $lastNames[mt_rand(0, count($lastNames)-1)], $placeholderStr, 1);
		}
		while (preg_match("/Initial/", $placeholderStr)) {
			$placeholderStr = preg_replace("/Initial/", $this->letters[mt_rand(0, strlen($this->letters)-1)], $placeholderStr, 1);
		}

		// in case the user entered multiple | separated formats, pick one
		$formats = explode("|", $placeholderStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[mt_rand(0, count($formats)-1)];
		}

		return array(
			"display" => trim($chosenFormat)
		);
	}


	public function getRowGenerationOptionsUI($generator, $post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		if (empty($json->settings->placeholder)) {
			return false;
		}
		return $json->settings->placeholder;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255) default NULL",
			"SQLField_Oracle" => "varchar2(255) default NULL",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="MaleName">{$this->L["example_MaleName"]}</option>
		<option value="FemaleName">{$this->L["example_FemaleName"]}</option>
		<option value="Name">{$this->L["example_Name"]}</option>
		<option value="MaleName Surname">{$this->L["example_MaleName_Surname"]}</option>
		<option value="FemaleName Surname">{$this->L["example_FemaleName_Surname"]}</option>
		<option value="Name Surname">{$this->L["example_Name_Surname"]}</option>
		<option value="Name Initial. Surname">{$this->L["example_Name_Initial_Surname"]}</option>
		<option value="Surname">{$this->L["example_surname"]}</option>
		<option value="Surname, Name Initial.">{$this->L["example_Surname_Name_Initial"]}</option>
		<option value="Name, Name, Name, Name">{$this->L["example_Name4"]}</option>
		<option value="Name Surname|Name Initial. Surname">{$this->L["example_fullnames"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		return '<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px" />';
	}

	public function getFirstNames() {
		return $this->firstNames;
	}

	public function getLastNames() {
		return $this->lastNames;
	}

	/**
	 * Called when instantiating the plugin during data generation. Set the firstNames, maleNames and
	 * femaleNames.
	 */
	private function initFirstNames() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}first_names
		");

		if ($response["success"]) {
			$names = array();
			$maleNames = array();
			$femaleNames = array();
			while ($row = mysqli_fetch_assoc($response["results"])) {
				$gender = $row["gender"];
				$name   = $row["first_name"];

				$names[] = $name;
				if ($gender == "male") {
					$maleNames[] = $name;
				} else {
					$femaleNames[] = $name;
				}
			}

			$this->generalFirstNames  = $names;
			$this->generalMaleNames   = $maleNames;
			$this->generalFemaleNames = $femaleNames;
		}
	}


	private function initLastNames() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}last_names
		");

		if ($response["success"]) {
			$lastNames = array();
			while ($row = mysqli_fetch_assoc($response["results"])) {
				$lastNames[] = $row["last_name"];
			}
			$this->generalLastNames = $lastNames;
		}
	}

	/**
	 * Called on instantiation. This combines the male and female first names in the $regionalNames hash
	 * into a single "first_names" key, for quick reference.
	 */
	private function combineRegionalFirstNames() {
		$updatedRegionalNames = array();
		while (list($country, $content) = each($this->regionalNames)) {
			$content["firstNames"] = array_merge($content["firstNamesFemale"], $content["firstNamesMale"]);
			$updatedRegionalNames[$country] = $content;
		}
		$this->regionalNames = $updatedRegionalNames;
	}


	private function getRandomFirstName($nameArray) {
		return $nameArray[mt_rand(0, count($nameArray)-1)];
	}

	/**
	 * Called during installation. This creates and populates the first_names and last_names DB tables.
	 *
	 * @return array [0] success / error (boolean)
	 *               [1] the error message, if there was an error
	 */
	public static function install() {
		$prefix = Core::getDbTablePrefix();

		// always clear out the previous tables, just in case
		$rollbackQueries = array();
		$rollbackQueries[] = "DROP TABLE {$prefix}first_names";
		$rollbackQueries[] = "DROP TABLE {$prefix}last_names";
		Core::$db->query($rollbackQueries);

		$queries = array();
		$queries[] = "
			CREATE TABLE {$prefix}first_names (
				id mediumint(9) NOT NULL auto_increment,
				first_name varchar(50) NOT NULL default '',
				gender enum('male','female','both') NOT NULL default 'male',
				PRIMARY KEY (id)
			)
		";
		$queries[] = "
			INSERT INTO {$prefix}first_names (first_name, gender)
			VALUES ('Aaron','male'),('Abbot','male'),('Abdul','male'),('Abel','male'),('Abigail','female'),('Abra','female'),('Abraham','male'),('Acton','male'),('Adam','male'),('Adara','female'),('Addison','male'),('Adele','female'),('Adena','female'),('Adria','female'),('Adrian','male'),('Adrienne','female'),('Ahmed','male'),('Aidan','male'),('Aiko','female'),('Aileen','female'),('Aimee','female'),('Ainsley','female'),('Akeem','male'),('Aladdin','male'),('Alan','male'),('Alana','female'),('Alden','male'),('Alea','female'),('Alec','male'),('Alexa','female'),('Alexander','male'),('Alexandra','female'),('Alexis','female'),('Alfonso','male'),('Alfreda','female'),('Ali','male'),('Alice','female'),('Alika','female'),('Aline','female'),('Alisa','female'),('Allegra','female'),('Allen','male'),('Allistair','male'),('Alma','female'),('Althea','female'),('Alvin','male'),('Alyssa','female'),('Amal','male'),('Amanda','female'),('Amaya','female'),('Amber','female'),('Amela','female'),('Amelia','female'),('Amena','female'),('Amery','male'),('Amethyst','female'),('Amir','male'),('Amity','female'),('Amos','male'),('Amy','female'),('Anastasia','female'),('Andrew','male'),	('Angela','female'),('Angelica','female'),('Anika','female'),('Anjolie','female'),('Ann','female'),('Anne','female'),('Anthony','male'),('Aphrodite','female'),('April','female'),('Aquila','male'),('Arden','male'),('Aretha','female'),('Ariana','female'),('Ariel','female'),('Aristotle','male'),('Armand','male'),('Armando','male'),('Arsenio','male'),('Arthur','male'),('Ashely','female'),('Asher','male'),('Ashton','male'),('Aspen','female'),('Astra','female'),('Athena','female'),('Aubrey','both'),('Audra','female'),('Audrey','female'),('August','male'),('Aurelia','female'),('Aurora','female'),('Austin','male'),('Autumn','female'),('Ava','female'),('Avram','male'),('Avye','female'),('Axel','male'),('Ayanna','female'),('Azalia','female'),('Baker','male'),('Barbara','female'),('Barclay','male'),('Barrett','male'),('Barry','male'),('Basia','female'),('Basil','male'),('Baxter','male'),('Beatrice','female'),('Beau','male'),('Beck','male'),('Bell','female'),('Belle','female'),('Benedict','male'),('Benjamin','male'),('Berk','male'),('Bernard','male'),('Bert','male'),('Bertha','female'),('Bethany','female'),('Beverly','female'),('Bevis','male'),('Bianca','female'),('Blaine','both'),('Blair','both'),('Blake','male'),('Blaze','male'),('Blossom','female'),('Blythe','female'),('Bo','female'),('Boris','male'),('Bradley','male'),('Brady','male'),('Branden','male'),('Brandon','male'),('Breanna','female'),('Bree','female'),('Brenda','female'),('Brendan','male'),('Brenden','male'),('Brenna','female'),('Brennan','male'),('Brent','male'),('Brett','male'),('Brian','male'),('Brianna','female'),('Briar','female'),('Brielle','female'),('Britanney','female'),('Britanni','female'),('Brittany','female'),('Brock','male'),('Brody','male'),('Brooke','female'),('Bruce','male'),('Bruno','male'),('Bryar','female'),('Brynn','female'),('Brynne','female'),('Buckminster','male'),('Buffy','female'),('Burke','male'),('Burton','male'),('Byron','male'),('Cade','male'),('Cadman','male'),('Caesar','male'),('Cailin','female'),('Cain','male'),('Cairo','male'),('Caldwell','male'),('Caleb','male'),('Calista','female'),('Callie','female'),('Callum','male'),('Cally','female'),('Calvin','male'),('Camden','male'),('Cameran','female'),('Cameron','female'),('Cameron','male'),('Camilla','female'),('Camille','female'),('Candace','female'),('Candice','female'),('Cara','female'),('Carissa','female'),('Carl','male'),('Carla','female'),('Carlos','male'),('Carly','female'),('Carol','female'),('Carolyn','female'),('Carson','male'),('Carter','male'),('Caryn','female'),('Casey','both'),('Cassady','female'),('Cassandra','female'),('Cassidy','female'),('Castor','male'),('Catherine','female'),('Cathleen','female'),('Cecilia','female'),('Cedric','male'),('Celeste','female'),('Chadwick','male'),('Chaim','male'),('Chancellor','male'),('Chanda','female'),('Chandler','male'),('Chaney','male'),('Channing','male'),('Chantale','female'),('Charde','female'),('Charissa','female'),('Charity','female'),('Charles','male'),('Charlotte','female'),('Chase','male'),('Chastity','female'),('Chava','female'),('Chelsea','female'),('Cherokee','female'),('Cheryl','female'),('Chester','male'),('Cheyenne','female'),('Chiquita','female'),('Chloe','female'),('Christen','female'),('Christian','male'),('Christine','female'),('Christopher','male'),('Ciara','female'),('Ciaran','male'),('Claire','female'),('Clare','female'),('Clark','male'),('Clarke','male'),('Claudia','female'),('Clayton','male'),('Clementine','female'),('Cleo','female'),('Clinton','male'),('Clio','female'),('Coby','male'),('Cody','male'),('Colby','male'),('Cole','male'),('Colette','female'),('Colin','male'),('Colleen','female'),('Colorado','male'),('Colt','male'),('Colton','male'),('Conan','male'),('Connor','male'),('Constance','female'),('Cooper','male'),('Cora','female'),('Courtney','female'),('Craig','male'),('Cruz','male'),('Cullen','male'),('Curran','male'),('Cynthia','female'),('Cyrus','male'),('Dacey','female'),('Dahlia','female'),('Dai','female'),('Dakota','both'),('Dale','male'),('Dalton','male'),('Damian','male'),('Damon','male'),('Dana','female'),('Dane','male'),('Daniel','male'),('Danielle','female'),('Dante','male'),('Daphne','female'),('Daquan','male'),('Dara','female'),('Daria','female'),('Darius','male'),('Darrel','female'),('Darryl','female'),('Daryl','female'),('David','male'),('Davis','male'),('Dawn','female'),('Deacon','male'),('Dean','male'),('Deanna','female'),('Deborah','female'),('Debra','female'),('Declan','male'),('Deirdre','female'),('Delilah','female'),('Demetria','female'),('Demetrius','male'),('Denise','female'),('Dennis','male'),('Denton','male'),('Derek','male'),('Desirae','female'),('Desiree','female'),('Destiny','female'),('Devin','male'),('Dexter','male'),('Diana','female'),('Dieter','male'),('Dillon','male'),('Dolan','male'),('Dominic','male'),('Dominique','female'),('Donna','female'),('Donovan','male'),('Dora','female'),('Dorian','male'),('Doris','female'),('Dorothy','female'),('Drake','male'),('Drew','male'),('Driscoll','male'),('Duncan','male'),('Dustin','male'),('Dylan','male'),('Eagan','male'),('Eaton','male'),('Ebony','female'),('Echo','female'),('Edan','male'),('Eden','both'),('Edward','male'),('Elaine','female'),('Eleanor','female'),('Eliana','female'),('Elijah','male'),('Elizabeth','female'),('Ella','female'),('Elliott','male'),('Elmo','male'),('Elton','male'),('Elvis','male'),('Emerald','female'),('Emerson','male'),('Emery','male'),('Emi','female'),('Emily','female'),('Emma','female'),('Emmanuel','male'),('Erasmus','male'),('Eric','male'),('Erica','female'),('Erich','male'),('Erin','female'),('Ethan','male'),('Eugenia','female'),('Evan','male'),('Evangeline','female'),('Eve','female'),('Evelyn','female'),('Ezekiel','male'),('Ezra','male'),('Faith','female'),('Fallon','female'),('Farrah','female'),('Fatima','female'),('Fay','female'),('Felicia','female'),('Felix','male'),('Ferdinand','male'),('Ferris','male'),('Finn','male'),('Fiona','female'),('Fitzgerald','male'),('Flavia','female'),('Fletcher','male'),('Fleur','female'),('Florence','female'),('Flynn','male'),('Forrest','male'),('Frances','female'),('Francesca','female'),('Francis','male'),('Fredericka','female'),('Freya','female'),('Fritz','male'),('Fuller','male'),('Fulton','male'),('Gabriel','male'),('Gage','male'),('Gail','female'),('Galena','female'),('Galvin','male'),('Gannon','male'),('Gareth','male'),('Garrett','male'),('Garrison','male'),('Garth','male'),('Gary','male'),('Gavin','male'),('Gay','female'),('Gemma','female'),('Genevieve','female'),('Geoffrey','male'),('George','male'),('Georgia','female'),('Geraldine','female'),('Germaine','female'),('Germane','female'),('Giacomo','male'),('Gil','male'),('Gillian','female'),('Ginger','female'),('Gisela','female'),('Giselle','female'),('Glenna','female'),('Gloria','female'),('Grace','female'),('Grady','male'),('Graham','male'),('Graiden','male'),('Grant','male'),('Gray','male'),('Gregory','male'),('Gretchen','female'),('Griffin','male'),('Griffith','male'),('Guinevere','female'),('Guy','male'),('Gwendolyn','female'),('Hadassah','female'),('Hadley','female'),('Hakeem','male'),('Halee','female'),('Haley','female'),('Hall','male'),('Halla','female'),('Hamilton','male'),('Hamish','male'),('Hammett','male'),('Hanae','female'),('Hanna','female'),('Hannah','female'),('Harding','male'),('Harlan','male'),('Harper','male'),('Harriet','female'),('Harrison','male'),('Hasad','male'),('Hashim','male'),('Haviva','female'),('Hayden','male'),('Hayes','male'),('Hayfa','female'),('Hayley','female'),('Heather','female'),('Hector','male'),('Hedda','female'),('Hedley','male'),('Hedwig','female'),('Hedy','female'),('Heidi','female'),('Helen','female'),('Henry','male'),('Herman','male'),('Hermione','female'),('Herrod','male'),('Hilary','female'),('Hilda','female'),('Hilel','male'),('Hillary','female'),('Hiram','male'),('Hiroko','female'),('Hollee','female'),('Holly','female'),('Holmes','male'),('Honorato','male'),('Hop','male'),('Hope','female'),('Howard','male'),('Hoyt','male'),('Hu','male'),('Hunter','male'),('Hyacinth','female'),('Hyatt','male'),('Ian','male'),('Idola','female'),('Idona','female'),('Ifeoma','female'),('Ignacia','female'),('Ignatius','male'),('Igor','male'),('Ila','female'),('Iliana','female'),('Illana','female'),('Illiana','female'),('Ima','female'),('Imani','female'),('Imelda','female'),('Imogene','female'),('Ina','female'),('India','female'),('Indigo','female'),('Indira','female'),('Inez','female'),('Inga','female'),('Ingrid','female'),('Iola','female'),('Iona','female'),('Ira','male'),('Irene','female'),('Iris','female'),('Irma','female'),('Isaac','male'),('Isabella','female'),('Isabelle','female'),('Isadora','female'),('Isaiah','male'),('Ishmael','male'),('Ivan','male'),('Ivana','female'),('Ivor','male'),('Ivory','female'),('Ivy','female'),('Jack','male'),('Jackson','male'),('Jacob','male'),('Jada','female'),('Jade','female'),('Jaden','female'),('Jael','female'),('Jaime','female'),('Jakeem','male'),('Jamal','male'),('Jamalia','female'),('James','male'),('Jameson','male'),('Jana','female'),('Jane','female'),('Janna','female'),('Jaquelyn','female'),('Jared','male'),('Jarrod','male'),('Jasmine','female'),('Jason','male'),('Jasper','male'),('Jayme','female'),('Jeanette','female'),('Jelani','male'),('Jemima','female'),('Jena','female'),('Jenette','female'),('Jenna','female'),('Jennifer','female'),('Jeremy','male'),('Jermaine','male'),('Jerome','male'),('Jerry','male'),('Jescie','female'),('Jessamine','female'),('Jesse','male'),('Jessica','female'),('Jillian','female'),('Jin','male'),('Joan','female'),('Jocelyn','female'),('Joel','male'),('Joelle','female'),('John','male'),('Jolene','female'),('Jolie','female'),('Jonah','male'),('Jonas','male'),('Jordan','female'),('Jordan','male'),('Jorden','female'),('Joseph','male'),('Josephine','female'),('Joshua','male'),('Josiah','male'),('Joy','female'),('Judah','male'),('Judith','female'),('Julian','male'),('Julie','female'),('Juliet','female'),('Justin','male'),('Justina','female'),('Justine','female'),('Kadeem','male'),('Kaden','both'),('Kai','female'),('Kaitlin','female'),('Kalia','female'),('Kamal','male'),('Kameko','female'),('Kane','male'),('Kareem','male'),('Karen','female'),('Karina','female'),('Karleigh','female'),('Karly','female'),('Karyn','female'),('Kaseem','male'),('Kasimir','male'),('Kasper','male'),('Katell','female'),('Katelyn','female'),('Kathleen','female'),('Kato','male'),('Kay','female'),('Kaye','female'),('Keane','male'),('Keaton','male'),('Keefe','male'),('Keegan','male'),('Keelie','female'),('Keely','female'),('Keiko','female'),('Keith','male'),('Kellie','female'),('Kelly','female'),('Kelly','male'),('Kelsey','female'),('Kelsie','female'),('Kendall','both'),('Kennan','male'),('Kennedy','male'),('Kenneth','male'),('Kenyon','male'),('Kermit','male'),('Kerry','female'),('Kessie','female'),('Kevin','male'),('Kevyn','female'),('Kiara','female'),('Kiayada','female'),('Kibo','male'),('Kieran','male'),('Kim','female'),('Kimberley','female'),('Kimberly','female'),('Kiona','female'),('Kirby','female'),('Kirestin','female'),('Kirk','male'),('Kirsten','female'),('Kitra','female'),('Knox','male'),('Kristen','female'),('Kuame','male'),('Kyla','female'),('Kylan','female'),('Kyle','male'),('Kylee','female'),('Kylie','female'),('Kylynn','female'),('Kyra','female'),('Lacey','female'),('Lacota','female'),('Lacy','female'),('Lael','female'),('Laith','male'),('Lamar','male'),('Lana','female'),('Lance','male'),('Lane','male'),('Lani','female'),('Lara','female'),('Lareina','female'),('Larissa','female'),('Lars','male'),('Latifah','female'),('Laura','female'),('Laurel','female'),('Lavinia','female'),('Lawrence','male'),('Leah','female'),('Leandra','female'),('Lee','female'),('Lee','male'),('Leigh','female'),('Leila','female'),('Leilani','female'),('Len','male'),('Lenore','female'),('Leo','male'),('Leonard','male'),('Leroy','male'),('Lesley','female'),('Leslie','female'),('Lester','male'),('Lev','male'),('Levi','male'),('Lewis','male'),('Libby','female'),('Liberty','female'),('Lila','female'),('Lilah','female'),('Lillian','female'),('Lillith','female'),('Linda','female'),('Linus','male'),('Lionel','male'),('Lisandra','female'),('Logan','male'),('Lois','female'),('Louis','male'),('Lucas','male'),('Lucian','male'),('Lucius','male'),('Lucy','female'),('Luke','male'),('Lunea','female'),('Lydia','female'),('Lyle','male'),('Lynn','female'),('Lysandra','female'),('MacKensie','female'),('MacKenzie','female'),('Macaulay','male'),('Macey','female'),('Macon','male'),('Macy','female'),('Madaline','female'),('Madeline','female'),('Madeson','female'),('Madison','female'),('Madonna','female'),('Magee','male'),('Maggie','female'),('Maggy','female'),('Maia','female'),('Maile','female'),('Maisie','female'),('Maite','female'),('Malachi','male'),('Malcolm','male'),('Malik','male'),('Mallory','female'),('Mannix','male'),('Mara','female'),('Marah','female'),('Marcia','female'),('Margaret','female'),('Mari','female'),('Mariam','female'),('Mariko','female'),('Maris','female'),('Mark','male'),('Marny','female'),('Marsden','male'),('Marshall','male'),('Martena','female'),('Martha','female'),('Martin','male'),('Martina','female'),('Marvin','male'),('Mary','female'),('Maryam','female'),('Mason','male'),('Matthew','male'),('Maxine','female'),('Maxwell','male'),('May','female'),('Maya','female'),('McKenzie','female'),('Mechelle','female'),('Medge','female'),('Megan','female'),('Meghan','female'),('Melanie','female'),('Melinda','female'),('Melissa','female'),('Melodie','female'),('Melvin','male'),('Melyssa','female'),('Mercedes','female'),('Meredith','female'),('Merrill','male'),('Merritt','male'),('Mia','female'),('Micah','male'),('Michael','male'),('Michelle','female'),('Mikayla','female'),('Minerva','female'),('Mira','female'),('Miranda','female'),('Miriam','female'),('Moana','female'),('Mohammad','male'),('Mollie','female'),('Molly','female'),('Mona','female'),('Montana','female'),('Morgan','female'),('Moses','male'),('Mufutau','male'),('Murphy','male'),('Myles','male'),('Myra','female'),('Nadine','female'),('Naida','female'),('Naomi','female'),('Nash','male'),('Nasim','male'),('Natalie','female'),('Nathan','male'),('Nathaniel','male'),('Nayda','female'),('Nehru','male'),('Neil','male'),('Nell','female'),('Nelle','female'),('Nerea','female'),('Nero','male'),('Nevada','female'),('Neve','female'),('Neville','male'),('Nicholas','male'),('Nichole','female'),('Nicole','female'),('Nigel','male'),('Nina','female'),('Nissim','male'),('Nita','female'),('Noah','male'),('Noble','male'),('Noel','female'),('Noelani','female'),('Noelle','female'),('Nola','female'),('Nolan','male'),('Nomlanga','female'),('Nora','female'),('Norman','male'),('Nyssa','female'),('Ocean','female'),('Octavia','female'),('Octavius','male'),('Odessa','female'),('Odette','female'),('Odysseus','male'),('Oleg','male'),('Olga','female'),('Oliver','male'),('Olivia','female'),('Olympia','female'),('Omar','male'),('Oprah','female'),('Ora','female'),('Oren','male'),('Ori','female'),('Orla','female'),('Orlando','male'),('Orli','female'),('Orson','male'),('Oscar','male'),('Otto','male'),('Owen','male'),('Paki','male'),('Palmer','male'),('Paloma','female'),('Pamela','female'),('Pandora','female'),('Pascale','female'),('Patience','female'),('Patricia','female'),('Patrick','male'),('Paul','male'),('Paula','female'),('Pearl','female'),('Penelope','female'),('Perry','male'),('Peter','male'),('Petra','female'),('Phelan','male'),('Philip','male'),('Phillip','male'),('Phoebe','female'),('Phyllis','female'),('Piper','female'),('Plato','male'),('Porter','male'),('Portia','female'),('Prescott','male'),('Preston','male'),('Price','male'),('Priscilla','female'),('Quail','female'),('Quamar','male'),('Quemby','female'),('Quentin','male'),('Quin','female'),('Quincy','both'),('Quinlan','male'),('Quinn','female'),('Quinn','male'),('Quintessa','female'),('Quon','female'),('Quyn','female'),('Quynn','female'),('Rachel','female'),('Rae','female'),('Rafael','male'),('Rahim','male'),('Raja','male'),('Rajah','male'),('Ralph','male'),('Rama','female'),('Ramona','female'),('Rana','female'),('Randall','male'),('Raphael','male'),('Rashad','male'),('Raven','female'),('Ray','male'),('Raya','female'),('Raymond','male'),('Reagan','female'),('Rebecca','female'),('Rebekah','female'),('Reece','male'),('Reed','male'),('Reese','male'),('Regan','female'),('Regina','female'),('Remedios','female'),('Renee','female'),('Reuben','male'),('Rhea','female'),('Rhiannon','female'),('Rhoda','female'),('Rhona','female'),('Rhonda','female'),('Ria','female'),('Richard','male'),('Rigel','male'),('Riley','female'),('Rina','female'),('Rinah','female'),('Risa','female'),('Roanna','female'),('Roary','female'),('Robert','male'),('Robin','female'),('Rogan','male'),('Ronan','male'),('Rooney','male'),('Rosalyn','female'),('Rose','female'),('Ross','male'),('Roth','male'),('Rowan','female'),('Ruby','female'),('Rudyard','male'),('Russell','male'),('Ruth','female'),('Ryan','male'),('Ryder','male'),('Rylee','female'),('Sacha','female'),('Sade','female'),('Sage','female'),('Salvador','male'),('Samantha','female'),('Samson','male'),('Samuel','male'),('Sandra','female'),('Sara','female'),('Sarah','female'),('Sasha','female'),('Savannah','female'),('Sawyer','male'),('Scarlet','female'),('Scarlett','female'),('Scott','male'),('Sean','male'),('Sebastian','male'),('Selma','female'),('September','female'),('Serena','female'),('Serina','female'),('Seth','male'),('Shad','male'),('Shaeleigh','female'),('Shafira','female'),('Shaine','female'),('Shana','female'),('Shannon','female'),('Sharon','female'),('Shay','female'),('Shea','female'),('Sheila','female'),('Shelby','female'),('Shelley','female'),('Shellie','female'),('Shelly','female'),('Shoshana','female'),('Sierra','female'),('Signe','female'),('Sigourney','female'),('Silas','male'),('Simon','male'),('Simone','female'),('Skyler','female'),('Slade','male'),('Sloane','both'),('Solomon','male'),('Sonia','female'),('Sonya','female'),('Sophia','female'),('Sopoline','female'),('Stacey','female'),('Stacy','female'),('Steel','male'),('Stella','female'),('Stephanie','female'),('Stephen','male'),('Steven','male'),('Stewart','male'),('Stone','male'),('Stuart','male'),('Suki','female'),('Summer','female'),('Susan','female'),('Sybil','female'),('Sybill','female'),('Sydnee','female'),('Sydney','female'),('Sylvester','male'),('Sylvia','female'),('TaShya','female'),('Tad','male'),('Tallulah','female'),('Talon','male'),('Tamara','female'),('Tamekah','female'),('Tana','female'),('Tanek','male'),('Tanisha','female'),('Tanner','male'),('Tanya','female'),('Tara','female'),('Tarik','male'),('Tasha','female'),('Tashya','female'),('Tate','male'),('Tatiana','female'),('Tatum','female'),('Tatyana','female'),('Taylor','both'),('Teagan','female'),('Teegan','female'),('Thaddeus','male'),('Thane','male'),('Theodore','male'),('Thomas','male'),('Thor','male'),('Tiger','male'),('Timon','male'),('Timothy','male'),('Tobias','male'),('Todd','male'),('Travis','male'),('Trevor','male'),('Troy','male'),('Tucker','male'),('Tyler','male'),('Tyrone','male'),('Ulla','female'),('Ulric','male'),('Ulysses','male'),('Uma','female'),('Unity','female'),('Upton','male'),('Uriah','male'),('Uriel','male'),('Urielle','female'),('Ursa','female'),('Ursula','female'),('Uta','female'),('Valentine','male'),('Vance','male'),('Vanna','female'),('Vaughan','male'),('Veda','female'),('Velma','female'),('Venus','female'),('Vera','female'),('Vernon','male'),('Veronica','female'),('Victor','male'),('Victoria','female'),('Vielka','female'),('Vincent','male'),('Violet','female'),('Virginia','female'),('Vivian','female'),('Vivien','female'),('Vladimir','male'),('Wade','male'),('Walker','male'),('Wallace','male'),('Walter','male'),('Wanda','female'),('Wang','male'),('Warren','male'),('Wayne','male'),('Wendy','female'),('Wesley','male'),('Whilemina','female'),('Whitney','female'),('Whoopi','female'),('Willa','female'),('William','male'),('Willow','female'),('Wilma','female'),('Wing','male'),('Winifred','female'),('Winter','female'),('Wyatt','male'),('Wylie','male'),('Wynne','female'),('Wynter','female'),('Wyoming','female'),('Xander','male'),('Xandra','female'),('Xantha','female'),('Xanthus','male'),('Xavier','male'),('Xaviera','female'),('Xena','female'),('Xenos','male'),('Xerxes','both'),('Xyla','female'),('Yael','female'),('Yardley','male'),('Yasir','male'),('Yen','female'),('Yeo','female'),('Yetta','female'),('Yoko','female'),('Yolanda','female'),('Yoshi','female'),('Yoshio','male'),('Yuli','male'),('Yuri','female'),('Yvette','female'),('Yvonne','female'),('Zachary','male'),('Zachery','male'),('Zahir','male'),('Zane','male'),('Zelda','female'),('Zelenia','female'),('Zena','female'),('Zenaida','female'),('Zenia','female'),('Zeph','male'),('Zephania','male'),('Zephr','female'),('Zeus','male'),('Zia','female'),('Zoe','female'),('Zorita','female'),('Jacqueline','female')
		";
		$queries[] = "
			CREATE TABLE {$prefix}last_names (
				id mediumint(9) NOT NULL auto_increment,
				last_name varchar(100) NOT NULL default '',
				PRIMARY KEY (id)
			)
		";
		$queries[] = "
			INSERT INTO {$prefix}last_names (last_name)
			VALUES ('Abbott'),('Acevedo'),('Acosta'),('Adams'),('Adkins'),('Aguilar'),('Aguirre'),('Albert'),('Alexander'),('Alford'),('Allen'),('Allison'),('Alston'),('Alvarado'),('Alvarez'),('Anderson'),('Andrews'),('Anthony'),('Armstrong'),('Arnold'),('Ashley'),('Atkins'),('Atkinson'),('Austin'),('Avery'),('Avila'),('Ayala'),('Ayers'),('Bailey'),('Baird'),('Baker'),('Baldwin'),('Ball'),('Ballard'),('Banks'),('Barber'),('Barker'),('Barlow'),('Barnes'),('Barnett'),('Barr'),('Barrera'),('Barrett'),('Barron'),('Barry'),('Bartlett'),('Barton'),('Bass'),('Bates'),('Battle'),('Bauer'),('Baxter'),('Beach'),('Bean'),('Beard'),('Beasley'),('Beck'),('Becker'),('Bell'),('Bender'),('Benjamin'),('Bennett'),('Benson'),('Bentley'),('Benton'),('Berg'),('Berger'),('Bernard'),('Berry'),('Best'),('Bird'),('Bishop'),('Black'),('Blackburn'),('Blackwell'),('Blair'),('Blake'),('Blanchard'),('Blankenship'),('Blevins'),('Bolton'),('Bond'),('Bonner'),('Booker'),('Boone'),('Booth'),('Bowen'),('Bowers'),('Bowman'),('Boyd'),('Boyer'),('Boyle'),('Bradford'),('Bradley'),('Bradshaw'),('Brady'),('Branch'),('Bray'),('Brennan'),('Brewer'),('Bridges'),('Briggs'),('Bright'),('Britt'),('Brock'),('Brooks'),('Brown'),('Browning'),('Bruce'),('Bryan'),('Bryant'),('Buchanan'),('Buck'),('Buckley'),('Buckner'),('Bullock'),('Burch'),('Burgess'),('Burke'),('Burks'),('Burnett'),('Burns'),('Burris'),('Burt'),('Burton'),('Bush'),('Butler'),('Byers'),('Byrd'),('Cabrera'),('Cain'),('Calderon'),('Caldwell'),('Calhoun'),('Callahan'),('Camacho'),('Cameron'),('Campbell'),('Campos'),('Cannon'),('Cantrell'),('Cantu'),('Cardenas'),('Carey'),('Carlson'),('Carney'),('Carpenter'),('Carr'),('Carrillo'),('Carroll'),('Carson'),('Carter'),('Carver'),('Case'),('Casey'),('Cash'),('Castaneda'),('Castillo'),('Castro'),('Cervantes'),('Chambers'),('Chan'),('Chandler'),('Chaney'),('Chang'),('Chapman'),('Charles'),('Chase'),('Chavez'),('Chen'),('Cherry'),('Christensen'),('Christian'),('Church'),('Clark'),('Clarke'),('Clay'),('Clayton'),('Clements'),('Clemons'),('Cleveland'),('Cline'),('Cobb'),('Cochran'),('Coffey'),('Cohen'),('Cole'),('Coleman'),('Collier'),('Collins'),('Colon'),('Combs'),('Compton'),('Conley'),('Conner'),('Conrad'),('Contreras'),('Conway'),('Cook'),('Cooke'),('Cooley'),('Cooper'),('Copeland'),('Cortez'),('Cote'),('Cotton'),('Cox'),('Craft'),('Craig'),('Crane'),('Crawford'),('Crosby'),('Cross'),('Cruz'),('Cummings'),('Cunningham'),('Curry'),('Curtis'),('Dale'),('Dalton'),('Daniel'),('Daniels'),('Daugherty'),('Davenport'),('David'),('Davidson'),('Davis'),('Dawson'),('Day'),('Dean'),('Decker'),('Dejesus'),('Delacruz'),('Delaney'),('Deleon'),('Delgado'),('Dennis'),('Diaz'),('Dickerson'),('Dickson'),('Dillard'),('Dillon'),('Dixon'),('Dodson'),('Dominguez'),('Donaldson'),('Donovan'),('Dorsey'),('Dotson'),('Douglas'),('Downs'),('Doyle'),('Drake'),('Dudley'),('Duffy'),('Duke'),('Duncan'),('Dunlap'),('Dunn'),('Duran'),('Durham'),('Dyer'),('Eaton'),('Edwards'),('Elliott'),('Ellis'),('Ellison'),('Emerson'),('England'),('English'),('Erickson'),('Espinoza'),('Estes'),('Estrada'),('Evans'),('Everett'),('Ewing'),('Farley'),('Farmer'),('Farrell'),('Faulkner'),('Ferguson'),('Fernandez'),('Ferrell'),('Fields'),('Figueroa'),('Finch'),('Finley'),('Fischer'),('Fisher'),('Fitzgerald'),('Fitzpatrick'),('Fleming'),('Fletcher'),('Flores'),('Flowers'),('Floyd'),('Flynn'),('Foley'),('Forbes'),('Ford'),('Foreman'),('Foster'),('Fowler'),('Fox'),('Francis'),('Franco'),('Frank'),('Franklin'),('Franks'),('Frazier'),('Frederick'),('Freeman'),('French'),('Frost'),('Fry'),('Frye'),('Fuentes'),('Fuller'),('Fulton'),('Gaines'),('Gallagher'),('Gallegos'),('Galloway'),('Gamble'),('Garcia'),('Gardner'),('Garner'),('Garrett'),('Garrison'),('Garza'),('Gates'),('Gay'),('Gentry'),('George'),('Gibbs'),('Gibson'),('Gilbert'),('Giles'),('Gill'),('Gillespie'),('Gilliam'),('Gilmore'),('Glass'),('Glenn'),('Glover'),('Goff'),('Golden'),('Gomez'),('Gonzales'),('Gonzalez'),('Good'),('Goodman'),('Goodwin'),('Gordon'),('Gould'),('Graham'),('Grant'),('Graves'),('Gray'),('Green'),('Greene'),('Greer'),('Gregory'),('Griffin'),('Griffith'),('Grimes'),('Gross'),('Guerra'),('Guerrero'),('Guthrie'),('Gutierrez'),('Guy'),('Guzman'),('Hahn'),('Hale'),('Haley'),('Hall'),('Hamilton'),('Hammond'),('Hampton'),('Hancock'),('Haney'),('Hansen'),('Hanson'),('Hardin'),('Harding'),('Hardy'),('Harmon'),('Harper'),('Harrell'),('Harrington'),('Harris'),('Harrison'),('Hart'),('Hartman'),('Harvey'),('Hatfield'),('Hawkins'),('Hayden'),('Hayes'),('Haynes'),('Hays'),('Head'),('Heath'),('Hebert'),('Henderson'),('Hendricks'),('Hendrix'),('Henry'),('Hensley'),('Henson'),('Herman'),('Hernandez'),('Herrera'),('Herring'),('Hess'),('Hester'),('Hewitt'),('Hickman'),('Hicks'),('Higgins'),('Hill'),('Hines'),('Hinton'),('Hobbs'),('Hodge'),('Hodges'),('Hoffman'),('Hogan'),('Holcomb'),('Holden'),('Holder'),('Holland'),('Holloway'),('Holman'),('Holmes'),('Holt'),('Hood'),('Hooper'),('Hoover'),('Hopkins'),('Hopper'),('Horn'),('Horne'),('Horton'),('House'),('Houston'),('Howard'),('Howe'),('Howell'),('Hubbard'),('Huber'),('Hudson'),('Huff'),('Huffman'),('Hughes'),('Hull'),('Humphrey'),('Hunt'),('Hunter'),('Hurley'),('Hurst'),('Hutchinson'),('Hyde'),('Ingram'),('Irwin'),('Jackson'),('Jacobs'),('Jacobson'),('James'),('Jarvis'),('Jefferson'),('Jenkins'),('Jennings'),('Jensen'),('Jimenez'),('Johns'),('Johnson'),('Johnston'),('Jones'),('Jordan'),('Joseph'),('Joyce'),('Joyner'),('Juarez'),('Justice'),('Kane'),('Kaufman'),('Keith'),('Keller'),('Kelley'),('Kelly'),('Kemp'),('Kennedy'),('Kent'),('Kerr'),('Key'),('Kidd'),('Kim'),('King'),('Kinney'),('Kirby'),('Kirk'),('Kirkland'),('Klein'),('Kline'),('Knapp'),('Knight'),('Knowles'),('Knox'),('Koch'),('Kramer'),('Lamb'),('Lambert'),('Lancaster'),('Landry'),('Lane'),('Lang'),('Langley'),('Lara'),('Larsen'),('Larson'),('Lawrence'),('Lawson'),('Le'),('Leach'),('Leblanc'),('Lee'),('Leon'),('Leonard'),('Lester'),('Levine'),('Levy'),('Lewis'),('Lindsay'),('Lindsey'),('Little'),('Livingston'),('Lloyd'),('Logan'),('Long'),('Lopez'),('Lott'),('Love'),('Lowe'),('Lowery'),('Lucas'),('Luna'),('Lynch'),('Lynn'),('Lyons'),('Macdonald'),('Macias'),('Mack'),('Madden'),('Maddox'),('Maldonado'),('Malone'),('Mann'),('Manning'),('Marks'),('Marquez'),('Marsh'),('Marshall'),('Martin'),('Martinez'),('Mason'),('Massey'),('Mathews'),('Mathis'),('Matthews'),('Maxwell'),('May'),('Mayer'),('Maynard'),('Mayo'),('Mays'),('Mcbride'),('Mccall'),('Mccarthy'),('Mccarty'),('Mcclain'),('Mcclure'),('Mcconnell'),('Mccormick'),('Mccoy'),('Mccray'),('Mccullough'),('Mcdaniel'),('Mcdonald'),('Mcdowell'),('Mcfadden'),('Mcfarland'),('Mcgee'),('Mcgowan'),('Mcguire'),('Mcintosh'),('Mcintyre'),('Mckay'),('Mckee'),('Mckenzie'),('Mckinney'),('Mcknight'),('Mclaughlin'),('Mclean'),('Mcleod'),('Mcmahon'),('Mcmillan'),('Mcneil'),('Mcpherson'),('Meadows'),('Medina'),('Mejia'),('Melendez'),('Melton'),('Mendez'),('Mendoza'),('Mercado'),('Mercer'),('Merrill'),('Merritt'),('Meyer'),('Meyers'),('Michael'),('Middleton'),('Miles'),('Miller'),('Mills'),('Miranda'),('Mitchell'),('Molina'),('Monroe'),('Montgomery'),('Montoya'),('Moody'),('Moon'),('Mooney'),('Moore'),('Morales'),('Moran'),('Moreno'),('Morgan'),('Morin'),('Morris'),('Morrison'),('Morrow'),('Morse'),('Morton'),('Moses'),('Mosley'),('Moss'),('Mueller'),('Mullen'),('Mullins'),('Munoz'),('Murphy'),('Murray'),('Myers'),('Nash'),('Navarro'),('Neal'),('Nelson'),('Newman'),('Newton'),('Nguyen'),('Nichols'),('Nicholson'),('Nielsen'),('Nieves'),('Nixon'),('Noble'),('Noel'),('Nolan'),('Norman'),('Norris'),('Norton'),('Nunez'),('Obrien'),('Ochoa'),('Oconnor'),('Odom'),('Odonnell'),('Oliver'),('Olsen'),('Olson'),('Oneal'),('Oneil'),('Oneill'),('Orr'),('Ortega'),('Ortiz'),('Osborn'),('Osborne'),('Owen'),('Owens'),('Pace'),('Pacheco'),('Padilla'),('Page'),('Palmer'),('Park'),('Parker'),('Parks'),('Parrish'),('Parsons'),('Pate'),('Patel'),('Patrick'),('Patterson'),('Patton'),('Paul'),('Payne'),('Pearson'),('Peck'),('Pena'),('Pennington'),('Perez'),('Perkins'),('Perry'),('Peters'),('Petersen'),('Peterson'),('Petty'),('Phelps'),('Phillips'),('Pickett'),('Pierce'),('Pittman'),('Pitts'),('Pollard'),('Poole'),('Pope'),('Porter'),('Potter'),('Potts'),('Powell'),('Powers'),('Pratt'),('Preston'),('Price'),('Prince'),('Pruitt'),('Puckett'),('Pugh'),('Quinn'),('Ramirez'),('Ramos'),('Ramsey'),('Randall'),('Randolph'),('Rasmussen'),('Ratliff'),('Ray'),('Raymond'),('Reed'),('Reese'),('Reeves'),('Reid'),('Reilly'),('Reyes'),('Reynolds'),('Rhodes'),('Rice'),('Rich'),('Richard'),('Richards'),('Richardson'),('Richmond'),('Riddle'),('Riggs'),('Riley'),('Rios'),('Rivas'),('Rivera'),('Rivers'),('Roach'),('Robbins'),('Roberson'),('Roberts'),('Robertson'),('Robinson'),('Robles'),('Rocha'),('Rodgers'),('Rodriguez'),('Rodriquez'),('Rogers'),('Rojas'),('Rollins'),('Roman'),('Romero'),('Rosa'),('Rosales'),('Rosario'),('Rose'),('Ross'),('Roth'),('Rowe'),('Rowland'),('Roy'),('Ruiz'),('Rush'),('Russell'),('Russo'),('Rutledge'),('Ryan'),('Salas'),('Salazar'),('Salinas'),('Sampson'),('Sanchez'),('Sanders'),('Sandoval'),('Sanford'),('Santana'),('Santiago'),('Santos'),('Sargent'),('Saunders'),('Savage'),('Sawyer'),('Schmidt'),('Schneider'),('Schroeder'),('Schultz'),('Schwartz'),('Scott'),('Sears'),('Sellers'),('Serrano'),('Sexton'),('Shaffer'),('Shannon'),('Sharp'),('Sharpe'),('Shaw'),('Shelton'),('Shepard'),('Shepherd'),('Sheppard'),('Sherman'),('Shields'),('Short'),('Silva'),('Simmons'),('Simon'),('Simpson'),('Sims'),('Singleton'),('Skinner'),('Slater'),('Sloan'),('Small'),('Smith'),('Snider'),('Snow'),('Snyder'),('Solis'),('Solomon'),('Sosa'),('Soto'),('Sparks'),('Spears'),('Spence'),('Spencer'),('Stafford'),('Stanley'),('Stanton'),('Stark'),('Steele'),('Stein'),('Stephens'),('Stephenson'),('Stevens'),('Stevenson'),('Stewart'),('Stokes'),('Stone'),('Stout'),('Strickland'),('Strong'),('Stuart'),('Suarez'),('Sullivan'),('Summers'),('Sutton'),('Swanson'),('Sweeney'),('Sweet'),('Sykes'),('Talley'),('Tanner'),('Tate'),('Taylor'),('Terrell'),('Terry'),('Thomas'),('Thompson'),('Thornton'),('Tillman'),('Todd'),('Torres'),('Townsend'),('Tran'),('Travis'),('Trevino'),('Trujillo'),('Tucker'),('Turner'),('Tyler'),('Tyson'),('Underwood'),('Valdez'),('Valencia'),('Valentine'),('Valenzuela'),('Vance'),('Vang'),('Vargas'),('Vasquez'),('Vaughan'),('Vaughn'),('Vazquez'),('Vega'),('Velasquez'),('Velazquez'),('Velez'),('Villarreal'),('Vincent'),('Vinson'),('Wade'),('Wagner'),('Walker'),('Wall'),('Wallace'),('Waller'),('Walls'),('Walsh'),('Walter'),('Walters'),('Walton'),('Ward'),('Ware'),('Warner'),('Warren'),('Washington'),('Waters'),('Watkins'),('Watson'),('Watts'),('Weaver'),('Webb'),('Weber'),('Webster'),('Weeks'),('Weiss'),('Welch'),('Wells'),('West'),('Wheeler'),('Whitaker'),('White'),('Whitehead'),('Whitfield'),('Whitley'),('Whitney'),('Wiggins'),('Wilcox'),('Wilder'),('Wiley'),('Wilkerson'),('Wilkins'),('Wilkinson'),('William'),('Williams'),('Williamson'),('Willis'),('Wilson'),('Winters'),('Wise'),('Witt'),('Wolf'),('Wolfe'),('Wong'),('Wood'),('Woodard'),('Woods'),('Woodward'),('Wooten'),('Workman'),('Wright'),('Wyatt'),('Wynn'),('Yang'),('Yates'),('York'),('Young'),('Zamora'),('Zimmerman')
		";

		$response = Core::$db->query($queries, $rollbackQueries);

		if ($response["success"]) {
			return array(true, "");
		} else {
			return array(false, $response["errorMessage"]);
		}
	}


	public function getHelpHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$content =<<<EOF
	<p>
		{$this->L["help_intro"]}
	</p>

	<table cellpadding="0" cellspacing="1">
	<tr>
		<td width="100"><h4>Name</h4></td>
		<td>{$this->L["type_Name"]}</td>
	</tr>
	<tr>
		<td><h4>MaleName</h4></td>
		<td>{$this->L["type_MaleName"]}</td>
	</tr>
	<tr>
		<td><h4>FemaleName</h4></td>
		<td>{$this->L["type_FemaleName"]}</td>
	</tr>
	<tr>
		<td><h4>Initial</h4></td>
		<td>{$this->L["type_Initial"]}</td>
	</tr>
	<tr>
		<td><h4>Surname</h4></td>
		<td>{$this->L["type_Surname"]}</td>
	</tr>
	</table>
EOF;

		return $content;
	}
}
