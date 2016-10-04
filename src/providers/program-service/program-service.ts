import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Program } from '../../components/program/program';
import { PROGRAMS } from './mock-programs';
/*
  Generated class for the ProgramService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProgramService {

  constructor(private http: Http) {}

  getPrograms(): Promise<Program[]> {
  	return Promise.resolve(PROGRAMS);
  }
}
