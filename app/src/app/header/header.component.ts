import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { WetherService } from '../services/weather.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable()
export class HeaderComponent implements OnInit {

  @Output() isChart = new EventEmitter<string>();

  isLogged: boolean = false;
  isAlarmSet:boolean = false;

  constructor(private _wetherService: WetherService) { }

  ngOnInit() {
    this._wetherService.getAlarm().subscribe(res => {
      this.isAlarmSet = res['alarm'].status;
    })
    if (localStorage.getItem("token")) {
      this.isLogged = true;
    }
  }

  changeToChart() {
    this.isChart.emit("chart");
  }
  changeToTable() {
    this.isChart.emit("table");
  }

  setAlarm() {
    this._wetherService.setAlarmOff().subscribe(res => {});
    this._wetherService.getAlarm().subscribe(res => {
      this.isAlarmSet = res['alarm'].status;
      localStorage.setItem("alarmStatus", "true");
    })
    this._wetherService.setAlarmOn().subscribe(res => {});
    this._wetherService.getAlarm().subscribe(res => {
      this.isAlarmSet = res['alarm'].status;
      localStorage.setItem("alarmStatus", "false");
    })
  }

  login() {
    this._wetherService.login("test@test", "test").subscribe(() => {
      console.log("Udalo sie zalogowac");
    });
    if (localStorage.getItem("token")) {
      this.isLogged = true;
    }
  }
  unlogin() {
    this.isLogged = false;
    localStorage.removeItem("token");
  }
}
