import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProduct(id: string) {
    return {
      id: "1",
      name: "WAKALAO1",
      imageUrl: "https://www.recetasderechupete.com/wp-content/uploads/2015/03/bacalao_portuguesa.jpg",
      description: "GREAT DESCRIPTION BABY1",
      price: "11111111"
    };
  }
}
