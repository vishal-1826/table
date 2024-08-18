import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import {MatCheckboxModule } from '@angular/material/checkbox';
import { FormArray, FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';



export interface Student {
  name: string;
  roll: number;
  place: string;
}

const STUDENT_DATA: Student[] = [
  { name: 'Alice', roll: 1, place: 'New York' },
  { name: 'Bob', roll: 2, place: 'Los Angeles' },
  { name: 'Charlie', roll: 3, place: 'Chicago' },
  { name: 'Alice', roll: 4, place: 'New York' } 
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatMenuModule, MatCheckboxModule, FormsModule, CommonModule, MatButtonModule, MatMenuTrigger,FormsModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'table';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterdataSource=STUDENT_DATA;
  displayedColumns: string[] = ['name', 'roll', 'place'];
  dataSource = new MatTableDataSource<Student>(STUDENT_DATA);
  filterForm!: FormGroup;
  uniqueNames: string[] = Array.from(new Set(STUDENT_DATA.map(e => e.name)));
  uniqueRolls: number[] = Array.from(new Set(STUDENT_DATA.map(e => e.roll)));
  uniquePlaces: string[] = Array.from(new Set(STUDENT_DATA.map(e => e.place)));
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: this.fb.array([]),
      roll: this.fb.array([]),
      place: this.fb.array([])

    });
  }
  filters: { [key: string]: Set<any> } = {
    name: new Set<string>(),
    roll: new Set<number>(),
    place: new Set<string>()
  };
  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Student, filter: string) => {
      const filterValues = JSON.parse(filter);
      return (
        (!filterValues.name.length || filterValues.name.includes(data.name)) &&
        (!filterValues.roll.length || filterValues.roll.includes(data.roll)) &&
        (!filterValues.place.length || filterValues.place.includes(data.place))
      );
    };

    this.filterForm.valueChanges.subscribe(() => this.applyFilter());
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(): void {
    const filterValues = {
      name: this.getSelectedValues('name'),
      roll: this.getSelectedValues('roll'),
      place: this.getSelectedValues('place')
    };
    this.dataSource.filter = JSON.stringify(filterValues);
  }
  getSelectedValues(controlName: string): any[] {
    return (this.filterForm.get(controlName) as FormArray).controls
      .filter(control => control.value)
      .map(control => control.value);
  }
  toggleFilter(controlName: string, value: any, checked: boolean): void {
    const formArray = this.filterForm.get(controlName) as FormArray;
    if (checked) {
      formArray.push(this.fb.control(value));
    } else {
      const index = formArray.controls.findIndex(control => control.value === value);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
    this.applyFilter();
  }
}


