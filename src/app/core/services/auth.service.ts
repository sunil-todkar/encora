import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    const authenticated = !!JSON.parse(localStorage.getItem('isLoggedIn'));
    this.isAuthenticated$.next(authenticated);
  }

  login() {
    this.isAuthenticated$.next(true);
  }

  logout() {
    this.isAuthenticated$.next(false);
  }
}
