import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-entrance',
  templateUrl: './table-entrance.component.html',
  styleUrls: ['./table-entrance.component.scss']
})
export class TableEntranceComponent implements OnInit {

  constructor(private shareData: ShareDataService, private router: Router) { }

  ngOnInit(): void {
  }
  emailFormControl = new FormControl('', [Validators.required]);

  onEnterTable(){
    let tableId = this.emailFormControl.value
    this.shareData.set(tableId);
    console.log(tableId);
    this.router.navigateByUrl('');

  }
}
