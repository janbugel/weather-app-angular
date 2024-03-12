## Demo

https://janbugel.github.io/weather-app-angular/

## Configuration 

- ng new <project_name>
- ng add @angular/material
- ng generate component <component_name>

## Features to Implement

- [x] Integrate Open Weather API
- [x] Design UI using Angular Material components
- [x] Create a graph to display temperature over time
- [x] Display past weather and forecast table
- [x] Calculate Feel Temperature (heat index)
- [x] weather code display on weather table from api accoriding to WMO Weather interpretation codes (WW) 
- [ ] Improve calculator
- [ ] Clean code - simplify the codebase
- [ ] Standalone components

## deployment

- ng build --output-path docs --base-href /weather-app-angular/
- copy index.html a and name it 404.html
- extract files from /docs/browser into /docs because idk why angular does this (SSR related - https://github.com/angular/angular-cli/issues/26304) 

