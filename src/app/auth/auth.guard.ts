import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service'; //

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated()) {
      if (this.authService.isLoggedOut()) {
        this.router.navigate(['/forbidden']);
        return false;
      }
      this.router.navigate(['/signin']);
      return false;
    }

    const requiredRoles = route.data['roles'] as string[];
    const userRole = this.authService.getRuoloUtente();

    if (requiredRoles && requiredRoles.length > 0) {
      if (requiredRoles.includes(userRole)) {
        return true;
      } else {
        if (userRole === 'UTENTE') {
          this.router.navigate(['/forbidden']);
          return false;
        }
        this.router.navigate(['/signin']);
        return false;
      }
    }
    return true;
  }
}
