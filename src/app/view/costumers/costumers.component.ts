import { Component, OnInit } from '@angular/core';
import { Costumers } from '../../core/model/costumers';
import { CostumersService } from '../../core/service/costumers/costumers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-costumers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './costumers.component.html',
  styleUrl: './costumers.component.css',
})
export class CostumersComponent implements OnInit {
  costumers: Costumers[] = [];
  constructor(private costumersService: CostumersService) {}

  ngOnInit() {
    this.costumersService.getAll().subscribe((data) => {
      console.log(data);
      this.costumers = data;
    });
  }
  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
