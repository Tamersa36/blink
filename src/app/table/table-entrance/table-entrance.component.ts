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
  tableCheck = false;

  constructor(private shareData: ShareDataService, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    if(this.postService.isTableEntered()){
      this.router.navigateByUrl('/table');
    }
  }
  ngOnDestroy(): void {
    this.tableExistsSub.unsubscribe();
  }
  tableFormControl = new FormControl('', [Validators.required]);
  passFormControl = new FormControl('', [Validators.required]);
  tableId: any;
  onEnterTable(){
    this.tableId = this.tableFormControl.value;
    console.log(this.tableFormControl.value,this.passFormControl.value);

    this.postService.getTableCredentials(this.tableFormControl.value,this.passFormControl.value);
      this.tableExistsSub = this.postService.getTableExistsSubUpdateListener()
      .subscribe((request)=>{
        this.check(request);
      });

    }
    check(request: any) {
      if(request.table==='true'){
        sessionStorage.setItem('tableId', this.tableId);
        console.log(sessionStorage)
        this.router.navigateByUrl('/table');
      }
      else{
        console.log(sessionStorage)
        console.log(request.table)
        this.tableCheck = true;
      }
  }
  }


