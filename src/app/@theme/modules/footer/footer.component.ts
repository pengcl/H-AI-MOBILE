import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() show = true;
  @Input() index = 0;

  constructor(private router: Router) {
  }

  press(e) {
    this.index = e.index;
    if (this.index === 0) {
      this.router.navigate(['/help/company/list']);
    } else {
      this.router.navigate(['qr']);
    }
  }
}
