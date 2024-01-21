import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { PopupComponent } from '../popup/popup.component';
import { FeedbackComponent } from '../feedback/feedback/feedback.component';
import { SocketService } from 'src/app/services/socket.service';
import { Order } from 'src/app/models/Order';
import { OrderRequest } from 'src/app/models/OrderRequest';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';

  tableId: string | any;

  json: any;
  messages: string[] = [];
  messageInput: string = '';

  constructor(
    public postService: PostService,
    private router: Router,
    public dialog: MatDialog,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    if (!this.postService.isTableEntered()) this.router.navigateByUrl('');
    this.tableId = sessionStorage.getItem('tableId');
    console.log('table id from order: ', this.tableId);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(OrderComponent, {
      width: '500px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }
  onPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
      height: '270px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }
  onFeedBack(): void {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '300px',
      height: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.router.navigateByUrl('');
    });
  }

  onCallWaiter() {
    const order: Order = {
      type: 'CallWaiter',
      tableId: this.tableId,
      content: 'Call Waiter',
    };
    this.socketService.sendMessage('order', order);
    this.onPopup();
  }
  // onCallWaiter() {
  //   this.postService
  //     .addOrder(this.tableId, 'Call Waiter', 'CREATED')
  //     .subscribe((responseData) => {
  //       console.log(responseData.message);
  //       this.onPopup();
  //     });
  // }
  onNeedWater() {
    const order: Order = {
      type: 'NeedWater',
      tableId: this.tableId,
      content: 'Need Water',
    };
    this.socketService.sendMessage('order', order);
    this.onPopup();
  }
  // onNeedWater() {
  //   this.postService
  //     .addOrder(this.tableId, 'Need Water', 'CREATED')
  //     .subscribe((responseData) => {
  //       console.log(responseData.message);
  //       this.onPopup();
  //     });
  // }
  onSendMeBill() {
    const order: Order = {
      type: 'SendMeBill',
      tableId: this.tableId,
      content: 'Send Me Bill',
    };
    this.socketService.sendMessage('order', order);
    this.onPopup();
  }
  // onSendMeBill() {
  //   this.postService
  //     .addOrder(this.tableId, 'Send Me Bill', 'CREATED')
  //     .subscribe((responseData) => {
  //       console.log(responseData.message);
  //       this.onPopup();
  //     });
  // }
  onAskForMenu() {
    const url = 'https://www.olden-menu.online';
    window.open(url, '_blank');
  }
  onLeaveTable() {
    this.socketService.sendMessage('leaveTable', this.tableId);
    // sessionStorage.clear();
    // console.log(sessionStorage);
    this.onFeedBack();
  }
  // onLeaveTable() {
  //   this.postService.updateTableStatus(this.tableId).subscribe((res) => {
  //     console.log(res);
  //     sessionStorage.clear();
  //     console.log(sessionStorage);
  //   });
  //   this.onFeedBack();
  // }
}
