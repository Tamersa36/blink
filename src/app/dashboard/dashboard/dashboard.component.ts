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
    // let interval = setInterval(() => {
    this.postService.getOrder()
    this.ordersSub = this.postService.getOrdUpdateListener()
    .subscribe((order)=>{
      console.log("fetched from dashboard order: ", order)
      // this.order = order;
      // console.log("fetched from dashboard this order: ", this.order)
      });
    // }, 5000)
  //   let interval = setInterval(() => {
  //     this.postService.getOrders
  // }, 2000)
  }
  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
  }

}
