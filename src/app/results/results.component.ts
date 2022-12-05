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
            this.doTheMath();
        })
        
        // MOBILE
        this.isMobile = this.getIsMobile();
        window.onresize = () => {
            this.isMobile = this.getIsMobile();
        };
    }

    isMobile = false;
    getIsMobile(): boolean {
        const w = document.documentElement.clientWidth;
        const breakpoint = 992;
        console.log(w);
        if (w < breakpoint) {
            return true;
        } else {
            return false;
        }
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
    usFullTaxFreeAmount: number = 0;
    usPodatekDoZwrotu: number = 0;
    usPodatekDoZwrotuMonth: number = 0;
    usVatToPay: number = 0;
    usVatKoszty: number = 0;
    usVatNaliczony: number = 0;

    // OUTCOME
    outcomeAmount: number = 0;
    outcomeAmountNet: number = 0;

    // PROFIT
    netSalary: number = 0;
    netNadwyzka: number = 0;

    // UTILS
    isPositive(val: number): boolean {
        if (val > 0) {
            return true;
        } else {
            return false
        }
    }

    doTheMath() {
        this.calculateOutcomes();
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
        this.usFullTaxFreeAmount = (this.zusZdrowotna * 12 / 2) + this.usTaxFreeAmount;

        // RYCZALT
        if (this.dataService.userData.taxFormPicked === 0) {
            // TAX FREE
            this.usPodatekYear = (((this.dataService.userData.income * 12) - (this.usFullTaxFreeAmount)) * this.dataService.userData.taxRatePicked);
            this.usPodatekMonth = this.usPodatekYear / 12;
            // NO TAX FREE
            this.usPodatekYearNoTaxFree = ((this.dataService.userData.income * 12) * this.dataService.userData.taxRatePicked);
            this.usPodatekMonthNoTaxFree = this.usPodatekYearNoTaxFree / 12;
        }
        // SKALA
        else if (this.dataService.userData.taxFormPicked === 1) {
            // Pierwszy prog < 120 000 = 12%
            if( this.dataService.userData.income * 12 <= 120000)
            {
                this.usPodatekYear = (((this.dataService.userData.income * 12) - (this.usFullTaxFreeAmount)) * 0.12);
                this.usPodatekMonth = this.usPodatekYear / 12;

                // NO TAX FREE
                this.usPodatekYearNoTaxFree = ((this.dataService.userData.income * 12) * 0.12);
                this.usPodatekMonthNoTaxFree = this.usPodatekYearNoTaxFree / 12;
            }
            // Drugi prog > 120 000 = 32%
            else if(this.dataService.userData.income * 12 > 120000){
                this.usPodatekYear = 120000 * 0.12;
                this.usPodatekYear += (((this.dataService.userData.income * 12) - (this.usFullTaxFreeAmount)) * 0.32);
                this.usPodatekMonth = this.usPodatekYear / 12;

                // NO TAX FREE
                this.usPodatekYearNoTaxFree = 120000 * 0.12;
                this.usPodatekYearNoTaxFree += (((this.dataService.userData.income * 12) - 120000) * 0.32);
                this.usPodatekMonthNoTaxFree = this.usPodatekYearNoTaxFree / 12;
            }
            
        }
        // LINIOWO
        else if (this.dataService.userData.taxFormPicked === 2) {
            // TAX FREE
            this.usPodatekYear = (((this.dataService.userData.income * 12) - (this.usFullTaxFreeAmount)) * 0.19);
            this.usPodatekMonth = this.usPodatekYear / 12;
            // NO TAX FREE
            this.usPodatekYearNoTaxFree = ((this.dataService.userData.income * 12) * 0.19);
            this.usPodatekMonthNoTaxFree = this.usPodatekYearNoTaxFree / 12;
        }

        // NADPLATA / ZWROT PODATKU
        //
        if (this.usPodatekYear > 0) {
            this.usPodatekDoZwrotu = this.usFullTaxFreeAmount * this.dataService.userData.taxRatePicked;
        } else if (this.usFullTaxFreeAmount - this.dataService.userData.income * 12 > 0) {
            this.usPodatekDoZwrotu = this.usPodatekYearNoTaxFree;
        }

        this.usPodatekDoZwrotuMonth = this.usPodatekDoZwrotu / 12;

        // ZERO PODATKU
        if (this.usPodatekYear < 0 || this.usPodatekMonth < 0) {
            this.usPodatekYear = 0;
            this.usPodatekMonth = 0;
        }

        // VAT NALICZONY
        this.usVatNaliczony = (this.dataService.userData.income * 1.23) - this.dataService.userData.income

        // VAT KOSZTY
        //this.usVatKoszty = this.outcomeAmount * 0.23;

        // VAT DO ZPLATY
        this.usVatToPay = this.usVatNaliczony - this.usVatKoszty;

        // 
    }

    calculateNetSalary() {
        this.netNadwyzka = this.dataService.userData.income - (this.usPodatekMonth + this.zusSuma + this.outcomeAmount);
        this.netSalary = this.dataService.userData.income - (this.usPodatekMonth + this.zusSuma);
    }

    calculateOutcomes() {
        this.outcomeAmount = 0;
        this.outcomeAmountNet = 0;
        this.usVatKoszty = 0;

        for (let i = 0; i < this.dataService.userData.outcomeList.length; i++) {
            if (this.dataService.userData.outcomeList[i].netto !== null && this.dataService.userData.outcomeList[i].netto !== undefined) {
                this.outcomeAmountNet += this.dataService.userData.outcomeList[i].netto!;
                this.outcomeAmount += this.dataService.userData.outcomeList[i].netto! * 1.23 - (this.dataService.userData.outcomeList[i].netto! * 0.23 * (this.dataService.userData.outcomeList[i].vatReduce / 100));

                this.dataService.userData.outcomeList[i].vat = this.dataService.userData.outcomeList[i].netto! * 0.23 * (this.dataService.userData.outcomeList[i].vatReduce / 100);
                this.usVatKoszty += this.dataService.userData.outcomeList[i].vat;
            }
        }

        this.calculateNetSalary();
    }
}
