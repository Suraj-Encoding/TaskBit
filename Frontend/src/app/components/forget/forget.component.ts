import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
  hide: boolean = true;
  color: string = 'has-background-light';
  btn: string = 'has-text-grey-lighter';

  formValues = {
    email: '',
    password: '',
    pet: ''
  };

  errorMessage: string;

  constructor(
    private _service: UserService,
    private _router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  changecolor(): void {
    if (this.hide == true) {
      // this.color = 'is-success';
      this.btn = 'has-text-dark';
    } else {
      // this.color = 'has-background-light';
      this.btn = 'has-text-grey-lighter';
    }
  }

  onClickForget() {
    console.log(this.formValues);
    this._service.forget(this.formValues).subscribe(
      (data) => {
        console.log(data);
        this._router.navigate(['/login']);
        this.snackbar.open(
          'Password Changed Successfully. Please Login to continue.',
          'close',
          {
            verticalPosition: 'top',
            duration: 3000,
          }
        );
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.error.error;
      }
    );
  }
}
