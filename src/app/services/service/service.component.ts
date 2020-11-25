import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

var key = environment.id
@Injectable({
  providedIn: 'root'
})

export class ServiceComponent {

  constructor(
    private http: HttpClient
  ) { }

  token() {
    return window.location.href = (`${'https://github.com/login'}` + `${key}`);
  }
  requestGitUser(name:string) {
    return this.http.get(`${'https://api.github.com/users/'}` + name);
  }
  requestGitRepos(name:string) {
    return this.http.get(`${'https://api.github.com/users/'}` + name + `${'/repos'}`);
  }
  requestGitStarred(inbody:any) {
    // return this.http.get(`${'https://api.github.com/users/'}` + inbody['name'] + `${'/starred/'}` + inbody['owner'] + `${'/'}` + inbody['repo']);
    return this.http.get(`${'https://api.github.com/users/'}` + inbody['name'] + `${'/starred'}`);
  }
}