import { GetCountryData } from '~types/countries';

const France: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'france',
	regionNames: i18n.regionNames,
	continent: 'europe',
	extendedData: {
		zipFormat: {
			format: 'xxxxx'
		}
	},
	regions: [
		{
			regionName: 'Île-de-France',
			regionShort: 'IL',
			regionSlug: 'ile_de_france',
			weight: 18.3,
			cities: [
				'Paris', 'Boulogne-Billancourt', 'Saint-Denis', 'Argenteuil', 'Montreuil', 'Créteil', 'Nanterre',
				'Courbevoie', 'Versailles', 'Vitry-sur-Seine', 'Colombes', 'Asnières-sur-Seine', 'Aulnay-sous-Bois',
				'Rueil-Malmaison', 'Aubervilliers', 'Champigny-sur-Marne', 'Saint-Maur-des-Fossés', 'Drancy',
				'Issy-les-Moulineaux', 'Levallois-Perret', 'Noisy-le-Grand'
			]
		},
		{
			regionName: 'Provence-Alpes-Côte d\'Azur',
			regionShort: 'PR',
			regionSlug: 'provence_alpes',
			weight: 9.6,
			cities: [
				'Marseille', 'Nice', 'Toulon', 'Aix-en-Provence', 'Avignon', 'Antibes', 'Cannes', 'La Seyne-sur-Mer',
				'Hyères', 'Arles', 'Fréjus', 'Grasse', 'Martigues', 'Cagnes-sur-Mer', 'Aubagne', 'Salon-de-Provence',
				'Istres', 'Le Cannet', 'Gap', 'Draguignan', 'Vitrolles'
			]
		},
		{
			regionName: 'Nord-Pas-de-Calais',
			regionShort: 'NO',
			regionSlug: 'nord_pas_de_calais',
			weight: 7.6,
			cities: [
				'Lille', 'Roubaix', 'Dunkerque', 'Tourcoing', 'Calais', 'Villeneuve-d\'Ascq', 'Valenciennes', 'Boulogne-sur-Mer',
				'Douai', 'Arras', 'Wattrelos', 'Marcq-en-Baroeul', 'Lens', 'Cambrai', 'Liévin', 'Maubeuge', 'Lambersart',
				'Hénin-Beaumont', 'Béthune'
			]
		},
		{
			regionName: 'Pays de la Loire',
			regionShort: 'PA',
			regionSlug: 'pays_de_la_loire',
			weight: 6.3,
			cities: [
				'Nantes', 'Angers', 'Le Mans', 'Saint-Nazaire', 'Cholet', 'La Roche-sur-Yon', 'Laval', 'Saint-Herblain',
				'Rezé', 'Saumur', 'Saint-Sébastien-sur-Loire', 'Orvault', 'Vertou'
			]
		},
		{
			regionName: 'Aquitaine',
			regionShort: 'AQ',
			regionSlug: 'aquitaine',
			weight: 5.5,
			cities: [
				'Bordeaux', 'Pau', 'Mérignac', 'Pessac', 'Bayonne', 'Talence', 'Anglet', 'Agen', 'Mont-de-Marsan',
				'Périgueux', 'Villenave-d\'Ornon', 'Saint-Médard-en-Jalles', 'Bergerac', 'Biarritz', 'Bègles'
			]
		},
		{
			regionName: 'Bretagne',
			regionShort: 'BR',
			regionSlug: 'bretagne',
			weight: 4.9,
			cities: [
				'Rennes', 'Brest', 'Quimper', 'Lorient', 'Vannes', 'Saint-Malo', 'Saint-Brieuc', 'Lanester'
			]
		},
		{
			regionName: 'Midi-Pyrénées',
			regionShort: 'MI',
			regionSlug: 'midi_pyrenees',
			weight: 4.4,
			cities: [
				'Toulouse', 'Montauban', 'Albi', 'Tarbes', 'Castres', 'Colomiers', 'Tournefeuille', 'Rodez'
			]
		},
		{
			regionName: 'Languedoc-Roussillon',
			regionShort: 'LA',
			regionSlug: 'languedoc_rousillon',
			weight: 4.1,
			cities: [
				'Montpellier', 'Nîmes', 'Perpignan', 'Béziers', 'Narbonne', 'Carcassonne', 'Sète', 'Alès', 'Lunel'
			]
		},
		{
			regionName: 'Centre',
			regionShort: 'CE',
			regionSlug: 'centre',
			weight: 4,
			cities: [
				'Tours', 'Orléans', 'Bourges', 'Blois', 'Châteauroux', 'Chartres', 'Joué-lès-Tours', 'Dreux', 'Vierzon'
			]
		},
		{
			regionName: 'Lorraine',
			regionShort: 'LO',
			regionSlug: 'lorraine',
			weight: 3.7,
			cities: [
				'Metz', 'Nancy', 'Thionville', 'Épinal', 'Vandoeuvre-lès-Nancy', 'Montigny-lès-Metz', 'Sarreguemines',
				'Forbach', 'Saint-Dié-des-Vosges'
			]
		},
		{
			regionName: 'Picardie',
			regionShort: 'PI',
			regionSlug: 'picardie',
			weight: 3,
			cities: [
				'Amiens', 'Saint-Quentin', 'Beauvais', 'Compiègne', 'Creil', 'Soissons', 'Laon', 'Abbeville'
			]
		},
		{
			regionName: 'Alsace',
			regionShort: 'AL',
			regionSlug: 'alsace',
			weight: 2.9,
			cities: [
				'Strasbourg', 'Mulhouse', 'Colmar', 'Haguenau', 'Schiltigheim', 'Illkirch-Graffenstaden', 'Saint-Louis'
			]
		},
		{
			regionName: 'Haute-Normandie',
			regionShort: 'HA',
			regionSlug: 'haute_normandie',
			weight: 2.8,
			cities: [
				'Le Havre', 'Rouen', 'Évreux', 'Dieppe', 'Sotteville-lès-Rouen', 'Saint-Étienne-du-Rouvray', 'Vernon',
				'Le Grand-Quevilly', 'Le Petit-Quevilly'
			]
		},
		{
			regionName: 'Poitou-Charentes',
			regionShort: 'PO',
			regionSlug: 'poitou_charentes',
			weight: 2.7,
			cities: [
				'Poitiers', 'La Rochelle', 'Niort', 'Angoulême', 'Châtellerault', 'Saintes'
			]
		},
		{
			regionName: 'Bourgogne',
			regionShort: 'BO',
			regionSlug: 'bourgogne',
			weight: 2.6,
			cities: [
				'Dijon', 'Chalon-sur-Saône', 'Nevers', 'Auxerre', 'Mâcon', 'Sens'
			]
		},
		{
			regionName: 'Basse-Normandie',
			regionShort: 'BA',
			regionSlug: 'basse_normandie',
			weight: 2.3,
			cities: [
				'Caen', 'Cherbourg-Octeville', 'Alençon', 'Lisieux', 'Hérouville-Saint-Clair', 'Saint-Lô'
			]
		},
		{
			regionName: 'Auvergne',
			regionShort: 'AU',
			regionSlug: 'auvergne',
			weight: 2.1,
			cities: [
				'Clermont-Ferrand', 'Montluçon', 'Aurillac', 'Vichy', 'Moulins', 'Le Puy-en-Velay'
			]
		},
		{
			regionName: 'Champagne-Ardenne',
			regionShort: 'CH',
			regionSlug: 'champagne_ardenne',
			weight: 2.1,
			cities: [
				'Reims', 'Troyes', 'Charleville-Mézières', 'Châlons-en-Champagne', 'Saint-Dizier', 'Épernay'
			]
		},
		{
			regionName: 'Franche-Comté',
			regionShort: 'FC',
			regionSlug: 'franche_comte',
			weight: 1.8,
			cities: [
				'Besançon', 'Belfort', 'Montbéliard', 'Dole', 'Pontarlier'
			]
		},
		{
			regionName: 'Limousin',
			regionShort: 'LI',
			regionSlug: 'limousin',
			weight: 1.1,
			cities: [
				'Limoges', 'Brive-la-Gaillarde'
			]
		},
		{
			regionName: 'Corse',
			regionShort: 'CO',
			regionSlug: 'corse',
			weight: 0.5,
			cities: [
				'Ajaccio', 'Bastia'
			]
		}
	]
});

export default France;
