import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Company } from 'src/app/shared/models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private API_URL = environment.API_URL + 'companies';

  constructor(private http: HttpClient) {}

  // Get Companies List
  getCompanies(): Observable<Company> {
    return this.http.get<Company>(`${this.API_URL}`);
  }
}
