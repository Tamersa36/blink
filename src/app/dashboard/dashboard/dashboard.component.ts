import { Component, OnInit } from '@angular/core';
import { PostService } from "src/app/services/post.service";
import { Order } from 'src/app/models/Order';
import { Subscription } from "rxjs";
import { Table } from 'src/app/models/Table';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orders:Order[] = [];
  tables:Table[] = [];
  order: Order | any;
  private ordersSub: Subscription = new Subscription;

  constructor(private postService: PostService, private sharedData: ShareDataService) { }

  ngOnInit(): void {
    this.fetchOccupiedTables()
    setInterval(() => {
      this.fetchOccupiedTables()
    }
    , 2000);
    // this.fetchOrders()
    // setInterval(() => this.fetchOrders(), 2000);
    // this.sharedData.token$.subscribe(table => {
    //   console.log(table)
    // });
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
  fetchOccupiedTables(){
      this.postService.getOccupiedTables()
      .subscribe((request)=>{
        console.log(request)
        this.raw2(request);
      });
      }

      raw(req: any){
        // this.order = req.order
        if(req.order){
      this.orders.push(req.order)
      console.log(this.orders);
  }
  }
      raw2(req: any){
        if(req.table){
          this.tables = req.table;
        }
        console.log(this.tables);
        // this.order = req.order
        // if(req.table && this.tables.indexOf(table) !== -1){
      // this.tables.push(req.table)
        // console.log(this.tables);
  // }
  }

  onCompleteOrder(i: any){
    this.orders.splice(i,1);
    console.log("compelete",this.orders)
  }

}
