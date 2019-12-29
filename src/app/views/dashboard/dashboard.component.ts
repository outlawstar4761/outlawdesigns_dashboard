import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { WebaccessService } from '../../services/webaccess.service';
import { ApiService } from '../../services/api.service';
import { AccountService } from '../../services/account.service';
import { LoeService } from '../../services/loe.service';
import { Host } from '../../models/host';
import autobahn from 'autobahn';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(
    private WebaccessService:WebaccessService,
    private ApiService:ApiService,
    private AccountService:AccountService,
    private LoeService:LoeService
  ){}

  radioModel: string = 'Week';
  public loeCounts: any = {};
  public weeklyStreaming: any = {};
  public _hosts: Array<Host> = [];
  public _lineChartLabel: string = 'Daily Requests';
  public _logMonitorWaitHours: number = .75;
  public _logMonitorCountDown: string;
  public _wampConnection: any;
  public _outreachTorrents: Array<any>;
  public _outreachIp: string = '127.0.0.1';
  public _logInterval: any;
  public _torrentInterval: any;
  public _torrentInfo: any = {};
  public _torrentStats: any = {};


  public monthLabels: Array<string> = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  public dayLabels: Array<string> = [
    'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
  ];
  public yearlyTotals: any = {
    'January':0,
    'February':0,
    'March':0,
    'April':0,
    'May':0,
    'June':0,
    'July':0,
    'August':0,
    'September':0,
    'October':0,
    'November':0,
    'December':0
  };
  public streamingTotals: any = {
    'song':0,
    'movie':0,
    'doc':0,
    'episode':0
  };
  public monthlyTotals: any = {};
  public weeklyTotals: any = {};
  public now: Date = new Date();
  public dailyRequestLabels: Array<any> = [];
  public weeklyMusicGenreLabels: Array<any> = ['Death Metal','Black Metal','Thrash Metal','Rap','Hip-Hop','Country','Jazz','Pop'];
  public lineChartLegend = false;
  public lineChartType = 'line';

  public musicGenreData: Array<any> = [
    {
      data: [22,9,7,19,10,15,5,14],
      label: ['Downloads']
    }
  ];
  public lineChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public genreChartColors: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];

  // mainChart
  public _mainChartYAxisMax: number;
  public _mainChartYAxisStepSize: number;
  public mainChartData1: Array<number> = [];
  public mainChartLabels: Array<any> = [];
  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    }
  ];
  /* tslint:disable:max-line-length */
  //public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            // return value.charAt(0);
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: this._mainChartYAxisStepSize,
          max: this._mainChartYAxisMax
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  public genreChartType = 'bar';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = true;
  public brandBoxChartType = 'line';

  ngOnInit(): void {
    this.AccountService.checkCookie();
    this._getHosts();
    this._buildRequestCounts();
    this._buildLoeCounts();
    this._startLogMonitorCountDown();
    this._wampInit();
  }
  public _getHosts(){
    this.WebaccessService.getHost().subscribe((hosts)=>{
      hosts.forEach((host)=>{
        host._rawData = [];
        this._hosts.push(host);
      });
      this._buildWeeklyRequests();
      this._testServices();
    });
  }
  public _buildRequestCounts(){
    let theDate = new Date();
    let thisMonth = theDate.getMonth();
    let thisYear = theDate.getFullYear();
    let thisWeek = this._buildWeeklyDates();
    this.WebaccessService.getDailyRequestTotal().subscribe((data)=>{
      data.forEach((obj)=>{
        let reqDate = new Date(obj.reqDate);
        let reqCount = parseInt(obj.requests);
        if(reqDate.getFullYear() == thisYear){
          this.yearlyTotals[this._getMonthLabel(reqDate.getMonth())] += reqCount;
          if(reqDate.getMonth() == thisMonth){
            this.monthlyTotals[obj.reqDate] = reqCount;
          }
        }
        for(let i in thisWeek){
          let testDate = new Date(thisWeek[i]);
          if(reqDate.getDate() == testDate.getDate() && reqDate.getMonth() == testDate.getMonth() && reqDate.getFullYear() == testDate.getFullYear()){
            this.weeklyTotals[obj.reqDate] = reqCount;
          }
        }
      });
      for(let i in this.yearlyTotals){
        this.mainChartLabels.push(i);
        this.mainChartData1.push(this.yearlyTotals[i]);
      }
      this._getMainChartMax();
    });
  }
  public _updateMainChart(){
    let updateData = [];
    let updateLabels = [];
    let data = null;
    switch(this.radioModel){
      case 'Year':
      data = this.yearlyTotals;
      break;
      case 'Month':
      data = this.monthlyTotals;
      break;
      case 'Week':
      data = this.weeklyTotals;
      break;
    }
    for(let i in data){
      if(this.radioModel == 'Week' || this.radioModel == 'Month'){
        updateData.unshift(data[i]);
        updateLabels.unshift(i);
      }else{
        updateData.push(data[i]);
        updateLabels.push(i);
      }
    }
    this.mainChartData[0].data = updateData;
    this.mainChartLabels = updateLabels;
    this._getMainChartMax();
  }
  public _buildWeeklyRequests(){
    let dates = this._buildWeeklyDates();
    for(let i in dates){
      this.WebaccessService.search('request','requestDate',dates[i]).subscribe((requests)=>{
        let sortedData = this._sortRequests(requests);
        this.dailyRequestLabels.push(dates[i]);
        this._hosts.forEach((host)=>{
          let keys = Object.keys(sortedData);
          if(keys.indexOf(host.label + '_' + host.port) !== -1){
            host._rawData.push(sortedData[host.label + '_' + host.port].length);
          }else{
            host._rawData.push(0);
          }
        });
        if(this.dailyRequestLabels.length === 7){
          this._sortValues();
        }
      });
    }
  }
  public _buildLoeCounts(){
    let models = ['song','movie','doc','episode'];
    let streamingModels = ['song'];
    models.forEach((model)=>{
      this.LoeService.getModelCount(model).subscribe((resultObj)=>{
        this.loeCounts[model] = parseInt(resultObj.count);
      });
    });
    let dates = this._buildWeeklyDates();
    dates.forEach((date)=>{
      let label = this._getDayLabel(date);
      this.weeklyStreaming[date] = {};
      streamingModels.forEach((model)=>{
        let key = 'played' + model.charAt(0).toUpperCase() + model.slice(1);
        this.LoeService.search(key,'playDate',date).subscribe((played)=>{
          this.weeklyStreaming[date][model] = played.length;
          this.streamingTotals[model] += played.length;
        });
      });
    });
  }
  public _buildDateStr(dateStr){
    let theDate = (dateStr === undefined ? new Date():new Date(dateStr));
    return theDate.getFullYear() + "-" + (theDate.getMonth() + 1) + "-" + (theDate.getDate() < 10 ? "0" + theDate.getDate() : theDate.getDate());
  }
  public _getMonthLabel(monthNum){
    return this.monthLabels[monthNum];
  }
  public _getDayLabel(dateStr){
    return this.dayLabels[new Date(dateStr).getDay()];
  }
  public _buildWeeklyDates(){
    let today = new Date();
    let dates = [];
    dates.push(this._buildDateStr(today));
    for(let i = 6; i > 0; i--){
      today.setDate(today.getDate() - 1);
      dates.push(this._buildDateStr(today));
    }
    return dates;
  }
  public _sortRequests(data){
    let _goodData = {};
    for(let i in data){
      let key = data[i].host + '_' + data[i].port;
      if(!_goodData[key]){
        _goodData[key] = [];
        _goodData[key].push(data[i]);
      }else{
        _goodData[key].push(data[i]);
      }
    }
    return _goodData;
  }
  public _sortValues(){
    let tmpDates = [...this.dailyRequestLabels].sort();
    let tmpArr = [];
    this._hosts.forEach((host)=>{
      tmpDates.forEach((date)=>{
        let index = this.dailyRequestLabels.indexOf(date);
        host._sortedData.push(host._rawData[index]);
      });
    });
    this.dailyRequestLabels.sort();
  }
  public _testServices(){
    this._hosts.forEach((host)=>{
      this.ApiService.testService('http://' + host.label + ':' + host.port + '/verify').subscribe((response)=>{
        host._tileClass[2] = 'bg-success';
        host._chartColors[0].backgroundColor = getStyle('--success');
      },(err)=>{
        host._tileClass[2] = 'bg-danger';
        host._chartColors[0].backgroundColor = getStyle('--danger');
      });
    });
  }
  public _getMainChartMax(){
    let highest = [...this.mainChartData1].sort()[this.mainChartData1.length - 1];
    this._mainChartYAxisMax = (highest * .10) + highest;
    this._mainChartYAxisStepSize = Math.ceil(this._mainChartYAxisMax / 10);
  }
  public _calculateNextLogMonitorRun(lastRunStr){
    let localTime = new Date(lastRunStr + ' UTC');
    let nextRun = new Date(localTime.getTime() + (this._logMonitorWaitHours * 60 * 60 * 1000));
    return nextRun;
  }
  public _startLogMonitorCountDown(){
    this.WebaccessService.recent('logmonitorrun',1).subscribe((lastRun)=>{
      this._logInterval = setInterval(()=>{
        let nextRun = this._calculateNextLogMonitorRun(lastRun[0].StartTime + ' UTC');
        let now = new Date().getTime();
        let difference = nextRun.getTime() - now;
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        this._logMonitorCountDown = hours + 'h ' + minutes + 'm ' + seconds + 's';
        if(difference < 0){
          clearInterval(this._logInterval);
          this._logMonitorCountDown = 'Executing';
        }
      },1000);
    });
  }
  public _startTorrentUpdate(){
    this._updateTorrents();
    this._torrentInterval = setInterval(()=>{
      this._updateTorrents();
      this._updateTorrentStats();
    },300);

  }
  public _wampInit(){
    this._wampConnection = new autobahn.Connection({
      url:'ws://api.outlawdesigns.io:9700/ws',
      realm:'realm1'
    });
    this._wampConnection.onopen = (session)=>{
      this._startTorrentUpdate();
      this._updateTorrentInfo();
      this._checkOutreachIp();
    };
    this._wampConnection.open();
  }
  public _checkOutreachIp(){
    this._wampConnection.session.call('io.outlawdesigns.outreach.checkIp').then((serverIp)=>{
      this._outreachIp = serverIp;
    },console.log);
  }
  public _updateTorrents(){
    this._wampConnection.session.call('io.outlawdesigns.outreach.getTorrents').then((torrentList)=>{
      this._outreachTorrents = torrentList;
    });
  }
  public _startTorrent(torrentId){
    this._wampConnection.session.call('io.outlawdesigns.outreach.startTorrent',[torrentId]).then(console.log,console.log);
  }
  public _stopTorrent(torrentId){
    this._wampConnection.session.call('io.outlawdesigns.outreach.stopTorrent',[torrentId]).then(console.log,console.log);
  }
  public _removeTorrent(torrentId){
    this._wampConnection.session.call('io.outlawdesigns.outreach.removeTorrent',[torrentId]).then(console.log,console.log);
  }
  public _radTorrent(torrentId){
    this._wampConnection.session.call('io.outlawdesigns.outreach.removeTorrentAndData',[torrentId]).then(console.log,console.log);
  }
  public _updateTorrentInfo(){
    this._wampConnection.session.call('io.outlawdesigns.outreach.getSessionInfo').then((info)=>{
      this._torrentInfo = info;
    },console.log);
  }
  public _updateTorrentStats(){
    this._wampConnection.session.call('io.outlawdesigns.outreach.getSessionStats').then((stats)=>{
      this._torrentStats = stats;
    },console.log);
  }
}
