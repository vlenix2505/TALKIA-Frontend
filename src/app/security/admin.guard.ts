import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../core/services/login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService)
  let router = inject(Router)

  if(loginService.getToken() && localStorage.getItem('rol')?.includes('ADMIN')){
    return true;
  } else{
    router.navigate(['/login']).then( r => console.log("Acceso sin token a admin"));
    return false;
  }
};
