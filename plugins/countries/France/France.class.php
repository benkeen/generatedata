<?php

/**
 * @package Countries
 */

class Country_France extends CountryPlugin {
	protected $countryName = "France";
	protected $countrySlug = "france";
	protected $continentSlug = "europe";
	protected $regionNames = "French Provinces";
	protected $zipFormat = "xxxxx";


	public function install() {
		$data = array(
			array(
				"regionName" => "Île-de-France",
				"regionShort" => "Île-de-France",
				"regionSlug" => "ile_de_france",
				"weight" => "18.3",
				"cities" => array(
					"Paris", "Boulogne-Billancourt", "Saint-Denis", "Argenteuil", "Montreuil", "Créteil", "Nanterre", 
					"Courbevoie", "Versailles", "Vitry-sur-Seine", "Colombes", "Asnières-sur-Seine", "Aulnay-sous-Bois", 
					"Rueil-Malmaison", "Aubervilliers", "Champigny-sur-Marne", "Saint-Maur-des-Fossés", "Drancy", 
					"Issy-les-Moulineaux", "Levallois-Perret", "Noisy-le-Grand"
				)
			),
			array(
				"regionName" => "Provence-Alpes-Côte d'Azur",
				"regionShort" => "Provence-Alpes-Côte d'Azur",
				"regionSlug" => "provence_alpes",
				"weight" => "9.6",
				"cities" => array(
					"Marseille", "Nice", "Toulon", "Aix-en-Provence", "Avignon", "Antibes", "Cannes", "La Seyne-sur-Mer", 
					"Hyères", "Arles", "Fréjus", "Grasse", "Martigues", "Cagnes-sur-Mer", "Aubagne", "Salon-de-Provence", 
					"Istres", "Le Cannet", "Gap", "Draguignan", "Vitrolles"
				)
			),
			array(
				"regionName" => "Nord-Pas de Calais",
				"regionShort" => "Nord-Pas de Calais",
				"regionSlug" => "nord_pas_de_calais",
				"weight" => "7.6",
				"cities" => array(
					"Lille", "Roubaix", "Dunkerque", "Tourcoing", "Calais", "Villeneuve-d'Ascq", "Valenciennes", "Boulogne-sur-Mer", 
					"Douai", "Arras", "Wattrelos", "Marcq-en-Baroeul", "Lens", "Cambrai", "Liévin", "Maubeuge", "Lambersart", 
					"Hénin-Beaumont", "Béthune"
				)
			),
			array(
				"regionName" => "Pays de la Loire",
				"regionShort" => "Pays de la Loire",
				"regionSlug" => "pays_de_la_loire",
				"weight" => "6.3",
				"cities" => array(
					"Nantes", "Angers", "Le Mans", "Saint-Nazaire", "Cholet", "La Roche-sur-Yon", "Laval", "Saint-Herblain", 
					"Rezé", "Saumur", "Saint-Sébastien-sur-Loire", "Orvault", "Vertou"
				)
			),
			array(
				"regionName" => "Aquitaine",
				"regionShort" => "Aquitaine",
				"regionSlug" => "aquitaine",
				"weight" => "5.5",
				"cities" => array(
					"Bordeaux", "Pau", "Mérignac", "Pessac", "Bayonne", "Talence", "Anglet", "Agen", "Mont-de-Marsan", 
					"Périgueux", "Villenave-d'Ornon", "Saint-Médard-en-Jalles", "Bergerac", "Biarritz", "Bègles"
				)
			),
			array(
				"regionName" => "Brittany",
				"regionShort" => "Brittany",
				"regionSlug" => "brittany",
				"weight" => "4.9",
				"cities" => array(
					"Rennes", "Brest", "Quimper", "Lorient", "Vannes", "Saint-Malo", "Saint-Brieuc", "Lanester"
				)
			),
			array(
				"regionName" => "Midi-Pyrénées",
				"regionShort" => "Midi-Pyrénées",
				"regionSlug" => "midi_pyrenees",
				"weight" => "4.4",
				"cities" => array(
					"Toulouse", "Montauban", "Albi", "Tarbes", "Castres", "Colomiers", "Tournefeuille", "Rodez"
				)
			),
			array(
				"regionName" => "Languedoc-Roussillon",
				"regionShort" => "Languedoc-Roussillon",
				"regionSlug" => "languedoc_rousillon",
				"weight" => "4.1",
				"cities" => array(
					"Montpellier", "Nîmes", "Perpignan", "Béziers", "Narbonne", "Carcassonne", "Sète", "Alès", "Lunel"
				)
			),
			array(
				"regionName" => "Centre",
				"regionShort" => "Centre",
				"regionSlug" => "centre",
				"weight" => "4.0",
				"cities" => array(
					"Tours", "Orléans", "Bourges", "Blois", "Châteauroux", "Chartres", "Joué-lès-Tours", "Dreux", "Vierzon"
				)
			),
			array(
				"regionName" => "Lorraine",
				"regionShort" => "Lorraine",
				"regionSlug" => "lorraine",
				"weight" => "3.7",
				"cities" => array(
					"Metz", "Nancy", "Thionville", "Épinal", "Vandoeuvre-lès-Nancy", "Montigny-lès-Metz", "Sarreguemines", 
					"Forbach", "Saint-Dié-des-Vosges"
				)
			),
			array(
				"regionName" => "Picardy",
				"regionShort" => "Picardy",
				"regionSlug" => "picardy",
				"weight" => "3.0",
				"cities" => array(
					"Amiens", "Saint-Quentin", "Beauvais", "Compiègne", "Creil", "Soissons", "Laon", "Abbeville"
				)
			),
			array(
				"regionName" => "Alsace",
				"regionShort" => "Alsace",
				"regionSlug" => "alsace",
				"weight" => "2.9",
				"cities" => array(
					"Strasbourg", "Mulhouse", "Colmar", "Haguenau", "Schiltigheim", "Illkirch-Graffenstaden", "Saint-Louis"
				)
			),
			array(
				"regionName" => "Upper Normandy",
				"regionShort" => "Upper Normandy",
				"regionSlug" => "upper_normandy",
				"weight" => "2.8",
				"cities" => array(
					"Le Havre", "Rouen", "Évreux", "Dieppe", "Sotteville-lès-Rouen", "Saint-Étienne-du-Rouvray", "Vernon", 
					"Le Grand-Quevilly", "Le Petit-Quevilly"
				)
			),
			array(
				"regionName" => "Poitou-Charentes",
				"regionShort" => "Poitou-Charentes",
				"regionSlug" => "poitou_charentes",
				"weight" => "2.7",
				"cities" => array(
					"Poitiers", "La Rochelle", "Niort", "Angoulême", "Châtellerault", "Saintes"
				)
			),
			array(
				"regionName" => "Bourgogne",
				"regionShort" => "Bourgogne",
				"regionSlug" => "bourgogne",
				"weight" => "2.6",
				"cities" => array(
					"Dijon", "Chalon-sur-Saône", "Nevers", "Auxerre", "Mâcon", "Sens"
				)
			),
			array(
				"regionName" => "Lower Normandy",
				"regionShort" => "Lower Normandy",
				"regionSlug" => "lower_normandy",
				"weight" => "2.3",
				"cities" => array(
					"Caen", "Cherbourg-Octeville", "Alençon", "Lisieux", "Hérouville-Saint-Clair", "Saint-Lô"
				)
			),
			array(
				"regionName" => "Auvergne",
				"regionShort" => "Auvergne",
				"regionSlug" => "auvergne",
				"weight" => "2.1",
				"cities" => array(
					"Clermont-Ferrand", "Montluçon", "Aurillac", "Vichy", "Moulins", "Le Puy-en-Velay"
				)
			),
			array(
				"regionName" => "Champagne-Ardenne",
				"regionShort" => "Champagne-Ardenne",
				"regionSlug" => "champagne_ardenne",
				"weight" => "2.1",
				"cities" => array(
					"Reims", "Troyes", "Charleville-Mézières", "Châlons-en-Champagne", "Saint-Dizier", "Épernay"
				)
			),
			array(
				"regionName" => "Franche-Comté",
				"regionShort" => "Franche-Comté",
				"regionSlug" => "franche_comte",
				"weight" => "1.8",
				"cities" => array(
					"Besançon", "Belfort", "Montbéliard", "Dole", "Pontarlier"
				)
			),
			array(
				"regionName" => "Limousin",
				"regionShort" => "Limousin",
				"regionSlug" => "limousin",
				"weight" => "1.1",
				"cities" => array(
					"Limoges", "Brive-la-Gaillarde"
				)
			),
			array(
				"regionName" => "Corse",
				"regionShort" => "Corse",
				"regionSlug" => "corse",
				"weight" => "0.5",
				"cities" => array(
					"Ajaccio", "Bastia"
				)
			)
		);

		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $data);
	}
}