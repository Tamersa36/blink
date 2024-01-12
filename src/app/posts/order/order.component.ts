import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  items:any
  pickedItems:any = []
  name: string | any;
  tableId: string | any;
  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: UntypedFormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.tableId = sessionStorage.getItem('tableId');
    this.postService.getAllMenuItems()
    .subscribe(res =>{
      console.log(res)
      this.items = res.menu
    })
  }

  public closeMe() {
    this.dialogRef.close();
  }
  onCheckBoxChange(item: any, isChecked: boolean) {
    console.log(item,isChecked)
    if (isChecked) {
      this.pickedItems.push(item);
      console.log(this.pickedItems)
    } else {
      this.pickedItems.splice(
        this.pickedItems.findIndex((i: any) => i === item),
        1
      );
      console.log(this.pickedItems)
      }
  }

  onSelfOrdering() {
    if (this.pickedItems.length) {
      let regexRes = JSON.stringify(this.pickedItems);
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
