import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
    {
      id: "1",
      name: "WAKALAO1",
      imageUrl: "https://www.recetasderechupete.com/wp-content/uploads/2015/03/bacalao_portuguesa.jpg",
      description: "GREAT DESCRIPTION BABY1",
      price: "11111111"
    },
    {
      id: "2",
      name: "WAKALAO2",
      imageUrl: "https://www.recetasderechupete.com/wp-content/uploads/2015/03/bacalao_portuguesa.jpg",
      description: "GREAT DESCRIPTION BABY2",
      price: "22222222"
    },
    {
      id: "3",
      name: "WAKALAO3",
      imageUrl: "https://www.recetasderechupete.com/wp-content/uploads/2015/03/bacalao_portuguesa.jpg",
      description: "GREAT DESCRIPTION BABY3",
      price: "3333333"
    },
    {
      id: "4",
      name: "WAKALAO4",
      imageUrl: "https://www.recetasderechupete.com/wp-content/uploads/2015/03/bacalao_portuguesa.jpg",
      description: "GREAT DESCRIPTION BABY4",
      price: "4444444"
    }
  ];

  constructor(private prodService: ProductService) { }

  ngOnInit(): void {
  }

}
