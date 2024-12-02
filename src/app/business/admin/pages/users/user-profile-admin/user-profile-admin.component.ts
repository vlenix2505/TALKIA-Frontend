import {Component, inject, OnInit} from '@angular/core';
import {NavAdminComponent} from '../../../shared/nav-admin/nav-admin.component';
import {UsersService} from '../../../../../core/services/users.service';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute, Params, Router, RouterLink, RouterOutlet} from '@angular/router';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {RatingService} from '../../../../../core/services/rating.service';
import {Rating} from '../../../../../core/model/rating';
import {FormsModule} from '@angular/forms';
import {ProfileImageService} from '../../../../../core/services/profile-image.service';

@Component({
  selector: 'app-user-profile-admin',
  standalone: true,
    imports: [
        NavAdminComponent,
        NgIf,
        RouterOutlet,
        NgForOf,
        RouterLink,
        FormsModule,
        DatePipe
    ],
  templateUrl: './user-profile-admin.component.html',
  styleUrl: './user-profile-admin.component.css'
})
export class UserProfileAdminComponent implements OnInit{
  id: number = 0;
  user: User = new User();
  scoresUser: Rating[] = [];
  usersService: UsersService = inject(UsersService);
  ratingService: RatingService = inject(RatingService);
  status: string = '';
  age: number = 0;
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  profileImageService: ProfileImageService = inject(ProfileImageService);

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de UserProfileAdmin")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      console.log(this.id);
      this.loadUser();
    });
  }

  getProfileImage(userId: number): string {
    return this.profileImageService.getProfileImage(userId);
  }

  loadUser(): void{
    this.usersService.getUserById(this.id).subscribe({
      next: (data: User) => {
        this.user = data;
        console.log(data);
      }
    })

    this.usersService.getUserAge(this.id).subscribe({
      next: (data: number) => {
        this.age = data;
      }
    })

    this.usersService.getStatusByUser(this.id).subscribe({
      next:(data: string) => {
        this.status = data;
        console.log(data);
        console.log(this.status);
      }
    })

    this.ratingService.listRatingByUser(this.id).subscribe({
      next:(data: Rating[]) => {
        this.scoresUser = data;
      }
    })
  }
}
