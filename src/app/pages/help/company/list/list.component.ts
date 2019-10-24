import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HelpService} from '../../help.service';
import {ToastService, ModalService, PickerService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-help-company-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class HelpCompanyListComponent implements OnInit {
  page = 1;
  totalPages = 1;
  data;
  refreshState = {
    currentState: 'deactivate',
    drag: false
  };
  index = 0;
  config = {
    grabCursor: true,
    slidesPerView: 'auto',
    pagination: false,
    autoplay: false
  };
  limitData = ['0-1年', '1-2年', '2-3年', '3年以上'];
  comprehendData = ['完全不了解', '听说过，但不了解', '了解，知道商标、专利和版权', '了解，公司已具备相关知识产权', '非常了解，并希望通过知识产权增值'];
  employeesData = ['50人以下', '101-200人', '201-500人', '501-2000人', '2000人以上'];
  revenueData = ['未开业', '0-200万', '201-500万', '501-1000万', '1001-5000', '5001-1亿', '1-5亿', '5亿以上'];

  params = {
    company: '',
    ageLimit: '',
    employees: '',
    revenue: '',
    comprehend: ''
  };

  constructor(private router: Router,
              private titleSvc: Title,
              private pickerSvc: PickerService,
              private helpSvc: HelpService) {
    titleSvc.setTitle('签单助手');
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.helpSvc.list(this.page, this.params).subscribe(res => {
      this.data = res.list;
      this.totalPages = res.totalPages;
    });
  }

  showPicker(target, optionData) {
    console.log(target, optionData);
    this.pickerSvc.showPicker({data: optionData}, res => {
      this.page = 1;
      this.params[target] = res[0];
      this.getData();
    });
  }

  change(e) {
    this.page = 1;
    this.params.company = e;
    this.helpSvc.list(this.page, this.params).subscribe(res => {
      this.data = res.list;
      this.totalPages = res.totalPages;
    });
  }

  add() {
    console.log('add');
    this.router.navigate(['/help/company/edit/step0', 0]);
  }

  loadMore(event) {
    if (this.page < this.totalPages) {
      this.page++;
      this.refreshState.currentState = 'release';
      this.helpSvc.list(this.page, this.params).subscribe(res => {
        this.data = this.data.concat(res.list);
        this.refreshState.currentState = 'finish';
      });
    }
  }
}
