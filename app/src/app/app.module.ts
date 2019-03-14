import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component';
import { WetherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChartComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DlDateTimePickerDateModule
  ],
  providers: [WetherService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
