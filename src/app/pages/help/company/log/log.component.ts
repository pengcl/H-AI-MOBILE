import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpService} from '../../help.service';

@Component({
  selector: 'app-help-company-list',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})

export class HelpCompanyLogComponent implements OnInit {
  id = this.route.snapshot.params.id;
  page = 1;
  totalPages = 1;
  data;
  refreshState = {
    currentState: 'deactivate',
    drag: false
  };

  constructor(private route: ActivatedRoute,
              private helpSvc: HelpService) {
  }

  ngOnInit() {
    this.helpSvc.log(this.id, this.page).subscribe(res => {
      this.data = res.list;
      console.log(this.data);
    });
  }

  loadMore(event) {
    if (this.page < this.totalPages) {
      this.page++;
      this.refreshState.currentState = 'release';
      this.helpSvc.log(this.id, this.page).subscribe(res => {
        this.data = this.data.concat(res.list);
        this.refreshState.currentState = 'finish';
      });
    }
  }
}
