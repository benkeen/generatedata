/**
 * @author Fareez Ahamed <fareez.ahamed@gmail.com>
 */
import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'india',
	regionNames: i18n.regionNames,
	continent: 'asia',
	extendedData: {
		zipFormat: {
			format: 'Xxxxxx',
			replacements: {
				'X': '123456789',
				'x': '0123456789'
			}
		},
		phoneFormat: {
			displayFormats: [
				'+91 xxxxxxxxxx',
				'0xx-xxxxxxxx',
				'0xxx-xxxxxxx',
				'0xxxx-xxxxxx'
			]
		}
	},

	regions: [
		{
			regionName: 'Andhra Pradesh',
			regionShort: 'AP',
			regionSlug: 'andhra_pradesh',
			weight: 1314,
			cities: [
				'Adoni', 'Anantapur', 'Bhimavaram', 'Chittoor', 'Cuddapah', 'Eluru', 'Gudivada',
				'Guntakal', 'Guntur', 'Hindupur', 'Hyderabad', 'Kakinada', 'Karimnagar', 'Khammam',
				'Kukatpalle', 'Kurnool', 'Lalbahadur Nagar', 'Machilipatnam',
				'Mahbubnagar', 'Malkajgiri', 'Nandyal', 'Nellore', 'Nizamabad', 'Ongole',
				'Proddatur', 'Qutubullapur', 'Rajahmundry', 'Ramagundam', 'Secunderabad',
				'Tenali', 'Tirupati', 'Vijayawada', 'Vishakhapatnam', 'Vizianagaram', 'Warangal'
			]
		},
		{
			regionName: 'Arunachal Pradesh',
			regionShort: 'AR',
			regionSlug: 'arunachal_pradesh',
			weight: 21,
			cities: [
				'Itanagar'
			]
		},
		{
			regionName: 'Assam',
			regionShort: 'AS',
			regionSlug: 'assam',
			weight: 484,
			cities: [
				'Guwahati', 'Dibrugarh', 'Silchar', 'Nagaon',
			]
		},
		{
			regionName: 'Bihar',
			regionShort: 'BR',
			regionSlug: 'bihar',
			weight: 1611,
			cities: [
				'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Bihar Sharif',
				'Arrah', 'Katihar', 'Munger', 'Chapra', 'Sasaram', 'Dehri', 'Bettiah'
			]
		},
		{
			regionName: 'Chhattisgarh',
			regionShort: 'CT',
			regionSlug: 'chhattisgarh',
			weight: 396,
			cities: [
				'Raipur', 'Bhilai', 'Bilaspur', 'Durg', 'Raj Nandgaon', 'Korba', 'Raigarh'
			]
		},
		{
			regionName: 'Goa',
			regionShort: 'GA',
			regionSlug: 'goa',
			weight: 23,
			cities: [
				'Panjim'
			]
		},
		{
			regionName: 'Gujarat',
			regionShort: 'GJ',
			regionSlug: 'gujarat',
			weight: 937,
			cities: [
				'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Nadiad',
				'Bharuch', 'Junagadh', 'Navsari', 'Gandhinagar', 'Veraval', 'Porbandar', 'Anand',
				'Surendranagar', 'Gandhidham', 'Bhuj', 'Godhra', 'Patan', 'Morvi', 'Vejalpur'
			]
		},
		{
			regionName: 'Haryana',
			regionShort: 'HR',
			regionSlug: 'haryana',
			weight: 394,
			cities: [
				'Ambala', 'Ambala Sadar', 'Bhiwani', 'Faridabad', 'Gurgaon', 'Hisar', 'Karnal',
				'Panipat', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamuna Nagar'
			]
		},
		{
			regionName: 'Himachal Pradesh',
			regionShort: 'HP',
			regionSlug: 'himachal_pradesh',
			weight: 106,
			cities: [
				'Shimla'
			]
		},
		{
			regionName: 'Jammu and Kashmir',
			regionShort: 'JK',
			regionSlug: 'jammu_and_kashmir',
			weight: 195,
			cities: [
				'Jammu', 'Srinagar'
			]
		},
		{
			regionName: 'Jharkhand',
			regionShort: 'JH',
			regionSlug: 'jharkhand',
			weight: 512,
			cities: [
				'Bokaro Steel City', 'Dhanbad', 'Hazaribag', 'Jamshedpur', 'Mango', 'Purnea',
				'Purulia', 'Ranchi'
			]
		},
		{
			regionName: 'Karnataka',
			regionShort: 'KA',
			regionSlug: 'karnataka',
			weight: 949,
			cities: [
				'Bangalore', 'Belgaum', 'Bellary', 'Bidar', 'Bijapur', 'Davangere', 'Gadag Betigeri',
				'Gulbarga', 'Hassan', 'Hospet', 'Hubli', 'Mandya', 'Mangalore', 'Mysore', 'Raichur',
				'Shimoga', 'Timkur'
			]
		},
		{
			regionName: 'Kerala',
			regionShort: 'KL',
			regionSlug: 'kerala',
			weight: 518,
			cities: [
				'Allappuzha', 'Kozhikode', 'Cochin', 'Kollam', 'Palakkad', 'Thalassery', 'Trivandrum'
			]
		},
		{
			regionName: 'Madhya Pradesh',
			regionShort: 'MP',
			regionSlug: 'madhya_pradesh',
			weight: 1127,
			cities: [
				'Bhind', 'Bhopal', 'Burhanpur', 'Chhindwara', 'Damoh', 'Dewas', 'Guna', 'Gwalior',
				'Indore', 'Jabalpur', 'Khandwa', 'Mandasor', 'Morena', 'Murwara', 'Ratlam', 'Rewa',
				'Sagar', 'Satna', 'Shivapuri', 'Ujjain', 'Vidisha'
			]
		},
		{
			regionName: 'Maharastra',
			regionShort: 'MH',
			regionSlug: 'maharastra',
			weight: 1744,
			cities: [
				'Achalpur', 'Ahmadnagar', 'Akola', 'Amravati', 'Bhir', 'Bhiwandi', 'Bhusawal',
				'Chandrapur', 'Dhule', 'Gondiya', 'Ichalkaranji', 'Jalgaon', 'Jalna', 'Kalyan',
				'Kolhapur', 'Latur', 'Malegaon', 'Mira Bhayandar', 'Miraj', 'Mumbai', 'Nagpur',
				'Nanded', 'Nashik', 'New Bombay', 'Parbhani', 'Pimpri-Chinchwad', 'Pune', 'Sangli',
				'Satara', 'Aurangabad', 'Solapur', 'Thane', 'Ulhasnagar', 'Wardha', 'Yeotmal'
			]
		},
		{
			regionName: 'Manipur',
			regionShort: 'MN',
			regionSlug: 'manipur',
			weight: 42,
			cities: [
				'Imphal'
			]
		},
		{
			regionName: 'Meghalaya',
			regionShort: 'ML',
			regionSlug: 'meghalaya',
			weight: 46,
			cities: [
				'Shillong'
			]
		},
		{
			regionName: 'Mizoram',
			regionShort: 'MZ',
			regionSlug: 'mizoram',
			weight: 17,
			cities: [
				'Aizwal'
			]
		},
		{
			regionName: 'Nagaland',
			regionShort: 'NL',
			regionSlug: 'nagaland',
			weight: 31,
			cities: [
				'Kohima'
			]
		},
		{
			regionName: 'Odisha',
			regionShort: 'OR',
			regionSlug: 'odisha',
			weight: 651,
			cities: [
				'Bhubaneswar', 'Brahmapur', 'Cuttack', 'Puri', 'Raurkela', 'Raurkela Civil Township', 'Sambalpur'
			]
		},
		{
			regionName: 'Punjab',
			regionShort: 'PB',
			regionSlug: 'punjab',
			weight: 430,
			cities: [
				'Abohar', 'Ahmadpur East', 'Amritsar', 'Bahawalnagar', 'Bahawalpur', 'Bhatinda', 'Chiniot',
				'Chishtian Mandi', 'Daska', 'Dera Ghazi Khan', 'Faisalabad', 'Gojra', 'Gujranwala', 'Gujrat',
				'Hafizabad', 'Hoshiarpur', 'Jalandhar (Jullundur}', 'Jaranwala', 'Jhang', 'Jhelum', 'Kamalia',
				'Kamoke', 'Kasur', 'Khanewal', 'Khanpur', 'Lahore', 'Ludhiana', 'Mandi Bahauddin', 'Mandi Burewala',
				'Moga', 'Multan', 'Muridke', 'Muzaffargarh', 'Okara', 'Pak Pattan', 'Pathankot', 'Patiala',
				'Rahim Yar Khan', 'Rawalpindi', 'Sadiqabad', 'Sahiwal', 'Sargodha', 'Sheikhupura', 'Sialkot',
				'Vihari', 'Wah', 'Wazirabad'
			]
		},
		{
			regionName: 'Rajasthan',
			regionShort: 'RJ',
			regionSlug: 'rajasthan',
			weight: 1065,
			cities: [
				'Ajmer', 'Alwar', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Ganganagar',
				'Jaipur', 'Jodhpur', 'Kota', 'Pali', 'Sikar', 'Tonk', 'Udaipur'
			]
		},
		{
			regionName: 'Sikkim',
			regionShort: 'SK',
			regionSlug: 'sikkim',
			weight: 9,
			cities: [
				'Gangtok'
			]
		},
		{
			regionName: 'Tamil Nadu',
			regionShort: 'TN',
			regionSlug: 'Tamil Nadu',
			weight: 1120,
			cities: [
				'Alandur', 'Ambattur', 'Avadi', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dindigul', 'Erode',
				'Kanchipuram', 'Kumbakonam', 'Madurai', 'Nagarcoil', 'Neyveli', 'Palayankottai', 'Pallavaram',
				'Pudukkottai', 'Rajapalaiyam', 'Salem', 'Tambaram', 'Thanjavur', 'Tiruchirapalli',
				'Tirunelveli', 'Tiruppur', 'Tiruvannamalai', 'Tiruvarur', 'Tiruvottiyur', 'Tuticorin',
				'Valparai', 'Vellore'
			]
		},
		{
			regionName: 'Tripura',
			regionShort: 'TR',
			regionSlug: 'tripura',
			weight: 57,
			cities: [
				'Agartala'
			]
		},
		{
			regionName: 'Uttar Pradesh',
			regionShort: 'UP',
			regionSlug: 'uttar_pradesh',
			weight: 3098,
			cities: [
				'Agra', 'Aligarh', 'Allahabad', 'Amroha', 'Bahraich', 'Banda', 'Bareilly', 'Budaun',
				'Bulandshahr', 'Etawah', 'Faizabad', 'Farrukhabad-cum-Fatehgarh', 'Fatehpur', 'Firozabad',
				'Ghaziabad', 'Gonda', 'Gorakhpur', 'Hapur', 'Hathras', 'Jaunpur', 'Jhansi', 'Kanpur',
				'Kanpur Cantonment', 'Lucknow', 'Mathura', 'Maunath Bhanjan', 'Meerut',
				'Meerut Cantonment', 'Mirzapur-cum-Vindhyachal', 'Modinagar', 'Moradabad',
				'Muzaffarnagar', 'Noida', 'Orai', 'Pilibhit', 'Rae Bareli', 'Rampur', 'Saharanpur',
				'Sambhal', 'Shahjahanpur', 'Sitapur', 'Unnao', 'Varanasi'
			]
		},
		{
			regionName: 'Uttarakhand',
			regionShort: 'UT',
			regionSlug: 'uttarakhand',
			weight: 157,
			cities: [
				'Dehradun', 'Haridwar'
			]
		},
		{
			regionName: 'West Bengal',
			regionShort: 'WB',
			regionSlug: 'west_bengal',
			weight: 1418,
			cities: [
				'Asansol', 'Ashoknagar-Kalyangarh', 'Baidyabati', 'Bally', 'Balurghat', 'Bankura',
				'Bansberia', 'Barahanagar', 'Barasat', 'Barddhaman', 'Barrackpur', 'Basirhat',
				'Berhampore', 'Bhatpara', 'Burnpur', 'Kolkata', 'Champdani', 'Chandannagar', 'Dabgram',
				'Durgapur', 'Habra', 'Haldia', 'Halisahar', 'Howrah', 'Hugli-Chinsurah', 'Ingraj Bazar',
				'Kamarhati', 'Kanchrapara', 'Kharagpur', 'Krishnanagar', 'Kulti-Barakar', 'Midnapore',
				'Naihati', 'Navadwip', 'North Barrackpur', 'North Dum Dum', 'Panihati', 'Raiganj',
				'Rishra', 'Santipur', 'Serampore', 'Siliguri', 'South Dum Dum', 'Titagarh', 'Uluberia',
				'Uttarpara-Kotrung'
			]
		},
		//Union Territories
		{
			regionName: 'Andaman and Nicobar Islands',
			regionShort: 'AN',
			regionSlug: 'andaman_and_nicobar_islands',
			weight: 6,
			cities: [
				'Port Blair'
			]
		},
		{
			regionName: 'Chandigarh',
			regionShort: 'CH',
			regionSlug: 'Chandigarh',
			weight: 16,
			cities: [
				'Chandigarh'
			]
		},
		{
			regionName: 'Dadra and Nagar Haveli',
			regionShort: 'DN',
			regionSlug: 'dadra_and_nagar_haveli',
			weight: 5,
			cities: [
				'Silvassa'
			]
		},
		{
			regionName: 'Daman and Diu',
			regionShort: 'DD',
			regionSlug: 'Daman and Diu',
			weight: 4,
			cities: [
				'Daman'
			]
		},
		{
			regionName: 'Lakshadweep',
			regionShort: 'LD',
			regionSlug: 'lakshadweep',
			weight: 1,
			cities: [
				'Kavaratti'
			]
		},
		{
			regionName: 'Delhi',
			regionShort: 'DL',
			regionSlug: 'delhi',
			weight: 260,
			cities: [
				'Delhi'
			]
		},
		{
			regionName: 'Pondicherry',
			regionShort: 'PY',
			regionSlug: 'pondicherry',
			weight: 19,
			cities: [
				'Pondicherry'
			]
		}
	]
});
