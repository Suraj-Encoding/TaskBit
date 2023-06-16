import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-showmore',
  templateUrl: './showmore.component.html',
  styleUrls: ['./showmore.component.scss'],
})
export class ShowmoreComponent implements OnInit {
  desc: string;
  color: string = 'has-background-primary';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackBar: MatSnackBar
  ) {
    this.desc = data.todo_desc;
  }

  ngOnInit(): void {
    this.onDescription();
  }
  onDescription(): void {
    this.snackBar.open('Todo Description', 'close', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
