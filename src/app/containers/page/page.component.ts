import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceComponent } from '../../services/service/service.component'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ServiceComponent,
  ) { }


  showUser: boolean = false;
  showRepos: boolean = false;
  showStarred: boolean = false;
  showButtonLink: boolean = false;

  dateSend!: FormGroup;
  callbackUser: any;
  callbackRepos: any;
  callbackStarred: any;

  url: string = '';
  inbody: any = [];

  ngOnInit(): void {
    this.dateSend = this.fb.group({
      name: ['', Validators.required],
    });
  }
  sendData() {
    let name = this.dateSend.value.name;
    //user
    this.service.requestGitUser(name).subscribe((response: any) => {
      this.callbackUser = response;
      this.showUser = true;
      this.showButtonLink = true;
      this.url = this.callbackUser.html_url;
      if(this.callbackUser){
        this.CallReturn();
      }
    }, error => {
      console.log(error)
    });
  }

  CallReturn(){
    let name = this.dateSend.value.name;
    //repos
    this.service.requestGitRepos(name).subscribe((response: any) => {
      this.callbackRepos = response;
      this.showRepos = true;
      if(this.callbackRepos){
        this.CallCallReturn();
      }
    }, error => {
      console.log(error)
    });
  }
  
  CallCallReturn(){
    this.inbody = {
      name: this.dateSend.value.name,
      owner: this.callbackUser.login,
      repo: 'hello-world'
    };

    //starred
    this.service.requestGitStarred(this.inbody).subscribe((response: any) => {
      this.callbackStarred = response;
      this.showStarred = true;
    }, error => {
      console.log(error)
    });

  }
  goGit(){
    let linktarget = this.url;
    let link = document.createElement("a");
        link.href = linktarget;
        link.click();
  }
}
