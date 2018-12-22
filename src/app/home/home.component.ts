import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bm-home',
  template: `
    <p>Das ist der BookMonkey</p>
    <button class="ui red button" [routerLink]="[ '../books']">Buchliste ansehen <i class="arrow right icon"></i></button>

  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

}
