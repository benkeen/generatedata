import { CountryNames } from '~types/countries';

const femaleNames = [
	'Agnes', 'Alice', 'Alicia', 'Allison', 'Alma', 'Amanda', 'Amber', 'Amy', 'Ana', 'Andrea', 'Angela', 'Anita', 'Ann',
	'Anna', 'Anne', 'Annette', 'Annie', 'April', 'Arlene', 'Ashley', 'Audrey', 'Barbara', 'Beatrice', 'Becky',
	'Bernice', 'Bertha', 'Bessie', 'Beth', 'Betty', 'Beverly', 'Billie', 'Bobbie', 'Bonnie', 'Brandy', 'Brenda',
	'Brittany', 'Carla', 'Carmen', 'Carol', 'Carole', 'Caroline', 'Carolyn', 'Carrie', 'Cassandra', 'Catherine',
	'Cathy', 'Charlene', 'Charlotte', 'Cheryl', 'Christina', 'Christine', 'Christy', 'Cindy', 'Claire', 'Clara',
	'Claudia', 'Colleen', 'Connie', 'Constance', 'Courtney', 'Crystal', 'Cynthia', 'Daisy', 'Dana', 'Danielle',
	'Darlene', 'Dawn', 'Deanna', 'Debbie', 'Deborah', 'Debra', 'Delores', 'Denise', 'Diana', 'Diane', 'Dianne',
	'Dolores', 'Donna', 'Dora', 'Doris', 'Dorothy', 'Edith', 'Edna', 'Eileen', 'Elaine', 'Eleanor', 'Elizabeth', 'Ella',
	'Ellen', 'Elsie', 'Emily', 'Emma', 'Erica', 'Erika', 'Erin', 'Esther', 'Ethel', 'Eva', 'Evelyn', 'Felicia',
	'Florence', 'Frances', 'Gail', 'Georgia', 'Geraldine', 'Gertrude', 'Gina', 'Gladys', 'Glenda', 'Gloria', 'Grace',
	'Gwendolyn', 'Hazel', 'Heather', 'Heidi', 'Helen', 'Hilda', 'Holly', 'Ida', 'Irene', 'Irma', 'Jackie', 'Jacqueline',
	'Jamie', 'Jane', 'Janet', 'Janice', 'Jean', 'Jeanette', 'Jeanne', 'Jennie', 'Jennifer', 'Jenny', 'Jessica', 'Jessie',
	'Jill', 'Jo', 'Joan', 'Joann', 'Joanne', 'Josephine', 'Joy', 'Joyce', 'Juanita', 'Judith', 'Judy', 'Julia', 'Julie',
	'June', 'Karen', 'Katherine', 'Kathleen', 'Kathryn', 'Kathy', 'Katie', 'Katrina', 'Kay', 'Kelly', 'Kim', 'Kimberly',
	'Kristen', 'Kristin', 'Kristina', 'Laura', 'Lauren', 'Laurie', 'Leah', 'Lena', 'Leona', 'Leslie', 'Lillian',
	'Lillie', 'Linda', 'Lisa', 'Lois', 'Loretta', 'Lori', 'Lorraine', 'Louise', 'Lucille', 'Lucy', 'Lydia', 'Lynn',
	'Mabel', 'Mae', 'Marcia', 'Margaret', 'Margie', 'Maria', 'Marian', 'Marie', 'Marilyn', 'Marion', 'Marjorie',
	'Marlene', 'Marsha', 'Martha', 'Mary', 'Mattie', 'Maureen', 'Maxine', 'Megan', 'Melanie', 'Melinda', 'Melissa',
	'Michele', 'Michelle', 'Mildred', 'Minnie', 'Miriam', 'Misty', 'Monica', 'Myrtle', 'Nancy', 'Naomi', 'Natalie',
	'Nellie', 'Nicole', 'Nina', 'Nora', 'Norma', 'Olga', 'Pamela', 'Patricia', 'Patsy', 'Paula', 'Pauline', 'Pearl',
	'Peggy', 'Penny', 'Phyllis', 'Priscilla', 'Rachel', 'Ramona', 'Rebecca', 'Regina', 'Renee', 'Rhonda', 'Rita',
	'Roberta', 'Robin', 'Rosa', 'Rose', 'Rosemary', 'Ruby', 'Ruth', 'Sally', 'Samantha', 'Sandra', 'Sara', 'Sarah',
	'Shannon', 'Sharon', 'Sheila', 'Shelly', 'Sherri', 'Sherry', 'Shirley', 'Sonia', 'Stacey', 'Stacy', 'Stella',
	'Stephanie', 'Sue', 'Susan', 'Suzanne', 'Sylvia', 'Tamara', 'Tammy', 'Tanya', 'Tara', 'Teresa', 'Terri', 'Terry',
	'Thelma', 'Theresa', 'Tiffany', 'Tina', 'Toni', 'Tonya', 'Tracey', 'Tracy', 'Valerie', 'Vanessa', 'Velma', 'Vera',
	'Veronica', 'Vicki', 'Vickie', 'Victoria', 'Viola', 'Violet', 'Virginia', 'Vivian', 'Wanda', 'Wendy', 'Willie',
	'Wilma', 'Yolanda', 'Yvonne'
];

