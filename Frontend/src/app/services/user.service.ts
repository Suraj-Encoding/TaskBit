import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../components/common/baseUrl';
import { User } from '../components/common/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = BASE_URL + "/users"

  constructor(private _http: HttpClient) { }

  register(user: any) : Observable<User> {
    return this._http.post<User>(`${this.url}/register`, {...user});
  }

  login(user: any): Observable<UserReturnType> {
    return this._http.post<UserReturnType>(`${this.url}/login`, {...user});

  }

  forget(user: any): Observable<User> {
    return this._http.post<User>(`${this.url}/forget`, {...user});
  }
  
  logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
  }
}

interface UserReturnType {
  user: {
    _id: "",
    username: ""
  },
  token: string
}
