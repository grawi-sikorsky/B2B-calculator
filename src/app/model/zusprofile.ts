export class ZusProfile {
    zusType?: string;
    zusAmount?: number;

    constructor(zusType:string, zusAmount:number){
        this.zusAmount = zusAmount;
        this.zusType = zusType;
    }
}
