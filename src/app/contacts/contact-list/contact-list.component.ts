import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

import { ContactService } from '../../core/services/contact.service';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  bsModalRef?: BsModalRef;

  constructor(
    private contactService: ContactService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Load companies data from API
  loadCompanies() {
    this.SpinnerService.show();
    this.contactService.getContacts().subscribe(
      (response: any) => {
        this.contacts = response;
        this.SpinnerService.hide();
        console.log('Contact List Is - ', this.contacts);
      },
      (error) => {
        console.log('Error In Loading Contacts Data', error);
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

  // Opens view contact data
  openModalWithComponent(id: any) {
    const contactObj = this.contacts.find((item) => {
      return item.id == id;
    });

    const initialState: any = {
      contact: contactObj,
    };

    if (id == 0) {
      this.bsModalRef = this.modalService.show(AddContactComponent, {
        class: 'modal-lg',
      });
    } else {
      this.bsModalRef = this.modalService.show(AddContactComponent, {
        initialState,
        class: 'modal-lg',
      });
    }

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  // On delete a contact
  onDeleteContact(id: number) {
    Swal.fire({
      title: 'Do you want to delete a contact?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.SpinnerService.show();
        this.contactService.deleteContact(id).subscribe(
          (response: any) => {
            this.SpinnerService.hide();
            this.loadCompanies();
            Swal.fire({
              title: 'Contact Deleted Successfully!',
              showCancelButton: true,
              confirmButtonText: `Ok`,
            });
          },
          (error) => {
            this.SpinnerService.hide();
            Swal.fire({
              title: 'Error! Please try again later..',
              showCancelButton: true,
              confirmButtonText: `Ok`,
            });
          }
        );
      } else if (result.isDenied) {
      }
    });
  }
}
