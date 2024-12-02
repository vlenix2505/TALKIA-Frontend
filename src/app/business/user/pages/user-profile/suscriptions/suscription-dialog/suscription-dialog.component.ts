import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatStep, MatStepLabel, MatStepper, MatStepperPrevious} from '@angular/material/stepper';
import {SuscriptionsHistoryService} from '../../../../../../core/services/suscriptions-history.service';
import {UsersService} from '../../../../../../core/services/users.service';

@Component({
  selector: 'app-suscription-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    FormsModule,
    MatDialogContent,
    MatInput,
    ReactiveFormsModule,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperPrevious
  ],
  templateUrl: './suscription-dialog.component.html',
  styleUrl: './suscription-dialog.component.css'
})
export class SuscriptionDialogComponent {

  suscripcionForm: FormGroup;
  metodoPagoForm: FormGroup;
  pagoForm: FormGroup;
  susHistoryService: SuscriptionsHistoryService = inject(SuscriptionsHistoryService);
  fb: FormBuilder = inject(FormBuilder);
  isLinear = true;

  paymentTypeId: number;
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);

  type: string | null;
  src: String;

  constructor() {
    this.suscripcionForm = this.fb.group({
      plan: ['', Validators.required],
    });

    this.pagoForm = this.fb.group({
      method: ['', Validators.required],
    });
  }

  onSubmit(){
    const userId: any = this.userId;
    const susId: number = this.suscripcionForm.value.plan;
    this.susHistoryService.insert(userId, susId, this.paymentTypeId).subscribe((data: any): void => {
      console.log(data);
      alert(data);
    });
  }


  toPaymentType(stepper: any) {
    if (this.suscripcionForm.valid) {
      stepper.next();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  toPay(event:Event,stepper: any) {
    const buttonSuscription = event.currentTarget as HTMLButtonElement;
    const value = buttonSuscription.getAttribute('value');
    this.paymentTypeId = value ? parseInt(value, 10) : 0;
    this.type = buttonSuscription.getAttribute('id');
    const img = buttonSuscription.querySelector('img') as HTMLImageElement;
    this.src = img ? img.src : '';
    stepper.next();
  }
}
