import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{
  HttpClient,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

import { ApiService } from './api.service';
import { Request } from '../models/request';
import { Client } from '../models/client';
import { Host } from '../models/host';

@Injectable({
  providedIn: 'root'
})
export class WebaccessService {
  token:string;
  endPoint:string;

  constructor(@Inject('WEBACCS') ENDPOINT,private http:HttpClient,private ApiService:ApiService) {
    this.endPoint = ENDPOINT;
  }
  _buildAuthHeader():HttpHeaders{
    return new HttpHeaders({'auth_token':this.ApiService.token});
  }
  getRequest(id:number):Observable<Request[]>{
    let url = this.endPoint + '/request';
    if(id !== undefined){
      url += '/' + id;
    }
    return this.http.get<Request[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{
      return response.map((request)=>{
        return new Request(request);
      })
    }));
  }
  getHost(id?:number):Observable<Host[]>{
    let url = this.endPoint + '/host';
    if(id !== undefined){
      url += '/' + id;
    }
    return this.http.get<Host[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{
      return response.map((host)=>{
        return new Host(host);
      });
    }));
  }
  getClient(id:number):Observable<Client[]>{
    let url = this.endPoint + '/client';
    if(id !== undefined){
      url += '/' + id;
    }
    return this.http.get<Client[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{
      return response.map((client)=>{
        return new Client(client);
      });
    }));
  }
  getDailyRequestTotal(dateStr?:string):Observable<any>{
    let url = this.endPoint + '/request/daily';
    if(dateStr !== undefined){
      url += '/' + dateStr;
    }
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{
      return response;
    }));
  }
  group(endPoint:string,key:string,value:string):Observable<any>{
    let url = this.endPoint + '/' + endPoint + '/group/' + key + "/" + value;
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response;}));
  }
  count(endPoint:string):Observable<any>{
    let url = this.endPoint + '/' + endPoint + '/count';
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response;}));
  }
  search(endPoint:string,key:string,value:string):Observable<Request[]>{
    let url = this.endPoint + '/' + endPoint + '/search/' + key + '/' + value;
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response;}));
  }
  recent(endPoint:string,limit:number):Observable<any>{
    let url = this.endPoint + '/' + endPoint + '/recent/' + limit;
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response;}));
  }
}
