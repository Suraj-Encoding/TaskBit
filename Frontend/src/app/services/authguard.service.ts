import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private snackBar: MatSnackBar, private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return true;
    }

    this.snackBar.open("You are already logged in.", "", {
      verticalPosition: "top",
      duration: 2000
    });
    this._router.navigate(['/home']);
    return false;

  }
}
