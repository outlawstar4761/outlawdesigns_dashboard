import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { WebaccessService } from '../../services/webaccess.service';
import { ApiService } from '../../services/api.service';
import { AccountService } from '../../services/account.service';
import { LoeService } from '../../services/loe.service';

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

  radioModel: string = 'Year';
  protected rawRandomWords:Array<number> = [];
  protected rawAccounts: Array<number> = [];
  protected rawWebAccess:Array<number> = [];
  protected rawMessenger: Array<number> = [];
  protected rawLOE: Array<number> = [];
  protected rawBuddyLive: Array<number> = [];
  protected rawBuddyDev: Array<number> = [];
  protected randomWordRequests: Array<number> = [];
  protected accountRequests: Array<number> = [];
  protected webAccessRequests: Array<number> = [];
  protected messengerRequests: Array<number> = [];
  protected loeRequests: Array<number> = [];
  protected buddyRequestsLive: Array<number> = [];
  protected buddyRequestsDev: Array<number> = [];
  protected loeCounts: any = {};
  protected weeklyStreaming: any = {};
  protected _lineChartLabel: string = 'Daily Requests';
  protected _logMonitorWaitHours: number = 3;
  protected _logMonitorCountDown: string;
  protected _randomWordClass = ['card','text-white','bg-primary'];
  protected _webAccessClass = ['card','text-white','bg-primary'];
  protected _accountsClass = ['card','text-white','bg-primary'];
  protected _messengerClass = ['card','text-white','bg-primary'];
  protected _loeClass = ['card','text-white','bg-primary'];
  protected _buddyLiveClass = ['card','text-white','bg-primary'];
  protected _buddyDevClass = ['card','text-white','bg-primary'];


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
  public lineChartLegend = false;
  public lineChartType = 'line';

  public randomWordChartData: Array<any> = [
    {
      data: this.randomWordRequests,
      label: this._lineChartLabel
    }
  ];
  public accountChartData: Array<any> = [
    {
      data: this.accountRequests,
      label: this._lineChartLabel
    }
  ];
  public WebAccessChartData: Array<any> = [
    {
      data: this.webAccessRequests,
      label: this._lineChartLabel
    }
  ];
  public messengerChartData: Array<any> = [
    {
      data: this.messengerRequests,
      label: this._lineChartLabel
    }
  ];
  public loeChartData: Array<any> = [
    {
      data: this.loeRequests,
      label: this._lineChartLabel
    }
  ];
  public buddyLiveChartData: Array<any> = [
    {
      data: this.buddyRequestsLive,
      label: this._lineChartLabel
    }
  ];
  public buddyDevChartData: Array<any> = [
    {
      data: this.buddyRequestsDev,
      label: this._lineChartLabel
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
  public randomWordChartColors: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public accountChartColors: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public WebAccessChartColors: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public messengerChartColors: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public loeChartColors: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public buddyLiveChartColors: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public buddyDevChartColors: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];

  // mainChart
  protected _mainChartYAxisMax: number;
  protected _mainChartYAxisStepSize: number;
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
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  ngOnInit(): void {
    this.AccountService.checkCookie();
    this._buildWeeklyRequests();
    this._testServices();
    this._buildRequestCounts();
    this._buildLoeCounts();
    this._startLogMonitorCountDown();
  }
  protected _buildRequestCounts(){
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
  protected _updateMainChart(){
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
      if(this.radioModel == 'Week'){
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
  protected _buildWeeklyRequests(){
    let dates = this._buildWeeklyDates();
    for(let i in dates){
      this.WebaccessService.search('request','requestDate',dates[i]).subscribe((requests)=>{
        let sortedData = this._sortRequests(requests);
        this.dailyRequestLabels.push(dates[i]);
        this.rawRandomWords.push(sortedData['api.outlawdesigns.io_9600'] === undefined ? 0:sortedData['api.outlawdesigns.io_9600'].length);
        this.rawAccounts.push(sortedData['api.outlawdesigns.io_9661'] === undefined ? 0:sortedData['api.outlawdesigns.io_9661'].length);
        this.rawWebAccess.push(sortedData['api.outlawdesigns.io_9500'] === undefined ? 0:sortedData['api.outlawdesigns.io_9500'].length);
        this.rawMessenger.push(sortedData['api.outlawdesigns.io_9667'] === undefined ? 0:sortedData['api.outlawdesigns.io_9667'].length);
        this.rawLOE.push(sortedData['api.outlawdesigns.io_9669'] === undefined ? 0:sortedData['api.outlawdesigns.io_9669'].length);
        this.rawBuddyLive.push(sortedData['api.outlawdesigns.io_8663'] === undefined ? 0:sortedData['api.outlawdesigns.io_8663'].length);
        this.rawBuddyDev.push(sortedData['api.outlawdesigns.io_4663'] === undefined ? 0:sortedData['api.outlawdesigns.io_4663'].length);
        if(this.dailyRequestLabels.length === 7){
          this._sortValues();
        }
      });
    }
  }
  protected _buildLoeCounts(){
    let models = ['song','movie','doc','episode'];
    let streamingModels = ['song'];
    models.forEach((model)=>{
      this.LoeService.getModelCount(model).subscribe((resultObj)=>{
        this.loeCounts[model] = parseInt(resultObj.count);
      });
    });
    let dates = this._buildWeeklyDates();
    dates.forEach((date)=>{
      let label = this._getDayLabel(new Date(date + ' UTC').getDay());
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
  protected _buildDateStr(dateStr){
    let theDate = (dateStr === undefined ? new Date():new Date(dateStr));
    return theDate.getFullYear() + "-" + (theDate.getMonth() + 1) + "-" + (theDate.getDate() < 10 ? "0" + theDate.getDate() : theDate.getDate());
  }
  protected _getMonthLabel(monthNum){
    return this.monthLabels[monthNum];
  }
  protected _getDayLabel(dayNum){
    return this.dayLabels[dayNum];
  }
  protected _buildWeeklyDates(){
    let today = new Date();
    let dates = [];
    dates.push(this._buildDateStr(today));
    for(let i = 6; i > 0; i--){
      today.setDate(today.getDate() - 1);
      dates.push(this._buildDateStr(today));
    }
    return dates;
  }
  protected _sortRequests(data){
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
  protected _sortValues(){
    let tmpDates = [...this.dailyRequestLabels].sort();
    let tmpArr = [];
    tmpDates.forEach((date)=>{
      let index = this.dailyRequestLabels.indexOf(date);
      this.randomWordRequests.push(this.rawRandomWords[index]);
    });
    tmpArr = [];
    tmpDates.forEach((date)=>{
      let index = this.dailyRequestLabels.indexOf(date);
      this.accountRequests.push(this.rawAccounts[index]);
    });
    tmpArr = [];
    tmpDates.forEach((date)=>{
      let index = this.dailyRequestLabels.indexOf(date);
      this.webAccessRequests.push(this.rawWebAccess[index]);
    });
    tmpArr = [];
    tmpDates.forEach((date)=>{
      let index = this.dailyRequestLabels.indexOf(date);
      this.messengerRequests.push(this.rawMessenger[index]);
    });
    tmpArr = [];
    tmpDates.forEach((date)=>{
      let index = this.dailyRequestLabels.indexOf(date);
      this.loeRequests.push(this.rawLOE[index]);
    });
    tmpArr = [];
    tmpDates.forEach((date)=>{
      let index = this.dailyRequestLabels.indexOf(date);
      this.buddyRequestsLive.push(this.rawBuddyLive[index]);
    });
    tmpArr = [];
    tmpDates.forEach((date)=>{
      let index = this.dailyRequestLabels.indexOf(date);
      this.buddyRequestsDev.push(this.rawBuddyDev[index]);
    });
    this.dailyRequestLabels.sort();
  }
  protected _testServices(){
    this.ApiService.testService('http://api.outlawdesigns.io:9600').subscribe((response)=>{
      this._randomWordClass[2] = 'bg-success';
      this.randomWordChartColors[0].backgroundColor = getStyle('--success');
    },(err)=>{
      this._randomWordClass[2] = 'bg-danger';
      this.randomWordChartColors[0].backgroundColor = getStyle('--danger');
    });
    this.ApiService.testService('http://api.outlawdesigns.io:9661/verify').subscribe((response)=>{
      this._accountsClass[2] = 'bg-success';
      this.accountChartColors[0].backgroundColor = getStyle('--success');
    },(err)=>{
      this._accountsClass[2] = 'bg-danger';
      this.accountChartColors[0].backgroundColor = getStyle('--success');
    });
    this.ApiService.testService('http://api.outlawdesigns.io:9500/verify').subscribe((response)=>{
      this._webAccessClass[2] = "bg-success";
      this.WebAccessChartColors[0].backgroundColor = getStyle('--success');
    },(err)=>{
      this._webAccessClass[2] = "bg-danger";
      this.WebAccessChartColors[0].backgroundColor = getStyle('--danger');
    });
    this.ApiService.testService('http://api.outlawdesigns.io:9667/verify').subscribe((response)=>{
      this._messengerClass[2] = 'bg-success';
      this.messengerChartColors[0].backgroundColor = getStyle('--success');
    },(err)=>{
      this._messengerClass[2] = 'bg-danger';
      this.messengerChartColors[0].backgroundColor = getStyle('--danger');
    });
    this.ApiService.testService('http://api.outlawdesigns.io:9669/verify').subscribe((response)=>{
      this._loeClass[2] = 'bg-success';
      this.loeChartColors[0].backgroundColor = getStyle('--success');
    },(err)=>{
      this._loeClass[2] = 'bg-danger';
      this.loeChartColors[0].backgroundColor = getStyle('--danger');
    });
    this.ApiService.testService('http://api.outlawdesigns.io:8663/verify').subscribe((response)=>{
      this._buddyLiveClass[2] = 'bg-success';
      this.buddyLiveChartColors[0].backgroundColor = getStyle('--success');
    },(err)=>{
      this._buddyLiveClass[2] = 'bg-danger';
      this.buddyLiveChartColors[0].backgroundColor = getStyle('--danger');
    });
    this.ApiService.testService('http://api.outlawdesigns.io:4663/verify').subscribe((response)=>{
      this._buddyDevClass[2] = 'bg-success';
      this.buddyDevChartColors[0].backgroundColor = getStyle('--success');
    },(err)=>{
      this._buddyDevClass[2] = 'bg-danger';
      this.buddyDevChartColors[0].backgroundColor = getStyle('--danger');
    });
  }
  protected _getMainChartMax(){
    let highest = [...this.mainChartData1].sort()[this.mainChartData1.length - 1];
    this._mainChartYAxisMax = (highest * .10) + highest;
    this._mainChartYAxisStepSize = Math.ceil(this._mainChartYAxisMax / 10);
  }
  protected _calculateNextLogMonitorRun(lastRunStr){
    let localTime = new Date(lastRunStr + ' UTC');
    let nextRun = new Date(localTime.getTime() + (this._logMonitorWaitHours * 60 * 60 * 1000));
    return nextRun;
  }
  protected _startLogMonitorCountDown(){
    this.WebaccessService.recent('logmonitorrun',1).subscribe((lastRun)=>{
      let interval = setInterval(()=>{
        let nextRun = this._calculateNextLogMonitorRun(lastRun[0].StartTime + ' UTC');
        let now = new Date().getTime();
        let difference = nextRun.getTime() - now;
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        this._logMonitorCountDown = hours + 'h ' + minutes + 'm ' + seconds + 's';
        if(difference < 0){
          clearInterval(interval);
          this._logMonitorCountDown = 'Executing';
        }
      },1000);
    });
  }
}
