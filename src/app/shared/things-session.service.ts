import { Injectable } from '@angular/core';

export interface SessionConfig {
    sessionTime : number,
    isSessionMode: number,
    input?: string,
    tags?: any[]
}

export enum SessionMode {
  TAGS,
  INPUT
}

@Injectable()
export class ThingsSessionService{
 
 setSessionConfig(confObj: SessionConfig): void {
   this.sessionConfig = confObj;
 }

 getSessionConfig(): SessionConfig {
 	return this.sessionConfig;
 } 

 private sessionConfig:SessionConfig;

}