import {Component, OnInit} from '@angular/core';
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {CalendarOptions} from '@fullcalendar/core';
import {DomainService} from "../services/domain.service";
import {Success} from "../domain/success/success";
import {format} from 'date-fns';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  //initial config
  events: any[] = []
  options: CalendarOptions = {};
  header: any;

  constructor(private domainService: DomainService, private translate: TranslateService) {
    //empty constructor
  }


  getUniqueDatesWithCounts(data: Success[]): { date: string; count: number }[] {
    const uniqueDatesMap: Map<string, number> = new Map();

    for (const item of data) {
      const date = format(new Date(item.dateOfSucces), 'yyyy-MM-dd');
      if (uniqueDatesMap.has(date)) {
        uniqueDatesMap.set(date, uniqueDatesMap.get(date)! + 1);
      } else {
        uniqueDatesMap.set(date, 1);
      }
    }

    const uniqueDatesWithCounts: { date: string; count: number }[] = [];

    for (const [date, count] of uniqueDatesMap) {
      uniqueDatesWithCounts.push({date, count});
    }

    return uniqueDatesWithCounts;
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.options.locale = event.lang;
      this.options.buttonText = {
        today: this.translate.instant('today'),
        month: this.translate.instant('month'),
        week: this.translate.instant('week'),
        day: this.translate.instant('day'),
        list: this.translate.instant('list')
      }
    })


    this.domainService.succesTrackerDomainBehaviorSubject.subscribe(value => {
      let uniqueDatesWithCounts = this.getUniqueDatesWithCounts(value.successes);

      this.events = [];
      uniqueDatesWithCounts.forEach(dateWithCount => {
        this.events.push({
          id: Date.now(),
          start: format(new Date(dateWithCount.date), 'yyyy-MM-dd'),
          title: dateWithCount.count + ' ' + (dateWithCount.count == 1 ? this.translate.instant("success") : this.translate.instant('successes')),
          backgroundColor: "#74a748",
          textColor: "white"
        });
      })
    });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next,today',
        center: '',
        right: 'title',
      },
      events: this.events,
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      locale: this.translate.currentLang,
      buttonText: {
        today: this.translate.instant('today'),
        month: this.translate.instant('month'),
        week: this.translate.instant('week'),
        day: this.translate.instant('day'),
        list: this.translate.instant('list')
      }
    };
  }

}
