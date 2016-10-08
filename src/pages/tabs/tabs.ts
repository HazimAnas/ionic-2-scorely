import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {StatisticPage} from '../statistic/statistic';
import {AccountPage} from '../account/account';

@Component({
  selector: 'tabs-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = StatisticPage;
  tab3Root: any = AccountPage;

  constructor() {

  }
}
