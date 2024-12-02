import {Component, inject, OnInit} from '@angular/core';
import {NavUserComponent} from '../../shared/nav-user/nav-user.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {DatePipe, NgForOf} from '@angular/common';
import {ContentHistoryService} from '../../../../../core/services/content-history.service';
import {MatTableDataSource} from '@angular/material/table';
import {ShowContentHistory} from '../../../../../core/model/showContentHistory';

@Component({
  selector: 'app-history-content',
  standalone: true,
  imports: [
    NavUserComponent,
    RouterOutlet,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgForOf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './history-content.component.html',
  styleUrl: './history-content.component.css'
})
export class HistoryContentComponent implements OnInit{

  contentHistoryService: ContentHistoryService = inject(ContentHistoryService);
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  dataSource: MatTableDataSource<ShowContentHistory> = new MatTableDataSource<ShowContentHistory>();

  constructor() {

  }

  ngOnInit(){
    this.loadHistoryContent();
  }

  loadHistoryContent():void {
    this.contentHistoryService.listHistoryByUserID(this.userId).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log(data);
        console.log(this.dataSource.data);

      },
      error: (error) => console.log("Error",error)
    });

  }
}

