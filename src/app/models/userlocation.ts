export class UserLocation {
  UID:number;
  user:string;
  ip:number;
  lat:string;
  lon:string;
  mac:string;
  created_date:string;

  constructor(obj?: any){
    this.UID = obj && obj.UID || null;
    this.user = obj && obj.user || null;
    this.ip = obj && obj.ip || null;
    this.lat = obj && obj.lat || null;
    this.lon = obj && obj.lon || null;
    this.mac = obj && obj.mac || null;
    this.created_date = obj && obj.created_date || null;
  }
}
