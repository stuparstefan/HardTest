import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public uploadFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/data`, formData);
  }

  public get(taxPercentage: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/data?taxPercentage=${taxPercentage}`);
  }
}
