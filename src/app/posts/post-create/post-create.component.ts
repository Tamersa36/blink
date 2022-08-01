import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "src/app/services/post.service";
import { ShareDataService } from "src/app/services/share-data.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit {
  enteredTitle = ''
  enteredContent = '';

  tableId: string | any;

  constructor(public postService: PostService, private shareData: ShareDataService){

  }
  ngOnInit(): void {
    this.tableId = this.shareData.get()
    console.log('table id from order: ', this.tableId)
  }
  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  onCallWaiter(){
    this.postService.addOrder(this.tableId,"CallWaiter","CREATED");
  }
  onNeedWater(){
    this.postService.addOrder(this.tableId,"NeedWater","CREATED");
  }
}
