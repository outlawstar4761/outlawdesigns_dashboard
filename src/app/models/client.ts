export class Client {
  Id:number;
  IpAddress:string;
  StreetAddress:number;
  City:string;
  Country:string;
  CountryCode:string;
  Isp:string;
  lat:string;
  lon:string;
  Org:string;
  Region:string;
  RegionName:string;
  TimeZone:string;
  Zip:string;
  Malevolent:number;

  constructor(obj?: any){
    this.Id = obj && obj.Id || null;
    this.IpAddress = obj && obj.IpAddress || null;
    this.StreetAddress = obj && obj.StreetAddress || null;
    this.City = obj && obj.City || null;
    this.Country = obj && obj.Country || null;
    this.CountryCode = obj && obj.CountryCode || null;
    this.Isp = obj && obj.Isp || null;
    this.lat = obj && obj.lat || null;
    this.lon = obj && obj.lon || null;
    this.Org = obj && obj.Org || null;
    this.Region = obj && obj.Region || null;
    this.RegionName = obj && obj.RegionName || null;
    this.TimeZone = obj && obj.TimeZone || null;
    this.Zip = obj && obj.Zip || null;
    this.Malevolent = obj && obj.Malevolent || null;
  }
}
