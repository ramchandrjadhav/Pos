import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../core/services/base-http.service';
import { API_ENDPOINTS } from '../core/config/api-endpoints.config';
import { 
  State, 
  City, 
  Domain, 
  Seller,
  MasterDataResponse 
} from '../models/master-data.model';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService extends BaseHttpService {
  getStates(): Observable<MasterDataResponse<State>> {
    console.log('MasterDataService: getStates called');
    return this.get<MasterDataResponse<State>>(API_ENDPOINTS.MASTER_DATA.STATES);
  }

  getCities(state?: string): Observable<MasterDataResponse<City>> {
    console.log('MasterDataService: getCities called', state);
    return this.get<MasterDataResponse<City>>(API_ENDPOINTS.MASTER_DATA.CITIES, { state });
  }

  getDomains(): Observable<MasterDataResponse<Domain>> {
    console.log('MasterDataService: getDomains called');
    return this.get<MasterDataResponse<Domain>>(API_ENDPOINTS.MASTER_DATA.DOMAINS);
  }

  getSellers(): Observable<MasterDataResponse<Seller>> {
    console.log('MasterDataService: getSellers called');
    return this.get<MasterDataResponse<Seller>>(API_ENDPOINTS.MASTER_DATA.SELLERS);
  }
}
