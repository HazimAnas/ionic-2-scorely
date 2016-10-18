import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AccountPage } from '../pages/account/account';
import { StatisticPage } from '../pages/statistic/statistic';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProgramService } from '../providers/program-service/program-service';
import { ProgramDetail } from '../components/program/program-detail';
import { ProgramList } from '../components/program/program-list';
import { ProgramEdit } from '../components/program/program-edit';
import { TeamDetail } from '../components/team/team-detail';
import { TeamService } from '../providers/team-service/team-service';
import { AngularFireModule } from 'angularfire2';

const fbConf = {
apiKey: "AIzaSyCgus8xLyN6gz-Nzr0y81_1XXWP02Vf_sE",
authDomain: "scorely-9029a.firebaseapp.com",
databaseURL: "https://scorely-9029a.firebaseio.com",
storageBucket: "scorely-9029a.appspot.com",
messagingSenderId: "66757883024"
};

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    StatisticPage,
    HomePage,
    TabsPage,
    ProgramDetail,
    ProgramList,
    ProgramEdit,
    TeamDetail
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fbConf)
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
    ProgramEdit,
    TeamDetail
  ],
  providers: [
  ProgramService,
  TeamService
  ]
})
export class AppModule {}
