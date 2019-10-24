import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {HelpService} from '../../help.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-help-company-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})

export class HelpCompanyPlanComponent implements OnInit {
  id;
  page = 1;
  totalPages = 1;
  data;
  refreshState = {
    currentState: 'deactivate',
    drag: false
  };

  constructor(private route: ActivatedRoute,
              private location: Location,
              private titleSvc: Title,
              private helpSvc: HelpService) {
    titleSvc.setTitle('培育方案选择');
  }

  ngOnInit() {
    this.route.paramMap.pipe(map(params => this.id = params.get('id'))).subscribe(id => {
      this.helpSvc.plan(this.id, this.page).subscribe(res => {
        console.log(res);
        this.data = res.list;
        this.totalPages = res.totalPages;
      });
    });
  }

  onClick() {
    window.history.back();
  }

  loadMore(event) {
    if (this.page < this.totalPages) {
      this.page++;
      this.refreshState.currentState = 'release';
      this.helpSvc.plan(this.page).subscribe(res => {
        console.log(res);
        this.data = this.data.concat(res.list);
        this.refreshState.currentState = 'finish';
      });
    }
  }
}
