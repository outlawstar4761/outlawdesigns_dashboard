import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{
  HttpClient,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token:string;
  endPoint:string;

  constructor(@Inject('ACCOUNT') ENDPOINT, private http:HttpClient) {
    this.endPoint = ENDPOINT;
  }
  _buildAuthHeader():HttpHeaders{
    return new HttpHeaders({'auth_token':this.token});
  }
  authenticate(username,password):Observable<any>{
    let headers = new HttpHeaders({'request_token':username,'password':password});
    let url = this.endPoint + '/authenticate';
    return this.http.get<any>(url,{headers:headers}).pipe(map(response=>{return response}));
  }
  verifyToken():Observable<any>{
    let url = this.endPoint + '/verify';
    return this.http.get<any>(url,{headers:this._buildAuthHeader()}).pipe(map(response=>{return response}));
  }

}
