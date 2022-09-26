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

  public uploadFile(file: any, taxPercentage: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('taxPercentage', taxPercentage.toString());
    return this.http.post(`${this.baseUrl}/data`, formData);
  }
}
