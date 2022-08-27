import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Order } from 'src/app/models/Order';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/Table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orders: Order[] = [];
  tables: Table[] = [];
  order: Order | any;
  timeDate: string | any;
  interval: any;
  private ordersSub: Subscription = new Subscription();

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    //login guard
    if (!this.postService.isAdminLoggedIn())
      this.router.navigateByUrl('/login');

    //main logic
    //saving and fetching dashboard state
    // this.orders = this.postService.loadState('orders');
    // this.tables = this.postService.loadState('tables');

    //listening for orders from backend and Database
    //fetching connected tables, fetching tables orders, and listing for if tables left
    this.fetchOccupiedTables();
    this.checkTableLeft();
    this.fetchOrders();
    this.interval = setInterval(() => {
      this.fetchOccupiedTables();
      this.checkTableLeft();
      this.fetchOrders();
    }, 500);
  }

  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
    clearInterval(this.interval);
  }

  fetchOrders() {
    this.postService.getOrderTest().subscribe((request) => {
      console.log(request);
      this.handleOrder(request);
    });
  }

  handleOrder(req: any) {
    if (req.order) {
      req.order.timeDate = this.getTimeDate();
      this.orders.push(req.order);
    }
    console.log(this.orders);
    this.postService.saveState('orders', this.orders);
  }

  fetchOccupiedTables() {
    this.postService.getOccupiedTables().subscribe((request) => {
      console.log(request);
      this.handleOccupiedTable(request);
    });
  }

  handleOccupiedTable(req: any) {
    if (req.table) {
      req.table.timeDate = this.getTimeDate();
      this.tables.push(req.table);
    }
    console.log(this.tables);
    this.postService.saveState('tables', this.tables);
  }

  checkTableLeft() {
    this.postService.onLeaveTable().subscribe((request) => {
      console.log(request);
      this.handleTableLeft(request);
    });
  }

  handleTableLeft(req: any) {
    if (req.table) {
      this.tables.splice(
        this.tables.findIndex((t) => t.tableId === req.table.tableId),
        1
      );
    }
    console.log(this.tables);
    this.postService.saveState('tables', this.tables);
  }

  onCompleteOrder(i: any) {
    this.orders.splice(i, 1);
    console.log('compelete', this.orders);
    this.postService.saveState('orders', this.orders);
  }

  getTimeDate() {
    const dateTime = new Date();
    return `${dateTime.getHours()}:${dateTime.getUTCMinutes()} ${dateTime.getDate()}/${
      dateTime.getUTCMonth() + 1
    }/${dateTime.getFullYear()}`;
  }
}
