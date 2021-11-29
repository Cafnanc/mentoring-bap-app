import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services';
import { SessionService } from 'src/app/core/services/session/session.service';
import { CommonRoutes } from 'src/global.routes';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent implements OnInit {
  @Input() data: any;
  @Input() action;
  @Input() status:any;
  @Output() onClickEvent = new EventEmitter();
  constructor(private router: Router,private sessionService: SessionService, private toast:ToastService) { }
  ngOnInit() { }
  onCardClick(data) {
    this.router.navigate([`/${CommonRoutes.SESSIONS_DETAILS}/${data._id}`], { queryParams: {status: this.status}});
  }
  async onEnroll(data){
    let result = await this.sessionService.enrollSession(data._id);
    if(result?.result){
      this.toast.showToast("Enrolled successfully","success");
    }
  }
}
