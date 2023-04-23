import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICocktailResponse } from '../models/cocktails.model';

@Injectable({
  providedIn: 'root'
})

export class CocktailService {

  baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getCocktails(id: string | number) {
    return this.http
      .get<ICocktailResponse>(`${this.baseURL}${id}&api_key=1`); //agregar api key dentro
  }
}
