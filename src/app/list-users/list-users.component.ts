import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UploadService } from '../upload.service';
import { PageResponse } from '../model/pageresponse.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  form: FormGroup;
  page = 0;
  users: User[] = [];
  pageResponse: PageResponse;
  totalPages = 1;


  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      lastName: new FormControl('')
    });
    this.changePage(0);
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.uploadService.getPageResults(page).subscribe(
        data => {
          this.users = data.content;
          this.pageResponse = data;
          this.totalPages = data.totalPages;
          this.page = data.pageable.pageNumber;
        });
    }
  }

  deleteEmployee(user: User) {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      this.uploadService.deleteUser(this.page, user.id).subscribe(
        data => {
          this.users = data.content;
          this.pageResponse = data;
          this.totalPages = data.totalPages;
          this.page = data.pageable.pageNumber;
        });
    }
  }

  deleteAllUsers() {
    if (confirm(`Are you sure you want to delete all entries?`)) {
      this.uploadService.deleteAllUsers().subscribe(
        data => {
          this.users = data.content;
          this.pageResponse = data;
          this.totalPages = data.totalPages;
        });
    }
  }

  search() {
    this.uploadService.getUsersByLastName(this.form.get('lastName').value).subscribe(
      data => {
        this.users = data.content;
        this.pageResponse = data;
        this.totalPages = data.totalPages;
        this.page = data.pageable.pageNumber;
      });
  }

}
