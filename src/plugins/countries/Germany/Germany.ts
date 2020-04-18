import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: "Germany",
    countrySlug: "germany",
	regionNames: "German States",
    continent: "europe",
    extendedData: {
	    zipFormat: {
	    	format: "xxxxx"
		}
    },
    regions: [
        {
            regionName: "Baden Württemberg",
            regionShort: "BW",
            regionSlug: "baden_wurttemberg",
            weight: 301,
            cities: [
                "Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heidelberg", "Heilbronn", "Ulm", "Pforzheim", "Reutlingen",
                "Esslingen", "Tübingen", "Ludwigsburg", "Konstanz", "Villingen-Schwenningen", "Aalen", "Sindelfingen", "Schwäbisch Gmünd",
                "Friedrichshafen", "Offenburg", "Göppingen", "Baden-Baden", "Waiblingen", "Ravensburg", "Lörrach", "Heidenheim",
                "Rastatt", "Böblingen"
            ]
        },
        {
            regionName: "Bayern",
            regionShort: "BY",
            regionSlug: "bayern",
            weight: 178,
            cities: [
                "Munich", "Nuremberg", "Augsburg", "Regensburg", "Würzburg", "Ingolstadt", "Fürth", "Erlangen",
                "Bayreuth", "Bamberg", "Aschaffenburg", "Landshut", "Kempten", "Rosenheim", "Neu-Ulm", "Schweinfurt",
                "Passau", "Hof", "Freising", "Straubing"
            ]
        },
        {
            regionName: "Berlin",
            regionShort: "BE",
            regionSlug: "berlin",
            weight: 3890,
            cities: [
                "Berlin"
            ]
        },
        {
            regionName: "Brandenburg",
            regionShort: "BB",
            regionSlug: "brandenburg",
            weight: 85,
            cities: [
                "Potsdam", "Cottbus", "Brandenburg", "Frankfurt", "Oranienburg", "Falkensee", "Eberswalde-Finow",
                "Bernau", "Königs Wusterhausen", "Schwedt", "Fürstenwalde", "Neuruppin", "Eisenhüttenstadt", "Senftenberg",
                "Strausberg", "Hennigsdorf", "Blankenfelde-Mahlow", "Rathenow", "Hohen Neuendorf", "Ludwigsfelde", "Spremberg",
                "Werder", "Teltow", "Wandlitz", "Luckenwalde", "Forst", "Kleinmachnow", "Prenzlau", "Panketal", "Guben"
            ]
        },
        {
            regionName: "Bremen",
            regionShort: "HB",
            regionSlug: "bremen",
            weight: 1577,
            cities: [
                "Bremen", "Bremerhaven"
            ]
        },
        {
            regionName: "Hamburg",
            regionShort: "HH",
            regionSlug: "hamburg",
            weight: 2368,
            cities: [
                "Hamburg"
            ]
        },
        {
            regionName: "Hessen",
            regionShort: "HE",
            regionSlug: "hessen",
            weight: 287,
            cities: [
                "Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach am Main", "Hanau", "Marburg", "Gießen", "Fulda",
                "Rüsselsheim", "Wetzlar", "Bad Homburg v. d. Höhe", "Rodgau", "Oberursel", "Dreieich", "Maintal", "Bensheim",
                "Hofheim am Taunus", "Neu-Isenburg", "Langen", "Limburg a.d. Lahn", "Dietzenbach", "Lampertheim", "Mörfelden-Walldorf",
                "Viernheim", "Bad Hersfeld", "Bad Nauheim", "Taunusstein", "Baunatal", "Kelkheim", "Bad Vilbel", "Friedberg",
                "Mühlheim am Main", "Rödermark", "Heppenheim", "Dillenburg", "Pfungstadt", "Hattersheim am Main", "Butzbach",
                "Friedrichsdorf", "Obertshausen", "Korbach", "Griesheim", "Groß-Gerau", "Weiterstadt", "Eschwege"
            ]
        },
        {
            regionName: "Niedersachsen",
            regionShort: "NI",
            regionSlug: "niedersachsen",
            weight: 166,
            cities: [
                "Hannover", "Braunschweig", "Osnabrück", "Oldenburg", "Wolfsburg", "Göttingen", "Hildesheim", "Salzgitter", "Wilhelmshaven",
                "Delmenhorst", "Lüneburg", "Celle", "Garbsen", "Hameln", "Wolfenbüttel", "Nordhorn", "Langenhagen", "Emden", "Lingen",
                "Cuxhaven", "Peine", "Stade", "Melle", "Neustadt am Rübenberge", "Lehrte", "Seevetal", "Gifhorn", "Wunstorf", "Goslar"
            ]
        },
        {
            regionName: "Mecklenburg-Vorpommern",
            regionShort: "MV",
            regionSlug: "meckleburg",
            weight: 71,
            cities: [
                "Anklam", "Bergen", "Greifswald", "Güstrow", "Neubrandenburg", "Neustrelitz", "Parchim	City", "Ribnitz-Damgarten",
                "Rostock", "Schwerin", "Stralsund", "Waren", "Wismar"
            ]
        },
        {
            regionName: "Nordrhein-Westphalen",
            regionShort: "NW",
            regionSlug: "nordrhein_westphalien",
            weight: 523,
            cities: [
                "Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Wuppertal", "Bonn", "Bielefeld", "Münster", "Aachen",
                "Mönchengladbach", "Gelsenkirchen", "Krefeld", "Oberhausen", "Hagen", "Hamm", "Mülheim", "Herne", "Leverkusen", "Solingen",
                "Neuss", "Paderborn", "Recklinghausen", "Bottrop", "Remscheid", "Bergisch Gladbach"
            ]
        },
        {
            regionName: "Rheinland-Pfalz",
            regionShort: "RP",
            regionSlug: "rheinland_pfalz",
            weight: 202,
            cities: [
                "Mainz", "Ludwigshafen", "Koblenz", "Trier", "Kaiserslauter", "Worms", "Neuwied", "Neustadt", "Speyer", "Frankenthal",
                "Bad Kreuznach", "Landau", "Pirmasens", "Zweibrücken", "Idar-Oberstei", "Andernach", "Bad Neuenahr-Ahrweiler",
                "Bingen", "Ingelheim", "Germersheim", "Haßloch", "Schifferstadt", "Bad Dürkheim"
            ]
        },
        {
            regionName: "Saarland",
            regionShort: "SL",
            regionSlug: "saarland",
            weight: 400,
            cities: [
                "Saarbrücken", "Neunkirchen", "Homburg", "Völklingen", "Sankt Ingbert", "Saarlouis", "Merzig", "Sankt Wendel",
                "Blieskastel", "Dillingen", "Lebach", "Püttlingen", "Heusweiler", "Wadgassen", "Bexbach", "Schwalbach", "Sulzbach"
            ]
        },
        {
            regionName: "Sachsen",
            regionShort: "SN",
            regionSlug: "sachsen",
            weight: 227,
            cities: [
                "Leipzig", "Dresden", "Chemnitz", "Zwickau", "Plauen", "Görlitz", "Freiberg", "Bautzen", "Freital", "Pirna",
                "Hoyerswerda", "Radebeul", "Riesa", "Grimma", "Zittau", "Meißen", "Delitzsch", "Limbach-Oberfrohna", "Markkleeberg", "Glauchau"
            ]
        },
        {
            regionName: "Sachsen-Anhalt",
            regionShort: "ST",
            regionSlug: "sachsen_anhalt",
            weight: 116,
            cities: [
                "Halle", "Magdeburg", "Dessau", "Wittenberg", "Bitterfeld-Wolfen", "Stendal", "Halberstadt", "Weißenfels", "Bernburg",
                "Merseburg", "Wernigerode", "Naumburg", "Schönebeck", "Zeitz", "Sangerhausen", "Aschersleben", "Quedlinburg", "Staßfurt",
                "Köthen", "Eisleben", "Salzwedel", "Burg"
            ]
        },
	    {
		    regionName: "Schleswig-Holstein",
		    regionShort: "SH",
		    regionSlug: "schleswig_holstein",
		    weight: 179,
		    cities: [
			    "Kiel", "Lübeck", "Flensburg", "Neumünster", "Norderstedt", "Elmshorn", "Pinneberg", "Itzehoe", "Wedel", "Ahrensburg",
			    "Geesthacht", "Rendsburg", "Henstedt-Ulzburg", "Reinbek", "Bad Oldesloe", "Schleswig", "Eckernförde", "Husum", "Heide",
			    "Quickborn"
		    ]
	    }
    ]
});
