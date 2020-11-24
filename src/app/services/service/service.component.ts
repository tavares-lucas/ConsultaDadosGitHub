import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceComponent {

  constructor(
    private http: HttpClient
  ) { }

  // token() {
  //   return this.http.get(`${'https://github.com/login/oauth/authorize'}` + `${'client_id=bd780c3436a7180e3f2a'}`);
  // }
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