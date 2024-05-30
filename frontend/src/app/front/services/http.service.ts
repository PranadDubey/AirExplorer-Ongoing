import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);
  private rootURL: string = environment.rootURL;
  private airBase: string = environment.airBase;
  private adminPrefix: string = '';
  private accessKeyAir: string = environment.accessKeyAir;

  constructor() {}

  adminPOST(apiName: string, payLoad: any): Observable<any> {
    return this.http.post(this.rootURL + this.adminPrefix + apiName, payLoad);
  }
  adminGET(apiName: string): Observable<any> {
    return this.http.get(this.rootURL + this.adminPrefix + apiName);
  }
  adminPUT(apiName: string, payload: any): Observable<any> {
    return this.http.get(this.rootURL + this.adminPrefix + apiName, payload);
  }
  adminDELETE(apiName: string): Observable<any> {
    return this.http.delete(this.rootURL + this.adminPrefix + apiName);
  }

  getFlightStatus(queryString: string[]): Observable<any> {
    return this.http.get(
      this.airBase +
        'flights?api_key=' +
        this.accessKeyAir +
        '&' +
        queryString.join('&')
    );
  }

  getFlights(dep_iata: string, arr_iata: string): Observable<any> {
    return this.http.get(
      this.airBase +
        'schedules?dep_iata=' +
        dep_iata +
        '&arr_iata=' +
        arr_iata +
        '&api_key=' +
        this.accessKeyAir
    );
  }

  getAllCities(): Observable<any> {
    console.log(this.airBase + 'cities?api_key=' + this.accessKeyAir);
    return this.http.get(this.airBase + 'cities?api_key=' + this.accessKeyAir);
  }

  getCities(cityStr: string): Observable<any> {
    console.log(this.airBase + 'cities?api_key=' + this.accessKeyAir);
    return this.http.get(
      this.airBase +
        'cities?city_code=' +
        cityStr +
        '&api_key=' +
        this.accessKeyAir
    );
  }
}
