import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {StorageService} from '../../../../../@core/utils/storage.service';
import {ToastService, ModalService, PickerService} from 'ng-zorro-antd-mobile';
import {HelpService} from '../../../help.service';

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
  data = ['完全不了解', '听说过，但不了解', '了解，知道商标、专利和版权', '了解，公司已具备相关知识产权', '非常了解，并希望通过知识产权增值'];
  employeeData = ['50人以下', '101-200人', '201-500人', '501-2000人', '2000人以上'];
  revenueData = ['未开业', '0-200万', '201-500万', '501-1000万', '1001-5000', '5001-1亿', '1-5亿', '5亿以上'];

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private storageSvc: StorageService,
              private toastSvc: ToastService,
              private dialogSvc: ModalService,
              private pickerSvc: PickerService,
              private helpSvc: HelpService) {
  }

  ngOnInit() {

    this.form.valueChanges.subscribe(res => {
      this.storageSvc.set('companyForm', JSON.stringify(this.form.value));
    });

    if (this.id) {
      this.helpSvc.get(this.id).subscribe(res => {
        if (res) {
          for (const key in this.form.value) {
            if (res[key]) {
              this.form.get(key).setValue(res[key]);
            }
          }
        }
      });
    } else {
      if (this.formValue) {
        for (const key in this.formValue) {
          if (this.formValue[key]) {
            this.form.get(key).setValue(this.formValue[key]);
          }
        }
      }
    }
  }

  showPicker(target, optionData) {
    this.pickerSvc.showPicker({data: optionData}, res => {
      console.log(res);
      this.form.get(target).setValue(res[0]);
    });
  }

  next() {
    this.isSubmit = true;
    if (this.form.invalid) {
      return false;
    }
    if (this.id !== '0') {
      this.toastSvc.loading('提交中...', 0);
      this.helpSvc.research(this.form.value).subscribe(res => {
        console.log(res);
        if (res) {
          this.storageSvc.remove('companyForm');
          this.toastSvc.hide();
          this.dialogSvc.alert('', '您已成功提交！', [
            {
              text: '我知道了', onPress: () => {
                this.router.navigate(['/help/company/list']);
              }
            }
          ]);
        }
      });
    } else {
      this.router.navigate(['/help/company/edit/step1', this.id]);
    }
  }
}
