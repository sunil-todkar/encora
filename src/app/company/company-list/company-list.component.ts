import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { CompanyService } from '../../core/services/company.service';
import { Company } from '../../shared/models/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor(
    private companyService: CompanyService,
    private SpinnerService: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Load companies data from API
  loadCompanies() {
    this.SpinnerService.show();
    this.companyService.getCompanies().subscribe(
      (response: any) => {
        this.companies = response;
        this.SpinnerService.hide();
        console.log('User List Is - ', this.companies);
      },
      (error) => {
        console.log('Error In Loading Companies Data', error);
        this.SpinnerService.hide();
      }
    );
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  // Navigate to contact list page
  showContact() {
    this.router.navigate(['contact/contact-list']);
  }
}
