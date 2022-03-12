---
sidebar_position: 2
pagination_prev: null
pagination_next: null
id: versionComparison
---

# Comparison of v3 and v4

v4 of generatedata.com was a complete rewrite of the application. It shares a lot of the similar UI aspects with the 
previous version, but behind the scenes is completely different.

### Technical differences
 
| Feature | Version 3.x | Version 4.x |
| --------- | ------------| ------------ |
| Backend languages | PHP, MySQL | Node, GraphQL |
| Front-end languages | jQuery, requireJS | Typescript, React, Redux, GraphQL |
| Data generation method | on the backend via PHP | in-browser via Web Workers | 
| Containerized? | Nope | Docker | 
| Speed | Slow! | Faster! |

### Functional differences 

...

### Other notes 

The chief motivator for the v4 rewrite was to be able to do two things:
1. **generate the data in your browser instead of the server**. Hosting costs for the production site 
were exorbitant due to the popularity of the script, so by offloading the actual generation work to the client 
it made it more scalable, plus let you generate more data in shorter times.
2. **Show a live preview panel** so you could see what data you were going to get, while you built it.
This was really important to improve the usability of the script. Now there's no doubt about exactly what you're going to 
get - and you don't need to waste time stepping through the generation step to actually see the results.

All considered, v3 was probably simpler to get up and running locally. It required you do to the legwork of setting
up the database, PHP and web server, but by and large people would just rely on prefab tooling like MAMP/WAMP etc. which 
were free and easy to setup. v4 dockerized the whole thing _felt_ like the right call, but quite honestly was as 
complicated as hell. But expecting users to install the litany of backend tools and applications to run the 

Above all I wanted to move to node. The short-midterm goal of this script is to make it available as an npm package
in addition to the front-end application.  

