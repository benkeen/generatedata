# generatedata.com

[![Build Status](https://travis-ci.org/benkeen/generatedata.svg?branch=master)](https://travis-ci.org/benkeen/generatedata)
[![Coverage Status](https://coveralls.io/repos/github/benkeen/generatedata/badge.svg?branch=master)](https://coveralls.io/github/benkeen/generatedata?branch=master)

This is the repo for the downloadable version of [generatedata.com](http://www.generatedata.com). The 
script is essentially an *engine* to generate any sort of random data in any format. It currently comes with 30 or 
so *Data Types* (types of data it generates), 8 *Export Types* (formats for the data), plus around 30 data sets for specific countries (city names, regions etc). But more importantly it can be extended in any way you want. Check out the [developer documentation](http://benkeen.github.io/generatedata/developer.html)
for more information on that. If you need to generate random data programmatically rather than manually via the UI, you can use the [REST API](http://benkeen.github.io/generatedata/api.html).

The master branch now contains the incomplete v4 rewrite, so if you're downloading the script, get the most recent 
tag: https://github.com/benkeen/generatedata/releases

*This README file still contains information about the v3 code. It will stay that way until v4 is in alpha stage.*

## Requirements
- PHP 5.3 or any later version of PHP 5.
- MySQL 4.1.3 or later

## How to Install / Documentation

For installation instructions, user and developer documentation, check out:
http://benkeen.github.io/generatedata/

Installation is really, really simple. I deliberately wrote the script to be as self-contained as possible and not 
require additional PHP/Server configuration when setting it up. That said, it *does* require PHP 5.3.0 or later. See 
the documentation for more info.

## `master` = v4 rewrite

The master branch of this repo now contains the ongoing work for the v4 rewrite. The generatedata.com site, the 
documentation and everything else is for up to the v3 branch. You can find that code in the `v3` branch. 

Although I'm no longer working on that branch, PRs and bug fixes are very welcome! Just branch off `v3` and put 
your PRs in against that.

v4 is dropping PHP and MySQL and re-writing the entire script in node. This script will eventually become available as a node package which you can use in your own packages to generate your own code programmatically, but it will continue to offer the REST API and UI for constructing and generating the data sets. 


## Pre-packaged solutions

### Docker

- Check out [Maxime Visonneau's repo](https://github.com/mvisonneau/docker-generatedata) for a Docker packaged version 
of this script.
- Also: [@LaiNathaniel's repo](https://github.com/LaiNathaniel/docker-generatedata)
- And [Andy Shinn's instructions](https://github.com/benkeen/generatedata/pull/269)


### Vagrant 

There's also a pre-packaged Vagrant solution [found here](https://github.com/benkeen/generatedata-vagrant),
courtesy of Daragh Courtney.

## To-Do

Please see the issues tagges as [feature requests](https://github.com/benkeen/generatedata/issues?labels=Feature+Request%21&page=1&state=open)
for a list of things that are still left to complete on this project. Help is always welcome!

## License

This script is freely available under the GPL 3 license. See license.txt in the root folder. Please note that all
contributors agree that all code is released under this license.

## Contributors

In addition to the many fine folk who submit bug reports, a big thanks to the following for their help extending the script:
https://github.com/benkeen/generatedata/graphs/contributors

## Changelog

3.4.1 - Nov 24, 2019 
- Excel Export Type updated for new PHP lib, thanks [@adibaby](https://github.com/adibaby)!
- Bug fix for SocialSecurityNumber, courtesy of [@guzzisti](https://github.com/guzzisti). 
- https://github.com/benkeen/generatedata/milestone/26?closed=1

3.4.0 - Nov 16, 2019
- Misc updates, 
- new inject SQL feature added. Great work, [@harish81](https://github.com/harish81)!
- https://github.com/benkeen/generatedata/milestone/25?closed=1

3.3.1 - July 18, 2019
- https://github.com/benkeen/generatedata/milestone/23?closed=1

3.3.0 - July 1, 2019
- misc bug fixes

3.2.8 - Sep 12, 2017
- misc bug fixes

3.2.7 - Jul 29, 2017
- "Computed" Data Type added.
- misc bug fixes

3.2.6 - Apr 17, 2017
- misc bug fixes: https://github.com/benkeen/generatedata/milestone/20?closed=1

3.2.5 - Apr 16, 2016 
- bug fixes: https://github.com/benkeen/generatedata/issues?utf8=%E2%9C%93&q=milestone%3A3.2.3+ - thanks for your help, 
[Conrad Hagemans](https://github.com/conradhagemans)!
- "Precision" option added to Normal Distribution Data Type - thanks [@aevans84](https://github.com/aevans84).
- generation of complex JSON structures added by [Tony OHagan](https://github.com/tohagan). See: https://github.com/benkeen/generatedata/tree/master/plugins/exportTypes/JSON#generating-complex-objects

3.2.4 - Dec 6, 2015
- patch release for per-user settings.

3.2.3 - Nov 15, 2015
- SIRET/SIREN Data Type added (French business numbers) added. Merci, [Fabrice Marquès](https://github.com/fmarques56)! 
- Bug fixes: https://github.com/benkeen/generatedata/issues?utf8=%E2%9C%93&q=milestone%3A3.2.3+

3.2.2 - Nov 12, 2015
- The plugins (Data Types, Export Types, Countries) seen in the interface may not be configured on a per-user level.
- Installation script updated to allow customization of plugin selection.

3.2.1 - May 25, 2015
- Configuration history option added to store the last 200 (this is configurable) versions of a data set. In case of data
loss, you can now revert to an older version very simply.
- Assorted bug fixes, including some improvements to the installation script.

3.2.0 - Jan 29, 2015
- Adds a new REST API as an alternative way to generate data. See the [API Documentation](http://benkeen.github.io/generatedata/api.html)
for more information.

3.1.4 - Sept 6, 2014
- Chinese language file added, thanks to [Zhao Yang](https://github.com/jptiancai)
- PAN, Track 1 and Track 2 data type updates, courtesy of Zeeshan Shaikh
- Turkey Country plugin added
- Bug fixes: https://github.com/benkeen/generatedata/issues?q=milestone%3A3.1.4+is%3Aclosed

3.1.3 - July 20, 2014
- Misc data generation efficiency improvements
- Batch Size SQL export option added by [Anton Nizhegorodov](https://github.com/an1zhegorodov)
- Poland, Nigeria Country plugins added
- Bug fixes: https://github.com/benkeen/generatedata/issues?milestone=13&page=1&state=closed

3.1.2 - July 12, 2014
- Bug fixes: https://github.com/benkeen/generatedata/issues?milestone=12&page=1&state=closed

3.1.1 - Jan 31, 2014
- New credit card data types: PAN, PIN, CVV, Track 1 and Track 2 courtesy of Zeeshan Shaikh
- INSERT IGNORE option added to the SQL Export Type, thanks to [Ap.Mathu](https://github.com/apmuthu)
- Bug fixes: https://github.com/benkeen/generatedata/issues?milestone=11&page=1&state=closed

3.1.0 - Dec 19, 2013
- Bug fix for accidental short-tags that were introduced in earlier code

3.0.9 - Dec 11, 2013
- Compression option added to reduce download sizes, courtesy of [Manu Ullas](https://github.com/unullmass) - thanks!
- New credit card Data Type, thanks to [rsicher1](https://github.com/rsicher1)
- You can now make copies of Data Sets, via the main dialog window. Just check a single row and click "Copy Data Set" button.
- CodeMirror updated to v3.2.0
- Bug fixes: https://github.com/benkeen/generatedata/issues?milestone=9&page=1&state=closed

3.0.8 - Oct 28, 2013
- International Bank Numbers - thanks, Joeri Noort!
- PostgreSQL database support added to SQL Export Type
- Bug fixes: https://github.com/benkeen/generatedata/issues?milestone=8&page=1&state=closed

3.0.7 - Sept 7, 2013
- LDIF Export Type support - thanks, [Marco Corona](https://github.com/coronam)!
- Proper (genuine!) French translation courtesy of [Michel Roca](https://github.com/mRoca)
- Optional JS, CSS minimization and bundling via Grunt. See help documentation for more information:
[http://benkeen.github.io/generatedata/developer.html#bundling](http://benkeen.github.io/generatedata/developer.html#bundling)
- PHP 5.5 compatibility fixes: database connection now with mysqli; Generator class renamed to DataGenerator due
to naming conflict
- Bug fixes: https://github.com/benkeen/generatedata/issues?milestone=7&page=1&state=closed

3.0.6 - Aug 1, 2013
- Costa Rica Country plugin, Phone-Regional Data Type added, courtesy of [Andre Fortin](https://github.com/twindual)
- bug fixes, see: https://github.com/benkeen/generatedata/issues?milestone=6&page=1&state=closed

3.0.5 - July 13, 2013
- Currency Data Type added
- Assorted bug fixes, see: https://github.com/benkeen/generatedata/issues?milestone=5&page=1&state=closed

3.0.4 - July 2nd, 2013
- Italy Export Type, courtesy of [Marcello Verona](https://github.com/marciuz)
- Regional Names Data Type added, data for Italy and France from [Marcello Verona](https://github.com/marciuz)

3.0.3 - June 23, 2013
- Bug fixes. See: https://github.com/benkeen/generatedata/issues?milestone=3

3.0.2 - June 12, 2013
- Spanish translation and Country plugin added (thanks, [@robarago](https://github.com/robarago)!)
- bug fixes, other updates: https://github.com/benkeen/generatedata/issues?milestone=2&state=closed

3.0.1 - June 1st, 2013
- MSSQL support added (thanks, [Kent](https://github.com/kchenery)!)
- Assorted bug fixes / updates. See: https://github.com/benkeen/generatedata/issues?milestone=1&state=closed

3.0.0 - May 21st, 2013
- Initial release


Ben Keen
[@vancouverben](https://twitter.com/#!/vancouverben)
