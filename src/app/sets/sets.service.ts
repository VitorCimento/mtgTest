import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface MtgSet {
  object: string;
  id: string;
  code: string;
  mtgo_code?: string;
  tcgplayer_id?: number;
  name: string;
  set_type: string;
  released_at?: string;
  block_code?: string;
  block?: string;
  parent_set_code?: string;
  card_count: number;
  printed_size?: number;
  digital: boolean;
  foil_only: boolean;
  nonfoil_only: boolean;
  scryfall_uri: string;
  uri: string;
  icon_svg_uri: string;
  search_uri: string;
}

export interface MtgAllSets {
  object: string;
  has_more: boolean;
  data: MtgSet[];
}

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  private readonly API = environment.API;
  protected subUrl: string = 'sets';

  constructor(protected http: HttpClient) { }

  all(): Observable<MtgAllSets> {
    return this.http.get<MtgAllSets>(`${this.API}/${this.subUrl}`);
  }
}
