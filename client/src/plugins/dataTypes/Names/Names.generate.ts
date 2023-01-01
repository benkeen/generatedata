import { NamesSource } from './Names.state';
import { WorkerUtils } from '~utils/workerUtils';
import { DTGenerateResult } from '~types/dataTypes';

const maleNames = [
	'Aaron', 'Abbot', 'Abdul', 'Abel', 'Abraham', 'Acton', 'Adam', 'Addison', 'Adrian', 'Ahmed', 'Aidan', 'Akeem',
	'Aladdin', 'Alan', 'Alden', 'Alec', 'Alexander', 'Alfonso', 'Ali', 'Allen', 'Allistair', 'Alvin', 'Amal', 'Amery',
	'Amir', 'Amos', 'Andrew', 'Anthony', 'Aquila', 'Arden', 'Aristotle', 'Armand', 'Armando', 'Arsenio', 'Arthur',
	'Asher', 'Ashton', 'August', 'Austin', 'Avram', 'Axel', 'Baker', 'Barclay', 'Barrett', 'Barry', 'Basil', 'Baxter',
	'Beau', 'Beck', 'Benedict', 'Benjamin', 'Berk', 'Bernard', 'Bert', 'Bevis', 'Blake', 'Blaze', 'Boris', 'Bradley',
	'Brady', 'Branden', 'Brandon', 'Brendan', 'Brenden', 'Brennan', 'Brent', 'Brett', 'Brian', 'Brock', 'Brody',
	'Bruce', 'Bruno', 'Buckminster', 'Burke', 'Burton', 'Byron', 'Cade', 'Cadman', 'Caesar', 'Cain', 'Cairo',
	'Caldwell', 'Caleb', 'Callum', 'Calvin', 'Camden', 'Cameron', 'Carl', 'Carlos', 'Carson', 'Carter', 'Castor',
	'Cedric', 'Chadwick', 'Chaim', 'Chancellor', 'Chandler', 'Chaney', 'Channing', 'Charles', 'Chase', 'Chester',
	'Christian', 'Christopher', 'Ciaran', 'Clark', 'Clarke', 'Clayton', 'Clinton', 'Coby', 'Cody', 'Colby', 'Cole',
	'Colin', 'Colorado', 'Colt', 'Colton', 'Conan', 'Connor', 'Cooper', 'Craig', 'Cruz', 'Cullen', 'Curran', 'Cyrus',
	'Dale', 'Dalton', 'Damian', 'Damon', 'Dane', 'Daniel', 'Dante', 'Daquan', 'Darius', 'David', 'Davis', 'Deacon',
	'Dean', 'Declan', 'Demetrius', 'Dennis', 'Denton', 'Derek', 'Devin', 'Dexter', 'Dieter', 'Dillon', 'Dolan',
	'Dominic', 'Donovan', 'Dorian', 'Drake', 'Drew', 'Driscoll', 'Duncan', 'Dustin', 'Dylan', 'Eagan', 'Eaton', 'Edan',
	'Edward', 'Elijah', 'Elliott', 'Elmo', 'Elton', 'Elvis', 'Emerson', 'Emery', 'Emmanuel', 'Erasmus', 'Eric', 'Erich',
	'Ethan', 'Evan', 'Ezekiel', 'Ezra', 'Felix', 'Ferdinand', 'Ferris', 'Finn', 'Fitzgerald', 'Fletcher', 'Flynn',
	'Forrest', 'Francis', 'Fritz', 'Fuller', 'Fulton', 'Gabriel', 'Gage', 'Galvin', 'Gannon', 'Gareth', 'Garrett',
	'Garrison', 'Garth', 'Gary', 'Gavin', 'Geoffrey', 'George', 'Giacomo', 'Gil', 'Grady', 'Graham', 'Graiden',
	'Grant', 'Gray', 'Gregory', 'Griffin', 'Griffith', 'Guy', 'Hakeem', 'Hall', 'Hamilton', 'Hamish', 'Hammett',
	'Harding', 'Harlan', 'Harper', 'Harrison', 'Hasad', 'Hashim', 'Hayden', 'Hayes', 'Hector', 'Hedley', 'Henry',
	'Herman', 'Herrod', 'Hilel', 'Hiram', 'Holmes', 'Honorato', 'Hop', 'Howard', 'Hoyt', 'Hu', 'Hunter', 'Hyatt',
	'Ian', 'Ignatius', 'Igor', 'Ira', 'Isaac', 'Isaiah', 'Ishmael', 'Ivan', 'Ivor', 'Jack', 'Jackson', 'Jacob',
	'Jakeem', 'Jamal', 'James', 'Jameson', 'Jared', 'Jarrod', 'Jason', 'Jasper', 'Jelani', 'Jeremy', 'Jermaine',
	'Jerome', 'Jerry', 'Jesse', 'Jin', 'Joel', 'John', 'Jonah', 'Jonas', 'Jordan', 'Joseph', 'Joshua', 'Josiah',
	'Judah', 'Julian', 'Justin', 'Kadeem', 'Kamal', 'Kane', 'Kareem', 'Kaseem', 'Kasimir', 'Kasper', 'Kato',
	'Keane', 'Keaton', 'Keefe', 'Keegan', 'Keith', 'Kelly', 'Kennan', 'Kennedy', 'Kenneth', 'Kenyon', 'Kermit',
	'Kevin', 'Kibo', 'Kieran', 'Kirk', 'Knox', 'Kuame', 'Kyle', 'Laith', 'Lamar', 'Lance', 'Lane', 'Lars',
	'Lawrence', 'Lee', 'Len', 'Leo', 'Leonard', 'Leroy', 'Lester', 'Lev', 'Levi', 'Lewis', 'Linus', 'Lionel', 'Logan',
	'Louis', 'Lucas', 'Lucian', 'Lucius', 'Luke', 'Lyle', 'Macaulay', 'Macon', 'Magee', 'Malachi', 'Malcolm', 'Malik',
	'Mannix', 'Mark', 'Marsden', 'Marshall', 'Martin', 'Marvin', 'Mason', 'Matthew', 'Maxwell', 'Melvin', 'Merrill',
	'Merritt', 'Micah', 'Michael', 'Mohammad', 'Moses', 'Mufutau', 'Murphy', 'Myles', 'Nash', 'Nasim', 'Nathan',
	'Nathaniel', 'Nehru', 'Neil', 'Nero', 'Neville', 'Nicholas', 'Nigel', 'Nissim', 'Noah', 'Noble', 'Nolan', 'Norman',
	'Octavius', 'Odysseus', 'Oleg', 'Oliver', 'Omar', 'Oren', 'Orlando', 'Orson', 'Oscar', 'Otto', 'Owen', 'Paki',
	'Palmer', 'Patrick', 'Paul', 'Perry', 'Peter', 'Phelan', 'Philip', 'Phillip', 'Plato', 'Porter', 'Prescott',
	'Preston', 'Price', 'Quamar', 'Quentin', 'Quinlan', 'Quinn', 'Rafael', 'Rahim', 'Raja', 'Rajah', 'Ralph', 'Randall',
	'Raphael', 'Rashad', 'Ray', 'Raymond', 'Reece', 'Reed', 'Reese', 'Reuben', 'Richard', 'Rigel', 'Robert', 'Rogan',
	'Ronan', 'Rooney', 'Ross', 'Roth', 'Rudyard', 'Russell', 'Ryan', 'Ryder', 'Salvador', 'Samson', 'Samuel', 'Sawyer',
	'Scott', 'Sean', 'Sebastian', 'Seth', 'Shad', 'Silas', 'Simon', 'Slade', 'Solomon', 'Steel', 'Stephen', 'Steven',
	'Stewart', 'Stone', 'Stuart', 'Sylvester', 'Tad', 'Talon', 'Tanek', 'Tanner', 'Tarik', 'Tate', 'Thaddeus',
	'Thane', 'Theodore', 'Thomas', 'Thor', 'Tiger', 'Timon', 'Timothy', 'Tobias', 'Todd', 'Travis', 'Trevor', 'Troy',
	'Tucker', 'Tyler', 'Tyrone', 'Ulric', 'Ulysses', 'Upton', 'Uriah', 'Uriel', 'Valentine', 'Vance', 'Vaughan',
	'Vernon', 'Victor', 'Vincent', 'Vladimir', 'Wade', 'Walker', 'Wallace', 'Walter', 'Wang', 'Warren', 'Wayne',
	'Wesley', 'William', 'Wing', 'Wyatt', 'Wylie', 'Xander', 'Xanthus', 'Xavier', 'Xenos', 'Yardley', 'Yasir',
	'Yoshio', 'Yuli', 'Zachary', 'Zachery', 'Zahir', 'Zane', 'Zeph', 'Zephania', 'Zeus'
];
const femaleNames = [
	'Abigail', 'Abra', 'Adara', 'Adele', 'Adena', 'Adria', 'Adrienne', 'Aiko', 'Aileen', 'Aimee', 'Ainsley', 'Alana',
	'Alea', 'Alexa', 'Alexandra', 'Alexis', 'Alfreda', 'Alice', 'Alika', 'Aline', 'Alisa', 'Allegra', 'Alma', 'Althea',
	'Alyssa', 'Amanda', 'Amaya', 'Amber', 'Amela', 'Amelia', 'Amena', 'Amethyst', 'Amity', 'Amy', 'Anastasia', 'Angela',
	'Angelica', 'Anika', 'Anjolie', 'Ann', 'Anne', 'Aphrodite', 'April', 'Aretha', 'Ariana', 'Ariel', 'Ashely',
	'Aspen', 'Astra', 'Athena', 'Audra', 'Audrey', 'Aurelia', 'Aurora', 'Autumn', 'Ava', 'Avye', 'Ayanna', 'Azalia',
	'Barbara', 'Basia', 'Beatrice', 'Bell', 'Belle', 'Bertha', 'Bethany', 'Beverly', 'Bianca', 'Blossom', 'Blythe', 'Bo',
	'Breanna', 'Bree', 'Brenda', 'Brenna', 'Brianna', 'Briar', 'Brielle', 'Britanney', 'Britanni', 'Brittany', 'Brooke',
	'Bryar', 'Brynn', 'Brynne', 'Buffy', 'Cailin', 'Calista', 'Callie', 'Cally', 'Cameran', 'Cameron', 'Camilla', 'Camille',
	'Candace', 'Candice', 'Cara', 'Carissa', 'Carla', 'Carly', 'Carol', 'Carolyn', 'Caryn', 'Cassady', 'Cassandra',
	'Cassidy', 'Catherine', 'Cathleen', 'Cecilia', 'Celeste', 'Chanda', 'Chantale', 'Charde', 'Charissa', 'Charity',
	'Charlotte', 'Chastity', 'Chava', 'Chelsea', 'Cherokee', 'Cheryl', 'Cheyenne', 'Chiquita', 'Chloe', 'Christen',
	'Christine', 'Ciara', 'Claire', 'Clare', 'Claudia', 'Clementine', 'Cleo', 'Clio', 'Colette', 'Colleen', 'Constance',
	'Cora', 'Courtney', 'Cynthia', 'Dacey', 'Dahlia', 'Dai', 'Dana', 'Danielle', 'Daphne', 'Dara', 'Daria', 'Darrel',
	'Darryl', 'Daryl', 'Dawn', 'Deanna', 'Deborah', 'Debra', 'Deirdre', 'Delilah', 'Demetria', 'Denise', 'Desirae',
	'Desiree', 'Destiny', 'Diana', 'Dominique', 'Donna', 'Dora', 'Doris', 'Dorothy', 'Ebony', 'Echo', 'Elaine',
	'Eleanor', 'Eliana', 'Elizabeth', 'Ella', 'Emerald', 'Emi', 'Emily', 'Emma', 'Erica', 'Erin', 'Eugenia',
	'Evangeline', 'Eve', 'Evelyn', 'Faith', 'Fallon', 'Farrah', 'Fatima', 'Fay', 'Felicia', 'Fiona', 'Flavia',
	'Fleur', 'Florence', 'Frances', 'Francesca', 'Fredericka', 'Freya', 'Gail', 'Galena', 'Gay', 'Gemma', 'Genevieve',
	'Georgia', 'Geraldine', 'Germaine', 'Germane', 'Gillian', 'Ginger', 'Gisela', 'Giselle', 'Glenna', 'Gloria', 'Grace',
	'Gretchen', 'Guinevere', 'Gwendolyn', 'Hadassah', 'Hadley', 'Halee', 'Haley', 'Halla', 'Hanae', 'Hanna', 'Hannah',
	'Harriet', 'Haviva', 'Hayfa', 'Hayley', 'Heather', 'Hedda', 'Hedwig', 'Hedy', 'Heidi', 'Helen', 'Hermione', 'Hilary',
	'Hilda', 'Hillary', 'Hiroko', 'Hollee', 'Holly', 'Hope', 'Hyacinth', 'Idola', 'Idona', 'Ifeoma', 'Ignacia', 'Ila',
	'Iliana', 'Illana', 'Illiana', 'Ima', 'Imani', 'Imelda', 'Imogene', 'Ina', 'India', 'Indigo', 'Indira', 'Inez',
	'Inga', 'Ingrid', 'Iola', 'Iona', 'Irene', 'Iris', 'Irma', 'Isabella', 'Isabelle', 'Isadora', 'Ivana', 'Ivory',
	'Ivy', 'Jada', 'Jade', 'Jaden', 'Jael', 'Jaime', 'Jamalia', 'Jana', 'Jane', 'Janna', 'Jaquelyn', 'Jasmine', 'Jayme',
	'Jeanette', 'Jemima', 'Jena', 'Jenette', 'Jenna', 'Jennifer', 'Jescie', 'Jessamine', 'Jessica', 'Jillian', 'Joan',
	'Jocelyn', 'Joelle', 'Jolene', 'Jolie', 'Jordan', 'Jorden', 'Josephine', 'Joy', 'Judith', 'Julie', 'Juliet',
	'Justina', 'Justine', 'Kai', 'Kaitlin', 'Kalia', 'Kameko', 'Karen', 'Karina', 'Karleigh', 'Karly', 'Karyn', 'Katell',
	'Katelyn', 'Kathleen', 'Kay', 'Kaye', 'Keelie', 'Keely', 'Keiko', 'Kellie', 'Kelly', 'Kelsey', 'Kelsie', 'Kerry', 'Kessie', 'Kevyn', 'Kiara', 'Kiayada', 'Kim', 'Kimberley', 'Kimberly', 'Kiona', 'Kirby', 'Kirestin', 'Kirsten', 'Kitra', 'Kristen', 'Kyla', 'Kylan', 'Kylee', 'Kylie', 'Kylynn', 'Kyra', 'Lacey', 'Lacota', 'Lacy', 'Lael', 'Lana', 'Lani', 'Lara', 'Lareina', 'Larissa', 'Latifah', 'Laura', 'Laurel', 'Lavinia', 'Leah', 'Leandra', 'Lee', 'Leigh', 'Leila', 'Leilani', 'Lenore', 'Lesley', 'Leslie', 'Libby', 'Liberty', 'Lila', 'Lilah', 'Lillian', 'Lillith', 'Linda', 'Lisandra', 'Lois', 'Lucy', 'Lunea', 'Lydia', 'Lynn', 'Lysandra', 'MacKensie', 'MacKenzie', 'Macey', 'Macy', 'Madaline', 'Madeline', 'Madeson', 'Madison', 'Madonna', 'Maggie', 'Maggy', 'Maia', 'Maile', 'Maisie', 'Maite', 'Mallory', 'Mara', 'Marah', 'Marcia', 'Margaret', 'Mari', 'Mariam', 'Mariko', 'Maris', 'Marny', 'Martena', 'Martha', 'Martina', 'Mary', 'Maryam', 'Maxine', 'May', 'Maya', 'McKenzie', 'Mechelle', 'Medge', 'Megan', 'Meghan', 'Melanie', 'Melinda', 'Melissa', 'Melodie', 'Melyssa', 'Mercedes', 'Meredith', 'Mia', 'Michelle', 'Mikayla', 'Minerva', 'Mira', 'Miranda', 'Miriam', 'Moana', 'Mollie', 'Molly', 'Mona', 'Montana', 'Morgan', 'Myra', 'Nadine', 'Naida', 'Naomi', 'Natalie', 'Nayda', 'Nell', 'Nelle', 'Nerea', 'Nevada', 'Neve', 'Nichole', 'Nicole', 'Nina', 'Nita', 'Noel', 'Noelani', 'Noelle', 'Nola', 'Nomlanga', 'Nora', 'Nyssa', 'Ocean', 'Octavia', 'Odessa', 'Odette', 'Olga', 'Olivia', 'Olympia', 'Oprah', 'Ora', 'Ori', 'Orla', 'Orli', 'Paloma', 'Pamela', 'Pandora', 'Pascale', 'Patience', 'Patricia', 'Paula', 'Pearl', 'Penelope', 'Petra', 'Phoebe', 'Phyllis', 'Piper', 'Portia', 'Priscilla', 'Quail', 'Quemby', 'Quin', 'Quinn', 'Quintessa', 'Quon', 'Quyn', 'Quynn', 'Rachel', 'Rae', 'Rama', 'Ramona', 'Rana', 'Raven', 'Raya', 'Reagan', 'Rebecca', 'Rebekah', 'Regan', 'Regina', 'Remedios', 'Renee', 'Rhea', 'Rhiannon', 'Rhoda', 'Rhona', 'Rhonda', 'Ria', 'Riley', 'Rina', 'Rinah', 'Risa', 'Roanna', 'Roary', 'Robin', 'Rosalyn', 'Rose', 'Rowan', 'Ruby', 'Ruth', 'Rylee', 'Sacha', 'Sade', 'Sage', 'Samantha', 'Sandra', 'Sara', 'Sarah', 'Sasha', 'Savannah', 'Scarlet', 'Scarlett', 'Selma', 'September', 'Serena', 'Serina', 'Shaeleigh', 'Shafira', 'Shaine', 'Shana', 'Shannon', 'Sharon', 'Shay', 'Shea', 'Sheila', 'Shelby', 'Shelley', 'Shellie', 'Shelly', 'Shoshana', 'Sierra', 'Signe', 'Sigourney', 'Simone', 'Skyler', 'Sonia', 'Sonya', 'Sophia', 'Sopoline', 'Stacey', 'Stacy', 'Stella', 'Stephanie', 'Suki', 'Summer', 'Susan', 'Sybil', 'Sybill', 'Sydnee', 'Sydney', 'Sylvia', 'TaShya', 'Tallulah', 'Tamara', 'Tamekah', 'Tana', 'Tanisha', 'Tanya', 'Tara', 'Tasha', 'Tashya', 'Tatiana', 'Tatum', 'Tatyana', 'Teagan', 'Teegan', 'Ulla', 'Uma', 'Unity', 'Urielle', 'Ursa', 'Ursula', 'Uta', 'Vanna', 'Veda', 'Velma', 'Venus', 'Vera', 'Veronica', 'Victoria', 'Vielka', 'Violet', 'Virginia', 'Vivian', 'Vivien', 'Wanda', 'Wendy', 'Whilemina', 'Whitney', 'Whoopi', 'Willa', 'Willow', 'Wilma', 'Winifred', 'Winter', 'Wynne', 'Wynter', 'Wyoming', 'Xandra', 'Xantha', 'Xaviera', 'Xena', 'Xyla', 'Yael', 'Yen', 'Yeo', 'Yetta', 'Yoko', 'Yolanda', 'Yoshi', 'Yuri', 'Yvette', 'Yvonne', 'Zelda', 'Zelenia', 'Zena', 'Zenaida', 'Zenia', 'Zephr', 'Zia', 'Zoe', 'Zorita', 'Jacqueline'
];
const lastNames = [
	'Abbott', 'Acevedo', 'Acosta', 'Adams', 'Adkins', 'Aguilar', 'Aguirre', 'Albert', 'Alexander', 'Alford', 'Allen',
	'Allison', 'Alston', 'Alvarado', 'Alvarez', 'Anderson', 'Andrews', 'Anthony', 'Armstrong', 'Arnold', 'Ashley',
	'Atkins', 'Atkinson', 'Austin', 'Avery', 'Avila', 'Ayala', 'Ayers', 'Bailey', 'Baird', 'Baker', 'Baldwin', 'Ball',
	'Ballard', 'Banks', 'Barber', 'Barker', 'Barlow', 'Barnes', 'Barnett', 'Barr', 'Barrera', 'Barrett', 'Barron',
	'Barry', 'Bartlett', 'Barton', 'Bass', 'Bates', 'Battle', 'Bauer', 'Baxter', 'Beach', 'Bean', 'Beard', 'Beasley',
	'Beck', 'Becker', 'Bell', 'Bender', 'Benjamin', 'Bennett', 'Benson', 'Bentley', 'Benton', 'Berg', 'Berger',
	'Bernard', 'Berry', 'Best', 'Bird', 'Bishop', 'Black', 'Blackburn', 'Blackwell', 'Blair', 'Blake', 'Blanchard',
	'Blankenship', 'Blevins', 'Bolton', 'Bond', 'Bonner', 'Booker', 'Boone', 'Booth', 'Bowen', 'Bowers', 'Bowman',
	'Boyd', 'Boyer', 'Boyle', 'Bradford', 'Bradley', 'Bradshaw', 'Brady', 'Branch', 'Bray', 'Brennan', 'Brewer',
	'Bridges', 'Briggs', 'Bright', 'Britt', 'Brock', 'Brooks', 'Brown', 'Browning', 'Bruce', 'Bryan', 'Bryant',
	'Buchanan', 'Buck', 'Buckley', 'Buckner', 'Bullock', 'Burch', 'Burgess', 'Burke', 'Burks', 'Burnett', 'Burns',
	'Burris', 'Burt', 'Burton', 'Bush', 'Butler', 'Byers', 'Byrd', 'Cabrera', 'Cain', 'Calderon', 'Caldwell',
	'Calhoun', 'Callahan', 'Camacho', 'Cameron', 'Campbell', 'Campos', 'Cannon', 'Cantrell', 'Cantu', 'Cardenas',
	'Carey', 'Carlson', 'Carney', 'Carpenter', 'Carr', 'Carrillo', 'Carroll', 'Carson', 'Carter', 'Carver', 'Case',
	'Casey', 'Cash', 'Castaneda', 'Castillo', 'Castro', 'Cervantes', 'Chambers', 'Chan', 'Chandler', 'Chaney', 'Chang',
	'Chapman', 'Charles', 'Chase', 'Chavez', 'Chen', 'Cherry', 'Christensen', 'Christian', 'Church', 'Clark', 'Clarke',
	'Clay', 'Clayton', 'Clements', 'Clemons', 'Cleveland', 'Cline', 'Cobb', 'Cochran', 'Coffey', 'Cohen', 'Cole',
	'Coleman', 'Collier', 'Collins', 'Colon', 'Combs', 'Compton', 'Conley', 'Conner', 'Conrad', 'Contreras', 'Conway',
	'Cook', 'Cooke', 'Cooley', 'Cooper', 'Copeland', 'Cortez', 'Cote', 'Cotton', 'Cox', 'Craft', 'Craig', 'Crane',
	'Crawford', 'Crosby', 'Cross', 'Cruz', 'Cummings', 'Cunningham', 'Curry', 'Curtis', 'Dale', 'Dalton', 'Daniel',
	'Daniels', 'Daugherty', 'Davenport', 'David', 'Davidson', 'Davis', 'Dawson', 'Day', 'Dean', 'Decker', 'Dejesus',
	'Delacruz', 'Delaney', 'Deleon', 'Delgado', 'Dennis', 'Diaz', 'Dickerson', 'Dickson', 'Dillard', 'Dillon',
	'Dixon', 'Dodson', 'Dominguez', 'Donaldson', 'Donovan', 'Dorsey', 'Dotson', 'Douglas', 'Downs', 'Doyle', 'Drake',
	'Dudley', 'Duffy', 'Duke', 'Duncan', 'Dunlap', 'Dunn', 'Duran', 'Durham', 'Dyer', 'Eaton', 'Edwards', 'Elliott',
	'Ellis', 'Ellison', 'Emerson', 'England', 'English', 'Erickson', 'Espinoza', 'Estes', 'Estrada', 'Evans', 'Everett',
	'Ewing', 'Farley', 'Farmer', 'Farrell', 'Faulkner', 'Ferguson', 'Fernandez', 'Ferrell', 'Fields', 'Figueroa', 'Finch',
	'Finley', 'Fischer', 'Fisher', 'Fitzgerald', 'Fitzpatrick', 'Fleming', 'Fletcher', 'Flores', 'Flowers', 'Floyd', 'Flynn',
	'Foley', 'Forbes', 'Ford', 'Foreman', 'Foster', 'Fowler', 'Fox', 'Francis', 'Franco', 'Frank', 'Franklin', 'Franks',
	'Frazier', 'Frederick', 'Freeman', 'French', 'Frost', 'Fry', 'Frye', 'Fuentes', 'Fuller', 'Fulton', 'Gaines',
	'Gallagher', 'Gallegos', 'Galloway', 'Gamble', 'Garcia', 'Gardner', 'Garner', 'Garrett', 'Garrison', 'Garza', 'Gates',
	'Gay', 'Gentry', 'George', 'Gibbs', 'Gibson', 'Gilbert', 'Giles', 'Gill', 'Gillespie', 'Gilliam', 'Gilmore', 'Glass',
	'Glenn', 'Glover', 'Goff', 'Golden', 'Gomez', 'Gonzales', 'Gonzalez', 'Good', 'Goodman', 'Goodwin', 'Gordon', 'Gould',
	'Graham', 'Grant', 'Graves', 'Gray', 'Green', 'Greene', 'Greer', 'Gregory', 'Griffin', 'Griffith', 'Grimes', 'Gross',
	'Guerra', 'Guerrero', 'Guthrie', 'Gutierrez', 'Guy', 'Guzman', 'Hahn', 'Hale', 'Haley', 'Hall', 'Hamilton', 'Hammond',
	'Hampton', 'Hancock', 'Haney', 'Hansen', 'Hanson', 'Hardin', 'Harding', 'Hardy', 'Harmon', 'Harper', 'Harrell', 'Harrington',
	'Harris', 'Harrison', 'Hart', 'Hartman', 'Harvey', 'Hatfield', 'Hawkins', 'Hayden', 'Hayes', 'Haynes', 'Hays', 'Head',
	'Heath', 'Hebert', 'Henderson', 'Hendricks', 'Hendrix', 'Henry', 'Hensley', 'Henson', 'Herman', 'Hernandez', 'Herrera',
	'Herring', 'Hess', 'Hester', 'Hewitt', 'Hickman', 'Hicks', 'Higgins', 'Hill', 'Hines', 'Hinton', 'Hobbs', 'Hodge',
	'Hodges', 'Hoffman', 'Hogan', 'Holcomb', 'Holden', 'Holder', 'Holland', 'Holloway', 'Holman', 'Holmes', 'Holt', 'Hood',
	'Hooper', 'Hoover', 'Hopkins', 'Hopper', 'Horn', 'Horne', 'Horton', 'House', 'Houston', 'Howard', 'Howe', 'Howell',
	'Hubbard', 'Huber', 'Hudson', 'Huff', 'Huffman', 'Hughes', 'Hull', 'Humphrey', 'Hunt', 'Hunter', 'Hurley', 'Hurst',
	'Hutchinson', 'Hyde', 'Ingram', 'Irwin', 'Jackson', 'Jacobs', 'Jacobson', 'James', 'Jarvis', 'Jefferson', 'Jenkins',
	'Jennings', 'Jensen', 'Jimenez', 'Johns', 'Johnson', 'Johnston', 'Jones', 'Jordan', 'Joseph', 'Joyce', 'Joyner',
	'Juarez', 'Justice', 'Kane', 'Kaufman', 'Keith', 'Keller', 'Kelley', 'Kelly', 'Kemp', 'Kennedy', 'Kent', 'Kerr',
	'Key', 'Kidd', 'Kim', 'King', 'Kinney', 'Kirby', 'Kirk', 'Kirkland', 'Klein', 'Kline', 'Knapp', 'Knight', 'Knowles',
	'Knox', 'Koch', 'Kramer', 'Lamb', 'Lambert', 'Lancaster', 'Landry', 'Lane', 'Lang', 'Langley', 'Lara', 'Larsen',
	'Larson', 'Lawrence', 'Lawson', 'Le', 'Leach', 'Leblanc', 'Lee', 'Leon', 'Leonard', 'Lester', 'Levine', 'Levy',
	'Lewis', 'Lindsay', 'Lindsey', 'Little', 'Livingston', 'Lloyd', 'Logan', 'Long', 'Lopez', 'Lott', 'Love', 'Lowe',
	'Lowery', 'Lucas', 'Luna', 'Lynch', 'Lynn', 'Lyons', 'Macdonald', 'Macias', 'Mack', 'Madden', 'Maddox', 'Maldonado',
	'Malone', 'Mann', 'Manning', 'Marks', 'Marquez', 'Marsh', 'Marshall', 'Martin', 'Martinez', 'Mason', 'Massey', 'Mathews',
	'Mathis', 'Matthews', 'Maxwell', 'May', 'Mayer', 'Maynard', 'Mayo', 'Mays', 'Mcbride', 'Mccall', 'Mccarthy', 'Mccarty',
	'Mcclain', 'Mcclure', 'Mcconnell', 'Mccormick', 'Mccoy', 'Mccray', 'Mccullough', 'Mcdaniel', 'Mcdonald', 'Mcdowell',
	'Mcfadden', 'Mcfarland', 'Mcgee', 'Mcgowan', 'Mcguire', 'Mcintosh', 'Mcintyre', 'Mckay', 'Mckee', 'Mckenzie', 'Mckinney',
	'Mcknight', 'Mclaughlin', 'Mclean', 'Mcleod', 'Mcmahon', 'Mcmillan', 'Mcneil', 'Mcpherson', 'Meadows', 'Medina', 'Mejia',
	'Melendez', 'Melton', 'Mendez', 'Mendoza', 'Mercado', 'Mercer', 'Merrill', 'Merritt', 'Meyer', 'Meyers', 'Michael',
	'Middleton', 'Miles', 'Miller', 'Mills', 'Miranda', 'Mitchell', 'Molina', 'Monroe', 'Montgomery', 'Montoya', 'Moody',
	'Moon', 'Mooney', 'Moore', 'Morales', 'Moran', 'Moreno', 'Morgan', 'Morin', 'Morris', 'Morrison', 'Morrow', 'Morse',
	'Morton', 'Moses', 'Mosley', 'Moss', 'Mueller', 'Mullen', 'Mullins', 'Munoz', 'Murphy', 'Murray', 'Myers', 'Nash',
	'Navarro', 'Neal', 'Nelson', 'Newman', 'Newton', 'Nguyen', 'Nichols', 'Nicholson', 'Nielsen', 'Nieves', 'Nixon',
	'Noble', 'Noel', 'Nolan', 'Norman', 'Norris', 'Norton', 'Nunez', 'O\'brien', 'Ochoa', 'O\'connor', 'Odom', 'O\'donnell',
	'Oliver', 'Olsen', 'Olson', 'Oneal', 'Oneil', 'O\'Neill', 'Orr', 'Ortega', 'Ortiz', 'Osborn', 'Osborne', 'Owen',
	'Owens', 'Pace', 'Pacheco', 'Padilla', 'Page', 'Palmer', 'Park', 'Parker', 'Parks', 'Parrish', 'Parsons', 'Pate',
	'Patel', 'Patrick', 'Patterson', 'Patton', 'Paul', 'Payne', 'Pearson', 'Peck', 'Pena', 'Pennington', 'Perez', 'Perkins',
	'Perry', 'Peters', 'Petersen', 'Peterson', 'Petty', 'Phelps', 'Phillips', 'Pickett', 'Pierce', 'Pittman', 'Pitts',
	'Pollard', 'Poole', 'Pope', 'Porter', 'Potter', 'Potts', 'Powell', 'Powers', 'Pratt', 'Preston', 'Price', 'Prince',
	'Pruitt', 'Puckett', 'Pugh', 'Quinn', 'Ramirez', 'Ramos', 'Ramsey', 'Randall', 'Randolph', 'Rasmussen', 'Ratliff',
	'Ray', 'Raymond', 'Reed', 'Reese', 'Reeves', 'Reid', 'Reilly', 'Reyes', 'Reynolds', 'Rhodes', 'Rice', 'Rich',
	'Richard', 'Richards', 'Richardson', 'Richmond', 'Riddle', 'Riggs', 'Riley', 'Rios', 'Rivas', 'Rivera', 'Rivers',
	'Roach', 'Robbins', 'Roberson', 'Roberts', 'Robertson', 'Robinson', 'Robles', 'Rocha', 'Rodgers', 'Rodriguez',
	'Rodriquez', 'Rogers', 'Rojas', 'Rollins', 'Roman', 'Romero', 'Rosa', 'Rosales', 'Rosario', 'Rose', 'Ross', 'Roth',
	'Rowe', 'Rowland', 'Roy', 'Ruiz', 'Rush', 'Russell', 'Russo', 'Rutledge', 'Ryan', 'Salas', 'Salazar', 'Salinas',
	'Sampson', 'Sanchez', 'Sanders', 'Sandoval', 'Sanford', 'Santana', 'Santiago', 'Santos', 'Sargent', 'Saunders',
	'Savage', 'Sawyer', 'Schmidt', 'Schneider', 'Schroeder', 'Schultz', 'Schwartz', 'Scott', 'Sears', 'Sellers',
	'Serrano', 'Sexton', 'Shaffer', 'Shannon', 'Sharp', 'Sharpe', 'Shaw', 'Shelton', 'Shepard', 'Shepherd', 'Sheppard',
	'Sherman', 'Shields', 'Short', 'Silva', 'Simmons', 'Simon', 'Simpson', 'Sims', 'Singleton', 'Skinner', 'Slater',
	'Sloan', 'Small', 'Smith', 'Snider', 'Snow', 'Snyder', 'Solis', 'Solomon', 'Sosa', 'Soto', 'Sparks', 'Spears',
	'Spence', 'Spencer', 'Stafford', 'Stanley', 'Stanton', 'Stark', 'Steele', 'Stein', 'Stephens', 'Stephenson',
	'Stevens', 'Stevenson', 'Stewart', 'Stokes', 'Stone', 'Stout', 'Strickland', 'Strong', 'Stuart', 'Suarez',
	'Sullivan', 'Summers', 'Sutton', 'Swanson', 'Sweeney', 'Sweet', 'Sykes', 'Talley', 'Tanner', 'Tate', 'Taylor',
	'Terrell', 'Terry', 'Thomas', 'Thompson', 'Thornton', 'Tillman', 'Todd', 'Torres', 'Townsend', 'Tran', 'Travis',
	'Trevino', 'Trujillo', 'Tucker', 'Turner', 'Tyler', 'Tyson', 'Underwood', 'Valdez', 'Valencia', 'Valentine',
	'Valenzuela', 'Vance', 'Vang', 'Vargas', 'Vasquez', 'Vaughan', 'Vaughn', 'Vazquez', 'Vega', 'Velasquez', 'Velazquez',
	'Velez', 'Villarreal', 'Vincent', 'Vinson', 'Wade', 'Wagner', 'Walker', 'Wall', 'Wallace', 'Waller', 'Walls', 'Walsh',
	'Walter', 'Walters', 'Walton', 'Ward', 'Ware', 'Warner', 'Warren', 'Washington', 'Waters', 'Watkins', 'Watson',
	'Watts', 'Weaver', 'Webb', 'Weber', 'Webster', 'Weeks', 'Weiss', 'Welch', 'Wells', 'West', 'Wheeler', 'Whitaker',
	'White', 'Whitehead', 'Whitfield', 'Whitley', 'Whitney', 'Wiggins', 'Wilcox', 'Wilder', 'Wiley', 'Wilkerson',
	'Wilkins', 'Wilkinson', 'William', 'Williams', 'Williamson', 'Willis', 'Wilson', 'Winters', 'Wise', 'Witt', 'Wolf',
	'Wolfe', 'Wong', 'Wood', 'Woodard', 'Woods', 'Woodward', 'Wooten', 'Workman', 'Wright', 'Wyatt', 'Wynn', 'Yang',
	'Yates', 'York', 'Young', 'Zamora', 'Zimmerman'
];
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const genders = ['male', 'female'];

