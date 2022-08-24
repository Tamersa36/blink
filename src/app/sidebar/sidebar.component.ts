import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.postService.logOut()
    this.router.navigateByUrl('/login');
  }

}
