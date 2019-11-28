<?php

/**
 * @package Countries
 */

class Country_UK extends CountryPlugin {
	protected $countryName = "United Kingdom";
	protected $countrySlug = "united_kingdom";
	protected $regionNames = "UK Counties";
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => "Lx xLL|Lxx xLL|LxL xLL|LLx xLL|LLxx xLL|LLxL xLL",
		"phoneFormat" => array(
			"displayFormats" => array(
				"0xxxx xxxxxx"	
			)	
		)
	);

	protected $countryData = array(
		array(
			"regionName" => 'Aberdeenshire',
			"regionShort" => 'AB',
			"regionSlug" => 'aberdeenshire',
			"weight" => 1,
			"cities" => array(
				"Aberdeen", "Peterhead", "Fraserburgh", "Inverurie", "Huntley", "Ellon", "Turriff"
			)
		),
		array(
			"regionName" => 'Anglesey',
			"regionShort" => 'AG',
			"regionSlug" => 'anglesey',
			"weight" => 1,
			"cities" => array(
				"Beaumaris", "Holyhead", "Llangefni", "Amlwch", "Menai Bridge"
			)
		),
		array(
			"regionName" => 'Angus',
			"regionShort" => 'AN',
			"regionSlug" => 'angus',
			"weight" => 1,
			"cities" => array(
				"Forfar", "Dundee", "Arbroath", "Brechin", "Montrose", "Carnoustie", "Kirriemuir"
			)
		),
		array(
			"regionName" => 'Argyllshire',
			"regionShort" => 'AR',
			"regionSlug" => 'argyllshire',
			"weight" => 1,
			"cities" => array(
				"Inveraray", "Oban", "Dunoon", "Campbeltown", "Lochgilphead", "Tobermory"
			)
		),
		array(
			"regionName" => 'Ayrshire',
			"regionShort" => 'AY',
			"regionSlug" => 'ayrshire',
			"weight" => 1,
			"cities" => array(
				"Ayr", "Kilmarnock", "Irvine", "Saltcoats", "Kilwinning", "Largs", "Troon", "Cumnock"
			)
		),
		array(
			"regionName" => 'Banffshire',
			"regionShort" => 'BA',
			"regionSlug" => 'banffshire',
			"weight" => 1,
			"cities" => array(
				"Banff", "Buckie", "Keith", "Macduff", "Portsoy", "Dufftown"
			)
		),
		array(
			"regionName" => 'Bedfordshire',
			"regionShort" => 'BD',
			"regionSlug" => 'bedfordshire',
			"weight" => 1,
			"cities" => array(
				"Bedford", "Luton", "Dunstable", "Leighton Buzzard", "Biggleswade", "Sandy"
			)
		),
		array(
			"regionName" => 'Berwickshire',
			"regionShort" => 'BE',
			"regionSlug" => 'berwickshire',
			"weight" => 1,
			"cities" => array(
				"Greenlaw", "Duns", "Eyemouth", "Lauder", "Coldstream"
			)
		),
		array(
			"regionName" => 'Buckinghamshire',
			"regionShort" => 'BK',
			"regionSlug" => 'buckinghamshire',
			"weight" => 1,
			"cities" => array(
				"Aylesbury", "Milton Keynes", "Slough", "Buckingham", "High Wycombe"
			)
		),
		array(
			"regionName" => 'Berkshire',
			"regionShort" => 'BR',
			"regionSlug" => 'berkshire',
			"weight" => 1,
			"cities" => array(
				"Reading", "Bracknell", "Maidenhead", "Newbury", "Windsor", "Wokingham", "Abingdon"
			)
		),
		array(
			"regionName" => 'Caithness',
			"regionShort" => 'CA',
			"regionSlug" => 'caithness',
			"weight" => 1,
			"cities" => array(
				"Wick", "Thurso", "Halkirk", "Castletown"
			)
		),
		array(
			"regionName" => 'Cambridgeshire',
			"regionShort" => 'CA',
			"regionSlug" => 'cambridgeshire',
			"weight" => 1,
			"cities" => array(
				"Cambridge", "Wisbech", "Ely", "March", "Whittlesey", "Chatteris", "Linton"
			)
		),
		array(
			"regionName" => 'Cardiganshire',
			"regionShort" => 'CG',
			"regionSlug" => 'cardiganshire',
			"weight" => 1,
			"cities" => array(
				"Cardigan", "Aberystwyth", "Lampeter", "New Quay", "Tregaron"
			)
		),
		array(
			"regionName" => 'Cheshire',
			"regionShort" => 'CH',
			"regionSlug" => 'cheshire',
			"weight" => 1,
			"cities" => array(
				"Chester", "Stockport", "Ellesmere Port", "Birkenhead", "Wallasey", "Runcorn", "Macclesfield", "Crewe"
			)
		),
		array(
			"regionName" => 'Clackmannanshire',
			"regionShort" => 'CL',
			"regionSlug" => 'clackmannanshire',
			"weight" => 1,
			"cities" => array(
				"Clackmannan", "Alloa", "Tillicoultry", "Tullibody"
			)
		),
		array(
			"regionName" => 'Carmarthenshire',
			"regionShort" => 'CM',
			"regionSlug" => 'carmarthenshire',
			"weight" => 1,
			"cities" => array(
				"Carmarthen", "Llanelli", "Ammanford", "Llandovery", "Kidwelly", "St. Clears"
			)
		),
		array(
			"regionName" => 'Cornwall',
			"regionShort" => 'CO',
			"regionSlug" => 'cornwall',
			"weight" => 1,
			"cities" => array(
				"Bodmin", "Truro", "Camborne", "Redruth", "St. Austell", "Falmouth", "Penzance", "Newquay"
			)
		),
		array(
			"regionName" => 'Cumberland',
			"regionShort" => 'CU',
			"regionSlug" => 'cumberland',
			"weight" => 1,
			"cities" => array(
				"Carlisle", "Whitehaven", "Workington", "Penrith", "Keswick", "Brampton"
			)
		),
		array(
			"regionName" => 'Derbyshire',
			"regionShort" => 'DB',
			"regionSlug" => 'derbyshire',
			"weight" => 1,
			"cities" => array(
				"Derby", "Chesterfield", "Glossop", "Ilkeston", "Long Eaton", "Swadlincote", "Buxton", "Matlock", "Ashbourne"
			)
		),
		array(
			"regionName" => 'Denbighshire',
			"regionShort" => 'DE',
			"regionSlug" => 'denbighshire',
			"weight" => 1,
			"cities" => array(
				"Denbigh", "Wrexham", "Ruthin", "Abergele", "Llangollen"
			)
		),
		array(
			"regionName" => 'Devon',
			"regionShort" => 'DE',
			"regionSlug" => 'devon',
			"weight" => 1,
			"cities" => array(
				"Exeter", "Plymouth", "Torquay", "Paignton", "Barnstaple", "Tiverton", "Newton Abbot", "Tavistock"
			)
		),
		array(
			"regionName" => 'Dunbartonshire',
			"regionShort" => 'DN',
			"regionSlug" => 'dunbartonshire',
			"weight" => 1,
			"cities" => array(
				"Dumbarton", "Clydebank", "Cumbernauld", "Helensburgh", "Alexandria", "Kirkintilloch"
			)
		),
		array(
			"regionName" => 'Dorset',
			"regionShort" => 'DO',
			"regionSlug" => 'dorset',
			"weight" => 1,
			"cities" => array(
				"Dorchester", "Poole", "Weymouth", "Sherborne", "Wimborne Minster", "Shaftesbury"
			)
		),
		array(
			"regionName" => 'East Lothian',
			"regionShort" => 'EL',
			"regionSlug" => 'east_lothian',
			"weight" => 1,
			"cities" => array(
				"Haddington", "North Berwick", "Dunbar", "Tranent", "East Linton"
			)
		),
		array(
			"regionName" => 'Essex',
			"regionShort" => 'ES',
			"regionSlug" => 'essex',
			"weight" => 1,
			"cities" => array(
				"Chelmsford", "Basildon", "Romford", "Southend", "Colchester", "Harlow", "Brentwood", "West Ham"
			)
		),
		array(
			"regionName" => 'Fife',
			"regionShort" => 'FI',
			"regionSlug" => 'fife',
			"weight" => 1,
			"cities" => array(
				"Cupar", "Dunfermline", "Glenrothes", "Kirkcaldy", "St. Andrews", "Cowdenbeath", "Burntisland"
			)
		),
		array(
			"regionName" => 'Flintshire',
			"regionShort" => 'FL',
			"regionSlug" => 'flintshire',
			"weight" => 1,
			"cities" => array(
				"Mold", "Flint", "Rhyl", "Prestatyn", "Connah's Quay", "Holywell", "Buckley", "St. Asaph"
			)
		),
		array(
			"regionName" => 'Glamorgan',
			"regionShort" => 'GL',
			"regionSlug" => 'glamorgan',
			"weight" => 1,
			"cities" => array(
				"Cardiff", "Swansea", "Merthyr Tydfil", "Barry", "Caerphilly", "Bridgend", "Neath", "Pontypridd"
			)
		),
		array(
			"regionName" => 'Gloucestershire',
			"regionShort" => 'GL',
			"regionSlug" => 'gloucestershire',
			"weight" => 1,
			"cities" => array(
				"Gloucester", "Bristol", "Cheltenham", "Stroud", "Cirencester", "Tewkesbury"
			)
		),
		array(
			"regionName" => 'Hampshire',
			"regionShort" => 'HA',
			"regionSlug" => 'hampshire',
			"weight" => 1,
			"cities" => array(
				"Winchester", "Southampton", "Portsmouth", "Bournemouth", "Basingstoke", "Newport"
			)
		),
		array(
			"regionName" => 'Herefordshire',
			"regionShort" => 'HE',
			"regionSlug" => 'herefordshire',
			"weight" => 1,
			"cities" => array(
				"Hereford", "Ross-on-Wye", "Leominster", "Ledbury", "Bromyard", "Kington"
			)
		),
		array(
			"regionName" => 'Hertfordshire',
			"regionShort" => 'HR',
			"regionSlug" => 'hertfordshire',
			"weight" => 1,
			"cities" => array(
				"Hertford", "Watford", "St. Albans", "Hemel Hempstead", "Stevenage", "Hatfield"
			)
		),
		array(
			"regionName" => 'Huntingdonshire',
			"regionShort" => 'HU',
			"regionSlug" => 'huntingdonshire',
			"weight" => 1,
			"cities" => array(
				"Huntingdon", "St. Ives", "St. Neots", "Ramsey", "Yaxley"
			)
		),
		array(
			"regionName" => 'Inverness-shire',
			"regionShort" => 'IN',
			"regionSlug" => 'inverness_shire',
			"weight" => 1,
			"cities" => array(
				"Inverness", "Fort William", "Kingussie", "Newtonmore", "Portree"
			)
		),
		array(
			"regionName" => 'Kincardineshire',
			"regionShort" => 'KC',
			"regionSlug" => 'kincardineshire',
			"weight" => 1,
			"cities" => array(
				"Stonehaven", "Banchory", "Laurencekirk", "Inverbervie"
			)
		),
		array(
			"regionName" => 'Kent',
			"regionShort" => 'KE',
			"regionSlug" => 'kent',
			"weight" => 1,
			"cities" => array(
				"Maidstone", "Canterbury", "Bromley", "Rochester", "Margate", "Folkestone", "Dover", "Greenwich"
			)
		),
		array(
			"regionName" => 'Kirkcudbrightshire',
			"regionShort" => 'KK',
			"regionSlug" => 'kirkcudbrightshire',
			"weight" => 1,
			"cities" => array(
				"Kircudbright", "Castle Douglas", "Dalbeattie", "New Galloway"
			)
		),
		array(
			"regionName" => 'Kinross-shire',
			"regionShort" => 'KR',
			"regionSlug" => 'kinross_shire',
			"weight" => 1,
			"cities" => array(
				"Kinross", "Milnathort"
			)
		),
		array(
			"regionName" => 'Lancashire',
			"regionShort" => 'LA',
			"regionSlug" => 'lancashire',
			"weight" => 1,
			"cities" => array(
				"Lancaster", "Liverpool", "Manchester", "Preston", "Bolton", "Warrington", "Barrow-in-Furness"
			)
		),
		array(
			"regionName" => 'Leicestershire',
			"regionShort" => 'LE',
			"regionSlug" => 'leicestershire',
			"weight" => 1,
			"cities" => array(
				"Leicester", "Loughborough", "Hinckley", "Melton Mowbray", "Coalville", "Lutterworth"
			)
		),
		array(
			"regionName" => 'Lincolnshire',
			"regionShort" => 'LI',
			"regionSlug" => 'lincolnshire',
			"weight" => 1,
			"cities" => array(
				"Lincoln", "Grimsby", "Scunthorpe", "Boston", "Grantham", "Stamford", "Skegness", "Louth"
			)
		),
		array(
			"regionName" => 'Lanarkshire',
			"regionShort" => 'LK',
			"regionSlug" => 'lanarkshire',
			"weight" => 1,
			"cities" => array(
				"Lanark", "Glasgow", "East Kilbride", "Hamilton", "Motherwell", "Coatbridge", "Carluke"
			)
		),
		array(
			"regionName" => 'Merionethshire',
			"regionShort" => 'ME',
			"regionSlug" => 'merionethshire',
			"weight" => 1,
			"cities" => array(
				"Dolgellau", "Bala", "Tywyn", "Blaenau Ffestiniog", "Barmouth", "Harlech"
			)
		),
		array(
			"regionName" => 'Montgomeryshire',
			"regionShort" => 'MG',
			"regionSlug" => 'montgomeryshire',
			"weight" => 1,
			"cities" => array(
				"Montgomery", "Newtown", "Welshpool", "Machynlleth", "Llanidloes"
			)
		),
		array(
			"regionName" => 'Midlothian',
			"regionShort" => 'ML',
			"regionSlug" => 'midlothian',
			"weight" => 1,
			"cities" => array(
				"Edinburgh", "Musselburgh", "Penicuik", "Dalkeith", "Bonnyrigg"
			)
		),
		array(
			"regionName" => 'Monmouthshire',
			"regionShort" => 'MO',
			"regionSlug" => 'monmouthshire',
			"weight" => 1,
			"cities" => array(
				"Monmouth", "Newport", "Blackwood", "Cwmbran", "Abergavenny", "Chepstow", "Tredegar"
			)
		),
		array(
			"regionName" => 'Morayshire',
			"regionShort" => 'MO',
			"regionSlug" => 'morayshire',
			"weight" => 1,
			"cities" => array(
				"Elgin", "Forres", "Rothes", "Lossiemouth", "Fochabers"
			)
		),
		array(
			"regionName" => 'Northumberland',
			"regionShort" => 'NB',
			"regionSlug" => 'northumberland',
			"weight" => 1,
			"cities" => array(
				"Alnwick", "Newcastle-upon-Tyne", "Morpeth", "Hexham", "Berwick-upon-Tweed"
			)
		),
		array(
			"regionName" => 'Norfolk',
			"regionShort" => 'NF',
			"regionSlug" => 'norfolk',
			"weight" => 1,
			"cities" => array(
				"Norwich", "Great Yarmouth", "King's Lynn", "Dereham", "Cromer", "Hunstanton"
			)
		),
		array(
			"regionName" => 'Northamptonshire',
			"regionShort" => 'NT',
			"regionSlug" => 'northamptonshire',
			"weight" => 1,
			"cities" => array(
				"Northampton", "Peterborough", "Corby", "Kettering", "Wellingborough"
			)
		),
		array(
			"regionName" => 'Nottinghamshire',
			"regionShort" => 'NT',
			"regionSlug" => 'nottinghamshire',
			"weight" => 1,
			"cities" => array(
				"Nottingham", "Mansfield", "Worksop", "Newark", "Retford", "Southwell"
			)
		),
		array(
			"regionName" => 'Orkney',
			"regionShort" => 'OK',
			"regionSlug" => 'orkney',
			"weight" => 1,
			"cities" => array(
				"Kirkwall", "Sromness", "Balfour"
			)
		),
		array(
			"regionName" => 'Oxfordshire',
			"regionShort" => 'OX',
			"regionSlug" => 'oxfordshire',
			"weight" => 1,
			"cities" => array(
				"Oxford", "Banbury", "Witney", "Bicester", "Henley-on-Thames", "Carterton", "Thame", "Bloxham"
			)
		),
		array(
			"regionName" => 'Pembrokeshire',
			"regionShort" => 'PE',
			"regionSlug" => 'pembrokeshire',
			"weight" => 1,
			"cities" => array(
				"Pembroke", "Milford Haven", "Haverfordwest", "Fishguard", "Tenby", "St. David's"
			)
		),
		array(
			"regionName" => 'Radnorshire',
			"regionShort" => 'RA',
			"regionSlug" => 'radnorshire',
			"weight" => 1,
			"cities" => array(
				"Presteigne", "Llandrindod Wells", "Knighton", "Rhayader", "New Radnor"
			)
		),
		array(
			"regionName" => 'Renfrewshire',
			"regionShort" => 'RF',
			"regionSlug" => 'renfrewshire',
			"weight" => 1,
			"cities" => array(
				"Renfrew", "Paisley", "Greenock", "Johnstone", "Port Glasgow", "Barrhead", "Kilmalcolm"
			)
		),
		array(
			"regionName" => 'Roxburghshire',
			"regionShort" => 'RO',
			"regionSlug" => 'roxburghshire',
			"weight" => 1,
			"cities" => array(
				"Jedburgh", "Hawick", "Kelso", "Melrose", "Roxburgh"
			)
		),
		array(
			"regionName" => 'Rutland',
			"regionShort" => 'RU',
			"regionSlug" => 'rutland',
			"weight" => 1,
			"cities" => array(
				"Oakham", "Uppingham. Cottesmore"
			)
		),
		array(
			"regionName" => 'Shropshire',
			"regionShort" => 'SA',
			"regionSlug" => 'shropshire',
			"weight" => 1,
			"cities" => array(
				"Shrewsbury", "Telford", "Oswestry", "Bridgnorth", "Whitchurch", "Market Drayton", "Ludlow"
			)
		),
		array(
			"regionName" => 'Selkirkshire',
			"regionShort" => 'SE',
			"regionSlug" => 'selkirkshire',
			"weight" => 1,
			"cities" => array(
				"Selkirk", "Clovenfords", "Galashiels"
			)
		),
		array(
			"regionName" => 'Suffolk',
			"regionShort" => 'SF',
			"regionSlug" => 'suffolk',
			"weight" => 1,
			"cities" => array(
				"Ipswich", "Bury St. Edmunds", "Lowestoft", "Felixstowe", "Sudbury", "Haverhill", "Bungay"
			)
		),
		array(
			"regionName" => 'Shetland',
			"regionShort" => 'SH',
			"regionSlug" => 'shetland',
			"weight" => 1,
			"cities" => array(
				"Lerwick", "Scalloway", "Baltasound"
			)
		),
		array(
			"regionName" => 'Somerset',
			"regionShort" => 'SO',
			"regionSlug" => 'somerset',
			"weight" => 1,
			"cities" => array(
				"Taunton", "Bath", "Weston-super-Mare", "Yeovil", "Bridgwater", "Wells", "Glastonbury"
			)
		),
		array(
			"regionName" => 'Surrey',
			"regionShort" => 'SR',
			"regionSlug" => 'surrey',
			"weight" => 1,
			"cities" => array(
				"Guildford", "Croydon", "Woking", "Sutton", "Kingston-on-Thames", "Wandsworth", "Wimbledon", "Brixton"
			)
		),
		array(
			"regionName" => 'Sussex',
			"regionShort" => 'SS',
			"regionSlug" => 'sussex',
			"weight" => 1,
			"cities" => array(
				"Chichester", "Brighton", "Worthing", "Crawley", "Hastings", "Eastbourne", "Bognor Regis", "Horsham"
			)
		),
		array(
			"regionName" => 'Stirlingshire',
			"regionShort" => 'ST',
			"regionSlug" => 'stirlingshire',
			"weight" => 1,
			"cities" => array(
				"Stirling", "Falkirk", "Grangemouth", "Kilsyth", "Bridge of Allan", "Denny", "Alva"
			)
		),
		array(
			"regionName" => 'Staffordshire',
			"regionShort" => 'ST',
			"regionSlug" => 'staffordshire',
			"weight" => 1,
			"cities" => array(
				"Stafford", "Stoke-on-Trent", "Wolverhampton", "Walsall", "Cannock", "Lichfield"
			)
		),
		array(
			"regionName" => 'Sutherland',
			"regionShort" => 'SU',
			"regionSlug" => 'sutherland',
			"weight" => 1,
			"cities" => array(
				"Dornoch", "Helmsdale", "Brora", "Golspie", "Lairg", "Durness", "Tongue"
			)
		),
		array(
			"regionName" => 'Warwickshire',
			"regionShort" => 'WA',
			"regionSlug" => 'warwickshire',
			"weight" => 1,
			"cities" => array(
				"Warwick", "Birmingham", "Coventry", "Nuneaton", "Rugby", "Solihull", "Stratford-upon-Avon"
			)
		),
		array(
			"regionName" => 'Westmorland',
			"regionShort" => 'WE',
			"regionSlug" => 'westmorland',
			"weight" => 1,
			"cities" => array(
				"Appleby", "Kendal", "Windermere", "Ambleside", "Kirkby Lonsdale"
			)
		),
		array(
			"regionName" => 'Wigtownshire',
			"regionShort" => 'WI',
			"regionSlug" => 'wigtownshire',
			"weight" => 1,
			"cities" => array(
				"Wigtown", "Stranraer", "Newton Stewart", "Whithorn"
			)
		),
		array(
			"regionName" => 'Wiltshire',
			"regionShort" => 'WI',
			"regionSlug" => 'wiltshire',
			"weight" => 1,
			"cities" => array(
				"Trowbridge", "Salisbury", "Swindon", "Chippenham", "Devizes", "Marlborough", "Warminster"
			)
		),
		array(
			"regionName" => 'West Lothian',
			"regionShort" => 'WL',
			"regionSlug" => 'west_lothian',
			"weight" => 1,
			"cities" => array(
				"Linlithgow", "Livingston", "Bo'ness", "Broxburn", "Whitburn", "Armadale", "Bathgate"
			)
		),
		array(
			"regionName" => 'Worcestershire',
			"regionShort" => 'WO',
			"regionSlug" => 'worcestershire',
			"weight" => 1,
			"cities" => array(
				"Worcester", "Dudley", "Kidderminster", "Stourbridge", "Halesowen", "Malvern", "Evesham"
			)
		),
		array(
			"regionName" => 'Yorkshire',
			"regionShort" => 'YK',
			"regionSlug" => 'yorkshire',
			"weight" => 1,
			"cities" => array(
				"Northallerton", "Middlesbrough", "Scarborough", "Whitby", "Beverley", "Hull", "Bridlington",
				"Driffield", "Hornsea", "Filey", "Wakefield", "Leeds", "Sheffield", "Bradford", "Halifax",
				"Harrogate", "York"
			)
		),
		array(
			"regionName" => 'Durham',
			"regionShort" => 'DU',
			"regionSlug" => 'durham',
			"weight" => 1,
			"cities" => array(
				"Durham", "Sunderland", "Stockton-on-Tees", "Darlington", "Hartlepool", "Gateshead", "Washington"
			)
		),
		array(
			"regionName" => 'Brecknockshire',
			"regionShort" => 'BR',
			"regionSlug" => 'brecknockshire',
			"weight" => 1,
			"cities" => array(
				"Brecon", "Builth Wells", "Hay-on-Wye", "Talgarth", "Llanwrtwd Wells"
			)
		),
		array(
			"regionName" => 'Buteshire',
			"regionShort" => 'BU',
			"regionSlug" => 'buteshire',
			"weight" => 1,
			"cities" => array(
				"Rothesay", "Millport", "Brodick", "Lochranza"
			)
		),
		array(
			"regionName" => 'Dumfriesshire',
			"regionShort" => 'DF',
			"regionSlug" => 'dumfriesshire',
			"weight" => 1,
			"cities" => array(
				"Dumfries", "Annan", "Lockerbie", "Moffat", "Sanquhar", "Langholm", "Gretna"
			)
		),
		array(
			"regionName" => 'Nairnshire',
			"regionShort" => 'NA',
			"regionSlug" => 'nairnshire',
			"weight" => 1,
			"cities" => array(
				"Nairn", "Auldearn", "Cawdor", "Ferness"
			)
		),
		array(
			"regionName" => 'Perthshire',
			"regionShort" => 'PE',
			"regionSlug" => 'perthshire',
			"weight" => 1,
			"cities" => array(
				"Perth", "Crieff", "Pitlochry", "Callander", "Blairgowrie", "Rattray", "Coupar Angus", "Kincardine"
			)
		),
		array(
			"regionName" => 'Ross-shire',
			"regionShort" => 'RO',
			"regionSlug" => 'ross_shire',
			"weight" => 1,
			"cities" => array(
				"Dingwall", "Stornaway", "Tain", "Alness", "Invergordon"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}

