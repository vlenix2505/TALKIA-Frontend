import { Component, inject, OnInit } from '@angular/core';
import { NavUserComponent } from '../shared/nav-user/nav-user.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/model/user';
import {FormsModule} from '@angular/forms';
import {ProfileImageService} from '../../../../core/services/profile-image.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NavUserComponent,
    RouterOutlet,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  userService: UsersService = inject(UsersService);
  dataProfile: User;
  edition: boolean = false;
  profileImageService: ProfileImageService = inject(ProfileImageService);
  profileImage: string;


  ngOnInit() {
    this.profileImage = this.getProfileImage(this.userId);
    this.loadDataProfile();
  }

  loadDataProfile(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.dataProfile = data;
        console.log('Data recibida:', data);
      },
      error: (error) => console.log("Error en consulta", error)
    });
  }



  getProfileImage(userId: number): string {
    return this.profileImageService.getProfileImage(userId);
  }


  onEdit(): void {
    this.edition = !this.edition;
    if (!this.edition) {
      this.userService.update(this.dataProfile).subscribe({
        next: () => alert("Cambios guardados"),
        error: (error) => console.log("Error al guardar", error)
      });
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No se seleccionó ningún archivo');
    }
  }

}
