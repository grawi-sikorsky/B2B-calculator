import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ResultsComponent } from './results/results.component';
import { DataService } from './service/data.service';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { InOutFormComponent } from './in-out-form/in-out-form.component';
import { IncomeFormComponent } from './accordion/income-form/income-form.component';
import { TaxFormComponent } from './accordion/tax-form/tax-form.component';
import { OutcomeFormComponent } from './accordion/outcome-form/outcome-form.component';
import { FooterComponent } from './main-view/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ResultsComponent,
    InOutFormComponent,
    IncomeFormComponent,
    TaxFormComponent,
    OutcomeFormComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
