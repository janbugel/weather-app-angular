import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  selectedPastDays: number = 7;
  updatePastDays(pastDays: number): void {
    this.selectedPastDays = pastDays;
  }
}
