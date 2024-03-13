import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  // Retrieve the pastDays value from localStorage, default to 7 if not found
  selectedPastDays: number = parseInt(localStorage.getItem('pastDays') || '7');

  updatePastDays(pastDays: number): void {
    this.selectedPastDays = pastDays;
    // Update localStorage with the new pastDays value
    localStorage.setItem('pastDays', pastDays.toString());
  }
}
