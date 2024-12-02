import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {LoginService} from '../../../../core/services/login.service';
import {RequestDto} from '../../../../core/model/request-dto';
import {ResponseDto} from '../../../../core/model/response-dto';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, MatButton, MatCard, MatCardContent, MatCardTitle, MatFormField, MatInput, MatLabel, MatOption, MatSelect, ReactiveFormsModule, RouterOutlet]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
    console.log("Form");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto()
      requestDto.username = this.loginForm.value.username;
      requestDto.password = this.loginForm.value.password;
      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto): void => {

          console.log("Rol", data.rol);
          console.log("userId", data.userId);
          console.log("levelId", data.levelId);
          console.log("Login response:", data);

          localStorage.setItem('rol', data.rol);
          localStorage.setItem('userId',String(data.userId));
          localStorage.setItem('levelId',String(data.levelId));
          localStorage.setItem('onTrack', String(1));

          this.router.navigate([data.rol.includes('ADMIN') ? '/admin' : data.rol.includes('USER') ? '/user' : '/login'])

        }
      })
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
}
