import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { UserService } from 'src/app/services/user.service';
import { HomeService } from 'src/app/services/home.service';
import { Todo } from '../common/Todo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHome: boolean;
  isLog: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _service: UserService,
    private snackBar: MatSnackBar
  ) {
    router.events.subscribe((url: any) => {
      if (
        router.url === '/register' ||
        router.url === '/login' ||
        router.url === '/forget'
      ) {
        this.isHome = false;
      } else {
        this.isHome = true;
      }
      this.isLog = !this.isHome;
    });
  }
  ngOnInit(): void {
  }

  logout(): void {
    this._service.logout();
    this.router.navigate(['/login']);
    this.snackBar.open('Logout successfull.', 'close', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
