import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public isMobile: boolean = window.innerWidth < 768;
  public menuOpen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}