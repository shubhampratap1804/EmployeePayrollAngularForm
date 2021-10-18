import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from './IEmployee';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private url:string='http://localhost:8080/service';

  constructor(private _http:HttpClient) { }

  /**
   * 
   * @returns fetching all data from database using get _http method
   */
  getEmployees() :Observable<User[]>{
    return this._http.get<User[]>(this.url);
  }

  /**
   * 
   * @param userData to store data into database using post _http method
   * @returns 
   */
  enrollEmployee(userData:User): Observable <User[]>{
    return this._http.post<User[]>(this.url+"/create",userData);
  }

  /**
   * 
   * @param id to delete data from database according to employee id using delete _http method
   * @returns 
   */
  removeEmployee(id:number):Observable<User[]>{
    return this._http.delete<User[]>(`${this.url+"/delete"}/${id}`);    
  }

  /**
   * 
   * @param id getting data from database according to id using get _http method
   * @returns 
   */
  getDataById(id: any):Observable<User[]> {
   return this._http.get<User[]>(`${this.url+"/get"}/${id}`);
  }

  /**
   * 
   * @param userData updating data to database according to id using put _http method
   * @param id 
   * @returns 
   */
  updateById(userData:User,id:number): Observable <User[]>{
    return this._http.put<User[]>(`${this.url+"/update"}/${id}`,userData);
  }

}
