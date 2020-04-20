/**
 * @author Fareez Ahamed <fareez.ahamed@gmail.com>
 */
import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'pakistan',
	regionNames: i18n.regionNames,
	continent: 'asia',
	extendedData: {
		zipFormat: {
			format: 'Xxxxxx',
			replacements: {
				X: '123456789',
				x: '0123456789'
			}
		},
		phoneFormat: {
			displayFormats: [
				'+92 xxxxxxxxx',
				'0xx-xxxxxxx',
				'0xxx-xxxxxxx',
			]
		}
	},
	regions: [
		{
			regionName: 'Punjab',
			regionShort: 'PU',
			regionSlug: 'sindh',
			weight: 30,
			cities: [
				'Attock', 'Bahawalnagar', 'Bahawalpur', 'Bhakkar', 'Chakwal', 'Chiniot', 'Dera Ghazi Khan', 'Faisalabad', 'Gujranwala', 'Hafizabad', 'Jhang', 'Jhelum', 'Kasur', 'Khanewal', 'Khushab', 'Lahore', 'Lodhran', 'Mandi Bahauddin', 'Mianwali', 'Multan', 'Murree', 'Muzaffargarh', 'Nankana Sahib', 'Narowal', 'Okara', 'Pakpatan', 'Rahimyar Khan', 'Rajanpur', 'Rawalpindi', 'Sahiwal', 'Sargodha', 'Sheikhupura', 'Sialkot', 'Toba Tek Singh', 'Vehari'
			]
		},
		{
			regionName: 'Sindh',
			regionShort: 'SI',
			regionSlug: 'sindh',
			weight: 25,
			cities: [
				'Badin', 'Dadu', 'Ghotki', 'Hyderabad', 'Jacobabad', 'Jamshoro', 'Karachi', 'Kashmore', 'Khairpur', 'Larkana', 'Matiari', 'Naushahro Firoze', 'Qambar Shahdadkot', 'Sanghar', 'Shaheed Benazirabad', 'Shikarpur', 'Sujawal', 'Sukkur', 'Tando Allahyar', 'Tando Muhammad Khan', 'Tharparkar', 'Thatta', 'Umerkot'
			]
		},
		{
			regionName: 'Balochistan',
			regionShort: 'BL',
			regionSlug: 'balochistan',
			weight: 20,
			cities: [
				'Awaran', 'Barkhan', 'Chagai', 'Dera Bugti', 'Gwadar', 'Harnai', 'Jafarabad', 'Kacchi', 'Kalat', 'Kech', 'Kharan', 'Khuzdar', 'Killa Abdullah', 'Killa Saifullah', 'Kohlu', 'Lasbela', 'Lehri', 'Loralai', 'Mastung', 'Musakhel', 'Nasirabad', 'Nushki', 'Panjgur', 'Pishin Valley', 'Quetta', 'Sherani', 'Sibi', 'Sohbatpur', 'Washuk', 'Zhob', 'Ziarat',
			]
		},
		{
			regionName: 'Khyber Pakhtoonkhwa',
			regionShort: 'KPK',
			regionSlug: 'khyber_pakhtoonkhwa',
			weight: 20,
			cities: [
				'Abbottabad', 'Bannu', 'Battagram', 'Buner', 'Charsadda', 'Chitral', 'Dera Ismail Khan', 'Dir', 'Hangu', 'Haripur', 'Karak', 'Kohat', 'Kohistan', 'Lakki Marwat', 'Malakand', 'Mansehra', 'Mardan', 'Nowshera', 'Peshawar', 'Shangla', 'Swabi', 'Swat', 'Tank', 'Torghar'
			]
		},
		{
			regionName: 'Gilgit Baltistan',
			regionShort: 'GB',
			regionSlug: 'gilgit_baltistan',
			weight: 15,
			cities: [
				'Astore', 'Diamer', 'Ghanche', 'Ghizer', 'Gilgit', 'Gojal Upper Hunza', 'Kharmang', 'Nagar', 'Shigar', 'Skardu'
			]
		},
		{
			regionName: 'Azad Kashmir',
			regionShort: 'AK',
			regionSlug: 'azad_kashmir',
			weight: 10,
			cities: [
				'Bagh', 'Bhimber', 'Hattian Bala', 'Haveli', 'Kotli', 'Mirpur', 'Muzzafarabad', 'Neelum Valley', 'Rawalakot', 'Sudhanoti'
			]
		},
		{
			regionName: 'FATA',
			regionShort: 'FA',
			regionSlug: 'fata',
			weight: 5,
			cities: [
				'Bajaur Agency', 'Khyber Agency', 'Kurram Agency', 'Mohmand Agency', 'North Waziristan'
			]
		}
	]
});
