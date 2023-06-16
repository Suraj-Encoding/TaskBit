import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from 'src/app/services/home.service';




@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  formValues = {
    title: "",
    description: "",
    start: "",
    tag: "",
    due:""
  }
  constructor(private service: HomeService, private dialogRef: MatDialogRef<AddTodoComponent>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClickAdd(): void {
    this.service.addTodo(this.formValues).subscribe((data) => {
      console.log(data);
      this.snackBar.open("Todo Added Successfully.", "close", {
        verticalPosition: "top",
        duration: 2000
      });
      this.dialogRef.close();
    }, err => {
      console.log(err);
    })
  }

}
