import { Component, WritableSignal, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../partials/sidebar/sidebar.component';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-add-passenger',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    SidebarComponent,
  ],
  templateUrl: './add-passenger.component.html',
  styleUrl: './add-passenger.component.scss',
})
export class AddPassengerComponent {
  genders: string[] = ['Mr.', 'Mrs.', 'Ms.'];
  protected addForm!: FormGroup;
  private http: HttpService = inject(HttpService);
  private router: Router = inject(Router);
  protected isExisting: WritableSignal<boolean> = signal(false);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private targetObj: WritableSignal<any> = signal({});

  ngOnInit() {
    this.initForm();
    this.checkExisting();
  }

  initForm(): void {
    this.addForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  checkExisting(): void {
    this.activatedRoute.params.subscribe((prms) => {
      const { copassengerID } = prms;
      console.log('copassengerID', copassengerID);
      if (copassengerID == undefined) return;
      this.targetObj.set({ copassengerID });
      const usr = JSON.parse(localStorage.getItem('ae_user') || '{}');
      if (!usr.userID) return;
      this.http
        .adminGET(`users/${usr.userID}/co-passengers/${copassengerID}`)
        .subscribe({
          next: (res) => {
            console.log('existing res', res);
            if (!res.success) return;
            this.isExisting.set(true);
            this.addForm.get('firstName')?.setValue(res.result[0].firstName);
            this.addForm.get('lastName')?.setValue(res.result[0].lastName);
            this.addForm.get('email')?.setValue(res.result[0].email);
            this.addForm.get('phone')?.setValue(res.result[0].phone);
            this.addForm.get('gender')?.setValue(res.result[0].gender);
          },
          error: (e) =>
            console.log('error while laoding exisitng co-passenger', e),
        });
    });
  }

  submitForm(): void {
    const payLoad = this.addForm.value;
    const user = JSON.parse(localStorage.getItem('ae_user') || '{}');
    if (!user.userID) return;
    payLoad.createdBy = user.userID;
    console.log('submit invoked', payLoad);
    this.http
      .adminPOST(`users/${user.userID}/co-passengers`, payLoad)
      .subscribe({
        next: (res: any) => {
          console.log('res from add co-passenger', res);
          if (!res.success) return;
          this.router.navigate(['profile']);
        },
        error: (e: any) => console.log('error while register', e),
        complete: () => console.log('login submit completed'),
      });
  }

  submitUpdated(): void {
    const payLoad = this.addForm.value;
    const user = JSON.parse(localStorage.getItem('ae_user') || '{}');
    if (!user.userID) return;
    payLoad.createdBy = user.userID;
    console.log('submit invoked', payLoad);
    this.http
      .adminPOST(
        `users/${user.userID}/co-passengers/${this.targetObj().copassengerID}`,
        payLoad
      )
      .subscribe({
        next: (res: any) => {
          console.log('res from add co-passenger', res);
          if (!res.success) return;
          this.router.navigate(['profile']);
        },
        error: (e: any) => console.log('error while register', e),
        complete: () => console.log('login submit completed'),
      });
  }
}
