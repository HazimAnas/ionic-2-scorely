import {Component} from '@angular/core';
import { OnInit } from '@angular/core';
import {NavController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {ProgramDetail} from './program-detail';
import {ProgramEdit} from './program-edit';
import { Program } from './program';
import { ProgramService } from '../../providers/program-service/program-service';

@Component({
  selector: 'program-list',
  templateUrl: 'program-list.html'
})
export class ProgramList implements OnInit {

  programs : FirebaseObjectObservable<Program[]>;
  constructor(private navCtrl: NavController, private programService: ProgramService) {
  }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms(): void {
  	this.programService.getPrograms();
    this.programs = this.programService.programs;
  }

  programDetail(program) {
   	this.navCtrl.push(ProgramDetail, {
            program: program
          });
	}

  programEdit(program) {
   	this.navCtrl.push(ProgramEdit, {
            program: program
          });
	}
}
