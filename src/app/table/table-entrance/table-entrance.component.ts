import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/Table';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-table-entrance',
  templateUrl: './table-entrance.component.html',
  styleUrls: ['./table-entrance.component.scss']
})
export class TableEntranceComponent implements OnInit {
  private tableExistsSub: Subscription = new Subscription;
  table: Table | any;

  constructor(private shareData: ShareDataService, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.tableExistsSub.unsubscribe();
  }
  tableFormControl = new FormControl('', [Validators.required]);
  passFormControl = new FormControl('', [Validators.required]);

  onEnterTable(){
    let tableId = this.tableFormControl.value;
    this.shareData.set(tableId);
    console.log(this.tableFormControl.value,this.passFormControl.value);

    this.postService.getTableCredentials(this.tableFormControl.value,this.passFormControl.value);
      this.tableExistsSub = this.postService.getTableExistsSubUpdateListener()
      .subscribe((request)=>{
        console.log("req",request)
      });

    // this.router.navigateByUrl('/table');

  }
}
