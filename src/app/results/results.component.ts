import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { UserData } from '../model/userdata';

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

    // ZUS
    zusSkladka: number = 0;
    zusChorobowa: number = 0;
    zusZdrowotna: number = 0;
    zusSuma: number = 0;

    // US
    usPodatekMonth: number = 0;
    usPodatekMonthNoTaxFree: number = 0;
    usPodatekYear: number = 0;
    usPodatekYearNoTaxFree: number = 0;
    usTaxFreeAmount: number = 0;


    // OUTCOME
    outcomeAmount: number = 0;

    // PROFIT
    netSalary: number = 0;

    // UTILS
    isPositive(val: number): boolean {
        if (val > 0) {
            return true;
        } else {
            return false
        }
    }

    doTheMath() {
        this.calculateZUS();
        this.calculateUS();
        this.calculateNetSalary();
    }

    calculateZUS() {
        if (this.dataService.userData.zusPicked === 0) {
            this.zusSkladka = 1124.23;

            if ((this.dataService.userData.income * 12) <= 60000) {
                this.zusZdrowotna = 335.94;
            }
            else if (((this.dataService.userData.income * 12) > 60000) && (this.dataService.userData.income * 12) <= 300000) {
                this.zusZdrowotna = 559.89;
            }
            else {
                this.zusZdrowotna = 1007.81;
            }
        }
        else if (this.dataService.userData.zusPicked === 1) {
            this.zusSkladka = 263.59;
            if ((this.dataService.userData.income * 12) <= 60000) {
                this.zusZdrowotna = 335.94;
            }
            else if (((this.dataService.userData.income * 12) > 60000) && (this.dataService.userData.income * 12) <= 300000) {
                this.zusZdrowotna = 559.89;
            }
            else {
                this.zusZdrowotna = 1007.81;
            }
        }
        else if (this.dataService.userData.zusPicked === 2) {
            if ((this.dataService.userData.income * 12) <= 60000) {
                this.zusZdrowotna = 335.94;
            }
            else if (((this.dataService.userData.income * 12) > 60000) && (this.dataService.userData.income * 12) <= 300000) {
                this.zusZdrowotna = 559.89;
            }
            else {
                this.zusZdrowotna = 1007.81;
            }
        }
        else if (this.dataService.userData.zusPicked === 3) {
            this.zusSkladka = 0;
            this.zusZdrowotna = 0;
            this.zusChorobowa = 0;
        }

        // CHOROBOWA
        if (this.dataService.userData.zusChorobowe === true && this.dataService.userData.zusPicked === 0) {
            this.zusChorobowa = 87.05;
        }
        else if (this.dataService.userData.zusChorobowe === true && this.dataService.userData.zusPicked === 1) {
            this.zusChorobowa = 22.12;
        }
        else if (this.dataService.userData.zusChorobowe === false) {
            this.zusChorobowa = 0;
        }

        this.zusSuma = this.zusZdrowotna + this.zusChorobowa + this.zusSkladka;
    }

    calculateUS() {
        // Calculate taxfree value
        if (this.dataService.userData.taxFree === true && this.dataService.userData.bigFamily === true) this.usTaxFreeAmount = 30000 + 85528;
        else if (this.dataService.userData.taxFree === false && this.dataService.userData.bigFamily === true) this.usTaxFreeAmount = 85528;
        else if (this.dataService.userData.taxFree === true && this.dataService.userData.bigFamily === false) this.usTaxFreeAmount = 30000;
        else if (this.dataService.userData.taxFree === false && this.dataService.userData.bigFamily === false) this.usTaxFreeAmount = 0;

        // RYCZALT
        if (this.dataService.userData.taxFormPicked === 0) {
            // TAX FREE
            this.usPodatekYear = (((this.dataService.userData.income * 12) - ((this.zusZdrowotna * 12 / 2) + this.usTaxFreeAmount)) * this.dataService.userData.taxRatePicked);
            this.usPodatekMonth = this.usPodatekYear / 12;
            // NO TAX FREE
            // this.usPodatekYearNoTaxFree = (((this.dataService.userData.income * 12) - (this.zusZdrowotna * 12 / 2) - this.usTaxFreeAmount) * this.dataService.userData.taxRatePicked);
        }
        // SKALA
        else if (this.dataService.userData.taxFormPicked === 1) {
            // this.usPodatek = 
        }
        // LINIOWO
        else if (this.dataService.userData.taxFormPicked === 2) {

        }

        if (this.usPodatekYear < 0 || this.usPodatekMonth < 0) {
            this.usPodatekYear = 0;
            this.usPodatekMonth = 0;
        }
    }

    calculateNetSalary() {
        this.netSalary = this.dataService.userData.income - (this.usPodatekMonth + this.zusSuma + this.outcomeAmount);
    }
}