export const getRandomGender = (utils: WorkerUtils): string => utils.randomUtils.getRandomBool() ? genders[0] : genders[1];

export const generate = (data: any, utils: WorkerUtils): DTGenerateResult => {
	const { rowState, countryNames } = data;

	// for backward compatibility. Prior to 4.0.6, rowState would just be an array of options
	let options = [];
	let source = NamesSource.any;
	let selectedCountries = [];
	if (rowState.hasOwnProperty('source')) {
		options = rowState.options;
		source = rowState.source;
		selectedCountries = rowState.selectedCountries;
	} else {
		options = rowState;
	}

	if (source === NamesSource.countries && !selectedCountries.length) {
		return {
			display: ''
		};
	}

	// in case the user entered multiple | separated formats, pick one first
	let chosenFormat = options.length ? options[0] : '';
	if (options.length > 1) {
		chosenFormat = utils.randomUtils.getRandomArrayValue(options);
	}

	// the placeholder string with all the placeholders removed
	let output = chosenFormat;

	// the user can enter any old thing in the placeholder field. We do our best to return some 'gender' metadata
	// based on what we find. In case we find multiple genders, we return 'unknown'
	const foundGenders = [];

	let maleNamesSource = maleNames;
	let femaleNamesSource = femaleNames;
	let lastNamesSource = lastNames;

	if (source === NamesSource.countries) {
		const randomCountry: string = utils.randomUtils.getRandomArrayValue(selectedCountries);
		maleNamesSource = countryNames[randomCountry].maleNames;
		femaleNamesSource = countryNames[randomCountry].femaleNames;
		lastNamesSource = countryNames[randomCountry].lastNames;
	}

	while (/MaleName/.test(output)) {
		foundGenders.push('male');
		output = output.replace(/MaleName/, utils.randomUtils.getRandomArrayValue(maleNamesSource));
	}

	while (/FemaleName/.test(output)) {
		foundGenders.push('female');
		output = output.replace(/FemaleName/, utils.randomUtils.getRandomArrayValue(femaleNamesSource));
	}

	while (/Name/.test(output)) {
		const gender = getRandomGender(utils);
		foundGenders.push(gender);

		const selectedSource = (gender === 'male') ? maleNames : femaleNames;
		output = output.replace(/Name/, utils.randomUtils.getRandomArrayValue(selectedSource));
	}

	while (/Surname/.test(output)) {
		output = output.replace(/Surname/, utils.randomUtils.getRandomArrayValue(lastNamesSource));
	}
	while (/Initial/.test(output)) {
		output = output.replace(/Initial/, utils.randomUtils.getRandomCharInString(letters));
	}

	let gender = 'unknown';
	if (foundGenders.length === 1) {
		gender = foundGenders[0];
	} else if (foundGenders.length > 1) {
		const uniques = utils.arrayUtils.getUnique(foundGenders);
		if (uniques.length === 1) {
			gender = uniques[0];
		}
	}

	return {
		display: output.trim(),
		gender
	};
};
