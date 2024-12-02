import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  constructor() { }

  getProfileImage(userId: number): string {
    return userId % 2 === 0
      ? `https://randomuser.me/api/portraits/men/${userId % 100}.jpg`
      : `https://randomuser.me/api/portraits/women/${userId % 100}.jpg`;
  }
}
