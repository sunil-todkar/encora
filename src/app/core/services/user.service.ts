import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL + 'users';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Get Users
  getUsers(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}`);
  }
}
