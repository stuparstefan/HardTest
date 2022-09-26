import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

type Colors = 'white' | 'black' | 'blue' | 'green' | 'red';

interface ComputerPart {
  id: number;
  description?: string;
  brand: string;
  color?: Colors;
  basePrice: number;
}

@Component({
  selector: 'app-computer-parts',
  templateUrl: './computer-parts.component.html',
  styleUrls: ['./computer-parts.component.scss'],
})
export class ComputerPartsComponent implements OnInit {
  file: File | null = null;
  parts: ComputerPart[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.dataService.uploadFile(this.file).subscribe((event: any) => {
      this.parts = event;
    });
  }
}
