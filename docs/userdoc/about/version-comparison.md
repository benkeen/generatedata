---
id: versionComparison
---

# Comparison of v3 and v4

v4 of generatedata.com is a complete rewrite of the application. It shares a lot of the similar UI aspects with the 
previous version but behind the scenes is completely different.

### Technical differences
 
| Feature | Version 3.x | Version 4.x |
| --------- | ------------| ------------ |
| Backend languages | PHP, MySQL | Node, GraphQL |
| Frontend languages | jQuery, requireJS | Typescript, React, Redux, GraphQL |
| Data generation method | on the backend via PHP | in-browser via Web Workers | 
| Containerized? | Nope | Docker | 
| Ease of installation | Easy | Harder |

### Functional differences 

Generally speaking, v4 offers more functionality than v3 in most ways - but it's not black and white.

#### v3 advantages

:::info
**All of these are planned to be supported by v4**. In order to get the new version released we chose to put these 
features on hold and release them later.
:::
 
- Had additional Data Types: Regional Phone Numbers, Swedish Personal Numbers, Swedish Organization numbers,
French SIRET/SIREN business numbers.
- Allows logged in users to share their configured data sets publicly via a URL.
- Has a REST API option to generate data programmatically instead of only via the UI.
- Had an option where you could provide the database schema and have it generate a data set configutation from it 
(downloaded version only). This was a neat contributed feature, but I want to tackle it in a different, more generic
way.  

#### v4 advantages
 
- Live preview panel. This is a big improvement: now you can visually see what you're generating as you're configuring your fields.
- "Take a tour" feature to demo aspects of the script.
- New Data Types: Colour, Time. Plus numerous improvements and expansions on the existing Data Types.
- New Export Types: Typescript, Python. 
- Much faster data generation with an improved visual display of how the generation is going.  

### Other notes 

There were several goals with the v4 rewrite.

1. First, be able to **generate the data in your browser instead of the server**. Hosting costs for the production site 
were exorbitant due to the popularity of the script so by offloading the actual data generation to the client 
it made it more scalable, andoverall reduced generation time.
2. Secondly, like mentioned beforeL: **show a live preview panel** so you could see what data you were going to get, while you built it.
3. Move to node and offer a version of it as a free, downloadable npm package. This will be worked on this year (2022).

