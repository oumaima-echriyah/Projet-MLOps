import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})

export class SignupService {
  private apiUrl = 'http://fastapi-service:8000/users/';

  constructor(private http: HttpClient) { }
  createUser(user: User): Observable<any> {
    console.log(user)
    return this.http.post<any>(this.apiUrl,user);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log(credentials)
    return this.http.post<any>('http://fastapi-service:8000/users/login/', credentials);
  }
}
