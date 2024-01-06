import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { FeedbackComponent } from '../feedback/feedback/feedback.component';
import { SocketService } from 'src/app/services/socket.service';
import { Order } from 'src/app/models/Order';

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
  sendMessage() {
    const order: Order = {
      id: '',
      tableId: this.tableId,
      content: 'send me bill',
      status: 'CREATED',
      timeDate: '',
    };
    this.socketService.sendMessage('order', order)
    this.onPopup();
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
    this.postService
      .addOrder(this.tableId, 'Call Waiter', 'CREATED')
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.onPopup();
      });
  }
  onNeedWater() {
    this.postService
      .addOrder(this.tableId, 'Need Water', 'CREATED')
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.onPopup();
      });
  }
  onSendMeBill() {
    this.postService
      .addOrder(this.tableId, 'Send Me Bill', 'CREATED')
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.onPopup();
      });
  }
  onAskForMenu() {
    const url = 'https://www.olden-menu.online';
    window.open(url, '_blank');
  }
  onLeaveTable() {
    this.postService.updateTableStatus(this.tableId).subscribe((res) => {
      console.log(res);
      sessionStorage.clear();
      console.log(sessionStorage);
    });
    this.onFeedBack();
  }
}
