import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppMainComponent} from "../../app.main.component";
import {DomainService} from "../../services/domain.service";
import {SuccessTracker} from "../../domain/successTracker";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileUploader!: ElementRef;
  public saveAction = false;
  private fileHandle: any;
  selectedLang: string = this.translate.currentLang;

  // @ts-ignore
  private autoSaveSubject: Subscription;
  // @ts-ignore
  private translateLangChangeSubject: Subscription;

  doSaveAction() {
    this.saveAction = true;
    setTimeout(() => {
      this.saveAction = false;
    }, 500); // Delay of 1 second (adjust as needed)
  }

  constructor(public app: AppMainComponent, private domainService: DomainService, private translate: TranslateService) {
    //empty constructor
  }

  async openFile() {
    try {
      const options = {
        types: [
          {
            description: 'SuccesTracker files',
            accept: {
              'application/json': ['.json'],
            },
          },
        ],
        writable: true,
      };

      [this.fileHandle] = await (window as any).showOpenFilePicker(options);
      const file = await this.fileHandle.getFile();
      const fileReader: FileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const fileContent: string = e.target.result;
        this.domainService.importModel(fileContent);
      };
      fileReader.readAsText(file);


    } catch (error) {
      console.error('Error selecting or writing file:', error);
    }
  }

  exportData() {
    const data: SuccessTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    const jsonContent = JSON.stringify(data);
    const blob = new Blob([jsonContent], {type: 'application/json'});

    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'SuccesTracker.json';
    downloadLink.click();
  }

  save() {
    //workarround to save the model!
    this.domainService.succesTrackerDomainBehaviorSubject.next(this.domainService.succesTrackerDomainBehaviorSubject.getValue());
  }
  changeLang() {
    let tempSuccessTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    tempSuccessTracker.user.defaultLang = this.selectedLang;
    this.domainService.succesTrackerDomainBehaviorSubject.next(tempSuccessTracker);
  }

  ngOnDestroy(): void {
    this.autoSaveSubject.unsubscribe();
    this.translateLangChangeSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.autoSaveSubject = this.domainService.succesTrackerDomainBehaviorSubject.subscribe(async value => {
      if (this.fileHandle != null && value.settings.autoSave) {
        this.doSaveAction();
        let writable = await this.fileHandle.createWritable();
        await writable.write(JSON.stringify(value, null, 2));
        await writable.close();
      }
    })

    this.translateLangChangeSubject = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.save();
      this.selectedLang = event.lang;
    })
  }
}
