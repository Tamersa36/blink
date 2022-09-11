import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/Table';
import { PostService } from 'src/app/services/post.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-show-delete',
  templateUrl: './show-delete.component.html',
  styleUrls: ['./show-delete.component.scss'],
})
export class ShowDeleteComponent implements OnInit {
  tables: any = [];
  displayedColumns: string[] = ['tableId', 'password', 'delete'];
  dataSource: any;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllTables();
  }
  getAllTables() {
    this.postService.getAllTables().subscribe((res) => {
      console.log(res.tables);
      this.tables = res.tables;
      this.dataSource = new MatTableDataSource<Table>(this.tables);
    });
  }

  onDeleteTable(tableId: string) {
    this.postService.deleteTable(tableId).subscribe((res) => {
      console.log(res);
      this.getAllTables();
    });
  }

  onAddTable(form: NgForm) {
    let values = form.value;
    console.log(values);
    this.postService
      .addTable(values.tableId, values.password)
      .subscribe((res) => {
        console.log(res);
        this.getAllTables();
        form.reset();
      });
  }

  onEditTable(tableId: string, password: string) {
    console.log(tableId, password);
    this.postService.editTable(tableId, password).subscribe((res) => {
      console.log(res);
      this.getAllTables();
    });
  }
}
