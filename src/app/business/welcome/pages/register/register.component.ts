import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatInput, MatInputModule} from '@angular/material/input';
import {Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {ActivatedRoute, Params, Router, RouterOutlet} from '@angular/router';
import {UsersService} from '../../../../core/services/users.service';
import {User} from '../../../../core/model/user';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {Dialog} from '@angular/cdk/dialog';
import {DialogPayComponent} from './pages/dialog-pay/dialog-pay.component';
import {
  MatDialog, MatDialogModule
} from '@angular/material/dialog';
import {Suscription} from '../../../../core/model/suscription';
import {PaymentType} from '../../../../core/model/payment-type';
import {SuscriptionsHistoryService} from '../../../../core/services/suscriptions-history.service';
import {DialogRegisterService} from '../../../../core/services/dialog-register.service';
import {Observable} from 'rxjs';
import {NgIf} from '@angular/common';
import {CustomDialogComponent} from '../shared/custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent, MatLabel, MatHint,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatInput,
    FormsModule,
    MatDialogModule,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule, RouterOutlet, MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious, NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  datosForm: FormGroup;
  suscripcionForm: FormGroup;
  pagoForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  userService: UsersService = inject(UsersService);
  susHistory: SuscriptionsHistoryService = inject(SuscriptionsHistoryService);
  router: Router = inject(Router);
  isLinear = true;
  typeId: number;
  userId: number;
  //edition
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number;
  dialogService: DialogRegisterService = inject(DialogRegisterService);
  formTitle: string[] = ['Registrarte', 'Seleccionar Plan', 'Seleccionar método de pago'];
  cont: number = 0;
  dialog = inject(MatDialog);
  isModalVisible: boolean = false;
  modalData: { type?: string; src?: string } = {};

  constructor() {
    this.datosForm = this.fb.group({
      id: [''],
      userName: ['', Validators.required],
      name: ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });


    this.suscripcionForm = this.fb.group({
      plan: ['', Validators.required],
    });

    this.pagoForm = this.fb.group({
      method: ['', Validators.required],
    });
  }

  avanzarPaso(stepper: any, validate: boolean) {

    const dateOfBirth = this.datosForm.get('dateOfBirth')?.value;
    const userName = this.datosForm.get('userName')?.value;

    if(validate){
      if (this.datosForm.valid) {
        //Validación de userName
        this.userService.existUsername(userName).subscribe((exists: boolean) => {
          if(exists){
            this.dialog.open(CustomDialogComponent,{
              data: { message: 'Lo sentimos, el nombre de usuario se encuentra registrado'}
            });
          }
          else{
            //Validación de fecha
            if(dateOfBirth && new Date(dateOfBirth) > new Date()){
              this.dialog.open(CustomDialogComponent, {
                data: { message: 'La fecha de nacimiento no puede ser mayor a la fecha actual' },
              });
            } else {
              stepper.next();
              if (this.cont < this.formTitle.length - 1) {
                this.cont += 1;
              }
            }
          }
        });
      } else {
        //Mensaje de correo en caso de error
        if(this.datosForm.get('email')?.hasError('email')){
          this.dialog.open(CustomDialogComponent,{
            data: { message: 'Lo sentimos, el correo ingresado no es válido'}
          })
        } else {
          this.dialog.open(CustomDialogComponent,{
            data: { message: 'Por favor, completa todos los campos requeridos.' }
          })
        }
      }
    } else {
      if (this.datosForm.valid) {
        stepper.next();
      } else {
        this.dialog.open(CustomDialogComponent,{
          data: { message: 'Por favor, completa todos los campos requeridos.' }
        });
      }
    }
  }

  retrocederPaso(stepper: any) {
    stepper.previous();
    if (this.cont > 0) {
      this.cont -= 1;
    }
  }


  ngOnInit() {
    this.route.params.subscribe((data: Params): void => {
      console.log("ngOnInit de RegisterComponent");
      console.log(data);
      this.id = data['id']; // Capturando el id del listado
      this.edicion = data['id'] != null; // true, false
      this.cargaForm();
    });
    this.dialogService.onAccept.subscribe(() => {
      this.onSubmit();
    });
  }

  cargaForm(): void {
    if (this.edicion) {
      this.userService.listId(this.id).subscribe((data: User): void => {
        console.log(data);
        this.datosForm.patchValue({
          userName: data.userName,
          name: data.name,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.datosForm.valid && this.suscripcionForm.valid) {
      const user: User = new User();
      const sus: Suscription = new Suscription();
      const paymentType: PaymentType = new PaymentType();

      user.userName = this.datosForm.value.userName;
      user.name = this.datosForm.value.name;
      user.email = this.datosForm.value.email;
      user.password = this.datosForm.value.password;
      user.dateOfBirth = this.datosForm.value.dateOfBirth;
      sus.id = this.suscripcionForm.value.plan;
      paymentType.id = this.typeId;

      console.log(paymentType.id);
      console.log(sus.id);
      console.log(user.email);
      console.log(user.dateOfBirth);

      if (!this.edicion) {
        // Crear el usuario
        this.userService.insert(user).subscribe((data: Object): void => {

          this.userService.getId(user.userName).subscribe((userId: number): void => {
            this.userId = userId;
            console.log("User ID obtenido:", this.userId);

            this.susHistory.insert(userId, sus.id, paymentType.id).subscribe((response:string) => {
              console.log("Suscription history añadida");
              console.log(response);
              alert(response);
              this.router.navigate(['/login']);

            });
          });
        });

      } else {
        console.log("Datos aceptado:", user);
        this.userService.update(user).subscribe((data: Object): void => {
          this.userService.list().subscribe((data: any) => {
            console.log("Lista actualizada de usuarios tras edición:", data);
            this.userService.setList(data);
          });
        });
      }
    } else {
      console.log("Formulario no válido");
    }
  }

  openDialog(event: Event) {
    const button = event.currentTarget as HTMLButtonElement;
    const value = button.getAttribute('value');
    this.typeId = value ? parseInt(value, 10) : 0;
    const type = button.getAttribute('id');
    const img = button.querySelector('img') as HTMLImageElement;
    const src = img ? img.src : '';

    this.dialog.open(DialogPayComponent, {
      data: { type, src }
    });
  }
}
