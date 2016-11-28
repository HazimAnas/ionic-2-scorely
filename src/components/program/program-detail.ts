import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { Program } from './program';
import { Activity } from '../activity/activity';
import { Team } from '../team/team';
import { TeamService } from '../../providers/team-service/team-service';
import { ActivityService } from '../../providers/activity-service/activity-service';
import { ProgramService } from '../../providers/program-service/program-service';
import { TeamAdd } from '../team/team-add';
import { TeamEdit } from '../team/team-edit';
import { TeamDetail } from '../team/team-detail';
import { ActivityAdd } from '../activity/activity-add';
import { ActivityEdit } from '../activity/activity-edit';
import { ActivityDetail } from '../activity/activity-detail';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'program-detail',
  templateUrl: 'program-detail.html'
})
export class ProgramDetail {

  public program: Program;
  public programId: string;
  public activities: FirebaseListObservable<Activity[]>;
  public teams: FirebaseListObservable<Team[]>;

  constructor(private navCtrl: NavController, private param: NavParams, public alertCtrl: AlertController,private programService: ProgramService, private teamService: TeamService, private activityService: ActivityService) {
  	this.programId = param.get('programId');
    this.program = this.param.get('program');
    this.getTeams();
    this.getActivites();
  }

  getProgram(): void {
    var programObs: FirebaseObjectObservable<Program>;
    if(this.param.get('program').uid) {
      programObs = this.programService.getProgramById(this.programId,this.param.get('program').uid);
    }
    else {
      programObs = this.programService.getProgramById(this.programId, null);
    }
    programObs.subscribe(program=> {
      this.program.$key = program.$key;
      this.program.name = program.name;
      this.program.description = program.description;
    });
  }

  getActivites(): void {
    this.activityService.getActivities(this.programId);
    this.activities = this.activityService.activityList;
  }

  getTeams(): void {
    this.teamService.getTeams(this.programId);
    this.teams = this.teamService.teamList;
  }

  teamAdd() {
    this.navCtrl.push(TeamAdd);
  }

  teamDetail(team) {
    this.navCtrl.push(TeamDetail, {
            teamId: team
          });
  }

  teamEdit(team) {
    this.navCtrl.push(TeamEdit, {
            team: team
          });
  }

  teamDelete(key) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Confirmation',
      message: 'This action is irreversible.Delete this team?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.teamService.deleteTeam(key);
          }
        }
      ]
    });
    confirm.present();
  }

  activityAdd() {
    this.navCtrl.push(ActivityAdd);
  }

  activityDetail(activity) {
    this.navCtrl.push(ActivityDetail, {
            activityId: activity
          });
  }

  activityEdit(activity) {
    this.navCtrl.push(ActivityEdit, {
            activity: activity
          });
  }

  activityDelete(key) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Confirmation',
      message: 'This action is irreversible.Delete this activity?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.activityService.deleteActivity(key);
          }
        }
      ]
    });
    confirm.present();
  }

}
