import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formValues: any = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    pet: ''
  };

  errorMessage: string;
  hide1: boolean = true;
  hide2: boolean = true;

  constructor(
    private _service: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  color1: string = 'has-background-light';
  color2: string = 'has-background-light';

  btn1: string = 'has-text-grey-lighter';
  btn2: string = 'has-text-grey-lighter';

  changecolor1(): void {
    if (this.hide1 == true) {
      // this.color1 = 'is-success';
      this.btn1 = 'has-text-dark';
    } else {
      // this.color1 = 'has-background-light';
      this.btn1 = 'has-text-grey-lighter';
    }
  }
  changecolor2(): void {
    if (this.hide2 == true) {
      // this.color2 = 'is-success';
      this.btn2 = 'has-text-dark';
    } else {
      // this.color2 = 'has-background-light';
      this.btn2 = 'has-text-grey-lighter';
    }
  }

  onClickRegister() {
    console.log(this.formValues);
    this._service.register(this.formValues).subscribe(
      (data) => {
        console.log(data);
        this._router.navigate(['/login']);
        this._snackBar.open(
          'Registration Successfull. Please, login to continue.',
          'close',
          {
            verticalPosition: 'top',
            duration: 2000,
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
