import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

type Colors = 'white' | 'black' | 'blue' | 'green' | 'red';

const DEFAULT_TAX_PERCENTAGE = 23.5;

interface ComputerPart {
  id: number;
  description?: string;
  brand: string;
  color?: Colors;
  basePrice: number;
  taxPrice: number;
}

@Component({
  selector: 'app-computer-parts',
  templateUrl: './computer-parts.component.html',
  styleUrls: ['./computer-parts.component.scss'],
})
export class ComputerPartsComponent implements OnInit {
  file: File | null = null;
  parts: ComputerPart[] = [];
  taxPercentage: number = DEFAULT_TAX_PERCENTAGE;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getParts();
  }

  validateTaxInput() {
    this.taxPercentage = this.taxPercentage > 0 ? this.taxPercentage : 0;
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.dataService.uploadFile(this.file);
  }

  getParts() {
    this.dataService.get(this.taxPercentage).subscribe((response: any) => {
      this.parts = response;
    });
  }
}
