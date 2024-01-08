import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Order } from 'src/app/models/Order';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/Table';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

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
  isChecked = true;
  tableSound = '../../assets/table.wav';
  orderSound = '../../assets/order.wav';

  messages: string[] = [];
  messageInput: string = '';
  jsonObject: any;

  private ordersSub: Subscription = new Subscription();
  private messageSubscription: Subscription = new Subscription();

  constructor(
    private postService: PostService,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    //login guard
    if (!this.postService.isAdminLoggedIn())
      this.router.navigateByUrl('/login');

    //main logic
    //listening for orders from backend and Database
    //fetching connected tables, fetching tables orders, and listing for if tables left

    this.messageSubscription = this.socketService
      .onMessage('order')
      .subscribe((order: Order) => {
        console.log('Received order:', { order });
        this.handleOrder2(order);
      });
    this.messageSubscription = this.socketService
      .onMessage('table')
      .subscribe((text: string) => {
        console.log('table entered:', text);
        this.jsonObject = JSON.parse(text);
        this.handleOccupiedTable2(this.jsonObject);
      });
    // this.startProcesses();
    this.loadState();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions when the component is destroyed
    this.ordersSub.unsubscribe();
    this.messageSubscription.unsubscribe();
    clearInterval(this.interval);
  }

  // Send a message to the server
  sendMessage(): void {
    this.socketService.sendMessage('message', 'Hello from Angular!');
  }

  startProcesses() {
    this.fetchOccupiedTables();
    this.checkTableLeft();
    this.fetchOrders();
    this.startLoop();
  }
  startLoop() {
    this.interval = setInterval(() => {
      this.fetchOccupiedTables();
      this.checkTableLeft();
      this.fetchOrders();
    }, 2000);
  }

  killProcesses() {
    clearInterval(this.interval);
  }

  loadState() {
    //saving and fetching dashboard state
    const ordersState = this.postService.loadState('orders');
    if (ordersState) {
      ordersState.forEach((element: Order) => {
        this.orders.push(element);
      });
    }

    const tableState = this.postService.loadState('tables');
    if (tableState) {
      tableState.forEach((element: Table) => {
        this.tables.push(element);
      });
    }
  }

  fetchOrders() {
    this.postService.getOrder().subscribe((request) => {
      console.log(request);
      this.handleOrder(request);
    });
  }

  handleOrder(req: any) {
    if (req.order) {
      req.order.timeDate = this.getTimeDate();
      this.orders.push(req.order);
      this.playSound(this.orderSound);
    }
    console.log(this.orders);
    this.postService.saveState('orders', this.orders);
  }
  handleOrder2(req: any) {
    req.createdAt = this.getTimeDate();
    this.orders.push(req);
    this.playSound(this.orderSound);
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
      this.playSound(this.tableSound);
    }
    console.log(this.tables);
    this.postService.saveState('tables', this.tables);
  }
  handleOccupiedTable2(req: any) {
    if (req.table) {
      req.table.timeDate = this.getTimeDate();
      this.tables.push(req.table);
      this.playSound(this.tableSound);
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

  // onCompleteOrder(i: any, id: any) {
  //   console.log({id})
  //   this.postService.updateOrderStatus(id);
  //   this.orders.splice(i, 1);
  //   console.log('compelete', this.orders);
  //   this.postService.saveState('orders', this.orders);
  // }
  onCompleteOrder(i: any, orderId: any) {
    this.postService.updateOrderStatus(orderId).subscribe((res) => {
      this.orders.splice(i, 1);
      this.postService.saveState('orders', this.orders);
      console.log(res);
    });
  }

  onChange(checked: any) {
    console.log(checked);
    if (!checked) this.killProcesses();
    else {
      this.startLoop();
    }
  }

  getTimeDate() {
    const dateTime = new Date();
    return `${dateTime.getHours()}:${dateTime.getUTCMinutes()} ${dateTime.getDate()}/${
      dateTime.getUTCMonth() + 1
    }/${dateTime.getFullYear()}`;
  }

  playSound(url: string) {
    const audio = new Audio(url);
    audio.play();
  }
}
