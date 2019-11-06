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
  users: User[] = [];
  pageResponse: PageResponse;
  totalPages: number;


  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
    this.changePage(0);
  }

  changePage(page: number) {
    this.uploadService.getPageResults(page).subscribe(
      data => {
        this.users = data.content;
        this.pageResponse = data;
        this.totalPages = data.totalPages;
        this.page = page;
      });
  }

}
