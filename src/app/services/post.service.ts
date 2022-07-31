import { Injectable } from "@angular/core";
import { Post } from "../models/Post";
import { Order } from "../models/Order";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
@Injectable({providedIn: 'root'})
export class PostService{
  private posts: Post[] = [];
  private orders: Order[] = [];
  private order: Order | any;
  private postsUpdated = new Subject<Post[]>();
  private ordersUpdated = new Subject<Order[]>();
  private orderUpdated = new Subject<Order>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: any }>(
    'http://localhost:3000/api/posts'
    )
    .pipe(map((postData) => {
      return postData.posts.map((post: { title: any; content: any; _id: any; })=>{
        return{
          title: post.title,
          content: post.content,
          id: post._id
        };
      })
    }))
    .subscribe(transformedPosts =>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts])

    });
  }
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

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  getOrderUpdateListener(){
    return this.ordersUpdated.asObservable();
  }
  getOrdUpdateListener(){
    return this.orderUpdated.asObservable();
  }

  addOrder(tableId: string, content: string, status: string){
    const order: Order={id:'', tableId: tableId, content: content, status: status};
    this.http.post<{message: string}>('http://localhost:3000/api/orders',order)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.orders.push(order);
      this.ordersUpdated.next([...this.orders]);
    });
  }

  addPost(title: string, content: string){
    const post: Post={id:'', title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts',post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
