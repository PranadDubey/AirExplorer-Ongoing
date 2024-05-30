import { Component } from '@angular/core';
import { NavbarComponent } from '../partials/navbar/navbar.component';
import { FooterComponent } from '../partials/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
})
export class LayoutComponent {}
