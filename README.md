# generatedata.com

[![Build Status](https://travis-ci.com/benkeen/generatedata.svg?branch=master)](https://travis-ci.com/benkeen/generatedata)

This is the repo for the downloadable version of [generatedata.com](https://generatedata.com). The script is essentially
an *engine* to generate any sort of random data in any format. It currently comes with 30 or 
so *Data Types* (types of data it generates), 12 *Export Types* (formats for the data, like CSV, SQL, JSON), plus
around 32 data sets for specific countries (city names, regions etc). But more importantly it can be extended in any
way you want. Check out the [developer documentation](https://benkeen.github.io/generatedata/developerdoc/intro/) for more
information on that.

### Programmatic generation

The current major version of the script is 4.x, which was a big change over earlier releases. Earlier versions were written
in PHP and MYSQL and 3.x offered a REST API to let you generate the data programmatically rather than via an API. While this is
still planned for 4.x it's not currently offered, and the plan it to tackle that _after_ making the script available
as an npm package - which we feel will be a more convenient way to programmatically generate data over the more agnostic
REST  approach.

## Requirements

- Docker
- node
- nvm 

See the [Installation instructions](https://benkeen.github.io/generatedata/userdoc/installation/intro) for full details.

## How to Install / Documentation

For installation instructions, user and developer documentation, check out:
https://benkeen.github.io/generatedata/

## License

This script is freely available under the GPL 3 license. See license.txt in the root folder. Please note that all
contributors agree that all code is released under this license.

## Contributors

In addition to the many fine folk who submit bug reports, a big thanks to the following for their help extending the script:
https://github.com/benkeen/generatedata/graphs/contributors


Ben Keen
[@vancouverben](https://twitter.com/#!/vancouverben)
