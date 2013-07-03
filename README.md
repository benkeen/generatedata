# generatedata.com

[![Build Status](https://travis-ci.org/benkeen/generatedata.png?branch=master)](https://travis-ci.org/benkeen/generatedata)

This is the repo for the standalone, downloadable version of [generatedata.com](http://www.generatedata.com).

Generally the trunk is pretty stable, but if you're concerned about stability above all else, grab one of the tags. The trunk contains the latest and greatest changes and bug fixes.

## How to Install / Documentation

For the installation instructions, user documentation and developer documentation, check out:
http://benkeen.github.io/generatedata/

Installation is really, really simple. I deliberately wrote the script to be as self-contained as possible and not require
additional PHP/Server configuration when setting it up. That said, it *does* require PHP 5.3.0 or later. See the documentation
for more info.

## Test Coverage

Test coverage is pretty weak right now! I'm in the midst of adding phpunit tests and integrating it with Travis, but it's going to be a little hairy for a while just yet.

## License

This script is freely available under the GPL 3 license. See license.txt in the root folder.

## Contributors

In addition to the folks who submit bug reports, a big thanks to the following for their help extending the script:

- [Marcello Verona](https://github.com/marciuz) - Italy Country plugin (3.0.4)
- [Roberto Aragón](https://github.com/robarago), Charo Baena - Spanish translation & Country plugin (3.0.2)
- [Kent Chenery](https://github.com/kchenery) - MS SQL plugin (3.0.1)

## Changelog

3.0.4 - July 2nd, 2013
- Italy Export Type, courtesy of [Marcello Verona](https://github.com/marciuz)
- Regional Names Data Type added, data for Italy and France from [Marcello Verona](https://github.com/marciuz)

3.0.3 - June 23, 2013
- Bug fixes. See: https://github.com/benkeen/generatedata/issues?milestone=3

3.0.2 - June 12, 2013
- Spanish translation and Country plugin added (thanks, [@robarago](https://github.com/robarago)!)
- bug fixes, other updates: https://github.com/benkeen/generatedata/issues?milestone=2

3.0.1 - June 1st, 2013
- MSSQL support added (thanks, [Kent](https://github.com/kchenery)!)
- Assorted bug fixes / updates. See: https://github.com/benkeen/generatedata/issues?milestone=1

3.0.0 - May 21st, 2013
- Initial release.


Ben Keen
[@vancouverben](https://twitter.com/#!/vancouverben)