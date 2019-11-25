export class Host {
  id:number;
  label:string;
  port:number;
  log_path:string;

  constructor(obj?: any){
    this.id = obj && obj.id || null;
    this.label = obj && obj.label || null;
    this.port = obj && obj.port || null;
    this.log_path = obj && obj.log_path || null;
  }
}
