## Demo

https://janbugel.github.io/weather-app-angular/

## Configuration 

- ng new <project_name>
- ng add @angular/material
- npm install chart.js
- ng generate component <component_name>

## Features

- [x] Angular Material UI
- [x] Open-Meteo forecast + archive integration
- [x] Temperature charts (forecast and historical)
- [x] Forecast and historical weather tables (sorting, pagination, persisted)
- [x] Heat index calculator with NOAA Rothfusz regression and risk category
- [x] WMO weather codes mapped to descriptions and Material icons
- [x] Per-feature lazy modules and shared utils/services
- [x] City search via Open-Meteo geocoding (replaces hard-coded London)
- [x] Global temperature unit toggle (°C / °F), persisted
- [x] Chart smoothing slider (centered moving average)
- [x] Loading and error states on every data view
- [ ] Historical API for more than the past 92 days
- [ ] Standalone components

## deployment

- ng build --output-path docs --base-href /weather-app-angular/
- copy index.html a and name it 404.html
- extract files from /docs/browser into /docs because idk why angular does this (SSR related - https://github.com/angular/angular-cli/issues/26304) 

