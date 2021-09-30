import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  modalRef: BsModalRef;
  idParam: string = '';
  isUpadte: boolean = false;
  contact?: any;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });

    if (this.contact) {
      this.idParam = this.contact['id'];
      if (this.idParam) {
        this.isUpadte = true;
        this.updateForm();
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    // display form values on success
    let contact = this.contactForm.value;
    this.createcontact(contact);
  }

  // Create a contact method
  createcontact(contact: any) {
    this.SpinnerService.show();
    if (this.isUpadte) {
      this.contactService
        .updateContact(this.idParam, contact)
        .subscribe((response: any) => {
          this.SpinnerService.hide();
          Swal.fire({
            title: 'contact Updated Successfully!',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
          this.onBack();
        }),
        (error: any) => {
          console.log('Error - ', error);
          this.SpinnerService.hide();
          Swal.fire({
            title: 'Error! Please try again later..',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
        };
    } else {
      this.contactService.createContacts(contact).subscribe((response: any) => {
        this.SpinnerService.hide();
        Swal.fire({
          title: 'Contact Created Successfully!',
          showCancelButton: true,
          confirmButtonText: `Ok`,
        });
        this.onBack();
      }),
        (error: any) => {
          console.log('Error - ', error);
          this.SpinnerService.hide();
          Swal.fire({
            title: 'Error! Please try again later..',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
        };
    }
  }

  updateForm() {
    this.SpinnerService.show();
    this.contactService
      .getCotactDetails(this.idParam)
      .subscribe((response: any) => {
        this.contactForm.patchValue(response);
        this.SpinnerService.hide();
      });
  }

  onBack() {
    this.bsModalRef.hide();
  }
}
