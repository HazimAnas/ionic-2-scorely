import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { Program } from './program';
import { Activity } from '../activity/activity';
import { Team } from '../team/team';
import { TeamService } from '../../providers/team-service/team-service';
import { ActivityService } from '../../providers/activity-service/activity-service';
import { TeamAdd } from '../team/team-add';
import { TeamEdit } from '../team/team-edit';
import { TeamDetail } from '../team/team-detail';
import { ActivityAdd } from '../activity/activity-add';
import { ActivityEdit } from '../activity/activity-edit';
import { ActivityDetail } from '../activity/activity-detail';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'program-detail',
  templateUrl: 'program-detail.html'
})
export class ProgramDetail {

  public program: Program;
  public programId: string;
  public activities: FirebaseListObservable <Activity[]>;
  public teams: FirebaseListObservable <Team[]>;

  constructor(private navCtrl: NavController, private param: NavParams, public alertCtrl: AlertController, private teamService: TeamService, private activityService: ActivityService) {
  	this.program = param.get('program');
    this.programId = param.get('programId');
    this.getTeams();
    this.getActivites();
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
