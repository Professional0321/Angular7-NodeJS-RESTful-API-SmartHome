import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { WeatherModule } from '../modules/weather/weather.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class WetherService {

  private apiDate = "https://sleepy-garden-23787.herokuapp.com/api/data";
  private apiAlarmEnable = "https://sleepy-garden-23787.herokuapp.com/api/alarm/enable";
  private apiAlarmDisable = "https://sleepy-garden-23787.herokuapp.com/api/alarm/disable";
  private apiGetAlarm = "https://sleepy-garden-23787.herokuapp.com/api/alarm";
  private apiLogin = "https://sleepy-garden-23787.herokuapp.com/api/auth/login";
  private apiRegister = "https://sleepy-garden-23787.herokuapp.com/api/auth/register";

  private responseToken: String;


  constructor(private _http: HttpClient) {

  }
  login(email: string, password: string) {
    return this._http.post<String>(this.apiLogin, { email, password }).pipe(map(res => {
      localStorage.setItem("token", res['token']);
    }))
  }
  getWether(): Observable<WeatherModule> {
    return this._http.get<WeatherModule>(this.apiDate).pipe(map(result => result));
  }
  getAlarm(): Observable<boolean> {
    return this._http.get<boolean>(this.apiGetAlarm).pipe(map(res => res));
  }
  setAlarmOn() {
    const httpOptions = {headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer ' + localStorage.getItem("token") 
    })
  };
    return this._http.post<any>(this.apiAlarmEnable, null,httpOptions).pipe(map(res => {
       res;
    }));
  }
  setAlarmOff() {
    const httpOptions = {headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer ' + localStorage.getItem("token") 
    })
  };
    return this._http.post<any>(this.apiAlarmDisable, null,httpOptions).pipe(map(res => {
       res;
    }))
  }

}
