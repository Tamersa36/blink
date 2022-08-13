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
    this.fetchOrders()
    setInterval(() => this.fetchOrders(), 5000);
  }
  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
  }

  fetchOrders(){
    debugger;
      console.log("1",this.orders);
      this.postService.getOrder();
      this.ordersSub = this.postService.getOrdUpdateListener()
      .subscribe((request)=>{
        this.raw(request);
      });
      }

      raw(req: any){
        // this.order = req.order
        if(req.order){
      this.orders.push(req.order)
      console.log(this.orders);
  }
  }
    //   fetchOrders(){
    // // let interval = setInterval(() => {
    //   console.log(this.orders);
    //   this.postService.getOrder();
    //   this.ordersSub = this.postService.getOrdUpdateListener()
    //   .subscribe((request)=>{
    //     // this.raw(this.obj)
    //     this.raw(request);
    //     // this.order = order;
    //     // console.log("fetched from dashboard this order: ", this.order)
    //   });
    //   // }, 5000)
    //   //   let interval = setInterval(() => {
    //     //     this.postService.getOrders
    //     // }, 2000)
    //   }



}
