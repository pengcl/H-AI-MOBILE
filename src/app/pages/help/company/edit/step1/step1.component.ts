import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {StorageService} from '../../../../../@core/utils/storage.service';
import {PickerService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-help-company-edit-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})

export class HelpCompanyEditStep1Component implements OnInit {
  id = this.route.snapshot.params.id;
  step = 1;
  formValue = JSON.parse(this.storageSvc.get('companyForm'));
  employeeData = ['请选择企业的在职人数范围', '50人以下', '51-100人', '101-200人', '201-500人', '501-2000人', '2000人以上'];
  revenueData = ['请选择企业的年收入范围', '未开业', '0-200万', '201-500万', '501-1000万', '1001-5000', '5001-1亿', '1-5亿', '5亿以上'];
  form: FormGroup = new FormGroup({
    company: new FormControl('', [Validators.required]),
    industry: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    employees: new FormControl('', []),
    revenue2016: new FormControl('', []),
    revenue2017: new FormControl('', []),
    revenue2018: new FormControl('', []),
    comprehend: new FormControl('', []),
    remark: new FormControl('', [])
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleSvc: Title,
              private storageSvc: StorageService,
              private pickerSvc: PickerService) {
    titleSvc.setTitle('企业信息录入');
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

  showPicker(target, optionData) {
    this.pickerSvc.showPicker({data: optionData}, res => {
      this.form.get(target).setValue(res[0] === '请选择企业的在职人数范围' || res[0] === '请选择企业的年收入范围' ? '' : res[0]);
    });
  }

  prev() {
    this.router.navigate(['/help/company/edit/step0', this.id]);
  }

  next() {
    if (this.form.invalid) {
      return false;
    }
    this.router.navigate(['/help/company/edit/step2', this.id]);
  }
}
