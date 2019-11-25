export class Request {
  id:number;
  host:string;
  port:number;
  ip_address:string;
  platform:string;
  browser:string;
  version:string;
  responseCode:string;
  requestDate:string;
  requestMethod:string;
  query:string;
  referrer:string;

  constructor(obj?: any){
    this.id = obj && obj.id || null;
    this.host = obj && obj.host || null;
    this.port = obj && obj.port || null;
    this.ip_address = obj && obj.ip_address || null;
    this.platform = obj && obj.platform || null;
    this.browser = obj && obj.browser || null;
    this.version = obj && obj.version || null;
    this.responseCode = obj && obj.responseCode || null;
    this.requestDate = obj && obj.requestDate || null;
    this.requestMethod = obj && obj.requestMethod || null;
    this.query = obj && obj.query || null;
    this.referrer = obj && obj.referrer || null;
  }
}
