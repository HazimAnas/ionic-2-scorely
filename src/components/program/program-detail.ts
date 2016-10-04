import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import { Program } from './program';

@Component({
  selector: 'program-detail',
  templateUrl: 'program-detail.html'
})
export class ProgramDetail {

  program: Program;

  constructor(private navCtrl: NavController, param: NavParams) {
  	this.program = param.get('program');
  }
}
