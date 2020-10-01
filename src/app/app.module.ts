import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ScatterComponent } from './scatter/scatter.component';
import { ConnectedScatterComponent } from './connected-scatter/connected-scatter.component';

@NgModule({
  declarations: [
    AppComponent,
    PiechartComponent,
    ScatterComponent,
    ConnectedScatterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
