import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/Post";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy{
  // posts = [
  //   {title: 'First Post', content: "This is the First post's content"},
  //   {title: 'Second Post', content: "This is the Second post's content"},
  //   {title: 'Third Post', content: "This is the Third post's content"}
  // ];

  posts:Post[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(public postServise: PostService) {}

  ngOnInit(): void {
  // this.postServise.getPosts();
  //  this.postsSub = this.postServise.getPostUpdateListener()
  //   .subscribe((posts: Post[])=>{
  //     this.posts = posts;
  //   });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

}
