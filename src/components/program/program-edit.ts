import {Component, Input} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import { Program } from './program';
import { ProgramService } from '../../providers/program-service/program-service';

@Component({
  selector: 'program-edit',
  templateUrl: 'program-edit.html'
})
export class ProgramEdit {
  @Input() program: Program;

  constructor(private navCtrl: NavController, param: NavParams, public programService: ProgramService) {
  	this.program = param.get('program');
  }

  logForm(form) {
    console.log(form.value)
  }

  submitEditForm(key, program: Program) {
    this.programService.editProgram(key, program);
  }
}
