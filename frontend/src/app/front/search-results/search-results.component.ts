import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  private http: HttpService = inject(HttpService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.getFlights();
  }

  getFlights(): void {
    this.activatedRoute.queryParams.subscribe((prms) => {
      const { dep_iata, arr_iata, dep_actual } = prms;
      console.log('query params = ', dep_iata, ' ', arr_iata);
      this.http.getFlights(dep_iata, arr_iata).subscribe({
        next: (res) => {
          console.log('flight search results', res);
        },
        error: (e) => {
          console.log('error occured', e);
        },
      });
    });
  }
}
