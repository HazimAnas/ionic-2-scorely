import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AccountPage } from '../pages/account/account';
import { StatisticPage } from '../pages/statistic/statistic';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProgramService } from '../providers/program-service/program-service';
import {ProgramDetail } from '../components/program/program-detail';
import {ProgramList } from '../components/program/program-list';
import {ProgramEdit } from '../components/program/program-edit';

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    StatisticPage,
    HomePage,
    TabsPage,
    ProgramDetail,
    ProgramList,
    ProgramEdit
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    StatisticPage,
    HomePage,
    TabsPage,
    ProgramDetail,
    ProgramList,
    ProgramEdit
  ],
  providers: [
  ProgramService
  ]
})
export class AppModule {}
