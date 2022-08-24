import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs";
import { HttpClient, HttpParams} from "@angular/common/http";

import { Order } from "../models/Order";
import { Table } from "../models/Table";
import { User } from "../models/User"


@Injectable({providedIn: 'root'})

export class PostService{

  private orders: Order[] = [];
  private tables: Table[] | any;

  private order: Order | any;
  private table: Table | any;
  private user: User | any;
  private tableExists: string | any;
  private tableStatus: string | any;
  private leaveTable: string | any;

  private ordersUpdated = new Subject<Order[]>();
  private tablesUpdated = new Subject<Table[]>();

  private orderUpdated = new Subject<Order>();
  private tableUpdated = new Subject<Table>();
  private userUpdated = new Subject<User>();
  private leaveTableUpdated = new Subject<Table>();
  private tableExistsUpdated = new Subject<string>();
  private tableStatusUpdated = new Subject<string>();

  constructor(private http: HttpClient){}

////fetch Apis's////

  //post order
  addOrder(tableId: string, content: string, status: string){
    const order: Order={id:'', tableId: tableId, content: content, status: status};
    this.http.post<{message: string}>('http://localhost:3000/api/orders',order)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.orders.push(order);
      this.ordersUpdated.next([...this.orders]);
    });
  }

//get orders
  getOrders(){
    this.http.get<{message: string, orders: any }>(
    'http://localhost:3000/api/orders'
    )
    .pipe(map((orderData) => {
      return orderData.orders.map((order: { tableId: any; content: any; status:any; _id: any; })=>{
        return{
          tableId: order.tableId,
          content: order.content,
          status: order.status,
          id: order._id
        };
      })
    }))
    .subscribe(transformedOrders =>{
      this.orders = transformedOrders;
      this.ordersUpdated.next([...this.orders])//copy of array

    });
  }
  //get one order
  getOrder(){
    this.http.get<{message: string, order: Order }>(
    'http://localhost:3000/api/order'
    )
      .subscribe(order =>{
        console.log('from service: ', order)
        this.order = order;
      })
  }
   //get one order
   getOrderTest(){
    return this.http.get<{message: string, order: Order }>(
    'http://localhost:3000/api/order'
    )
  }

  getOccupiedTables(){
    return this.http.get<{message: string, table: Table }>(
    'http://localhost:3000/api/occupiedTables'
    )
  }
  //get all tables
  getTables(){
    this.http.get<{message: string, table: Table }>(
    'http://localhost:3000/api/tables'
    )
      .subscribe(tables =>{
        console.log('from service: ', tables)
        this.tables = tables;
        this.tablesUpdated.next([...this.tables])
      })
  }
  updateTableStatus(tableId:string){
    let params = new HttpParams();
    params = params.append('tableId', tableId);
    this.http.get<{message: string, table: Table }>(
    'http://localhost:3000/api/updateTableStatus',
    {params: params}
    )
      .subscribe(table =>{
        console.log('from service: ', table)
        this.tableStatus = table;
        this.tableStatusUpdated.next({...this.tableStatus})
      })
  }
  onLeaveTable(){
    return this.http.get<{message: string, table: Table }>(
    'http://localhost:3000/api/leaveTable'
    )
  }

  //check if table exist in DB
  getTableCredentials(tableId:string, password:string){
    let params = new HttpParams();
    params = params.append('tableId', tableId);
    params = params.append('password', password);
    this.http.get<{message: string, table: Table }>(
    'http://localhost:3000/api/table',
    {params: params}
    )
      .subscribe(table =>{
        console.log('from service: ', table)
        this.tableExists = table;
        this.tableExistsUpdated.next({...this.tableExists})
      })
  }
  //check if table exist in DB
    userAuth(userName:string, password:string){
    let params = new HttpParams();
    params = params.append('userName', userName);
    params = params.append('password', password);
    this.http.get<{message: string, user: User }>(
    'http://localhost:3000/api/user',
    {params: params}
    )
      .subscribe(user =>{
        console.log('from service: ', user)
        this.user = user;
        this.userUpdated.next({...this.user})
      })
  }

  getOrderUpdateListener(){
    return this.ordersUpdated.asObservable();
  }
  getOrdUpdateListener(){
    return this.orderUpdated.asObservable();
  }
  getTablesUpdateListener(){
    return this.tablesUpdated.asObservable();
  }
  getTableUpdateListener(){
    return this.tableUpdated.asObservable();
  }
  getTableExistsSubUpdateListener(){
    return this.tableExistsUpdated.asObservable();
  }
  getUserSubUpdateListener(){
    return this.userUpdated.asObservable();
  }
  getTableStatusUpdateListener(){
    return this.tableStatusUpdated.asObservable();
  }
  getLeaveTableUpdateListener(){
    return this.leaveTableUpdated.asObservable();
  }

  saveState(key:string, value:any){
    sessionStorage.setItem(`${key}`, JSON.stringify(value));
  }
  loadState(key: string){
    const state = JSON.parse(sessionStorage.getItem(key) || '{}');
    return state;
  }
}
