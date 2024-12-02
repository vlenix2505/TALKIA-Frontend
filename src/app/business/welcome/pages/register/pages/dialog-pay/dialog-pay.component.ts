import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {DialogRegisterService} from '../../../../../../core/services/dialog-register.service';

@Component({
  selector: 'app-dialog-pay',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    FormsModule,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-pay.component.html',
  styleUrl: './dialog-pay.component.css'
})
export class DialogPayComponent {

  dialogService: DialogRegisterService = inject(DialogRegisterService);

  data = inject(MAT_DIALOG_DATA);

  onAccept(): void {
    this.dialogService.onAccept.emit();
  }
}
