import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private url:string='http://localhost:8080/service';

  constructor(private _http:HttpClient) { }

  getEmployees() :Observable<User[]>{
    return this._http.get<User[]>(this.url);
  }

  enrollEmployee(userData:User): Observable <User[]>{
    return this._http.post<User[]>(this.url+"/create",userData);
  }

  removeEmployee(id:number):Observable<User[]>{
    return this._http.delete<User[]>(`${this.url+"/delete"}/${id}`);    
  }

  getDataById(id: any):Observable<User[]> {
   return this._http.get<User[]>(`${this.url+"/get"}/${id}`);
  }

  updateById(userData:User,id:number): Observable <User[]>{
    return this._http.put<User[]>(`${this.url+"/update"}/${id}`,userData);
  }

}
