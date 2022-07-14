export class TaxProfile {
    taxType?: TaxType;
    taxPercent?: number;
    netto?: number;
    vat?: number;
    brutto?:  number;
    vatReduce?:  number;
}
enum TaxType{
    Ryczalt = 'Ryczałt',
    Skala = 'Skala',
    Liniowy = 'Liniowy'
}