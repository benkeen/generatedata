# generatedata.com

[![Build Status](https://travis-ci.org/benkeen/generatedata.png?branch=master)](https://travis-ci.org/benkeen/generatedata)

This is the repo for the standalone, downloadable version of [generatedata.com](http://www.generatedata.com).

Generally the trunk is pretty stable, but it's never guaranteed. If you're downloading the code, I'd suggest getting the most recent tag: https://github.com/benkeen/generatedata/releases

## Requirements
- PHP 5.3 or later
- MySQL 4.1.3 or later

## How to Install / Documentation

For the installation instructions, user documentation and developer documentation, check out:
http://benkeen.github.io/generatedata/

Installation is really, really simple. I deliberately wrote the script to be as self-contained as possible and not require
additional PHP/Server configuration when setting it up. That said, it *does* require PHP 5.3.0 or later. See the documentation
for more info.

## Test Coverage

Test coverage is pretty weak right now! I'm in the midst of adding phpunit tests and integrating it with Travis, but it's going to be a little hairy for a while just yet.

## License

This script is freely available under the GPL 3 license. See license.txt in the root folder. Please note that all contributors agree that all code is released under this license.

## Contributors

In addition to the many folks who submit bug reports, a big thanks to the following for their help extending the script:

- Zeeshan Shaikh - PAN, PIN, CVV, Track 1 and 2 Data Types (3.1.1)
- [Ap.Mathu](https://github.com/apmuthu) - SQL Export Type updates (INSERT IGNORE)
- [Manu Ullas](https://github.com/unullmass) - compression option for downloads (3.0.9)
- [rsicher1](https://github.com/rsicher1) - credit card Data Type (3.0.9)
- Joeri Noort - IBAN numbers (3.0.8)
- [Michel Roca](https://github.com/mRoca) - Full and correct French translation (3.0.7)
- Marco Corona - LDIF Export Type added (3.0.7)
- [Andre Fortin](https://github.com/twindual) - original Costa Rica Country plugin & Phone-Regional Data Type (3.0.6)
- [Marcello Verona](https://github.com/marciuz) - Italy Country plugin (3.0.4)
- [Roberto Aragón](https://github.com/robarago), Charo Baena - Spanish translation & Country plugin (3.0.2)
- [Kent Chenery](https://github.com/kchenery) - MS SQL plugin (3.0.1)

## Changelog

3.1.1 - Jan 31, 2014
- New credit card data types: PAN, PIN, CVV, Track 1 and Track 2 courtesy of Zeeshan Shaikh.
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
to naming conflict.
- Bug fixes: https://github.com/benkeen/generatedata/issues?milestone=7&page=1&state=closed

3.0.6 - Aug 1, 2013
- Costa Rica Country plugin, Phone-Regional Data Type added, courtesy of [Andre Fortin](https://github.com/twindual)
- bug fixes, see: https://github.com/benkeen/generatedata/issues?milestone=6&page=1&state=closed

3.0.5 - July 13, 2013
- Currency Data Type added.
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
- Initial release.


Ben Keen
[@vancouverben](https://twitter.com/#!/vancouverben)
