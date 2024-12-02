import { Component, inject } from '@angular/core';
import { NavUserComponent } from "../shared/nav-user/nav-user.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    NavUserComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {
  router: Router = inject(Router);
  userService: UsersService = inject(UsersService);

  deleteAccount() {
    const userId :number = parseInt(localStorage.getItem('userId') || '0', 10);
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.log("Cuenta eliminada correctamente");
        alert("Cuenta eliminada correctamente");
        this.router.navigate(['/welcome']);

        // Aquí puedes redirigir al usuario o realizar otras acciones
      },
      error: (err) => {
        console.error("Error al eliminar la cuenta:", err);
        alert("Ocurrió un error al eliminar la cuenta");
      }
    });
  }
  LogOut(): void {
    alert("Está cerrando sesión");
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }


}
