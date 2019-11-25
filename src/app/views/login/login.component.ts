import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

  password:string;
  username:string;

  constructor(private AccountService:AccountService){}

  ngOnInit(){}
  login():void{
    this.AccountService.login(this.username,this.password);
  }
}
