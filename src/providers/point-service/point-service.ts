import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Program } from '../../components/program/program';
import { Team } from '../../components/team/team';
//import { PROGRAMS } from './mock-programs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth-service/auth-service';
/*
  Generated class for the ProgramService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PointService {

  constructor(private http: Http, private af: AngularFire,public as: AuthService) {
  }

  updatePoint(programId: string, activityId: string, teamId: string, amount: number) {
    this.af.database.object(`/activity/${programId}/${activityId}/team/${teamId}`)
    .update({ amount : amount}).then(result => {
      this.af.database.object(`/team/${programId}/${teamId}/activity/${activityId}`)
      .update({ amount : amount})
      console.log("Point url " + `/team/${programId}/${teamId}/activity/${activityId}`);
    }).catch(error => console.log(error));

    this.updateProgramRanking(programId);
  }

  updateProgramRanking(programId) {
    var programTeamList : FirebaseListObservable <any[]>;
    var rankArr = [];

    programTeamList = this.af.database.list(`/team/${programId}`);

    programTeamList.subscribe(teams => {
      teams.forEach((team) => {
          rankArr[team.$key] = {'$key': team.$key, 'name': team.name, 'amount': 0};
          /*team.activity.forEach( (act) => {
            rankArr[team.$key]['amount'] = rankArr[team.$key]['amount'] + act.amount;
          });*/

          var arr = this.transform(team.activity);

          arr.forEach( activity => {
            //console.log(activity);
            rankArr[team.$key]['amount'] = parseFloat(rankArr[team.$key]['amount']) + parseFloat(activity.value.amount);
            //console.log(rankArr);
          });

          //rankArr = this.transform(rankArr);
          console.log(rankArr);
          var transArr = this.transform(rankArr);

          transArr.forEach(team => {
            this.af.database.object(`/ranking/${programId}/${team.value.$key}`)
            .set({ name : team.value.name, amount : team.value.amount});
            console.log(`url rankArr /ranking/${programId}/${team.key} name : ${team.value.name}  amount : ${team.value.amount}`);
          });
      });
    });


    //return rankArr;
  }

  getRanking(programId) {
    return this.af.database.list(`/ranking/${programId}`, {
        query: {
          orderByChild: 'amount',
        }
    });
  }

  transform(value) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

}
