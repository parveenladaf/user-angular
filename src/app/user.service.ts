import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.BASE_URL;

  constructor(public matSnackBar:MatSnackBar, private httpClient:HttpClient) { }

  openToast(message, action, duration?: number) {
    message = message.match(/.{1,65}/g).join(' ');
    this.matSnackBar.open(message, action, {
      duration: duration || 3500,
      panelClass: ['blue-snackbar']
    });
  }

  add(body) {
      const addUser = `${this.BASE_URL}`;
      return this.httpClient.post(addUser, body, httpOptions);
  }
}
