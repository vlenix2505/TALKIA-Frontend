import {HttpInterceptorFn, HttpStatusCode} from '@angular/common/http';
import {catchError, EMPTY, throwError} from "rxjs";

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Intercepto!!");
  const token = localStorage.getItem('token');
  console.log("Token recuperado:", token)
  let authReq = req;
  // Clona la solicitud y añade el encabezado de autorización
  if (token) {
    console.log("TOken enviado",token);
    authReq = req.clone({
      headers: req.headers.set('Authorization', "Bearer "+
        localStorage.getItem("token")?.toString())
    });
    console.log(authReq);
    console.log("Se terminó de clonar la solicitud");
  }

  return next(authReq).pipe(
    catchError(error => {
      console.log("Error en la petición");
      if (error.status === HttpStatusCode.Forbidden) {
        //this.loginService.logout();
        alert("NO TIENES PERMISOS!")
        return EMPTY;
      } else {
        return throwError(() => error);
      }
    })
  );
};
