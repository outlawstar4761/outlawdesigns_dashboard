import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{
  HttpClient,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoeService {
  token:string;
  endPoint:string;

  constructor(@Inject('LOE') ENDPOINT,private http:HttpClient,private ApiService:ApiService) {
    this.endPoint = ENDPOINT;
  }
  _buildAuthHeader():HttpHeaders{
    return new HttpHeaders({'auth_token':this.ApiService.token});
  }
  getModelCount(endPoint:string):Observable<any>{
    let url = this.endPoint + '/' + endPoint + '/count';
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response;}));
  }
  search(endPoint:string,key:string,value:string):Observable<any>{
    let url = this.endPoint + '/' + endPoint + '/search/' + key + '/' + value;
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response;}));
  }
}
