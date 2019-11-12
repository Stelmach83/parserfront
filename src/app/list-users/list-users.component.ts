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
  isSearchResult: boolean;
  lastNameSearch: string;


  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      lastName: new FormControl('')
    });
    this.changePage(0);
  }

  changePage(page: number) {
    this.isSearchResult = false;
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
    if (!this.isSearchResult) {
      if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
        this.uploadService.deleteUser(this.page, user.id).subscribe(
          data => {
            this.users = data.content;
            this.pageResponse = data;
            this.totalPages = data.totalPages;
            this.page = data.pageable.pageNumber;
          });
      }
    } else {
      if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
        this.uploadService.deleteUserFromSearch(this.page, user.id, this.lastNameSearch).subscribe(
          data => {
            this.users = data.content;
            this.pageResponse = data;
            this.totalPages = data.totalPages;
            this.page = data.pageable.pageNumber;
          });
      }
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

  search(page?: number) {
    if (this.form.get('lastName').value === '' || this.form.get('lastName').value === undefined) {
      this.changePage(0);
      return;
    }
    this.lastNameSearch = this.form.get('lastName').value;
    if (page === undefined) {
      this.uploadService.getUsersByLastName(this.lastNameSearch).subscribe(
        data => {
          this.users = data.content;
          this.pageResponse = data;
          this.totalPages = data.totalPages;
          this.page = data.pageable.pageNumber;
          this.isSearchResult = true;
        });
    } else {
      if (page >= 0 && page < this.totalPages) {
        this.uploadService.getUsersByLastName(this.lastNameSearch, page).subscribe(
          data => {
            this.users = data.content;
            this.pageResponse = data;
            this.totalPages = data.totalPages;
            this.page = data.pageable.pageNumber;
            this.isSearchResult = true;
          });
      }
    }
  }

}
