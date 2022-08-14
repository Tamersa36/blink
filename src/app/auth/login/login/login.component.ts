import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';

import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private userSub: Subscription = new Subscription;
  table: User | any;
  constructor(private shareData: ShareDataService, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogin(form: NgForm){
    console.log(form.value)
    this.postService.userAuth('admin1','admin');
      this.userSub = this.postService.getUserSubUpdateListener()
      .subscribe((request)=>{
        this.check(request);
      });
  }
  check(request: any) {
    if(request.user==='true'){
      console.log("zobi")
      this.router.navigateByUrl('/dashboard');
    }
    else{
      console.log("nono")
    }
}

}
