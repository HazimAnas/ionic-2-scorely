import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Team } from '../../components/team/team';
import { Activity } from '../../components/activity/activity';
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
  public activityList : FirebaseListObservable <Activity[]>;

  constructor(private http: Http, private af: AngularFire) {}

  getTeams(programId) {
    this.activeProgram = programId;
    this.teamList = this.af.database.list('/team/'+programId);
    this.activityList = this.af.database.list('/activity/'+this.activeProgram);
  }

  getTeamsById(teamId) {
    return this.af.database.object('/team/'+this.activeProgram+'/'+teamId);
  }

  addTeam(team): boolean{
    var teamActivityList = {};

    this.activityList.subscribe(activities=>{
     activities.forEach(activity => {
       teamActivityList[activity.$key] = {"name" : activity.name, "amount" : 0};
     });
   });
    JSON.stringify(teamActivityList)

    this.teamList.push({
      name: team.name,
      description: team.description,
      activity: teamActivityList
    }).then( newTeam => {

      this.newTeam = newTeam;

      this.af.database.object(`/ranking/${this.activeProgram}/${newTeam.getKey()}`)
      .set({ name : team.name, amount : 0});

      this.activityList.subscribe(activities => {
        activities.forEach( activity => {
          console.log('team object url :' +`/activity/${this.activeProgram}/${activity.$key}/team/${newTeam.getKey()}`);
          this.af.database.object(`/activity/${this.activeProgram}/${activity.$key}/team/${newTeam.getKey()}`)
          .set({ name : team.name, amount : 0});
        });
      }).unsubscribe();
      return true;
    }
      , error => {
        console.log(error);
        this.newTeam = null;
        return false;
      });
      return true;
  }

  editTeam(key : string, team: Team): boolean {
    this.teamList.update(key, {
      name: team.name,
      description : team.description
    }).then( () => {
      this.activityList.subscribe(activities => {
        activities.forEach( activity => {
          console.log('team object url :' +`/activity/${this.activeProgram}/${activity.$key}/team/${key}`);
          this.af.database.object(`/activity/${this.activeProgram}/${activity.$key}/team/${key}`)
          .update({ name : team.name});
        });
      }).unsubscribe();
      return true;
    }
      , error => {
        console.log(error);
        return false;
      });
      return true;
  }

  deleteTeam(key) {
    this.teamList.remove(key);
    this.af.database.list(`/ranking/${this.activeProgram}/`).remove(key);
    this.activityList.subscribe(activities => {
      activities.forEach( activity => {
        this.af.database.list(`/activity/${this.activeProgram}/${activity.$key}/team/`)
        .remove(key);
      });
    }).unsubscribe();

  }
}
