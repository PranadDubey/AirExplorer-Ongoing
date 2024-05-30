import { Component, WritableSignal, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLoggedIn: WritableSignal<boolean> = signal(false);
  private router: Router = inject(Router);

  logOut(): void {
    console.log('clicked');
    localStorage.removeItem('ae_token');
    localStorage.removeItem('ae_user');
    this.router.navigate(['/']);
    this.isLoggedIn.set(false);
  }
  ngOnInit(): void {
    const token = JSON.parse(localStorage.getItem('ae_token') || '{}');
    const usr = JSON.parse(localStorage.getItem('ae_user') || '{}');
    console.log('usr', usr);
    console.log('token', token);

    window.addEventListener('load', () => {
      console.log('window load detected');
      this.detectChange(usr);
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('navigation end detected');
        this.detectChange(usr);
        return;
      }
    });
  }

  user: WritableSignal<any> = signal({});

  detectChange(usr: any): void {
    console.log(
      'detectChange invoked, router navigated',
      this.router.navigated
    );
    this.isLoggedIn.set(usr.userID != undefined);
    this.user.set(usr);
  }
}
