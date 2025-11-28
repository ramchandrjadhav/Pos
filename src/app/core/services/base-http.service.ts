import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected readonly baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  protected get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    console.log('BaseHttpService: GET request', { endpoint, params, url: `${this.baseUrl}${endpoint}` });
    const httpParams = this.buildParams(params);
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    console.log('BaseHttpService: POST request', { endpoint, body, url: `${this.baseUrl}${endpoint}` });
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
  }

  protected put<T>(endpoint: string, body: any): Observable<T> {
    console.log('BaseHttpService: PUT request', { endpoint, body, url: `${this.baseUrl}${endpoint}` });
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
  }

  protected delete<T>(endpoint: string): Observable<T> {
    console.log('BaseHttpService: DELETE request', { endpoint, url: `${this.baseUrl}${endpoint}` });
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  protected getBlob(endpoint: string, params?: Record<string, any>): Observable<Blob> {
    console.log('BaseHttpService: GET BLOB request', { endpoint, params, url: `${this.baseUrl}${endpoint}` });
    const httpParams = this.buildParams(params);
    return this.http.get(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
      responseType: 'blob'
    });
  }

  protected postFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    console.log('BaseHttpService: POST FormData request', { endpoint, url: `${this.baseUrl}${endpoint}` });
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData);
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    console.log('BaseHttpService: buildParams called', params);
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== null && value !== undefined && value !== '') {
          if (typeof value === 'number' && isNaN(value)) {
            console.log('BaseHttpService: Skipping NaN value for', key);
            return;
          }
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    console.log('BaseHttpService: Built params', httpParams.toString());
    return httpParams;
  }
}
