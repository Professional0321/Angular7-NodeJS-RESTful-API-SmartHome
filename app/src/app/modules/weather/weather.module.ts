import { NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class WeatherModule {
    date: String;
    temperature: number;
    humidity: number;
    time:String;

    constructor(date:String,time:String,temp:number,hum:number){
      this.date = date;
      this.temperature = temp;
      this.humidity = hum;
      this.time = time;
    }
    
    getWether():String{
      return this.date;
    }
    getTemparature():number{
      return this.temperature;
    }
    getHumidity():number{
      return this.humidity;
    }

    setWether(date:String){
      this.date = date;
    }
    setTemparature(temp:number){
      this.temperature = temp;
    }
    setHumidity(hum:number){
      this.humidity = hum;
    }
 }
