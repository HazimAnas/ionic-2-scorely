import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AccountPage } from '../pages/account/account';
import { StatisticPage } from '../pages/statistic/statistic';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage} from '../pages/login/login';
import { ProgramService } from '../providers/program-service/program-service';
import { ProgramDetail } from '../components/program/program-detail';
import { ProgramList } from '../components/program/program-list';
import { ProgramAdd } from '../components/program/program-add';
import { ProgramEdit } from '../components/program/program-edit';
import { ProgramSharing } from '../components/program/program-sharing';
import { ActivityAdd } from '../components/activity/activity-add';
import { ActivityEdit } from '../components/activity/activity-edit';
import { ActivityDetail } from '../components/activity/activity-detail';
import { TeamAdd } from '../components/team/team-add';
import { TeamEdit } from '../components/team/team-edit';
import { TeamDetail } from '../components/team/team-detail';
import { PointEdit } from '../components/point/point-edit';
import { ActivityService } from '../providers/activity-service/activity-service';
import { TeamService } from '../providers/team-service/team-service';
import { PointService } from '../providers/point-service/point-service';
import { AuthService } from '../providers/auth-service/auth-service';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const fbConf = {
apiKey: "AIzaSyCgus8xLyN6gz-Nzr0y81_1XXWP02Vf_sE",
authDomain: "scorely-9029a.firebaseapp.com",
databaseURL: "https://scorely-9029a.firebaseio.com",
storageBucket: "scorely-9029a.appspot.com",
messagingSenderId: "66757883024"
};

const fbAuthConf = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    StatisticPage,
    HomePage,
    TabsPage,
    LoginPage,
    ProgramDetail,
    ProgramList,
    ProgramEdit,
    ProgramAdd,
    ProgramSharing,
    ActivityDetail,
    ActivityAdd,
    ActivityEdit,
    TeamDetail,
    TeamAdd,
    TeamEdit,
    PointEdit
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
    LoginPage,
    ProgramDetail,
    ProgramList,
    ProgramEdit,
    ProgramAdd,
    ProgramSharing,
    ActivityDetail,
    ActivityAdd,
    ActivityEdit,
    TeamDetail,
    TeamAdd,
    TeamEdit,
    PointEdit
  ],
  providers: [
  ProgramService,
  ActivityService,
  TeamService,
  PointService,
  AuthService
  ]
})
export class AppModule {}
