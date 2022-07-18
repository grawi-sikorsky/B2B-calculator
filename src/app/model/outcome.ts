export class Outcome {
    id?: string;
    name?: string;
    netto?: number;
    vat: number;
    brutto:   number;
    vatReduce:  number;

    constructor(name:string, netto:number,vat:number,brutto:number,vatReduce:number){
        // this.name = name;
        //this.netto = netto;
        this.vat = vat;
        this.brutto = brutto;
        this.vatReduce = vatReduce;
    }
}