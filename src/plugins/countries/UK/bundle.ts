import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'united_kingdom',
	regionNames: i18n.regionNames,
	continent: 'europe',

	extendedData: {
		zipFormat: {
			format: 'Lx xLL|Lxx xLL|LxL xLL|LLx xLL|LLxx xLL|LLxL xLL'
		},
		phoneFormat: {
			displayFormats: [
				'0xxxx xxxxxx'
			]
		}
	},
	regions: [
		{
			regionName: 'Aberdeenshire',
			regionShort: 'AB',
			regionSlug: 'aberdeenshire',
			weight: 1,
			cities: [
				'Aberdeen', 'Peterhead', 'Fraserburgh', 'Inverurie', 'Huntley', 'Ellon', 'Turriff'
			]
		},
		{
			regionName: 'Anglesey',
			regionShort: 'AG',
			regionSlug: 'anglesey',
			weight: 1,
			cities: [
				'Beaumaris', 'Holyhead', 'Llangefni', 'Amlwch', 'Menai Bridge'
			]
		},
		{
			regionName: 'Angus',
			regionShort: 'AN',
			regionSlug: 'angus',
			weight: 1,
			cities: [
				'Forfar', 'Dundee', 'Arbroath', 'Brechin', 'Montrose', 'Carnoustie', 'Kirriemuir'
			]
		},
		{
			regionName: 'Argyllshire',
			regionShort: 'AR',
			regionSlug: 'argyllshire',
			weight: 1,
			cities: [
				'Inveraray', 'Oban', 'Dunoon', 'Campbeltown', 'Lochgilphead', 'Tobermory'
			]
		},
		{
			regionName: 'Ayrshire',
			regionShort: 'AY',
			regionSlug: 'ayrshire',
			weight: 1,
			cities: [
				'Ayr', 'Kilmarnock', 'Irvine', 'Saltcoats', 'Kilwinning', 'Largs', 'Troon', 'Cumnock'
			]
		},
		{
			regionName: 'Banffshire',
			regionShort: 'BA',
			regionSlug: 'banffshire',
			weight: 1,
			cities: [
				'Banff', 'Buckie', 'Keith', 'Macduff', 'Portsoy', 'Dufftown'
			]
		},
		{
			regionName: 'Bedfordshire',
			regionShort: 'BD',
			regionSlug: 'bedfordshire',
			weight: 1,
			cities: [
				'Bedford', 'Luton', 'Dunstable', 'Leighton Buzzard', 'Biggleswade', 'Sandy'
			]
		},
		{
			regionName: 'Berwickshire',
			regionShort: 'BE',
			regionSlug: 'berwickshire',
			weight: 1,
			cities: [
				'Greenlaw', 'Duns', 'Eyemouth', 'Lauder', 'Coldstream'
			]
		},
		{
			regionName: 'Buckinghamshire',
			regionShort: 'BK',
			regionSlug: 'buckinghamshire',
			weight: 1,
			cities: [
				'Aylesbury', 'Milton Keynes', 'Slough', 'Buckingham', 'High Wycombe'
			]
		},
		{
			regionName: 'Berkshire',
			regionShort: 'BR',
			regionSlug: 'berkshire',
			weight: 1,
			cities: [
				'Reading', 'Bracknell', 'Maidenhead', 'Newbury', 'Windsor', 'Wokingham', 'Abingdon'
			]
		},
		{
			regionName: 'Caithness',
			regionShort: 'CA',
			regionSlug: 'caithness',
			weight: 1,
			cities: [
				'Wick', 'Thurso', 'Halkirk', 'Castletown'
			]
		},
		{
			regionName: 'Cambridgeshire',
			regionShort: 'CA',
			regionSlug: 'cambridgeshire',
			weight: 1,
			cities: [
				'Cambridge', 'Wisbech', 'Ely', 'March', 'Whittlesey', 'Chatteris', 'Linton'
			]
		},
		{
			regionName: 'Cardiganshire',
			regionShort: 'CG',
			regionSlug: 'cardiganshire',
			weight: 1,
			cities: [
				'Cardigan', 'Aberystwyth', 'Lampeter', 'New Quay', 'Tregaron'
			]
		},
		{
			regionName: 'Cheshire',
			regionShort: 'CH',
			regionSlug: 'cheshire',
			weight: 1,
			cities: [
				'Chester', 'Stockport', 'Ellesmere Port', 'Birkenhead', 'Wallasey', 'Runcorn', 'Macclesfield', 'Crewe'
			]
		},
		{
			regionName: 'Clackmannanshire',
			regionShort: 'CL',
			regionSlug: 'clackmannanshire',
			weight: 1,
			cities: [
				'Clackmannan', 'Alloa', 'Tillicoultry', 'Tullibody'
			]
		},
		{
			regionName: 'Carmarthenshire',
			regionShort: 'CM',
			regionSlug: 'carmarthenshire',
			weight: 1,
			cities: [
				'Carmarthen', 'Llanelli', 'Ammanford', 'Llandovery', 'Kidwelly', 'St. Clears'
			]
		},
		{
			regionName: 'Cornwall',
			regionShort: 'CO',
			regionSlug: 'cornwall',
			weight: 1,
			cities: [
				'Bodmin', 'Truro', 'Camborne', 'Redruth', 'St. Austell', 'Falmouth', 'Penzance', 'Newquay'
			]
		},
		{
			regionName: 'Cumberland',
			regionShort: 'CU',
			regionSlug: 'cumberland',
			weight: 1,
			cities: [
				'Carlisle', 'Whitehaven', 'Workington', 'Penrith', 'Keswick', 'Brampton'
			]
		},
		{
			regionName: 'Derbyshire',
			regionShort: 'DB',
			regionSlug: 'derbyshire',
			weight: 1,
			cities: [
				'Derby', 'Chesterfield', 'Glossop', 'Ilkeston', 'Long Eaton', 'Swadlincote', 'Buxton', 'Matlock', 'Ashbourne'
			]
		},
		{
			regionName: 'Denbighshire',
			regionShort: 'DE',
			regionSlug: 'denbighshire',
			weight: 1,
			cities: [
				'Denbigh', 'Wrexham', 'Ruthin', 'Abergele', 'Llangollen'
			]
		},
		{
			regionName: 'Devon',
			regionShort: 'DE',
			regionSlug: 'devon',
			weight: 1,
			cities: [
				'Exeter', 'Plymouth', 'Torquay', 'Paignton', 'Barnstaple', 'Tiverton', 'Newton Abbot', 'Tavistock'
			]
		},
		{
			regionName: 'Dunbartonshire',
			regionShort: 'DN',
			regionSlug: 'dunbartonshire',
			weight: 1,
			cities: [
				'Dumbarton', 'Clydebank', 'Cumbernauld', 'Helensburgh', 'Alexandria', 'Kirkintilloch'
			]
		},
		{
			regionName: 'Dorset',
			regionShort: 'DO',
			regionSlug: 'dorset',
			weight: 1,
			cities: [
				'Dorchester', 'Poole', 'Weymouth', 'Sherborne', 'Wimborne Minster', 'Shaftesbury'
			]
		},
		{
			regionName: 'East Lothian',
			regionShort: 'EL',
			regionSlug: 'east_lothian',
			weight: 1,
			cities: [
				'Haddington', 'North Berwick', 'Dunbar', 'Tranent', 'East Linton'
			]
		},
		{
			regionName: 'Essex',
			regionShort: 'ES',
			regionSlug: 'essex',
			weight: 1,
			cities: [
				'Chelmsford', 'Basildon', 'Romford', 'Southend', 'Colchester', 'Harlow', 'Brentwood', 'West Ham'
			]
		},
		{
			regionName: 'Fife',
			regionShort: 'FI',
			regionSlug: 'fife',
			weight: 1,
			cities: [
				'Cupar', 'Dunfermline', 'Glenrothes', 'Kirkcaldy', 'St. Andrews', 'Cowdenbeath', 'Burntisland'
			]
		},
		{
			regionName: 'Flintshire',
			regionShort: 'FL',
			regionSlug: 'flintshire',
			weight: 1,
			cities: [
				'Mold', 'Flint', 'Rhyl', 'Prestatyn', 'Connah\'s Quay', 'Holywell', 'Buckley', 'St. Asaph'
			]
		},
		{
			regionName: 'Glamorgan',
			regionShort: 'GL',
			regionSlug: 'glamorgan',
			weight: 1,
			cities: [
				'Cardiff', 'Swansea', 'Merthyr Tydfil', 'Barry', 'Caerphilly', 'Bridgend', 'Neath', 'Pontypridd'
			]
		},
		{
			regionName: 'Gloucestershire',
			regionShort: 'GL',
			regionSlug: 'gloucestershire',
			weight: 1,
			cities: [
				'Gloucester', 'Bristol', 'Cheltenham', 'Stroud', 'Cirencester', 'Tewkesbury'
			]
		},
		{
			regionName: 'Hampshire',
			regionShort: 'HA',
			regionSlug: 'hampshire',
			weight: 1,
			cities: [
				'Winchester', 'Southampton', 'Portsmouth', 'Bournemouth', 'Basingstoke', 'Newport'
			]
		},
		{
			regionName: 'Herefordshire',
			regionShort: 'HE',
			regionSlug: 'herefordshire',
			weight: 1,
			cities: [
				'Hereford', 'Ross-on-Wye', 'Leominster', 'Ledbury', 'Bromyard', 'Kington'
			]
		},
		{
			regionName: 'Hertfordshire',
			regionShort: 'HR',
			regionSlug: 'hertfordshire',
			weight: 1,
			cities: [
				'Hertford', 'Watford', 'St. Albans', 'Hemel Hempstead', 'Stevenage', 'Hatfield'
			]
		},
		{
			regionName: 'Huntingdonshire',
			regionShort: 'HU',
			regionSlug: 'huntingdonshire',
			weight: 1,
			cities: [
				'Huntingdon', 'St. Ives', 'St. Neots', 'Ramsey', 'Yaxley'
			]
		},
		{
			regionName: 'Inverness-shire',
			regionShort: 'IN',
			regionSlug: 'inverness_shire',
			weight: 1,
			cities: [
				'Inverness', 'Fort William', 'Kingussie', 'Newtonmore', 'Portree'
			]
		},
		{
			regionName: 'Kincardineshire',
			regionShort: 'KC',
			regionSlug: 'kincardineshire',
			weight: 1,
			cities: [
				'Stonehaven', 'Banchory', 'Laurencekirk', 'Inverbervie'
			]
		},
		{
			regionName: 'Kent',
			regionShort: 'KE',
			regionSlug: 'kent',
			weight: 1,
			cities: [
				'Maidstone', 'Canterbury', 'Bromley', 'Rochester', 'Margate', 'Folkestone', 'Dover', 'Greenwich'
			]
		},
		{
			regionName: 'Kirkcudbrightshire',
			regionShort: 'KK',
			regionSlug: 'kirkcudbrightshire',
			weight: 1,
			cities: [
				'Kircudbright', 'Castle Douglas', 'Dalbeattie', 'New Galloway'
			]
		},
		{
			regionName: 'Kinross-shire',
			regionShort: 'KR',
			regionSlug: 'kinross_shire',
			weight: 1,
			cities: [
				'Kinross', 'Milnathort'
			]
		},
		{
			regionName: 'Lancashire',
			regionShort: 'LA',
			regionSlug: 'lancashire',
			weight: 1,
			cities: [
				'Lancaster', 'Liverpool', 'Manchester', 'Preston', 'Bolton', 'Warrington', 'Barrow-in-Furness'
			]
		},
		{
			regionName: 'Leicestershire',
			regionShort: 'LE',
			regionSlug: 'leicestershire',
			weight: 1,
			cities: [
				'Leicester', 'Loughborough', 'Hinckley', 'Melton Mowbray', 'Coalville', 'Lutterworth'
			]
		},
		{
			regionName: 'Lincolnshire',
			regionShort: 'LI',
			regionSlug: 'lincolnshire',
			weight: 1,
			cities: [
				'Lincoln', 'Grimsby', 'Scunthorpe', 'Boston', 'Grantham', 'Stamford', 'Skegness', 'Louth'
			]
		},
		{
			regionName: 'Lanarkshire',
			regionShort: 'LK',
			regionSlug: 'lanarkshire',
			weight: 1,
			cities: [
				'Lanark', 'Glasgow', 'East Kilbride', 'Hamilton', 'Motherwell', 'Coatbridge', 'Carluke'
			]
		},
		{
			regionName: 'Merionethshire',
			regionShort: 'ME',
			regionSlug: 'merionethshire',
			weight: 1,
			cities: [
				'Dolgellau', 'Bala', 'Tywyn', 'Blaenau Ffestiniog', 'Barmouth', 'Harlech'
			]
		},
		{
			regionName: 'Montgomeryshire',
			regionShort: 'MG',
			regionSlug: 'montgomeryshire',
			weight: 1,
			cities: [
				'Montgomery', 'Newtown', 'Welshpool', 'Machynlleth', 'Llanidloes'
			]
		},
		{
			regionName: 'Midlothian',
			regionShort: 'ML',
			regionSlug: 'midlothian',
			weight: 1,
			cities: [
				'Edinburgh', 'Musselburgh', 'Penicuik', 'Dalkeith', 'Bonnyrigg'
			]
		},
		{
			regionName: 'Monmouthshire',
			regionShort: 'MO',
			regionSlug: 'monmouthshire',
			weight: 1,
			cities: [
				'Monmouth', 'Newport', 'Blackwood', 'Cwmbran', 'Abergavenny', 'Chepstow', 'Tredegar'
			]
		},
		{
			regionName: 'Morayshire',
			regionShort: 'MO',
			regionSlug: 'morayshire',
			weight: 1,
			cities: [
				'Elgin', 'Forres', 'Rothes', 'Lossiemouth', 'Fochabers'
			]
		},
		{
			regionName: 'Northumberland',
			regionShort: 'NB',
			regionSlug: 'northumberland',
			weight: 1,
			cities: [
				'Alnwick', 'Newcastle-upon-Tyne', 'Morpeth', 'Hexham', 'Berwick-upon-Tweed'
			]
		},
		{
			regionName: 'Norfolk',
			regionShort: 'NF',
			regionSlug: 'norfolk',
			weight: 1,
			cities: [
				'Norwich', 'Great Yarmouth', 'King\'s Lynn', 'Dereham', 'Cromer', 'Hunstanton'
			]
		},
		{
			regionName: 'Northamptonshire',
			regionShort: 'NT',
			regionSlug: 'northamptonshire',
			weight: 1,
			cities: [
				'Northampton', 'Peterborough', 'Corby', 'Kettering', 'Wellingborough'
			]
		},
		{
			regionName: 'Nottinghamshire',
			regionShort: 'NT',
			regionSlug: 'nottinghamshire',
			weight: 1,
			cities: [
				'Nottingham', 'Mansfield', 'Worksop', 'Newark', 'Retford', 'Southwell'
			]
		},
		{
			regionName: 'Orkney',
			regionShort: 'OK',
			regionSlug: 'orkney',
			weight: 1,
			cities: [
				'Kirkwall', 'Sromness', 'Balfour'
			]
		},
		{
			regionName: 'Oxfordshire',
			regionShort: 'OX',
			regionSlug: 'oxfordshire',
			weight: 1,
			cities: [
				'Oxford', 'Banbury', 'Witney', 'Bicester', 'Henley-on-Thames', 'Carterton', 'Thame', 'Bloxham'
			]
		},
		{
			regionName: 'Pembrokeshire',
			regionShort: 'PE',
			regionSlug: 'pembrokeshire',
			weight: 1,
			cities: [
				'Pembroke', 'Milford Haven', 'Haverfordwest', 'Fishguard', 'Tenby', 'St. David\'s'
			]
		},
		{
			regionName: 'Radnorshire',
			regionShort: 'RA',
			regionSlug: 'radnorshire',
			weight: 1,
			cities: [
				'Presteigne', 'Llandrindod Wells', 'Knighton', 'Rhayader', 'New Radnor'
			]
		},
		{
			regionName: 'Renfrewshire',
			regionShort: 'RF',
			regionSlug: 'renfrewshire',
			weight: 1,
			cities: [
				'Renfrew', 'Paisley', 'Greenock', 'Johnstone', 'Port Glasgow', 'Barrhead', 'Kilmalcolm'
			]
		},
		{
			regionName: 'Roxburghshire',
			regionShort: 'RO',
			regionSlug: 'roxburghshire',
			weight: 1,
			cities: [
				'Jedburgh', 'Hawick', 'Kelso', 'Melrose', 'Roxburgh'
			]
		},
		{
			regionName: 'Rutland',
			regionShort: 'RU',
			regionSlug: 'rutland',
			weight: 1,
			cities: [
				'Oakham', 'Uppingham. Cottesmore'
			]
		},
		{
			regionName: 'Shropshire',
			regionShort: 'SA',
			regionSlug: 'shropshire',
			weight: 1,
			cities: [
				'Shrewsbury', 'Telford', 'Oswestry', 'Bridgnorth', 'Whitchurch', 'Market Drayton', 'Ludlow'
			]
		},
		{
			regionName: 'Selkirkshire',
			regionShort: 'SE',
			regionSlug: 'selkirkshire',
			weight: 1,
			cities: [
				'Selkirk', 'Clovenfords', 'Galashiels'
			]
		},
		{
			regionName: 'Suffolk',
			regionShort: 'SF',
			regionSlug: 'suffolk',
			weight: 1,
			cities: [
				'Ipswich', 'Bury St. Edmunds', 'Lowestoft', 'Felixstowe', 'Sudbury', 'Haverhill', 'Bungay'
			]
		},
		{
			regionName: 'Shetland',
			regionShort: 'SH',
			regionSlug: 'shetland',
			weight: 1,
			cities: [
				'Lerwick', 'Scalloway', 'Baltasound'
			]
		},
		{
			regionName: 'Somerset',
			regionShort: 'SO',
			regionSlug: 'somerset',
			weight: 1,
			cities: [
				'Taunton', 'Bath', 'Weston-super-Mare', 'Yeovil', 'Bridgwater', 'Wells', 'Glastonbury'
			]
		},
		{
			regionName: 'Surrey',
			regionShort: 'SR',
			regionSlug: 'surrey',
			weight: 1,
			cities: [
				'Guildford', 'Croydon', 'Woking', 'Sutton', 'Kingston-on-Thames', 'Wandsworth', 'Wimbledon', 'Brixton'
			]
		},
		{
			regionName: 'Sussex',
			regionShort: 'SS',
			regionSlug: 'sussex',
			weight: 1,
			cities: [
				'Chichester', 'Brighton', 'Worthing', 'Crawley', 'Hastings', 'Eastbourne', 'Bognor Regis', 'Horsham'
			]
		},
		{
			regionName: 'Stirlingshire',
			regionShort: 'ST',
			regionSlug: 'stirlingshire',
			weight: 1,
			cities: [
				'Stirling', 'Falkirk', 'Grangemouth', 'Kilsyth', 'Bridge of Allan', 'Denny', 'Alva'
			]
		},
		{
			regionName: 'Staffordshire',
			regionShort: 'ST',
			regionSlug: 'staffordshire',
			weight: 1,
			cities: [
				'Stafford', 'Stoke-on-Trent', 'Wolverhampton', 'Walsall', 'Cannock', 'Lichfield'
			]
		},
		{
			regionName: 'Sutherland',
			regionShort: 'SU',
			regionSlug: 'sutherland',
			weight: 1,
			cities: [
				'Dornoch', 'Helmsdale', 'Brora', 'Golspie', 'Lairg', 'Durness', 'Tongue'
			]
		},
		{
			regionName: 'Warwickshire',
			regionShort: 'WA',
			regionSlug: 'warwickshire',
			weight: 1,
			cities: [
				'Warwick', 'Birmingham', 'Coventry', 'Nuneaton', 'Rugby', 'Solihull', 'Stratford-upon-Avon'
			]
		},
		{
			regionName: 'Westmorland',
			regionShort: 'WE',
			regionSlug: 'westmorland',
			weight: 1,
			cities: [
				'Appleby', 'Kendal', 'Windermere', 'Ambleside', 'Kirkby Lonsdale'
			]
		},
		{
			regionName: 'Wigtownshire',
			regionShort: 'WI',
			regionSlug: 'wigtownshire',
			weight: 1,
			cities: [
				'Wigtown', 'Stranraer', 'Newton Stewart', 'Whithorn'
			]
		},
		{
			regionName: 'Wiltshire',
			regionShort: 'WI',
			regionSlug: 'wiltshire',
			weight: 1,
			cities: [
				'Trowbridge', 'Salisbury', 'Swindon', 'Chippenham', 'Devizes', 'Marlborough', 'Warminster'
			]
		},
		{
			regionName: 'West Lothian',
			regionShort: 'WL',
			regionSlug: 'west_lothian',
			weight: 1,
			cities: [
				'Linlithgow', 'Livingston', 'Bo\'ness', 'Broxburn', 'Whitburn', 'Armadale', 'Bathgate'
			]
		},
		{
			regionName: 'Worcestershire',
			regionShort: 'WO',
			regionSlug: 'worcestershire',
			weight: 1,
			cities: [
				'Worcester', 'Dudley', 'Kidderminster', 'Stourbridge', 'Halesowen', 'Malvern', 'Evesham'
			]
		},
		{
			regionName: 'Yorkshire',
			regionShort: 'YK',
			regionSlug: 'yorkshire',
			weight: 1,
			cities: [
				'Northallerton', 'Middlesbrough', 'Scarborough', 'Whitby', 'Beverley', 'Hull', 'Bridlington',
				'Driffield', 'Hornsea', 'Filey', 'Wakefield', 'Leeds', 'Sheffield', 'Bradford', 'Halifax',
				'Harrogate', 'York'
			]
		},
		{
			regionName: 'Durham',
			regionShort: 'DU',
			regionSlug: 'durham',
			weight: 1,
			cities: [
				'Durham', 'Sunderland', 'Stockton-on-Tees', 'Darlington', 'Hartlepool', 'Gateshead', 'Washington'
			]
		},
		{
			regionName: 'Brecknockshire',
			regionShort: 'BR',
			regionSlug: 'brecknockshire',
			weight: 1,
			cities: [
				'Brecon', 'Builth Wells', 'Hay-on-Wye', 'Talgarth', 'Llanwrtwd Wells'
			]
		},
		{
			regionName: 'Buteshire',
			regionShort: 'BU',
			regionSlug: 'buteshire',
			weight: 1,
			cities: [
				'Rothesay', 'Millport', 'Brodick', 'Lochranza'
			]
		},
		{
			regionName: 'Dumfriesshire',
			regionShort: 'DF',
			regionSlug: 'dumfriesshire',
			weight: 1,
			cities: [
				'Dumfries', 'Annan', 'Lockerbie', 'Moffat', 'Sanquhar', 'Langholm', 'Gretna'
			]
		},
		{
			regionName: 'Nairnshire',
			regionShort: 'NA',
			regionSlug: 'nairnshire',
			weight: 1,
			cities: [
				'Nairn', 'Auldearn', 'Cawdor', 'Ferness'
			]
		},
		{
			regionName: 'Perthshire',
			regionShort: 'PE',
			regionSlug: 'perthshire',
			weight: 1,
			cities: [
				'Perth', 'Crieff', 'Pitlochry', 'Callander', 'Blairgowrie', 'Rattray', 'Coupar Angus', 'Kincardine'
			]
		},
		{
			regionName: 'Ross-shire',
			regionShort: 'RO',
			regionSlug: 'ross_shire',
			weight: 1,
			cities: [
				'Dingwall', 'Stornaway', 'Tain', 'Alness', 'Invergordon'
			]
		}
	]
});
