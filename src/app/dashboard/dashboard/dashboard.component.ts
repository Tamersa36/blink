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
    setInterval(() => this.fetchOrders(), 2000);
  }
  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
  }

  fetchOrders(){
      this.postService.getOrderTest()
      .subscribe((request)=>{
        console.log(request)
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

  onCompleteOrder(i: any){
    this.orders.splice(i,1);
    console.log("compelete",this.orders)
  }

}
