import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentUserData.subscribe(data => {
      console.log("Result:");
      this.doTheMath();
    })
  }

  displayResults(): void {
    console.log(this.dataService.userData.bigFamily);
  }

  doTheMath() {
    this.calculateZUS();

  }

  calculateZUS() {
    if (this.dataService.userData.zusPicked === 0) {
      console.log("zus duzy");
    }
    else if (this.dataService.userData.zusPicked === 1) {
      console.log("zus maly");
    }
    else if (this.dataService.userData.zusPicked === 2) {
      console.log("zus trzeci");
    }
    else if (this.dataService.userData.zusPicked === 3) {
      console.log("zus czwarty");
    }
  }

}
