import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  animal: string | any;
  name: string | any;
  tableId: string | any;
  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  order = this._formBuilder.group({
    salad: false,
    starter: false,
    mainCourse: false,
    desert: false,
    drink: false,
  });

  ngOnInit(): void {
    this.tableId = sessionStorage.getItem('tableId');
  }

  public closeMe() {
    this.dialogRef.close();
  }

  onSelfOrdering() {
    const res: string[] = [];
    Object.keys(this.order.value).forEach((key) => {
      if (this.order.value[key] === true) res.push(key);
    });
    if (res.length) {
      let regexRes = JSON.stringify(res);
      regexRes = regexRes.replace(/[\[\]']+/g, '');
      regexRes = regexRes.replace(/"/g, '');
      regexRes = regexRes.replace(/,/g, ' | ');
      console.log(regexRes);
      this.postService
        .addOrder(this.tableId, regexRes, 'CREATED')
        .subscribe((responseData) => {
          console.log(responseData.message);
          this.dialogRef.close();
        });
    }
  }
}
