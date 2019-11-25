export class User {
  UID:number;
  username:string;
  password:number;
  auth_token:string;
  token_expiration:string;
  secret:string;
  ip_address:string;
  mac_address:string;
  lat:number;
  lon:number;
  created_date:string;
  updated_date:string;
  updated_by:string;
  last_login:string;
  status_id:string;
  first_name:string;
  last_name:string;
  dob:string;
  street_address:string;
  city:string;
  state:string;
  email:string;
  phone:string;
  domain:string;
  login_attempts:number;
  lock_out:number;
  lock_out_expiration:string;

  constructor(obj?: any){
    this.UID = obj && obj.UID || null;
    this.username = obj && obj.username || null;
    this.password = obj && obj.password || null;
    this.auth_token = obj && obj.auth_token || null;
    this.token_expiration = obj && obj.token_expiration || null;
    this.secret = obj && obj.secret || null;
    this.ip_address = obj && obj.ip_address || null;
    this.mac_address = obj && obj.mac_address || null;
    this.lat = obj && obj.lat || null;
    this.lon = obj && obj.lon || null;
    this.created_date = obj && obj.created_date || null;
    this.updated_date = obj && obj.updated_date || null;
    this.updated_by = obj && obj.updated_by || null;
    this.last_login = obj && obj.last_login || null;
    this.status_id = obj && obj.status_id || null;
    this.first_name = obj && obj.first_name || null;
    this.last_name = obj && obj.last_name || null;
    this.dob = obj && obj.dob || null;
    this.street_address = obj && obj.street_address || null;
    this.city = obj && obj.city || null;
    this.state = obj && obj.state || null;
    this.email = obj && obj.email || null;
    this.phone = obj && obj.phone || null;
    this.domain = obj && obj.domain || null;
    this.login_attempts = obj && obj.login_attempts || null;
    this.lock_out = obj && obj.lock_out || null;
    this.lock_out_expiration = obj && obj.lock_out_expiration || null;
  }
}
