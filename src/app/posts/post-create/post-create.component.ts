import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';

  tableId: string | any;

  constructor(
    public postService: PostService,
    private router: Router,
    public dialog: MatDialog
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

  onCallWaiter() {
    this.postService
      .addOrder(this.tableId, 'Call Waiter', 'CREATED')
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
  onNeedWater() {
    this.postService
      .addOrder(this.tableId, 'Need Water', 'CREATED')
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
  onSendMeBill() {
    this.postService
      .addOrder(this.tableId, 'Send Me Bill', 'CREATED')
      .subscribe((responseData) => {
        console.log(responseData.message);
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
      this.router.navigateByUrl('');
    });
  }
}
