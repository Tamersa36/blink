import { Component, OnInit} from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { ShareDataService } from "src/app/services/share-data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']

})
export class PostCreateComponent implements OnInit {
  enteredTitle = ''
  enteredContent = '';

  tableId: string | any;

  constructor(public postService: PostService, private shareData: ShareDataService, private router: Router){

  }
  ngOnInit(): void {
    this.tableId = sessionStorage.getItem('tableId');
    console.log('table id from order: ', this.tableId)
  }

  onCallWaiter(){
    this.postService.addOrder(this.tableId,"Call Waiter","CREATED");
  }
  onNeedWater(){
    this.postService.addOrder(this.tableId,"Need Water","CREATED");
  }
  onReadyToOrder(){
    this.postService.addOrder(this.tableId,"Ready To Order","CREATED");
  }
  onSendMeBill(){
    this.postService.addOrder(this.tableId,"Send Me Bill","CREATED");
  }
  onAskForMenu(){
      const url = "https://www.olden-menu.online";
      window.open(url, "_blank");
  }
  onLeaveTable(){
    this.postService.updateTableStatus(this.tableId)
    sessionStorage.clear();
    console.log(sessionStorage)
    this.router.navigateByUrl('');
  }
}
