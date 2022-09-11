import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Order } from '../models/Order';
import { Table } from '../models/Table';
import { User } from '../models/User';
import { environment } from 'src/environments/environment.prod';
import { Menu } from '../models/Menu';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  ////fetch Apis's////

  //post order
  addOrder(tableId: string, content: string, status: string) {
    const order: Order = {
      id: '',
      tableId: tableId,
      content: content,
      status: status,
      timeDate: '',
    };
    return this.http.post<{ message: string }>(
      environment.API_END_POINT + '/api/orders',
      order
    );
  }

  //get all orders for testing
  getOrders() {
    this.http
      .get<{ message: string; orders: any }>(
        environment.API_END_POINT + '/api/orders'
      )
      .pipe(
        map((orderData) => {
          return orderData.orders.map(
            (order: { tableId: any; content: any; status: any; _id: any }) => {
              return {
                tableId: order.tableId,
                content: order.content,
                status: order.status,
                id: order._id,
              };
            }
          );
        })
      );
  }

  //get one order where status created
  getOrder() {
    return this.http.get<{ message: string; order: Order }>(
      environment.API_END_POINT + '/api/order'
    );
  }

  //check if table entered the system and add it to dashboard
  getOccupiedTables() {
    return this.http.get<{ message: string; table: Table }>(
      environment.API_END_POINT + '/api/occupiedTables'
    );
  }
  //get all tables
  getAllTables() {
    return this.http.get<{ message: string; tables: Table }>(
      environment.API_END_POINT + '/api/tables'
    );
  }
  //when user leave update table status from OCCUPIED to EMPTY
  updateTableStatus(tableId: string) {
    let params = new HttpParams();
    params = params.append('tableId', tableId);
    return this.http.get<{ message: string; table: Table }>(
      environment.API_END_POINT + '/api/updateTableStatus',
      { params: params }
    );
  }

  //after table left update remove the table from dashboad panel by updating admin field in db from true to false
  onLeaveTable() {
    return this.http.get<{ message: string; table: Table }>(
      environment.API_END_POINT + '/api/leaveTable'
      );
    }

    //check if table exist in DB
    getTableCredentials(tableId: string, password: string) {
      let params = new HttpParams();
    params = params.append('tableId', tableId);
    params = params.append('password', password);
    return this.http.get<{ message: string; table: Table }>(
      environment.API_END_POINT + '/api/table',
      { params: params }
      );
    }
    //check if table exist in DB
  userAuth(userName: string, password: string) {
    let params = new HttpParams();
    params = params.append('Authorization', btoa(userName + ':' + password));
    return this.http.get<{ message: string; user: User }>(
      environment.API_END_POINT + '/api/user',
      {
        params: params,
      }
      );
    }

    //get all tables
    getAllMenuItems() {
      return this.http.get<{ message: string; menu: Menu }>(
        environment.API_END_POINT + '/api/menuItems'
      );
    }
       //CRUD Tables
  addItem(item: string) {
    const menu: Menu = {
      id: '',
      item: item
    };
    return this.http.post<{ message: string }>(
      environment.API_END_POINT + '/api/addMenuItem',
      menu
    );
  }
  deleteItem(item: string) {
    let params = new HttpParams();
    params = params.append('item', item);
    return this.http.get<{ message: string }>(
      environment.API_END_POINT + '/api/deleteMenuItem',
      {
        params: params,
      }
    );
  }
    //CRUD Tables
  addTable(tableId: string, password: string) {
    const table: Table = {
      id: '',
      tableId: tableId,
      status: '',
      password: password,
      admin: false,
      timeDate: '',
    };
    return this.http.post<{ message: string }>(
      environment.API_END_POINT + '/api/addTable',
      table
    );
  }
  deleteTable(tableId: string) {
    let params = new HttpParams();
    params = params.append('tableId', tableId);
    return this.http.get<{ message: string }>(
      environment.API_END_POINT + '/api/deleteTable',
      {
        params: params,
      }
    );
  }
  editTable(tableId: string, password: string) {
    const table: any = {
      tableId: tableId,
      password: password,
    };
    return this.http.post<{ message: string }>(
      environment.API_END_POINT + '/api/editTable',
      table
    );
  }

  //saving and loading app state
  saveState(key: string, value: any) {
    sessionStorage.setItem(`${key}`, JSON.stringify(value));
  }
  loadState(key: string) {
    const state = JSON.parse(sessionStorage.getItem(key) || '[]');
    console.log(state);
    if (key === 'tables') {
      let tableState = state as Table;
      return tableState;
    }

    if (key === 'orders') {
      let tableState = state as Order;
      return tableState;
    }
    return state;
  }

  isTableEntered() {
    let table = sessionStorage.getItem('tableId');
    return !(table === null);
  }

  isAdminLoggedIn() {
    let admin = sessionStorage.getItem('admin');
    return !(admin === null);
  }

  logOut() {
    sessionStorage.removeItem('admin');
  }
}
