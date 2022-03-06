# generatedata.com

[![Build Status](https://travis-ci.com/benkeen/generatedata.svg?branch=master)](https://travis-ci.com/benkeen/generatedata)
[![Coverage Status](https://coveralls.io/repos/github/benkeen/generatedata/badge.svg?branch=master)](https://coveralls.io/github/benkeen/generatedata?branch=master)

> Form Tools 4 is now live! https://generatedata.com - I've been a big backlogged, but I'll start working on documentation and creating an downloadable version of the script soon. The README doc below is for the old v3 script. That'll be updated soon, stay tuned.

This is the repo for the downloadable version of [generatedata.com](https://generatedata.com). The 
script is essentially an *engine* to generate any sort of random data in any format. It currently comes with 30 or 
so *Data Types* (types of data it generates), 8 *Export Types* (formats for the data), plus around 30 data sets for
specific countries (city names, regions etc). But more importantly it can be extended in any way you want. Check out
the [developer documentation](http://benkeen.github.io/generatedata3/developer.html) for more information on that. If
you need to generate random data programmatically rather than manually via the UI, you can use the [REST API](http://benkeen.github.io/generatedata3/api.html).

The master branch now contains the ongoing v4 rewrite, so if you're downloading the script, get the most recent 
3.x tag: https://github.com/benkeen/generatedata/releases

*This README file still contains information about the v3 code. It will stay that way until v4 is released.*

## Requirements
- PHP 5.3 or any later version of PHP 5.
- MySQL 4.1.3 or later

## How to Install / Documentation

For installation instructions, user and developer documentation, check out:
http://benkeen.github.io/generatedata3/

Installation is really, really simple. I deliberately wrote the script to be as self-contained as possible and not 
require additional PHP/Server configuration when setting it up. That said, it *does* require PHP 5.3.0 or later. See 
the documentation for more info.

## Pre-packaged solutions

### Docker

- Check out [Maxime Visonneau's repo](https://github.com/mvisonneau/docker-generatedata) for a Docker packaged version 
of this script.
- Also: [@LaiNathaniel's repo](https://github.com/LaiNathaniel/docker-generatedata)
- And [Andy Shinn's instructions](https://github.com/benkeen/generatedata/pull/269)

### Kubernetes Helm Chart

Dmitry Rubtsov has put up a Helm chart here:
https://github.com/dmirubtsov/generatedata-helm

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


Ben Keen
[@vancouverben](https://twitter.com/#!/vancouverben)
