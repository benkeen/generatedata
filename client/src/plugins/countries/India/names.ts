import { CountryNames } from '~types/countries';

const femaleNames = [
	'Abha', 'Aditi', 'Aisha', 'Aishwarya', 'Akanksha', 'Amala', 'Amandeep', 'Amardeep', 'Amarjeet', 'Anima', 'Anisha',
	'Anjali', 'Aparajita', 'Aparna', 'Apurva', 'Aradhana', 'Archana', 'Aruna', 'Arushi', 'Arya', 'Asha', 'Avani',
	'Azra', 'Bala', 'Balwinder', 'Bhavana', 'Chanda', 'Chandra', 'Devi', 'Devika', 'Diksha', 'Dipa', 'Dipali', 'Dipti',
	'Disha', 'Divya', 'Diya', 'Drishti', 'Durga', 'Esha', 'Ezhil', 'Fariha', 'Gauri', 'Gita', 'Grishma', 'Gul',
	'Gulbadan', 'Gulrukh', 'Gurdeep', 'Gurmeet', 'Hema', 'Ila', 'Inderpal', 'Indira', 'Indrani', 'Indu', 'Indumathi',
	'Isha', 'Ishani', 'Ishita', 'Jaswinder', 'Jaya', 'Jayashri', 'Jyoti', 'Jyotsna', 'Kajal', 'Kala', 'Kali', 'Kalpana',
	'Kalyani', 'Kamakshi', 'Kamala', 'Kamani', 'Kanchana', 'Kanta', 'Kanti', 'Karishma', 'Kashi', 'Kaur', 'Kavita',
	'Khurshid', 'Khushi', 'Kiran', 'Kirtida', 'Laboni', 'Lakshmi', 'Lalita', 'Lata', 'Lavanya', 'Lila', 'Lilavati',
	'Lina', 'Madhu', 'Madhur', 'Madhuri', 'Mala', 'Malati—', 'Malani', 'Mandeep', 'Manjeet', 'Manju', 'Manjula',
	'Manjusha', 'Maya', 'Mina', 'Minali', 'Mira', 'Mitra', 'Mohini', 'Mridula', 'Mukta', 'Nalini', 'Namrata', 'Nandita',
	'Nasim', 'Nasrin', 'Navdeep', 'Navneet', 'Neha', 'Nida', 'Nikita', 'Nila', 'Nirupama', 'Nisha', 'Nishat', 'Nitika',
	'Nitya', 'Nur', 'Padma', 'Padmini', 'Parvati', 'Prachi', 'Pratibha', 'Pratima', 'Pritha', 'Priti', 'Priya',
	'Priyanka', 'Puja', 'Purnima', 'Pushpa', 'Rachana', 'Radha', 'Rajani', 'Rajkumari', 'Rajni', 'Rani', 'Rashmi',
	'Rati', 'Ratna', 'Reshmi', 'Reva', 'Richa', 'Rina', 'Ritka', 'Ritu', 'Riya', 'Roshan', 'Roshni', 'Rupa',
	'Rupinder', 'Sabeen', 'Saira', 'Sakshi', 'Sandhya', 'Sanjana', 'Saraswati', 'Sarita', 'Savitri', 'Shabnam',
	'Shahnaz', 'Shailaja', 'Shakti', 'Shakuntala', 'Shanta', 'Shanti', 'Sharmila', 'Shashi', 'Shikha', 'Shila',
	'Shivali', 'Shobha', 'Shreya', 'Shweta', 'Shyama', 'Siddhi', 'Sima', 'Sita', 'Sitara', 'Sneha', 'Sona', 'Sonal',
	'Sonam', 'Sukhdeep', 'Sulabha', 'Sultana', 'Suman', 'Sumati', 'Sunita', 'Suniti', 'Sushila', 'Swapna', 'Swarna',
	'Tanu', 'Tanvi', 'Tara', 'Tejal', 'Thamarai', 'Trishna', 'Uma', 'Upasana', 'Urvi', 'Uttara', 'Vaishnavi', 'Varsha',
	'Vasuda', 'Vasudha', 'Vasundhara', 'Veda', 'Vidya', 'Vijaya'
];

