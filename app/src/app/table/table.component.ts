import { Component, OnInit, Input } from '@angular/core';
import { WeatherModule } from '../modules/weather/weather.module';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input("DataInjector") wether: WeatherModule[];
  
  daysToShowInTable: WeatherModule[];
  data: Date;
  daySelected: String;

  constructor() { }

  ngOnInit() {
    this.daysToShowInTable = this.wether;
  }
  pobierzDane(dayTofind){
    this.daySelected = this.parseDate(dayTofind);
    this.daysToShowInTable = [];
    this.wether.forEach(element => {
      if (element.date  == this.daySelected){
        this.daysToShowInTable.push(element);
      }
    });
  }
  clearDate(){
    this.daysToShowInTable = this.wether;
    this.daySelected = "";
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

    return this.data.getFullYear() + "-" + tempMonth + "-" + tempDay;

  }
}
