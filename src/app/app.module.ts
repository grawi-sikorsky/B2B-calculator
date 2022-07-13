import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ResultsComponent } from './results/results.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { OutcomeFormComponent } from './outcome-form/outcome-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ResultsComponent,
    IncomeFormComponent,
    OutcomeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
