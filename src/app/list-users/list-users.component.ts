import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UploadService } from '../upload.service';
import { PageResponse } from '../model/pageresponse.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  page = 0;
  allPages: number[] = [];
  users: User[] = [];
  pageResponse: PageResponse;


  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
    this.uploadService.getPageResults(this.page).subscribe(
      data => {
        this.users = data.content;
        this.pageResponse = data;
        for (let i = 0; i < data.totalPages; i++) {
          this.allPages.push(i);
        }
      });
  }

  changePage(page: number) {
    this.uploadService.getPageResults(page).subscribe(
      data => {
        this.page = page;
        this.users = data.content;
        this.pageResponse = data;
        this.allPages = [];
        for (let i = 0; i < data.totalPages; i++) {
          this.allPages.push(i);
        }
      }

    );
  }

}
