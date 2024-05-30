import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../partials/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  imports: [
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class EditComponent {
  ngOnInit() {
    this.getInfo();
    this.initForm();
  }

  genders: string[] = ['Mr.', 'Mrs.', 'Ms.'];
  private router: Router = inject(Router);
  private http: HttpService = inject(HttpService);
  user: any;
  co_passenger: any;
  names: string[] = [];
  protected editForm!: FormGroup;

  initForm(): void {
    this.editForm = new FormGroup({
      firstName: new FormControl(`Pranad`, Validators.required),
      lastName: new FormControl('Dubey', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  getInfo(): void {
    this.user = JSON.parse(localStorage.getItem('ae_user') || '');
    this.http.adminGET(`users/${this.user.userID}/co-passengers`).subscribe({
      next: (res: any) => {
        console.log('res from add co-passenger', res);
        if (!res.success) return;
        this.co_passenger = res;
        this.names = this.co_passenger.result.map(
          (item: { firstName: any }) => item.firstName
        );
      },
      error: (e: any) => console.log('error while register', e),
      complete: () => console.log('login submit completed'),
    });
  }
  submitForm(): void {
    this.user = JSON.parse(localStorage.getItem('ae_user') || '');
    const payload = this.editForm.value;
    this.http
      .adminPUT(
        `users/${this.user.userID}/co-passengers/${this.co_passenger.result[0].coPassengerID}`,
        payload
      )
      .subscribe({
        next: (res: any) => {
          console.log('updated', res);
          if (!res.success) return;
        },
        error: (e: any) => console.log('error while register', e),
        complete: () => console.log('login submit completed'),
      });
  }
}
