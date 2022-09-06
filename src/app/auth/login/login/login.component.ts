import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private userSub: Subscription = new Subscription();
  table: User | any;
  constructor(private router: Router, private postService: PostService) {}
  userCheck = false;
  ngOnInit(): void {
    if (this.postService.isAdminLoggedIn())
      this.router.navigateByUrl('/dashboard');
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogin(form: NgForm) {
    let formValues = form.value;
    this.postService
      .userAuth(formValues.username, formValues.password)
      .subscribe((request) => {
        this.check(request, formValues.username);
      });
  }
  check(request: any, username: string) {
    if (request.user === 'true') {
      sessionStorage.setItem('admin', username);
      this.router.navigateByUrl('/dashboard');
    } else {
      console.log('nono');
      this.userCheck = true;
    }
  }
}
