import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  users: User[] = [];
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\W).*$/),
        ],
      ],
    });

    this.loadUsers();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // display form values on success
    let userName = this.loginForm.value.userName;
    this.isUserAuthinticate(userName);
  }

  // Load Users
  loadUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response;
        console.log('User List Is - ', this.users);
      },
      (error) => {
        console.log('Error In Loading Users Data', error);
      }
    );
  }

  // User authintication checking
  isUserAuthinticate(userName: string) {
    let userResult = this.users.find((item: User) => {
      return item.email === userName;
    });
    if (userResult) {
      this.isError = false;
      localStorage.setItem('isLoggedIn', 'true');
      this.authService.login();
      this.router.navigate(['company/company-list']);
    } else {
      this.isError = true;
    }
  }
}
