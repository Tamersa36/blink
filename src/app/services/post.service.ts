import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs";
import { HttpClient, HttpParams} from "@angular/common/http";

import { Order } from "../models/Order";
import { Table } from "../models/Table";


@Injectable({providedIn: 'root'})

export class PostService{

  private orders: Order[] = [];
  private tables: Table[] | any;

  private order: Order | any;
  private table: Table | any;
  private tableExists: string | any;

  private ordersUpdated = new Subject<Order[]>();
  private tablesUpdated = new Subject<Table[]>();

  private orderUpdated = new Subject<Order>();
  private tableUpdated = new Subject<Table>();
  private tableExistsUpdated = new Subject<string>();

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
      this.ordersUpdated.next([...this.orders])

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
        this.orderUpdated.next(this.order)
      })
  }

  //get all tables
  getTables(){
    this.http.get<{message: string, table: Table }>(
    'http://localhost:3000/api/tables'
    )
      .subscribe(tables =>{
        console.log('from service: ', tables)
        this.tables = tables;
        this.tablesUpdated.next(this.tables)
      })
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
        this.tableExistsUpdated.next(this.tableExists)
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
    console.log(this.tableUpdated.asObservable())
    return this.tableExistsUpdated.asObservable();
  }
}
