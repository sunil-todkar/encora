import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Contact } from '../../shared/models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactURL = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Get Contacts List
  getContacts(): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactURL}/contacts`);
  }

  // Create contacts
  createContacts(contact: Contact): Observable<any> {
    return this.http
      .post<any>(this.contactURL + '/contacts', contact)
      .pipe(catchError(this.error));
  }

  // Update contacts
  updateContact(id: string, contact: Contact): Observable<Contact[]> {
    return this.http.put<Contact[]>(
      `${this.contactURL}/contacts/${id}`,
      contact,
      {
        headers: this.headers,
      }
    );
  }

  // Get contact detsila by id
  getCotactDetails(id: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactURL + '/contacts/' + id);
  }

  // Delete a product
  deleteContact(id: any): Observable<Contact[]> {
    const url = `${this.contactURL}/contacts/${id}`;
    return this.http.delete<Contact[]>(url, {
      headers: this.headers,
    });
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
