import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/Table';
import { PostService } from 'src/app/services/post.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-table-entrance',
  templateUrl: './table-entrance.component.html',
  styleUrls: ['./table-entrance.component.scss'],
})
export class TableEntranceComponent implements OnInit {
  private tableExistsSub: Subscription = new Subscription();
  private messageSubscription: Subscription = new Subscription();
  table: Table | any;
  tableCheck = false;

  constructor(
    private router: Router,
    private postService: PostService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    // if (this.postService.isTableEntered()) {
    //   this.router.navigateByUrl('/table');
    // }
    this.messageSubscription = this.socketService
      .onMessage('TableActive')
      .subscribe((res: boolean) => {
        console.log('Received order:', { res });
        this.check(res);
      });
  }
  ngOnDestroy(): void {
    this.tableExistsSub.unsubscribe();
  }
  tableId: any;
  onEnterTable(form: NgForm) {
    let values = form.value;
    this.tableId = values.tableId;
    console.log({values});
    this.socketService.sendMessage('table', values);
  }
  check(request: any) {
    if (request === true) {
      sessionStorage.setItem('tableId', this.tableId);
      console.log(sessionStorage);
      this.router.navigateByUrl('/table');
    } else {
      console.log(sessionStorage);
      console.log(request.table);
      this.tableCheck = true;
    }
  }
  // onEnterTable(form: NgForm) {
  //   let values = form.value;
  //   console.log(values);
  //   this.tableId = values.tableId;
  //   this.postService
  //     .getTableCredentials(values.tableId, values.password)
  //     .subscribe((request) => {
  //       this.check(request);
  //     });
  // }
  // check(request: any) {
  //   if (request.table === 'true') {
  //     sessionStorage.setItem('tableId', this.tableId);
  //     console.log(sessionStorage);
  //     this.router.navigateByUrl('/table');
  //   } else {
  //     console.log(sessionStorage);
  //     console.log(request.table);
  //     this.tableCheck = true;
  //   }
  // }
}
