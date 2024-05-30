import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../services/http.service';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  protected loginForm!: FormGroup;
  private router: Router = inject(Router);
  response: string = '';

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      loginID: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  private http: HttpService = inject(HttpService);

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  submitForm(): void {
    const payLoad = this.loginForm.value;
    console.log('submit invoked', payLoad);
    this.http.adminPOST('login', payLoad).subscribe({
      next: (res: any) => {
        console.log('res from login', res);
        this.response = res.error;
        if (!res.success) return;
        const { token, user } = res;
        localStorage.setItem('ae_token', JSON.stringify(token));
        localStorage.setItem('ae_user', JSON.stringify(user));
        this.router.navigate(['profile']);
      },
      error: (e: any) => console.log('error while login', e),
      complete: () => console.log('login submit completed'),
    });
  }
}
