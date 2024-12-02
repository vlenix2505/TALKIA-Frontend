import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../core/services/login.service';

export const userGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService)
  let router = inject(Router)

  console.log(localStorage.getItem("Rol"));

  if(loginService.getToken() && localStorage.getItem('rol')?.includes('USER')){
    return true;
  } else{
    router.navigate(['/login']).then( r => console.log("Acceso sin token a user"));
    return false;
  }
};
