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

  public getPageResults(page: number): Observable<PageResponse> {
    const getPageURL = `${environment.serverUrl}/users/page?page=${page}`;
    return this.httpClient.get<any>(getPageURL);
  }

  public deleteUser(page: number, id: number): Observable<PageResponse> {
    const getPageURL = `${environment.serverUrl}/users/delete?page=${page}&id=${id}`;
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
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }

      })
    );
  }

}
