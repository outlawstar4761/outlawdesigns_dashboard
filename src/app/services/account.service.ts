import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject, BehaviorSubject,Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import{
  HttpClient,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

import { ApiService } from './api.service';
import { User } from '../models/user';
import { UserLocation } from '../models/userlocation';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  token:string;
  endPoint:string;
  Users: Subject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(@Inject('ACCOUNT') ENDPOINT,private http:HttpClient,private ApiService:ApiService,private cookie:CookieService,private router:Router) {
    this.endPoint = ENDPOINT;
  }
  _buildAuthHeader():HttpHeaders{
    return new HttpHeaders({'auth_token':this.token});
  }
  login(username,password):void{
    this.ApiService.authenticate(username,password).subscribe((response)=>{
      if(!response['error']){
        this.ApiService.token = response.token;
        this.token = this.ApiService.token;
        this.cookie.set('auth_token',this.ApiService.token);
        this.checkCookie();
      }else{
        this.router.navigateByUrl('/login');
        console.log(response);
      }
    });
  }
  checkCookie():void{
    if(this.cookie.check('auth_token')){
      this.ApiService.token = this.cookie.get('auth_token');
      this.ApiService.verifyToken().subscribe((response)=>{
        if(!response['error']){
          this.router.navigateByUrl('/dashboard');
        }else{
          console.log(response);
          this.router.navigateByUrl('/login');
        }
      },console.log);
    }
  }
  getUser(id:number):Observable<User[]>{
    let url = this.endPoint + '/user';
    if(id !== undefined){
      url += '/' + id;
    }
    return this.http.get<User[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{
      return response.map((user)=>{return new User(user);});
    }));
  }
  getUserLocation(id:number):Observable<UserLocation[]>{
    let url = this.endPoint + '/location';
    if(id !== undefined){
      url += '/' + id;
    }
    return this.http.get<UserLocation[]>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{
      return response.map((location)=>{return new UserLocation(location);});
    }));
  }
}
