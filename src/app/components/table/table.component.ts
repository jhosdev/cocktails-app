import { Component, OnInit, ViewChild } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ICocktail } from 'src/app/models/cocktails.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  //Name, Instruction, Date, Glass
  displayedColumns: string[] = ['name', 'instruction', 'date', 'glass'];

  data: ICocktail[] = []; //add type
  dataSource = new MatTableDataSource<ICocktail>(this.data); //add type

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  isEditMode = false;

  constructor(private cocktailService: CocktailService) {

  }

  ngOnInit(): void {
    this.getCocktails();
    this.dataSource.paginator = this.paginator;
  }

  getCocktails() {

    for (let i = 97; i <= 122; i++) { // ASCII code for a to z

      const letter = String.fromCharCode(i);

      this.cocktailService.getCocktails(letter).subscribe({
        next:(response) => {
          console.log(response)
          console.log(letter)
          if (response.drinks!==null){
            response.drinks.forEach((drink: ICocktail) => { //Short Date
              const date = new Date(drink.dateModified);
              drink.dateModified = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            });
            this.data.push(...response.drinks);
            this.dataSource = new MatTableDataSource<ICocktail>(this.data);
            this.dataSource.paginator = this.paginator;
          }
          
        },
        error:(error) => {console.log(error)}
      });

    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    console.log(this.dataSource.data)
    console.log(this.dataSource.filter)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
