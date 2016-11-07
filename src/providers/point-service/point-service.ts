import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Program } from '../../components/program/program';
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
  }

  generateProgramRanking() {

  }

}
