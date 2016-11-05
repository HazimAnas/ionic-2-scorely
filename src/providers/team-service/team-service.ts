import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Team } from '../../components/team/team';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth-service/auth-service';
import { ActivityService } from '../activity-service/activity-service';
/*
  Generated class for the TeamService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TeamService {

  public teamList : FirebaseListObservable <Team[]>;
  public newTeam : Team;
  public activeProgram : string;

  constructor(private http: Http, private af: AngularFire) {}

  getTeams(programId) {
    this.activeProgram = programId;
    this.teamList = this.af.database.list('/team/'+programId);
  }

  getTeamsById(teamId) {
    console.log('/team/'+this.activeProgram+'/'+teamId);
    return this.af.database.object('/team/'+this.activeProgram+'/'+teamId);
  }
  addTeam(team){
    var teamActivityList = {};
    var activity = this.af.database.list('/activity/'+this.activeProgram);

    activity.subscribe(activities=>{
     activities.forEach(activity => {
       teamActivityList[activity.$key] = {"name" : activity.name};
     });
    });
    JSON.stringify(teamActivityList)

    this.teamList.push({
      name: team.name,
      description: team.description,
      activity: teamActivityList
    }).then( newTeam => {
      this.newTeam = newTeam;
      activity.subscribe(activities => {
        activities.forEach( activity => {
          console.log('object url :' +`/activity/${this.activeProgram}/${activity.$key}/team/${newTeam.getKey()}`);
          this.af.database.object(`/activity/${this.activeProgram}/${activity.$key}/team/${newTeam.getKey()}`)
          .set({ name : team.name});
        })
      })
    }
      , error => {
        console.log(error);
        this.newTeam = null;
      });
  }

  editTeam(key : string, team: Team) {
    this.teamList.update(key, {
      name: team.name,
    }).then( newTeam => {
      console.log(newTeam);
    }
      , error => {
        console.log(error);
      });;
  }

  deleteTeam(key) {
    this.teamList.remove(key);
  }
}
