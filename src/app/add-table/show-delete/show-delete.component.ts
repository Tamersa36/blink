import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-delete',
  templateUrl: './show-delete.component.html',
  styleUrls: ['./show-delete.component.scss'],
})
export class ShowDeleteComponent implements OnInit {
  users = null;
  constructor() {}

  ngOnInit(): void {}

  deleteUser(id: string) {}
}
