import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../partials/sidebar/sidebar.component';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [RouterLink, SidebarComponent, CommonModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss',
})
export class ManageComponent {
  route: any;
  ngOnInit() {
    this.loadCoPassengers();
  }

  private router: Router = inject(Router);
  private http: HttpService = inject(HttpService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  protected coPassengers: WritableSignal<any[]> = signal([]);

  user: any;
  co_passenger: any;
  names: string[] = [];
  co_passengerID: string[] = [];

  loadCoPassengers(): void {
    this.user = JSON.parse(localStorage.getItem('ae_user') || '');

    this.http.adminGET(`users/${this.user.userID}/co-passengers`).subscribe({
      next: (res: any) => {
        console.log('res from add co-passenger', res);
        if (!res.success) return;
        this.coPassengers.set(res.result);
      },
      error: (e: any) => console.log('error while register', e),
      complete: () => console.log('login submit completed'),
    });
  }

  deleteCoPassenger(copassengerID: any): void {
    if (copassengerID == undefined) return;
    const usr = JSON.parse(localStorage.getItem('ae_user') || '{}');
    this.http
      .adminDELETE(`users/${usr.userID}/co-passengers/${copassengerID}`)
      .subscribe({
        next: (res) => {
          console.log('Deleted user', res);
          if (!res.success) return;

          this.loadCoPassengers();
        },
        error: (e) => {
          console.log('error occured', e);
        },
      });
  }
}
