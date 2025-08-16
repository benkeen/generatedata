/**
 * @package Countries
 */
import { GetCountryData } from '@generatedata/types';

const Italy: GetCountryData = (i18n) => ({
  countryName: i18n.countryName,
  countrySlug: 'italy',
  regionNames: i18n.regionNames,
  continent: 'europe',
  extendedData: {
    zipFormat: {
      format: 'xxxxx'
    }
  },
  regions: [
    {
      regionName: 'Piemonte',
      regionShort: 'PIE',
      regionSlug: 'piemonte',
      weight: 7,
      cities: ['Alessandria', 'Asti', 'Barbania', 'Bonvicino', 'Borghetto di Borbera', 'Borgomasino', 'Borgone Susa', 'Borriana', 'Caprauna', 'Casanova Elvo', 'Cassano Spinola', 'Coassolo Torinese', 'Colleretto Castelnuovo', 'Crescentino', 'Cressa', 'Cuceglio', 'Ferrere', 'Ghislarengo', 'Marentino', 'Massello', 'Melazzo', 'Meugliano', 'Molino dei Torti', 'Mombaruzzo', 'Moncrivello', 'Montacuto', 'Montaldo Bormida', 'Monteu Roero', 'Olcenengo', 'Olivola', 'Orta San Giulio', 'Ponti', 'Premeno', 'Priero', 'Quarona', "Rocca d'Arazzo", 'Roccabruna', 'Rueglio', 'San Maurizio Canavese', "Serralunga d'Alba", 'Sommariva Perno', 'Strona', 'Torino', 'Valmacca', 'Vauda Canavese', 'Vespolate', 'Villafalletto', "Villafranca d'Asti", 'Villar Pellice', 'Villata']
    },

    {
      regionName: "Valle d'Aosta",
      regionShort: 'VDA',
      regionSlug: 'valledaosta',
      weight: 1,
      cities: ['Allein', 'Antey-Saint-Andrè', 'Aosta', 'Arvier', 'Avise', 'Ayas', 'Bard', 'Bionaz', 'Brusson', 'Challand-Saint-Victor', 'Chambave', 'Champorcher', 'Chatillon', 'Donnas', 'Doues', 'Emarèse', 'Etroubles', 'Gignod', 'Gressan', 'Gressoney-La-Trinitè', 'Gressoney-Saint-Jean', 'Introd', 'Issime', 'La Magdeleine', 'La Salle', 'La Thuile', 'Lillianes', 'Montjovet', 'Morgex', 'Nus', 'Oyace', 'Pollein', 'Pont-Saint-Martin', 'Pontboset', 'Pontey', 'Prè-Saint-Didier', 'Rhemes-Notre-Dame', 'Rhemes-Saint-Georges', 'Saint-Denis', 'Saint-Marcel', 'Saint-Nicolas', 'Saint-Oyen', 'Saint-Pierre', 'Saint-Rhémy-en-Bosses', 'Sarre', 'Torgnon', 'Valpelline', 'Valtournenche', 'Verrayes', 'Verrès']
    },

    {
      regionName: 'Lombardia',
      regionShort: 'LOM',
      regionSlug: 'lombardia',
      weight: 16,
      cities: ['Acquafredda', 'Annone di Brianza', 'Asso', 'Barghe', 'Blevio', 'Borno', 'Brescia', 'Calco', 'Cambiago', 'Caprino Bergamasco', 'Casnate con Bernate', "Castello dell'Acqua", 'Castelmarte', 'Castelseprio', 'Chiari', 'Cisano Bergamasco', 'Civo', 'Colico', 'Corvino San Quirico', "Crotta d'Adda", 'Fino Mornasco', 'Galbiate', 'Gambolò', 'Gavirate', 'Gianico', 'Lasnigo', 'Lenna', 'Luino', 'Mantova', 'Malgesso', 'Milano', 'Motta Visconti', 'Ospedaletto Lodigiano', 'Pagazzano', 'Pavone del Mella', 'Pero', 'Pogliano Milanese', 'Polpenazze del Garda', 'Rea', 'Ripalta Guerina', 'Rudiano', 'Salvirola', 'San Damiano al Colle', 'Sannazzaro de Burgondi', 'Somma Lombardo', 'Sulzano', 'Torno', 'Val Rezzo', 'Valera Fratta', 'Villa Cortese']
    },

    {
      regionName: 'Trentino-Alto Adige',
      regionShort: 'TAA',
      regionSlug: 'trentinoaltoadige',
      weight: 2,
      cities: ['Albiano', 'Andalo', 'Bedollo', 'Bolzano/Bozen', 'Bondo', 'Borgo Valsugana', 'Braies/Prags', 'Campitello di Fassa', 'Castello Tesino', 'Centa San Nicolò', 'Chiusa/Klausen', 'Cles', 'Curon Venosta/Graun im Vinschgau', 'Daiano', 'Dro', 'Gargazzone/Gargazon', 'Giustino', 'La Valle/Wengen', 'Laces/Latsch', 'Lagundo/Algund', 'Laives/Leifers', 'Lauregno/Laurein', 'Livo', 'Martello/Martell', 'Mezzana', 'Monguelfo-Tesido/Welsberg-Taisten', 'Panchià', 'Pellizzano', 'Pomarolo', 'Preore', 'Rabbi', 'Rodengo/Rodeneck', 'Rovereto', 'San Martino in Badia/St. Martin in Thurn', 'Sanzeno', 'Scena/Schenna', 'Sfruz', 'Spormaggiore', 'Terlago', 'Termeno sulla strada del vino/Tramin an der Weinstrasse', 'Terragnolo', 'Tiarno di Sopra', 'Tione di Trento', 'Trento', 'Valda', 'Vandoies/Vintl', 'Varena', 'Varna/Vahrn', 'Villa Agnedo', 'Ziano di Fiemme']
    },

    {
      regionName: 'Veneto',
      regionShort: 'VEN',
      regionSlug: 'veneto',
      weight: 8,
      cities: ['Adria', 'Arsiè', 'Asigliano Veneto', 'Bevilacqua', 'Bolzano Vicentino', 'Bussolengo', 'Camponogara', 'Castelbaldo', 'Castello di Godego', 'Cavaion Veronese', 'Cavaso del Tomba', 'Codognè', 'Feltre', 'Ficarolo', 'Follina', 'Galzignano Terme', 'Grezzana', 'Limena', 'Lozzo Atestino', 'Maser', 'Monfumo', 'Montebelluna', 'Oderzo', 'Pescantina', 'Pieve di Cadore', 'Piovene Rocchette', 'Polesella', 'Ponte San Nicolò', 'Ponte nelle Alpi', 'Portobuffolè', 'Posina', 'Pramaggiore', "Romano d'Ezzelino", 'San Gregorio nelle Alpi', 'San Pietro Mussolino', 'San Zenone degli Ezzelini', "Sant'Elena", "Sant'Urbano", 'Selva di Cadore', 'Solesino', 'Sorgà', 'Sossano', 'Soverzene', 'Sovizzo', 'Spresiano', 'Susegana', 'Tarzo', 'Tezze sul Brenta', 'Venezia', 'Verona']
    },

    {
      regionName: 'Friuli-Venezia Giulia',
      regionShort: 'FVG',
      regionSlug: 'friuliveneziagiulia',
      weight: 2,
      cities: ['Amaro', 'Attimis', 'Bertiolo', 'Bicinicco', 'Castelnovo del Friuli', 'Cavasso Nuovo', 'Cimolais', 'Clauzetto', 'Colloredo di Monte Albano', 'Comeglians', 'Dignano', 'Fogliano Redipuglia', 'Fontanafredda', 'Forgaria nel Friuli', 'Gonars', 'Grado', 'Latisana', 'Lauco', 'Lestizza', 'Ligosullo', 'Lusevera', 'Marano Lagunare', 'Medea', 'Meduno', 'Paularo', 'Polcenigo', 'Pordenone', 'Porpetto', 'Pozzuolo del Friuli', 'Pradamano', 'Prato Carnico', 'Precenicco', 'Ragogna', 'Reana del Rojale', 'Roveredo in Piano', 'Ruda', 'San Floriano del Collio', 'San Vito al Tagliamento', 'Sauris', 'Sesto al Reghena', 'Sgonico', 'Socchieve', 'Tarcento', 'Tarvisio', 'Tramonti di Sopra', 'Treppo Carnico', 'Trieste', 'Turriaco', 'Verzegnis', "Vito d'Asio"]
    },

    {
      regionName: 'Liguria',
      regionShort: 'LIG',
      regionSlug: 'liguria',
      weight: 3,
      cities: ['Alassio', 'Albisola Superiore', "Aquila d'Arroscia", 'Armo', 'Bajardo', 'Bargagli', 'Bergeggi', 'Bolano', 'Borghetto di Vara', 'Borgomaro', 'Cairo Montenotte', 'Calice al Cornoviglio', 'Campomorone', 'Castelbianco', 'Castelnuovo Magra', 'Castelvecchio di Rocca Barbena', 'Ceranesi', 'Chiavari', 'Chiusanico', 'Cicagna', 'Cisano sul Neva', 'Diano Arentino', 'Dolceacqua', 'Dolcedo', 'Erli', 'Fontanigorda', 'Genova', 'La Spezia', 'Masone', 'Massimino', 'Mignanego', 'Millesimo', 'Montoggio', 'Nasino', 'Ortonovo', 'Perinaldo', 'Portofino', 'Recco', 'Rezzoaglio', 'Savona', 'Seborga', 'Terzorio', 'Tribogna', 'Urbe', 'Valbrevenna', 'Vezzi Portio', 'Villa Faraldi', "Villanova d'Albenga", 'Zignago', 'Zuccarello']
    },

    {
      regionName: 'Emilia-Romagna',
      regionShort: 'ERM',
      regionSlug: 'emiliaromagna',
      weight: 7,
      cities: ['Baiso', 'Baricella', 'Bazzano', 'Berceto', 'Bologna', 'Calestano', 'Casina', 'Castel Guelfo di Bologna', 'Castel Maggiore', 'Codigoro', 'Collecchio', 'Colorno', 'Compiano', 'Conselice', 'Corte Brugnatella', 'Fontanellato', 'Forlì', 'Fusignano', 'Gaggio Montano', 'Gattatico', 'Jolanda di Savoia', 'Luzzara', 'Maranello', 'Marzabotto', 'Modena', 'Monghidoro', 'Montese', "Monticelli d'Ongina", 'Ostellato', 'Palagano', 'Palanzano', 'Pievepelago', 'Poggio Berni', 'Porretta Terme', 'Portico e San Benedetto', 'Poviglio', "Reggio nell'Emilia", 'Rio Saliceto', 'Sala Baganza', 'San Clemente', 'San Lazzaro di Savena', "San Polo d'Enza", "Sant'Agata Bolognese", "Sant'Agata sul Santerno", 'Santarcangelo di Romagna', 'Sissa', 'Travo', 'Tresigallo', 'Viano', 'Zerba']
    },

    {
      regionName: 'Toscana',
      regionShort: 'TOS',
      regionSlug: 'toscana',
      weight: 6,
      cities: ['Anghiari', 'Bientina', 'Buti', 'Capannori', 'Casciana Terme', "Casole d'Elsa", 'Castel San Niccolò', 'Castellina in Chianti', 'Castiglione di Garfagnana', 'Certaldo', 'Comano', 'Coreglia Antelminelli', 'Empoli', 'Fauglia', 'Firenze', 'Gavorrano', 'Grosseto', 'Livorno', 'Massa e Cozzile', 'Massarosa', 'Minucciano', 'Monte San Savino', 'Montelupo Fiorentino', 'Montemignaio', "Monteroni d'Arbia", 'Montignoso', 'Orciano Pisano', 'Pelago', 'Piancastagnaio', 'Pietrasanta', 'Pisa', 'Ponsacco', 'Pontedera', 'Pratovecchio', 'Radicofani', 'Rio Marina', "Rio nell'Elba", 'Riparbella', 'Sambuca Pistoiese', 'San Marcello Pistoiese', 'San Piero a Sieve', "Santa Croce sull'Arno", 'Santa Fiora', 'Santa Maria a Monte', 'Siena', 'Subbiano', 'Vagli Sotto', 'Vergemoli', 'Villafranca in Lunigiana', 'Vinci']
    },

    {
      regionName: 'Umbria',
      regionShort: 'UMB',
      regionSlug: 'umbria',
      weight: 1,
      cities: ['Acquasparta', 'Allerona', 'Alviano', 'Amelia', 'Arrone', 'Attigliano', 'Avigliano Umbro', 'Baschi', 'Bastia Umbra', 'Bevagna', 'Castel Giorgio', 'Castel Ritaldi', 'Castiglione del Lago', 'Cerreto di Spoleto', 'Fabro', 'Ficulle', 'Foligno', 'Fossato di Vico', 'Fratta Todina', 'Giove', 'Gualdo Cattaneo', 'Gualdo Tadino', 'Gubbio', 'Lisciano Niccone', 'Lugnano in Teverina', 'Marsciano', 'Massa Martana', 'Monte Santa Maria Tiberina', 'Monteleone di Spoleto', 'Montone', 'Nocera Umbra', 'Norcia', 'Orvieto', 'Otricoli', 'Parrano', 'Penna in Teverina', 'Perugia', 'Piegaro', 'Poggiodomo', 'Polino', 'San Venanzo', 'Scheggino', 'Sellano', 'Sigillo', 'Spoleto', 'Terni', 'Todi', 'Torgiano', 'Umbertide', 'Valfabbrica']
    },

    {
      regionName: 'Marche',
      regionShort: 'MAR',
      regionSlug: 'marche',
      weight: 3,
      cities: ['Acquasanta Terme', 'Altidona', 'Ancona', 'Arquata del Tronto', 'Barchi', 'Belvedere Ostrense', 'Cagli', 'Caldarola', 'Camerino', 'Camporotondo di Fiastrone', 'Castel Colonna', 'Cossignano', 'Falerone', 'Fiuminata', 'Loreto', 'Macerata', 'Maiolati Spontini', 'Maltignano', 'Mogliano', 'Mondolfo', 'Monte Giberto', 'Monte San Pietrangeli', 'Monte Vidon Corrado', 'Montecarotto', "Montefiore dell'Aso", 'Montegranaro', "Morro d'Alba", 'Morrovalle', 'Offida', 'Osimo', 'Ostra Vetere', 'Palmiano', 'Penna San Giovanni', 'Pergola', 'Piagge', 'Pietrarubbia', 'Poggio San Marcello', 'Rapagnano', 'Recanati', 'Saltara', 'San Benedetto del Tronto', 'San Marcello', "Sant'Angelo in Pontano", "Sant'Elpidio a Mare", 'Santa Vittoria in Matenano', 'Sassocorvaro', 'Sefro', 'Serrungarina', 'Tolentino', 'Visso']
    },

    {
      regionName: 'Lazio',
      regionShort: 'LAZ',
      regionSlug: 'lazio',
      weight: 9,
      cities: ['Acquafondata', 'Allumiere', 'Alvito', 'Anzio', 'Arsoli', 'Artena', 'Bassano in Teverina', 'Bassiano', 'Canino', 'Cantalupo in Sabina', 'Canterano', 'Capena', 'Casalvieri', 'Casperia', 'Castel di Tora', 'Cisterna di Latina', 'Filacciano', 'Frascati', 'Labico', 'Labro', 'Ladispoli', 'Latera', 'Mandela', 'Mazzano Romano', 'Minturno', 'Monte San Giovanni in Sabina', 'Moricone', 'Morolo', 'Morro Reatino', 'Nemi', 'Palestrina', 'Pastena', 'Picinisco', 'Rocca Massima', 'Rocca Santo Stefano', "Rocca d'Arce", 'Roma', 'Ronciglione', 'San Lorenzo Nuovo', 'Scandriglia', 'Segni', 'Sonnino', 'Torre Cajetani', 'Trevignano Romano', 'Vallepietra', 'Vejano', 'Velletri', 'Vico nel Lazio', 'Villa Latina', 'Villa Santo Stefano']
    },

    {
      regionName: 'Abruzzo',
      regionShort: 'ABR',
      regionSlug: 'abruzzo',
      weight: 2,
      cities: ['Abbateggio', 'Acciano', 'Ancarano', 'Bellante', 'Campli', 'Campotosto', 'Capestrano', 'Cappelle sul Tavo', 'Caramanico Terme', 'Carunchio', 'Casoli', 'Castellafiume', 'Castelvecchio Calvisio', 'Castiglione Messer Raimondo', 'Castiglione a Casauria', 'Cerchio', 'Chieti', 'Colledimacine', 'Colonnella', 'Crecchio', 'Fallo', 'Fontecchio', 'Guilmi', "Isola del Gran Sasso d'Italia", 'Manoppello', 'Montebello sul Sangro', 'Montereale', "Mosciano Sant'Angelo", 'Nocciano', 'Ofena', 'Orsogna', 'Paglieta', 'Palombaro', 'Pereto', 'Pizzoferrato', 'Pretoro', 'Rocca di Cambio', 'Roio del Sangro', 'Rosciano', 'San Giovanni Lipioni', 'San Valentino in Abruzzo Citeriore', 'San Vito Chietino', "Sant'Egidio alla Vibrata", "Sant'Eufemia a Maiella", "Sant'Eusanio Forconese", "Sant'Omero", 'Serramonacesca', 'Torrevecchia Teatina', 'Treglio', 'Vicoli']
    },

    {
      regionName: 'Molise',
      regionShort: 'MOL',
      regionSlug: 'molise',
      weight: 1,
      cities: ['Baranello', 'Belmonte del Sannio', 'Bojano', 'Bonefro', 'Busso', 'Campochiaro', 'Campolieto', 'Campomarino', 'Carovilli', 'Casacalenda', 'Castel del Giudice', 'Campobasso', 'Cercemaggiore', 'Cercepiccola', 'Chiauci', 'Civitacampomarano', 'Colli a Volturno', 'Conca Casale', 'Ferrazzano', 'Filignano', 'Isernia', 'Longano', 'Macchia Valfortore', 'Miranda', 'Monacilioni', 'Montefalcone nel Sannio', 'Montenero Val Cocchiara', 'Petacciato', 'Pettoranello del Molise', 'Pietracatella', 'Ripabottoni', 'Roccasicura', 'Rotello', 'Salcito', 'San Giacomo degli Schiavoni', 'San Giovanni in Galdo', 'San Giuliano di Puglia', 'San Martino in Pensilis', 'San Massimo', 'San Pietro Avellana', "Sant'Agapito", "Sant'Angelo Limosano", "Sant'Elia a Pianisi", 'Sepino', 'Sesto Campano', 'Termoli', 'Torella del Sannio', 'Tufara', 'Ururi', 'Vastogirardi']
    },

    {
      regionName: 'Campania',
      regionShort: 'CAM',
      regionSlug: 'campania',
      weight: 10,
      cities: ['Acerra', 'Altavilla Irpina', 'Arzano', 'Avellino', 'Calvi Risorta', 'Campagna', 'Cannalonga', 'Casalbuono', 'Castel Baronia', 'Castel Volturno', 'Castelvetere in Val Fortore', 'Ceppaloni', 'Cervinara', 'Cervino', 'Cetara', 'Cimitile', 'Corbara', 'Cuccaro Vetere', 'Ercolano', 'Falciano del Massico', 'Felitto', 'Forio', 'Frigento', 'Frignano', 'Giugliano in Campania', 'Guardia Sanframondi', 'Napoli', "Ospedaletto d'Alpinolo", 'Paternopoli', 'Paupisi', 'Pellezzano', 'Pietraroja', 'Pollena Trocchia', 'Portici', 'Rocca San Felice', 'Salerno', 'San Felice a Cancello', 'San Leucio del Sannio', 'San Mauro Cilento', 'San Pietro al Tanagro', 'San Sebastiano al Vesuvio', "Sant'Angelo a Cupolo", "Sant'Angelo a Fasanella", "Sant'Arsenio", "Sant'Egidio del Monte Albino", 'Santa Marina', 'Santo Stefano del Sole', 'Santomenna', 'Sorbo Serpico', 'Tufo']
    },

    {
      regionName: 'Puglia',
      regionShort: 'PUG',
      regionSlug: 'puglia',
      weight: 7,
      cities: ['Accadia', 'Altamura', 'Arnesano', 'Bari', 'Brindisi', 'Candela', 'Cannole', 'Carpignano Salentino', 'Castelluccio Valmaggiore', 'Castri di Lecce', 'Cavallino', 'Cerignola', 'Copertino', 'Erchie', 'Francavilla Fontana', 'Gagliano del Capo', 'Giurdignano', 'Grumo Appula', 'Lecce', 'Maglie', 'Manfredonia', 'Minervino di Lecce', 'Molfetta', 'Montemesola', 'Mottola', 'Noicattaro', 'Novoli', 'Oria', 'Orsara di Puglia', 'Otranto', 'Palagianello', 'Palmariggi', 'Poggiorsini', 'Porto Cesareo', 'Putignano', 'Rignano Garganico', 'Rutigliano', 'Salice Salentino', 'San Cesario di Lecce', 'San Pancrazio Salentino', 'Santa Cesarea Terme', 'Scorrano', 'Sogliano Cavour', 'Surbo', 'Torchiarolo', 'Trani', 'Tuglie', 'Vernole', 'Vico del Gargano', 'Vieste']
    },

    {
      regionName: 'Basilicata',
      regionShort: 'BAS',
      regionSlug: 'basilicata',
      weight: 1,
      cities: ['Albano di Lucania', 'Aliano', 'Anzi', 'Armento', 'Balvano', 'Bella', 'Calvello', 'Calvera', 'Castelluccio Inferiore', 'Castelluccio Superiore', 'Castelmezzano', 'Chiaromonte', 'Colobraro', 'Craco', 'Episcopia', 'Ferrandina', 'Francavilla in Sinni', 'Gallicchio', 'Garaguso', 'Genzano di Lucania', 'Guardia Perticara', 'Lagonegro', 'Latronico', 'Matera', 'Moliterno', 'Montemilone', 'Nemoli', 'Pescopagano', 'Pietragalla', 'Pomarico', 'Potenza', 'Rapone', 'Rionero in Vulture', 'Ripacandida', 'Rivello', 'Roccanova', 'Ruoti', 'Ruvo del Monte', 'San Chirico Nuovo', 'San Fele', 'Satriano di Lucania', 'Scanzano Jonico', 'Spinoso', 'Stigliano', 'Tolve', 'Tramutola', 'Trivigno', 'Vietri di Potenza', 'Viggianello', 'Viggiano']
    },

    {
      regionName: 'Calabria',
      regionShort: 'CAL',
      regionSlug: 'calabria',
      weight: 3,
      cities: ['Aiello Calabro', 'Aieta', 'Benestare', 'Bocchigliero', 'Candidoni', 'Catanzaro', 'Cellara', 'Cittanova', 'Cropalati', 'Davoli', 'Delianuova', 'Dipignano', 'Filadelfia', 'Fiumara', 'Fossato Serralta', 'Gagliato', 'Girifalco', 'Grimaldi', 'Isca sullo Ionio', 'Isola di Capo Rizzuto', 'Laino Castello', 'Marcedusa', 'Marzi', 'Mesoraca', 'Montalto Uffugo', 'Oppido Mamertina', 'Papasidero', 'Pedace', 'Placanica', 'Portigliola', 'Rosarno', 'San Calogero', 'San Costantino Calabro', 'San Demetrio Corone', 'San Donato di Ninea', 'San Giorgio Albanese', 'San Lorenzo', 'San Luca', 'San Mauro Marchesato', 'San Sostene', "Sant'Ilario dello Ionio", "Sant'Onofrio", 'Scala Coeli', 'Sellia Marina', 'Serrata', 'Squillace', 'Stilo', 'Strongoli', 'Tarsia', 'Tropea']
    },

    {
      regionName: 'Sicilia',
      regionShort: 'SIC',
      regionSlug: 'sicilia',
      weight: 8,
      cities: ['Acireale', 'Acquedolci', 'Adrano', 'Buccheri', 'Caccamo', 'Campofelice di Fitalia', 'Cassaro', 'Castelbuono', 'Castellana Sicula', 'Castiglione di Sicilia', 'Cefalà Diana', 'Cerami', 'Chiusa Sclafani', 'Cinisi', 'Enna', 'Francofonte', 'Gallodoro', 'Giardinello', 'Giarratana', 'Mascalucia', 'Milazzo', 'Milena', 'Moio Alcantara', 'Motta Camastra', "Motta Sant'Anastasia", 'Naro', 'Nicolosi', 'Pace del Mela', 'Palermo', 'Pettineo', 'Piana degli Albanesi', 'Priolo Gargallo', 'Randazzo', 'Roccalumera', 'Roccamena', 'Rodì Milici', 'Rosolini', 'San Fratello', 'San Giovanni la Punta', 'San Piero Patti', 'Santa Caterina Villarmosa', 'Santa Flavia', 'Santo Stefano Quisquina', 'Sciacca', 'Siculiana', 'Siracusa', 'Sperlinga', 'Termini Imerese', 'Valverde', 'Villafranca Tirrena']
    },

    {
      regionName: 'Sardegna',
      regionShort: 'SAR',
      regionSlug: 'sardegna',
      weight: 3,
      cities: ['Albagiara', 'Armungia', 'Birori', 'Bosa', 'Bottidda', 'Bulzi', 'Cabras', 'Cagliari', 'Cardedu', 'Collinas', 'Cuglieri', 'Dorgali', 'Esterzili', 'Gonnosfanadiga', 'Gonnosnò', 'Ilbono', 'Jerzu', 'Lodine', 'Maracalagonis', 'Masullas', 'Montresta', 'Mores', 'Narbolia', 'Narcao', 'Noragugume', 'Nuragus', 'Nurallao', 'Nuraminis', 'Ollolai', 'Oristano', 'Orosei', 'Orroli', 'Ortacesus', 'Piscinas', 'San Giovanni Suergiu', 'Sanluri', 'Santu Lussurgiu', 'Sennariolo', 'Siddi', 'Silius', 'Sorradile', 'Stintino', 'Tramatza', "Trinità d'Agultu e Vignola", 'Tula', 'Ussassai', 'Viddalba', 'Villa Verde', 'Villamassargia', 'Villanovafranca']
    }
  ]
});

export default Italy;
