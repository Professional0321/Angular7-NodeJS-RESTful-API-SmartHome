import { Component, OnInit, Input } from '@angular/core';
import { WeatherModule } from '../modules/weather/weather.module';
import { Chart } from 'chart.js';
import { NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  times = [];
  dates = [];
  temps = [];
  humis = [];
  chart = [];

  @Input("PogodaToInject") weather: WeatherModule[] = [];

  selectedDay: string = "";
  groupDays: String[] = [];

  data: Date;

  constructor() {
    
   }

  ngOnInit() {
  }
  pobierzDane(dateToFind) {
    this.times = [];
    this.dates = [];
    this.temps = [];
    this.humis = [];
    this.chart = [];
    
    this.parseDate(dateToFind);


    this.weather.forEach(elem => {
      if (elem.date == this.selectedDay) {
        this.times.push(elem.time);
        this.dates.push(elem.date);
        this.temps.push(elem.temperature);
        this.humis.push(elem.humidity);
      }
    })
    this.wyswietlWykres();
  }
  wyswietlWykres() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.times,
        datasets: [
          {
            data: this.temps,
            borderColor: "#3cba9f",
            fill: false,
            label: "Temperature"
          },
          {
            data: this.humis,
            borderColor: "#ffcc00",
            fill: false,
            label: "Humidity"
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  parseDate(data:any){
    this.data = data.value;
    let tempMonth;
    let tempDay;
    if (this.data.getUTCMonth() < 10){
      tempMonth ="0" + (this.data.getUTCMonth()+1).toString();
    } else {
      tempMonth = (this.data.getUTCMonth()+1).toString();
    }
    if (this.data.getUTCDate() < 10){
      tempDay = "0" + this.data.getDate().toString();
    } else {
      tempDay= this.data.getDate().toString();
    }

    this.selectedDay = this.data.getFullYear() + "-" + tempMonth + "-" + tempDay;

  }
}
