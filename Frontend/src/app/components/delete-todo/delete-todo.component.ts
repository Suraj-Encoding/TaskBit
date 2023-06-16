import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent implements OnInit {

  todoId: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: HomeService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<DeleteTodoComponent>) {
    this.todoId = data.todoId;
  }

  ngOnInit(): void {
  }

  onClickDelete(): void {
    this.service.deleteTodo(this.todoId).subscribe((data) => {
      console.log(data);
      this.snackBar.open("Todo Deleted Successfully","close", {
        verticalPosition: "top",
        duration: 2000
      });
      this.dialogRef.close();
    }, err => {
      console.log(err);
    })
  }

}
