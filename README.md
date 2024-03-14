## Demo

https://janbugel.github.io/weather-app-angular/

## Configuration 

- ng new <project_name>
- ng add @angular/material
- npm install chart.js
- ng generate component <component_name>

## Features to Implement

- [x] Design UI using Angular Material components
- [x] Integrate Open Weather API
- [x] Create a graph to display temperature over time
- [x] Display past weather and forecast table
- [x] Calculate Feel Temperature (heat index)
- [x] weather code display on weather table from api accoriding to WMO Weather interpretation codes (WW) 
- [x] separate modules for each component
- [x] Improve calculator
- [x] Improve UI
- [ ] slider that smoothes out the chart (reduces or adds points in range)
- [ ] Historical api to have data for more than past 92 days
- [ ] Clean code - refactor - split features into separate compoents/services (cleanup, simplify), utils, services etc
- [ ] Testing
- [ ] Standalone components 

## deployment

- ng build --output-path docs --base-href /weather-app-angular/
- copy index.html a and name it 404.html
- extract files from /docs/browser into /docs because idk why angular does this (SSR related - https://github.com/angular/angular-cli/issues/26304) 

