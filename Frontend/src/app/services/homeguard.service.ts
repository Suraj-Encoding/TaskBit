import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeguardService implements CanActivate {

  constructor(private snackBar: MatSnackBar, private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem("token");

    if (token) {
      return true;
    }

    this.snackBar.open("You have to login first.", "close", {
      verticalPosition: "top",
      duration: 2000
    });
    this._router.navigate(['/login']);
    return false;

  }
}
