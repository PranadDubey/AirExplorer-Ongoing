import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import internal from 'stream';
import { HttpService } from '../services/http.service';
import { Router, RouterLink } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  airports: string[] = ['Delhi', 'Mumbai', 'Chennai'];
  trips: string[] = ['One-Way', 'Round Trip'];
  passengerNumber = 0;
  protected searchForm!: FormGroup;
  private http: HttpService = inject(HttpService);
  timer: NodeJS.Timeout | undefined;
  protected cities: WritableSignal<any[]> = signal([]);
  private router: Router = inject(Router);

  ngOnInit() {
    this.initForm();
    this.loadCities();
  }

  initForm(): void {
    this.searchForm = new FormGroup({
      trip: new FormControl('', Validators.required),
      departure_city: new FormControl('', Validators.required),
      arrival_city: new FormControl('', Validators.required),
      departure_date: new FormControl('', Validators.required),
      return_date: new FormControl('', Validators.required),
      passengersNo: new FormControl(0, Validators.required),
    });
  }

  addPassenger(): void {
    this.passengerNumber++;
    this.searchForm.get('passengersNo')?.setValue(this.passengerNumber);
  }

  removePassenger(): void {
    if (this.passengerNumber > 0) this.passengerNumber--;
    else this.passengerNumber = 0;
    this.searchForm.get('passengersNo')?.setValue(this.passengerNumber);
  }

  navigateTo(): void {
    const payLoad = this.searchForm.value;
    console.log('payLoad', payLoad);
    const fromObject = {
      dep_iata: payLoad.departure_city,
      arr_iata: payLoad.arrival_city,
      dep_actual: payLoad.departure_date,
    };
    console.log('query params', fromObject);

    this.router.navigate(['search-results'], { queryParams: fromObject });
  }

  check: WritableSignal<boolean> = signal(true);

  checkTrip(event: Event): void {
    var trip = (event.target as HTMLInputElement).value;
    // var trip = document.getElementById('tripCheck') ;
    var way = trip;
    console.log(way);
    if (way === 'One-Way') this.check.set(false);
    else if (way === 'Round Trip') this.check.set(true);
  }

  searchFlights(): void {
    const formVals = this.searchForm.value;
    formVals.departure;
    const queryString: string[] = ['flight_date=' + formVals.departure, ''];
    const api = '';
  }

  loadCities(): void {
    this.http.getAllCities().subscribe({
      next: (res) => {
        console.log('cities res', res);
        this.cities.set(res.response);
        console.log('cities', this.cities);
      },
      error: (e) => console.log('error while loading cities', e),
    });
  }

  searchCity(event: Event): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const filterVal = (event.target as HTMLInputElement).value;
      console.log('filterVal', filterVal);
      this.http.getCities(filterVal).subscribe({
        next: (res) => {
          console.log('cities res', res);
        },
        error: (e) => console.log('error while loading cities', e),
      });
    }, 400);
  }
}
