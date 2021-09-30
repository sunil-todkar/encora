import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  public isUserLoggedIn = this.authService.isAuthenticated$;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  gotoHome() {
    this.router.navigate(['/about']);
  }

  // logout function
  onLogout() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['']);
  }
}
