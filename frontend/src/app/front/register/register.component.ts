import { Component, WritableSignal, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected registerForm!: FormGroup;
  genders: string[] = ['Mr.', 'Mrs.', 'Ms.'];
  gendr: WritableSignal<string> = signal(this.genders[0]);
  private router: Router = inject(Router);
  val: string = 'abcd';
  ngOnInit() {
    this.initForm();
  }

  private http: HttpService = inject(HttpService);

  initForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gender: new FormControl(this.gendr(), Validators.required),
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  submitForm(): void {
    const payLoad = this.registerForm.value;
    console.log('submit invoked', payLoad);
    this.http.adminPOST('register', payLoad).subscribe({
      next: (res: any) => {
        console.log('res from register', res);
        if (!res.success) return;
        this.router.navigate(['profile']);
      },
      error: (e: any) => console.log('error while register', e),
      complete: () => console.log('login submit completed'),
    });
  }
}
