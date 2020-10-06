import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hurrey';
  constructor(readonly translateService: TranslateService) {

  }
  onstatusChanged(e) {
    console.log(e);
    this.translateService.use(e)
  }
}
