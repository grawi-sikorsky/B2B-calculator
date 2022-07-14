import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit(): void {
    this.displayResults();
  }

  displayResults():void{
    console.log(this.dataService.bigFamily);
  }

}