const maleNames = [
	'Aaron', 'Adam', 'Adrian', 'Alan', 'Albert', 'Alberto', 'Alex', 'Alexander', 'Alfred', 'Alfredo', 'Allan', 'Allen',
	'Alvin', 'Andre', 'Andrew', 'Andy', 'Angel', 'Anthony', 'Antonio', 'Armando', 'Arnold', 'Arthur', 'Barry', 'Ben',
	'Benjamin', 'Bernard', 'Bill', 'Billy', 'Bob', 'Bobby', 'Brad', 'Bradley', 'Brandon', 'Brent', 'Brett', 'Brian',
	'Bruce', 'Bryan', 'Byron', 'Calvin', 'Carl', 'Carlos', 'Casey', 'Cecil', 'Chad', 'Charles', 'Charlie', 'Chester',
	'Chris', 'Christian', 'Christopher', 'Clarence', 'Claude', 'Clayton', 'Clifford', 'Clifton', 'Clinton', 'Clyde',
	'Cody', 'Corey', 'Cory', 'Craig', 'Curtis', 'Dale', 'Dan', 'Daniel', 'Danny', 'Darrell', 'Darren', 'Darryl', 'Daryl',
	'Dave', 'David', 'Dean', 'Dennis', 'Derek', 'Derrick', 'Don', 'Donald', 'Douglas', 'Duane', 'Dustin', 'Dwayne',
	'Dwight', 'Earl', 'Eddie', 'Edgar', 'Eduardo', 'Edward', 'Edwin', 'Elmer', 'Enrique', 'Eric', 'Erik', 'Ernest',
	'Eugene', 'Everett', 'Felix', 'Fernando', 'Floyd', 'Francis', 'Francisco', 'Frank', 'Franklin', 'Fred', 'Freddie',
	'Frederick', 'Gabriel', 'Gary', 'Gene', 'George', 'Gerald', 'Gilbert', 'Glen', 'Glenn', 'Gordon', 'Greg', 'Gregory',
	'Guy', 'Harold', 'Harry', 'Harvey', 'Hector', 'Henry', 'Herbert', 'Herman', 'Howard', 'Hugh', 'Ian', 'Isaac',
	'Ivan', 'Jack', 'Jacob', 'Jaime', 'James', 'Jamie', 'Jared', 'Jason', 'Javier', 'Jay', 'Jeff', 'Jeffery', 'Jeffrey',
	'Jeremy', 'Jerome', 'Jerry', 'Jesse', 'Jessie', 'Jesus', 'Jim', 'Jimmie', 'Jimmy', 'Joe', 'Joel', 'John', 'Johnnie',
	'Johnny', 'Jon', 'Jonathan', 'Jordan', 'Jorge', 'Jose', 'Joseph', 'Joshua', 'Juan', 'Julian', 'Julio', 'Justin',
	'Karl', 'Keith', 'Kelly', 'Ken', 'Kenneth', 'Kent', 'Kevin', 'Kirk', 'Kurt', 'Kyle', 'Lance', 'Larry', 'Lawrence',
	'Lee', 'Leo', 'Leon', 'Leonard', 'Leroy', 'Leslie', 'Lester', 'Lewis', 'Lloyd', 'Lonnie', 'Louis', 'Luis', 'Manuel',
	'Marc', 'Marcus', 'Mario', 'Marion', 'Mark', 'Marshall', 'Martin', 'Marvin', 'Mathew', 'Matthew', 'Maurice', 'Max',
	'Melvin', 'Michael', 'Micheal', 'Miguel', 'Mike', 'Milton', 'Mitchell', 'Morris', 'Nathan', 'Nathaniel', 'Neil',
	'Nelson', 'Nicholas', 'Norman', 'Oscar', 'Patrick', 'Paul', 'Pedro', 'Perry', 'Peter', 'Philip', 'Phillip', 'Rafael',
	'Ralph', 'Ramon', 'Randall', 'Randy', 'Raul', 'Ray', 'Raymond', 'Reginald', 'Rene', 'Ricardo', 'Richard', 'Rick',
	'Ricky', 'Robert', 'Roberto', 'Rodney', 'Roger', 'Roland', 'Ron', 'Ronald', 'Ronnie', 'Ross', 'Roy', 'Ruben',
	'Russell', 'Ryan', 'Salvador', 'Sam', 'Samuel', 'Scott', 'Sean', 'Sergio', 'Seth', 'Shane', 'Shawn', 'Sidney',
	'Stanley', 'Stephen', 'Steve', 'Steven', 'Ted', 'Terrance', 'Terrence', 'Terry', 'Theodore', 'Thomas', 'Tim',
	'Timothy', 'Todd', 'Tom', 'Tommy', 'Tony', 'Tracy', 'Travis', 'Troy', 'Tyler', 'Tyrone', 'Vernon', 'Victor',
	'Vincent', 'Virgil', 'Wade', 'Wallace', 'Walter', 'Warren', 'Wayne', 'Wesley', 'Willard', 'William', 'Willie',
	'Zachary'
];

