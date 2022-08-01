import { Component, OnInit } from '@angular/core';
import { PostService } from "src/app/services/post.service";
import { Order } from 'src/app/models/Order';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orders:Order[] = [];
  order: Order | any;
  private ordersSub: Subscription = new Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    let interval = setInterval(() => {
    this.postService.getOrder()
    this.ordersSub = this.postService.getOrdUpdateListener()
    .subscribe((request)=>{
      // this.raw(this.obj)
      this.raw(request)
      // this.order = order;
      // console.log("fetched from dashboard this order: ", this.order)
      });
    }, 5000)
  //   let interval = setInterval(() => {
  //     this.postService.getOrders
  // }, 2000)
  }
  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
  }

  raw(req: any){
    this.order = req.order
    // console.log("fetched from dashboard order: ", req.order.content)
  }

  obj = {
    "message": "Order fetched successfully!",
    "order": {
        "_id": "62e6e30a95fcd3ba8fa9c4c5",
        "tableId": "1",
        "content": "CallWaiter",
        "status": "CREATED",
        "__v": 0
    }
}

}
