import {Component} from '@angular/core';
import { OnInit } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {ProgramDetail} from './program-detail';
import {ProgramEdit} from './program-edit';
import {ProgramAdd} from './program-add';
import { Program } from './program';
import { ProgramService } from '../../providers/program-service/program-service';

@Component({
  selector: 'program-list',
  templateUrl: 'program-list.html'
})
export class ProgramList implements OnInit {

  programs : FirebaseListObservable<Program[]>;
  constructor(private navCtrl: NavController, public alertCtrl: AlertController, private programService: ProgramService) {
  }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms(): void {
  	this.programService.getPrograms();
    this.programs = this.programService.programsList;
  }

  programDetail(key, program) {
   	this.navCtrl.push(ProgramDetail, {
            programId: key,
            program: program
          });
	}

  programAdd() {
    this.navCtrl.push(ProgramAdd);
  }

  programEdit(program) {
   	this.navCtrl.push(ProgramEdit, {
            program: program
          });
	}

  programDelete(key) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Confirmation',
      message: 'This action is irreversible.Delete this program?',
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
            this.programService.deleteProgram(key);
          }
        }
      ]
    });
    confirm.present();
  }
}