const lastNames = [
	'Adams', 'Aguilar', 'Alexander', 'Allen', 'Alvarado', 'Alvarez', 'Anderson', 'Andrews', 'Armstrong', 'Arnold',
	'Austin', 'Bailey', 'Baker', 'Banks', 'Barnes', 'Bell', 'Bennett', 'Berry', 'Bishop', 'Black', 'Bowman', 'Boyd',
	'Bradley', 'Brooks', 'Brown', 'Bryant', 'Burke', 'Burns', 'Burton', 'Butler', 'Campbell', 'Carlson', 'Carpenter',
	'Carr', 'Carroll', 'Carter', 'Castillo', 'Castro', 'Chapman', 'Chavez', 'Chen', 'Clark', 'Cole', 'Coleman',
	'Collins', 'Contreras', 'Cook', 'Cooper', 'Cox', 'Crawford', 'Cruz', 'Cunningham', 'Daniels', 'Davis', 'Day',
	'Dean', 'Delgado', 'Diaz', 'Dixon', 'Dominguez', 'Duncan', 'Dunn', 'Edwards', 'Elliott', 'Ellis', 'Espinoza',
	'Estrada', 'Evans', 'Ferguson', 'Fernandez', 'Fields', 'Fisher', 'Flores', 'Ford', 'Foster', 'Fowler', 'Fox',
	'Franklin', 'Freeman', 'Fuller', 'Garcia', 'Gardner', 'Garrett', 'Garza', 'George', 'Gibson', 'Gilbert', 'Gomez',
	'Gonzales', 'Gonzalez', 'Gordon', 'Graham', 'Grant', 'Gray', 'Green', 'Greene', 'Griffin', 'Guerrero', 'Gutierrez',
	'Guzman', 'Hall', 'Hamilton', 'Hansen', 'Hanson', 'Harper', 'Harris', 'Harrison', 'Hart', 'Harvey', 'Hawkins',
	'Hayes', 'Henderson', 'Henry', 'Hernandez', 'Herrera', 'Hicks', 'Hill', 'Hoffman', 'Holmes', 'Howard', 'Howell',
	'Hudson', 'Hughes', 'Hunt', 'Hunter', 'Jackson', 'Jacobs', 'James', 'Jenkins', 'Jensen', 'Jimenez', 'Johnson',
	'Johnston', 'Jones', 'Jordan', 'Kelley', 'Kelly', 'Kennedy', 'Kim', 'King', 'Knight', 'Lane', 'Larson', 'Lawrence',
	'Lawson', 'Le', 'Lee', 'Lewis', 'Li', 'Little', 'Long', 'Lopez', 'Lucas', 'Luna', 'Lynch', 'Maldonado', 'Marquez',
	'Marshall', 'Martin', 'Martinez', 'Mason', 'Matthews', 'Mccoy', 'Mcdonald', 'Medina', 'Mendez', 'Mendoza',
	'Meyer', 'Miller', 'Mills', 'Mitchell', 'Montgomery', 'Moore', 'Morales', 'Moreno', 'Morgan', 'Morris',
	'Morrison', 'Munoz', 'Murphy', 'Murray', 'Myers', 'Name', 'Nelson', 'Nguyen', 'Nichols', 'Nunez', 'Obrien',
	'Oliver', 'Olson', 'Ortega', 'Ortiz', 'Owens', 'Padilla', 'Palmer', 'Park', 'Parker', 'Patel', 'Patterson',
	'Payne', 'Pena', 'Perez', 'Perkins', 'Perry', 'Peters', 'Peterson', 'Phillips', 'Pierce', 'Porter', 'Powell',
	'Price', 'Ramirez', 'Ramos', 'Ray', 'Reed', 'Reid', 'Reyes', 'Reynolds', 'Rice', 'Richards', 'Richardson', 'Riley',
	'Rios', 'Rivera', 'Roberts', 'Robertson', 'Robinson', 'Rodriguez', 'Rogers', 'Rojas', 'Romero', 'Rose', 'Ross',
	'Ruiz', 'Russell', 'Ryan', 'Salazar', 'Sanchez', 'Sanders', 'Sandoval', 'Santiago', 'Santos', 'Schmidt', 'Schultz',
	'Scott', 'Shaw', 'Silva', 'Simmons', 'Simpson', 'Sims', 'Singh', 'Smith', 'Snyder', 'Soto', 'Spencer', 'Stephens',
	'Stevens', 'Stewart', 'Stone', 'Sullivan', 'Taylor', 'Thomas', 'Thompson', 'Torres', 'Tran', 'Tucker', 'Turner',
	'Valdez', 'Vargas', 'Vasquez', 'Vazquez', 'Vega', 'Wagner', 'Walker', 'Wallace', 'Walsh', 'Wang', 'Ward', 'Warren',
	'Washington', 'Watkins', 'Watson', 'Weaver', 'Webb', 'Weber', 'Welch', 'Wells', 'West', 'Wheeler', 'White',
	'Williams', 'Williamson', 'Willis', 'Wilson', 'Wong', 'Wood', 'Woods', 'Wright', 'Yang', 'Young'
];

const namesData: CountryNames = {
	femaleNames,
	maleNames,
	lastNames
};

export default namesData;

