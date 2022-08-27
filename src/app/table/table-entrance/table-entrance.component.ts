import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/Table';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-table-entrance',
  templateUrl: './table-entrance.component.html',
  styleUrls: ['./table-entrance.component.scss'],
})
export class TableEntranceComponent implements OnInit {
  private tableExistsSub: Subscription = new Subscription();
  table: Table | any;
  tableCheck = false;

  constructor(
    private shareData: ShareDataService,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    if (this.postService.isTableEntered()) {
      this.router.navigateByUrl('/table');
    }
  }
  ngOnDestroy(): void {
    this.tableExistsSub.unsubscribe();
  }
  tableId: any;
  onEnterTable(form: NgForm) {
    let values = form.value;
    console.log(values);
    this.tableId = values.tableId;
    this.postService.getTableCredentials(values.tableId, values.password);
    this.tableExistsSub = this.postService
      .getTableExistsSubUpdateListener()
      .subscribe((request) => {
        this.check(request);
      });
  }
  check(request: any) {
    if (request.table === 'true') {
      sessionStorage.setItem('tableId', this.tableId);
      console.log(sessionStorage);
      this.router.navigateByUrl('/table');
    } else {
      console.log(sessionStorage);
      console.log(request.table);
      this.tableCheck = true;
    }
  }
}
