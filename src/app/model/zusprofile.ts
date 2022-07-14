export class ZusProfile {
    zusType?: ZusType;
    zusAmount?: number;
}
enum ZusType{
    Duzy = 'Duzy',
    Maly = 'Maly',
    ZusPlus = 'Zus Plus',
    ZusNone = "no ZUS"
}