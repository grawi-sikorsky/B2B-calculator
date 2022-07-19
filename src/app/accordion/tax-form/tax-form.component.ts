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
    this.dataService.updateUserData(this.dataService.userData);
  }
}
