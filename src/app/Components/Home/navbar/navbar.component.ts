import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  animations: [
    trigger('dropdownAnimation', [
      transition('void => visible', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition('visible => void', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  zIndex = 1000;
  open = false;

  toggleDropdown(): void {
    this.open = !this.open;
  }

  closeDropdown(): void {
    this.open = false;
  }
}
