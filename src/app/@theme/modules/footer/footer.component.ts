import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() show = true;
  tabIndex = 0;

  constructor() {
  }

  press(e) {
    console.log(e);
    this.tabIndex = e.index;
  }
}
