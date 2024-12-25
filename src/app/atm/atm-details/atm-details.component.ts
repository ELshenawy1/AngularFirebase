import { Component, OnInit } from '@angular/core';
import { AtmService } from '../atm.service';
import { Atm } from 'src/app/shared/models/atm';

@Component({
  selector: 'app-atm-details',
  templateUrl: './atm-details.component.html',
  styleUrls: ['./atm-details.component.css']
})
export class AtmDetailsComponent implements OnInit{
  constructor(private atmService : AtmService){}
  atm : Atm | null = null;
  ngOnInit(): void {
    const id = localStorage.getItem('atmId')
    this.atmService.GetById(id).subscribe({
      next:(response)=>{this.atm = response;},
      error:(err)=>{console.log(err)}
    })
  }

}
