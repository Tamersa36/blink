import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent{
  enteredTitle = ''
  enteredContent = '';

  tableId = "2";

  constructor(public postService: PostService){

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
