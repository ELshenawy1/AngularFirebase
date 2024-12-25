import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AtmService } from 'src/app/atm/atm.service';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent {
  @ViewChild('content') content!: ElementRef;

  constructor(private pdfGeneratorService: AtmService) {}

  generatePDF() {
    this.pdfGeneratorService.generatePDF(this.content.nativeElement, 'report.pdf');
  } 

  generateTablePDF() {
    const columns = ["Year", "Series A", "Series B"];
    const rows = [
      [2006, 65, 28],
      [2007, 59, 48],
      [2008, 80, 40],
      [2009, 81, 19],
      [2010, 56, 86],
      [2011, 55, 27],
      [2012, 40, 90]
    ];
    this.pdfGeneratorService.generateTablePDF(columns, rows, 'table-report.pdf');
  }


}