const maleNames = [
	'Abbas', 'Abdul', 'Abhay', 'Abhijit', 'Abhilash', 'Abhinav', 'Abhishek', 'Adil', 'Aditya', 'Adnan', 'Agni', 'Ahmad',
	'Ajay', 'Ajit', 'Akash', 'Akbar', 'Akhil', 'Akshay', 'Ali', 'Amandeep', 'Amar', 'Amardeep', 'Amarjeet', 'Amin',
	'Amir', 'Amit', 'Amitabh', 'Amrit', 'Anand', 'Anbu', 'Anik', 'Aniket', 'Anil', 'Aniruddha', 'Anish', 'Ankit',
	'Ankur', 'Anuj', 'Anup', 'Anupam', 'Apurva', 'Aravind', 'Arif', 'Arijit', 'Aritra', 'Aruna', 'Arya', 'Asad',
	'Ashwin', 'Asim', 'Aswathi', 'Avinash', 'Azad', 'Azhar', 'Aziz', 'Babur', 'Bala', 'Balakrishna', 'Balwinder',
	'Bilal', 'Chanda', 'Chandan', 'Chandra', 'Chandrakant', 'Chetan', 'Chiranjvi', 'Darshan', 'Dayaram', 'Dev',
	'Devadas', 'Dhananjay', 'Dharma', 'Dhaval', 'Durai', 'Durga', 'Eshil', 'Farhan', 'Farid', 'Ghulam', 'Govinda', 'Gul',
	'Gurdeep', 'Gurmeet', 'Hardeep', 'Hari', 'Harsha', 'Harshad', 'Harshal', 'Hasan', 'Hassan', 'Imtiyaz', 'Inderpal',
	'Indra', 'Indrajit', 'Isha', 'Jagit', 'Jahangir', 'Jaswinder', 'Javed', 'Jaya', 'Jayanta', 'Jayendra',
	'Jayesh', 'Jaywant', 'Jitendra', 'Jyoti', 'Kailash', 'Kali', 'Kalyan', 'Kamala', 'Kanta', 'Kanti', 'Karan', 'Kavi',
	'Khan', 'Khurshd', 'Kiran', 'Kishor', 'Krishna', 'Kshitij', 'Kuldeep', 'Lakshmi', 'Lal', 'Lochan', 'Madhu',
	'Madhukar', 'Madhur', 'Mahendra', 'Mahmud', 'Mamun', 'Manas', 'Mandeep', 'Mani', 'Maninder', 'Manish', 'Manjeet',
	'Manu', 'Maqsud', 'Maruf', 'Mayur', 'Mitra', 'Mitul', 'Mohandas', 'Muhammad', 'Mukul', 'Murad', 'Murali', 'Murugan',
	'Nadim', 'Nagendra', 'Nanda', 'Narayana', 'Narendra', 'Nasim', 'Navdeep', 'Navin', 'Navneet', 'Nikhil', 'Nilam',
	'Ninad', 'Niraj', 'Nirav', 'Nirmal', 'Nishant', 'Nishat', 'Nitin', 'Nitya', 'Nur', 'Padma', 'Pallav', 'Parminder',
	'Partha', 'Prabhat', 'Prabhu', 'Prabodh', 'Pradip', 'Prakash', 'Pran', 'Pranay', 'Prasad', 'Prasanna', 'Prasenjit',
	'Pratap', 'Pratik', 'Pravin', 'Prem', 'Punit', 'Qasim', 'Radha', 'Rafiq', 'Raghu', 'Rahul', 'Raj', 'Raja', 'Rajani',
	'Rajendra', 'Rajesh', 'Rajib', 'Rajnish', 'Rakesh', 'Rama', 'Ramachandra', 'Rana', 'Ranjit', 'Rashmi', 'Ratna',
	'Ravi', 'Ravindra', 'Rishi', 'Rohan', 'Rohit', 'Roshan', 'Rupinder', 'Sachin', 'Samir', 'Sandip', 'Sanjit', 'Sanjiv',
	'Saral', 'Sardar', 'Sarvesh', 'Shahid', 'Shahjahan', 'Shahnaz', 'Shahzad', 'Shakti', 'Shandar', 'Shantanu',
	'Sharif', 'Sharma', 'Shashi', 'Shekar', 'Sher', 'Shiva', 'Shresth', 'Shrinivas', 'Shrivatsa', 'Shyama', 'Shyamal',
	'Siddhartha', 'Singh', 'Sonam', 'Subhash', 'Subrahmanya', 'Sudarshan', 'Sudhir', 'Suahil', 'Sujay', 'Sukhbir',
	'Sukhdeep', 'Sultan', 'Suman', 'Sumantra', 'Sumit', 'Sunil', 'Suraj', 'Surendra', 'Surya', 'Sushila', 'Swapan',
	'Swapnil', 'Swarna', 'Tamanna', 'Tushar', 'Uttara', 'Vasu', 'Vijaya', 'Vimal', 'Vinay', 'Vipin', 'Vipul', 'Vishal',
	'Vishnu', 'Vivek', 'Yash', 'Yasir', 'Zafar', 'Zahid', 'Zahir', 'Zaman', 'Zawar'
];

const lastNames = [
	'Aggarwal', 'Anand', 'Arun', 'Bhat', 'Bhatt', 'Chakrabarti', 'Chande', 'Chander', 'Chandra', 'Chandrasekar',
	'Charan', 'Chaudhary', 'Chauhan', 'Darsha', 'Dhawan', 'Dutta', 'Engineer', 'Gandhi', 'Ganesh', 'Goel', 'Jai',
	'Jana', 'Jindal', 'Joshi', 'Kapoor', 'Kishore', 'Krishnamurthy', 'Kumar', 'Lal', 'Lalit', 'Lata', 'Madan',
	'Mahajan', 'Malhotra', 'Malik', 'Manju', 'Manohar', 'Mati', 'Meena', 'Mehra', 'Mehta', 'Mittal', 'Muthu',
	'Nagpal', 'Nara', 'Naran', 'Narang', 'Narayan', 'Nath', 'Neel', 'Neela', 'Neelam', 'Nigam', 'Nirmal', 'Nita',
	'Pal', 'Patel', 'Pawan', 'Persaud', 'Prasad', 'Punj', 'Puri', 'Rai', 'Rajagopal', 'Rajan', 'Raje', 'Raji', 'Raman',
	'Rana', 'Ranga', 'Rastogi', 'Roy', 'Sahni', 'Sai', 'Saini', 'Samuel', 'Sandeep', 'Sara', 'Saxena', 'Sehgal', 'Sen',
	'Sethi', 'Shan', 'Sharma', 'Soni', 'Srini', 'Srivas', 'Srivastav', 'Srivastava', 'Subram', 'Subramani',
	'Subramanian', 'Sudha', 'Suri', 'Swami', 'Tyagi', 'Uddin', 'Veena', 'Veer', 'Verma', 'Vijaya', 'Vish'
];

const namesData: CountryNames = {
	femaleNames,
	maleNames,
	lastNames
};

export default namesData;
