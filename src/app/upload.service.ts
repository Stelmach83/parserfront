import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageResponse } from './model/pageresponse.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) {
  }

  public getUsersByLastName(lastName: string, page?: number): Observable<PageResponse> {
    let getPageURL;
    if (page !== undefined) {
      getPageURL = `${environment.serverUrl}/users/${page}/${lastName}`;
    } else {
      getPageURL = `${environment.serverUrl}/users/0/${lastName}`;
    }
    return this.httpClient.get<any>(getPageURL);
  }

  public getPageResults(page: number): Observable<PageResponse> {
    const getPageURL = `${environment.serverUrl}/users/${page}`;
    return this.httpClient.get<any>(getPageURL);
  }

  public deleteUser(page: number, id: number): Observable<PageResponse> {
    const getPageURL = `${environment.serverUrl}/users/delete?page=${page}&id=${id}`;
    return this.httpClient.delete<any>(getPageURL);
  }

  public deleteUserFromSearch(page: number, id: number, lastName: string): Observable<PageResponse> {
    let getPageURL;
    if (page !== undefined) {
      getPageURL = `${environment.serverUrl}/users/${lastName}/${page}/${id}`;
    } else {
      getPageURL = `${environment.serverUrl}/users/${lastName}/0/${id}`;
    }
    return this.httpClient.delete<any>(getPageURL);
  }

  public deleteAllUsers(): Observable<PageResponse> {
    const getPageURL = `${environment.serverUrl}/users/deleteAll`;
    return this.httpClient.delete<any>(getPageURL);
  }

  public upload(data) {
    const uploadURL = `${environment.serverUrl}/upload`;

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return {status: 'progress', message: progress};
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }

}
