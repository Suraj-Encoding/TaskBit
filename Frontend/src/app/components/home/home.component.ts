import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from 'src/app/services/home.service';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Todo } from '../common/Todo';
import { DeleteTodoComponent } from '../delete-todo/delete-todo.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { ShowmoreComponent } from '../showmore/showmore.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'description',
    'isCompleted',
    'start',
    'due',
    'tag',
    'status',
    'mark',
    'actions',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  // # Board
  completedTodos: Todo[] = [];
  notCompletedTodos: Todo[] = [];
  ProgressTodos: Todo[] = [];

  // # Tag
  Urgent: Todo[] = [];
  Important: Todo[] = [];
  UrgentImp: Todo[] = [];
  Today: Todo[] = [];
  Nothing: Todo[] = [];
  All: Todo[] = [];

  // # Variables

  // # For tag
  tag: string;
  code: number;

  // # For length
  len: number;
  comp: number;
  noncomp: number;
  prog: number;
  bug: number = 1;

  // # For colors
  logo: string;
  bag: string;
  text: string;
  color1: string;
  color2: string;
  color3: string;
  action: string = 'has-background-primary';
  all: boolean = false;
  tagc: string;

  // # Selector
  select: string;

  // # Arrays
  dataSource1 = new MatTableDataSource<Todo>(this.completedTodos);
  dataSource2 = new MatTableDataSource<Todo>(this.notCompletedTodos);
  dataSource4 = new MatTableDataSource<Todo>(this.ProgressTodos);
  dataSource3 = new MatTableDataSource<Todo>(this.All);

  dataSource = new MatTableDataSource<Todo>(this.All);

  constructor(
    private _service: HomeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.bug = 0;
  }

  ngOnInit(): void {
    this.getAllTodos();
    this.code = -1;
    this.color1 = 'has-background-danger-light';
    this.color2 = 'has-background-primary-light';
    this.color3 = 'has-background-warning-light';
    this.Error(this.noncomp);
  }

  // # Search Bar
  searchText: string;
  Search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.code == -1) {
      this.dataSource2.filter = filterValue.trim().toLowerCase();
      if (this.dataSource2.paginator) {
        this.dataSource2.paginator.firstPage;
      }

      this.dataSource1.filter = filterValue.trim().toLowerCase();
      if (this.dataSource1.paginator) {
        this.dataSource1.paginator.firstPage;
      }

      this.dataSource4.filter = filterValue.trim().toLowerCase();
      if (this.dataSource4.paginator) {
        this.dataSource4.paginator.firstPage;
      }
    }

    this.dataSource3.filter = filterValue.trim().toLowerCase();
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage;
    }
  }

  getAllTodos(): void {
    this._service.getTodos().subscribe(
      (data) => {
        console.log(data);
        this.dataSource1.data = data.completed;
        this.dataSource2.data = data.notCompleted;
        this.dataSource4.data = data.Progress;

        this.prog = data.Progress.length;
        this.noncomp = data.notCompleted.length;
        this.comp = data.completed.length;

        this.Error2(this.comp);
        this.Error3(this.prog);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // # Todo Home
  Home(): void {
    this.ngOnInit();
    this.searchText = "";
    this.code = -1;
    this.select = '';
    this.bug = 1;
  }

  // # Todo Message Display
  Error(err: number): void {
    if (!err && this.bug) {
      this.snackBar.open('No Todos - To Display !', 'close', {
        verticalPosition: 'top',
        duration: 2000,
      });
    }
  }
  Error2(err: number): void {
    if (!err) {
      this.snackBar.open('No Completed Todos !', 'close', {
        verticalPosition: 'bottom',
        duration: 2000,
      });
    }
  }
  Error3(err: number): void {
    if (!err) {
      this.snackBar.open('No Progress Todos !', 'close', {
        verticalPosition: 'bottom',
        duration: 2000,
      });
    }
  }

  // # Check Mark
  check(e: any): void {
    e.isCompleted = !e.isCompleted;
    if (e.isCompleted) {
      e.progress = false;
    }
    this._service.updateTodo(e).subscribe(
      (data) => {
        console.log(data);
        if (this.code == -1) {
          this.getAllTodos();
        } else {
          this.filter();
        }
        if (e.isCompleted) {
          this.snackBar.open('Todo Completed Successfully.', 'close', {
            verticalPosition: 'top',
            duration: 2000,
          });
        } else {
          this.snackBar.open('Todo Unmarked.', 'close', {
            verticalPosition: 'top',
            duration: 2000,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // # Show Description more or less
  msg: number = 25;
  color: string;
  openMsg(desc: string): void {
    const dialogRef = this.dialog.open(ShowmoreComponent, {
      data: {
        todo_desc: desc,
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  // # Tag Color change
  tagcolor: string;
  onTag(e: Todo): void {
    if (e.tag == 'Important') {
      this.tagcolor = 'text-success';
    }
    if (e.tag == 'Urgent') {
      this.tagcolor = 'text-primary';
    }
    if (e.tag == 'Today') {
      this.tagcolor = 'has-text-info-dark';
    }
    if (e.tag == 'Nothing') {
      this.tagcolor = 'has-text-warning-dark';
    }
    if (e.tag == 'Urgent & Important') {
      this.tagcolor = 'has-text-danger-dark';
    }
  }

  // # Task Status
  task_status: string;
  col: string;
  Task(e: Todo): void {
    if (e.isCompleted) {
      this.task_status = 'Completed';
      this.col = 'text-success';
    }
    if (e.progress) {
      this.task_status = 'In Progress';
      this.col = 'has-text-warning-dark';
    }
    if (!e.isCompleted && !e.progress) {
      this.task_status = 'New';
      this.col = 'has-text-info-dark';
    }
  }

  // # Filter Todos
  filter(): void {
    this.searchText = "";
    this._service.getTodos().subscribe(
      (data) => {
        console.log(data);
        if (this.code == 0) {
          this.dataSource3 = new MatTableDataSource<Todo>(this.All);
          this.dataSource3.data = data.All;
          this.len = data.All.length;
        }
        if (this.code == 1) {
          this.dataSource3 = new MatTableDataSource<Todo>(this.Urgent);
          this.dataSource3.data = data.Urgent;
          this.len = data.Urgent.length;
        }
        if (this.code == 2) {
          this.dataSource3 = new MatTableDataSource<Todo>(this.Important);
          this.dataSource3.data = data.Important;
          this.len = data.Important.length;
        }
        if (this.code == 3) {
          this.dataSource3 = new MatTableDataSource<Todo>(this.Today);
          this.dataSource3.data = data.Today;
          this.len = data.Today.length;
        }
        if (this.code == 4) {
          this.dataSource3 = new MatTableDataSource<Todo>(this.UrgentImp);
          this.dataSource3.data = data.UrgentImp;
          this.len = data.UrgentImp.length;
        }
        if (this.code == 5) {
          this.dataSource3 = new MatTableDataSource<Todo>(this.Nothing);
          this.dataSource3.data = data.Nothing;
          this.len = data.Nothing.length;
        }
        if (!this.len) {
          this.snackBar.open('No Todos - To Display !', 'close', {
            verticalPosition: 'top',
            duration: 2000,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // # Filter Changed
  filterChanged(ev: MatSelectChange) {
    const value = ev.value;
    if (value == 'ALL') {
      this.code = 0;
      this.tag = 'All Todos';
      this.logo = 'is-dark';
      this.bag = 'has-background-grey-lighter';
      this.text = 'has-text-primary';
    }
    if (value == 'URGENT') {
      this.code = 1;
      this.tag = 'Urgent Todos';
      this.logo = 'is-link';
      this.bag = 'has-background-link-light';
      this.text = 'text-dark';
      this.tagc = 'text-primary';
    }
    if (value == 'IMP') {
      this.code = 2;
      this.tag = 'Important Todos';
      this.logo = 'is-primary';
      this.bag = 'has-background-primary-light';
      this.text = 'text-dark';
      this.tagc = 'text-success';
    }
    if (value == 'TODAY') {
      this.code = 3;
      this.tag = 'Today Todos';
      this.logo = 'is-info';
      this.bag = 'has-background-info-light';
      this.text = 'text-dark';
      this.tagc = 'has-text-info-dark';
    }
    if (value == 'UI') {
      this.code = 4;
      this.tag = 'Urgent & Important Todos';
      this.logo = 'is-danger';
      this.bag = 'has-background-danger-light';
      this.text = 'text-dark';
      this.tagc = 'has-text-danger-dark';
    }
    if (value == 'NIL') {
      this.code = 5;
      this.tag = 'Nothing Todos';
      this.logo = 'is-warning';
      this.bag = 'has-background-warning-light';
      this.text = 'text-warning';
      this.tagc = 'has-text-warning-dark';
    }
    this.filter();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddTodoComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTodos();
      if (this.code > 0) {
        this.filter();
      }
    });
  }

  openUpdateDialog(todo: Todo, isCompleted: boolean) {
    const dialogRef = this.dialog.open(UpdateTodoComponent, {
      data: {
        todo: todo,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTodos();
      if (this.code > 0) {
        this.filter();
      }
    });
  }

  openDeleteDialog(todo: Todo) {
    const dialogRef = this.dialog.open(DeleteTodoComponent, {
      data: {
        todoId: todo._id,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTodos();
      if (this.code > 0) {
        this.filter();
      }
    });
  }
}
