Developer Documentation

This section is for developers who want to extend the script. This document assumes you have at least a passing familiarity with the script in terms of how it looks and works, so in case you haven’t already done so, check out the online version and generate a few random data sets.
http://beta.generatedata.com

Overview / So what can be extended?

The Data Generator is a customizable framework for generating random data. It provides a simple user interface to quickly generate and save custom data set configurations and create user accounts. The entire codebase is open source and available on github. It’s written in PHP, MySQL and javascript and employs a number of awesome open source libraries, namely: jQuery, jQuery UI, CodeMirror and Smarty.

Most people will just use the script “as is”: the out-the-box functionality includes the most common data sets and export formats you’re likely to need to - names, email addresses, random lists, dates, times, addresses, countries, numbers etc. However, the Data Generator was designed to be extended in a number of key ways:

1. Data Types
Data Types are self-contained plugins that generate a single random data item, like a name, email address, country name, country code, image, picture, URL, barcode image, binary string - really anything you want! At the time of writing, there are 20 separate data types. Many are very generic, like “Number Range”, and “Custom List”, allowing to get maximum use out of them; others are more specific, like “Latitude / Longitude”

Data Types can offer basic functionality, like “Email Address” which has no options, examples or help doc.; or they can be more advanced, like the “Date” Data Type, which contains examples of date formats for easy generation, contains a date picker dialog (courtesy of jQuery UI), and a custom help dialog window.

Data Types can be standalone and generate data that has no bearing on other fields (like the “Alpha Numeric” Data Type), or make decisions about its content based on other rows in the data set (like “State / Province / County”, which shows an appropriate value if the data set contains a country field so that provinces are listed for Canada and states for the US).

2. Export Types
These determines the format of the randomly generated data. At the time of writing, there are five options: HTML, Excel, CSV, XML, SQL. However, you can create your own.

3. Country-specific Data

UI Language

Lastly, the user interface language is entirely pulled from separate language files, so it can always be converted into the language of your choice. The existing translations are mostly auto-translated (meaning: they’re god-awful) but hopefully they’ll serve as a starting-point for budding translators who want to de-suck the interface strings in whatever language they speak.

For more information about
