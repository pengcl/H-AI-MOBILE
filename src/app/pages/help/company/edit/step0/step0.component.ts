import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {StorageService} from '../../../../../@core/utils/storage.service';

@Component({
  selector: 'app-help-company-edit-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['./step0.component.scss']
})

export class HelpCompanyEditStep0Component implements OnInit {
  id = this.route.snapshot.params.id;
  step = 0;
  formValue = JSON.parse(this.storageSvc.get('companyForm'));
  isSubmit = false;
  form: FormGroup = new FormGroup({
    company: new FormControl('', [Validators.required]),
    industry: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required, Validators.pattern(/[0 - 9] */), Validators.minLength(11), Validators.maxLength(11)]),
    employees: new FormControl('', []),
    revenue2016: new FormControl('', []),
    revenue2017: new FormControl('', []),
    revenue2018: new FormControl('', []),
    comprehend: new FormControl('', []),
    remark: new FormControl('', [])
  });

  constructor(private route: ActivatedRoute, private router: Router, private storageSvc: StorageService) {
  }

  ngOnInit() {

    this.form.valueChanges.subscribe(res => {
      this.storageSvc.set('companyForm', JSON.stringify(this.form.value));
    });

    if (this.formValue) {
      for (const key in this.formValue) {
        if (this.formValue[key]) {
          this.form.get(key).setValue(this.formValue[key]);
        }
      }
    }
  }

  next() {
    this.isSubmit = true;
    if (this.form.invalid) {
      return false;
    }
    this.router.navigate(['/help/company/edit/step1', this.id]);
  }
}
