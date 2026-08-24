import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false
})
export class FooterComponent implements OnInit {

  // Rok w stopce liczony dynamicznie, żeby copyright nie wymagał ręcznej
  // aktualizacji co roku (poprzednio zapisany na sztywno w szablonie).
  readonly currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
