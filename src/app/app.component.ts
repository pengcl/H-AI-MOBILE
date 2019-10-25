import {Component} from '@angular/core';
import {StorageService} from './@core/utils/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MOBILE';

  constructor(private storageSvc: StorageService) {
    storageSvc.remove('companyForm');
  }
}
