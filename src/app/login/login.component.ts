import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private router: Router) {}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }


  // Método de envío del formulario
  onSubmit() {
    this.submitted = true;


    // Si el formulario es inválido, no procede
    if (this.loginForm.invalid) {
      return;
    }


    // Aquí puedes implementar la lógica de autenticación
    if (this.loginForm.value.usuario === 'admin' && this.loginForm.value.contrasena === 'admin123') {
      // Redirigir a otra ruta, por ejemplo, dashboard
      this.router.navigate(['/dashboard']);
    } else {
      alert('Usuario o contraseña incorrecta');
    }
  }
}
