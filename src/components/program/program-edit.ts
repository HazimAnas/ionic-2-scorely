import {Component, Input} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import { Program } from './program';

@Component({
  selector: 'program-edit',
  templateUrl: 'program-edit.html'
})
export class ProgramEdit {
  @Input() program: Program;

  constructor(private navCtrl: NavController, param: NavParams) {
  	this.program = param.get('program');
  }

  logForm(form) {
    console.log(form.value)
  }
}
