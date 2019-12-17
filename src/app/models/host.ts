import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

export class Host {
  id:number;
  label:string;
  friendlyLabel:string;
  port:number;
  log_path:string;
  _rawData:Array<number>;
  _sortedData:Array<number>;
  _tileClass:Array<string>;
  _chartData:Array<any>;
  _chartColors:Array<any>;

  constructor(obj?: any){
    this.id = obj && obj.id || null;
    this.label = obj && obj.label || null;
    this.friendlyLabel = obj && obj.friendlyLabel || null;
    this.port = obj && obj.port || null;
    this.log_path = obj && obj.log_path || [];
    this._sortedData = obj && obj._sortedData || [];
    this._tileClass = obj && obj._tileClass || ['card','text-white','bg-primary'];
    this._chartData = obj && obj._chartData || [{data:this._sortedData,label:'Daily Requests'}];
    this._chartColors = obj && obj._chartColors || [{backgroundColor: getStyle('--primary'),borderColor: 'rgba(255,255,255,.55)',}];
  }
}
