import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from 'src/app/services/post.service';
import { Menu } from 'src/app/models/Menu';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss']
})
export class AddMenuItemComponent implements OnInit {
  menu: any = [];
  displayedColumns: string[] = ['menu', 'delete'];
  dataSource: any;

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.getAllTables();
  }
  getAllTables() {
    this.postService.getAllMenuItems().subscribe((res) => {
      console.log(res.menu);
      this.menu = res.menu;
      this.dataSource = new MatTableDataSource<Menu>(this.menu);
    });
  }

  onDeleteTable(item: string) {
    console.log(item)
    this.postService.deleteItem(item).subscribe((res) => {
      console.log(res);
      this.getAllTables();
    });
  }

  onAddTable(form: NgForm) {
    let values = form.value;
    console.log(values);
    this.postService
      .addItem(values.item)
      .subscribe((res) => {
        console.log(res);
        this.getAllTables();
        form.reset();
      });
  }
}
