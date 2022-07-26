import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.css']
})
export class TaxFormComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }
  
  onChange() {
    this.checkFormFields();
    this.dataService.updateUserData(this.dataService.userData);
  }

  checkFormFields(){
    if(this.dataService.userData.taxFormPicked === 2){
      this.dataService.userData.taxFree = false;
    }
  }
}
