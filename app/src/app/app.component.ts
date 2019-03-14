import { Component } from '@angular/core';
import { WeatherModule } from './modules/weather/weather.module';
import { WetherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WetherService]
})
export class AppComponent {
  title = 'ProjektCpp';
  isChart: string = "table";
  weather: WeatherModule[] = [];
  temp: WeatherModule;
  time: String;
  


  constructor(private _weather: WetherService) {
  };

  changeView(event: string) {
    this.isChart = event;
  }

  ngOnInit(): void {
    this._weather.getWether().subscribe(res => {
      res['data'].forEach((element: { date: any; temperature: any; humidity: any; updatedAt: String; }) => {

        let data = element.date;
        let temperature = element.temperature;
        let humidity = element.humidity;
        this.time = element.updatedAt;

        var time = this.time.split("T", 2)[1];

        this.temp = new WeatherModule(data, time.split(".", 1)[0], temperature, humidity);
        this.weather.push(this.temp);
      });
    });

  }
}


