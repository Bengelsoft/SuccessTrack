import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {DomainService} from "../services/domain.service";
import {User} from "../domain/success/user";
import {UIChart} from "primeng/chart";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User = new User();
  // @ts-ignore
  @ViewChild("chart") chart: UIChart;
  // @ts-ignore
  private onChangeUserNameSubject: Subscription;

  constructor(private userService: UserService, private domainService: DomainService) {
    //empty constructor
  }

  protected onChangeUserName() {
    this.userService.setUserName(this.user.name);
  }

  ngOnDestroy() {
    this.onChangeUserNameSubject.unsubscribe();
  }

  ngOnInit() {
    this.onChangeUserNameSubject = this.domainService.succesTrackerDomainBehaviorSubject.subscribe(successTracker => {
      this.user = successTracker.user;
    })
  }
}

