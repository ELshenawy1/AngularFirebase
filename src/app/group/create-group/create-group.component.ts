import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../group.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/report/config.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  baseUrl = this.configService.getConfig('apiUrl');
  currentBank = this.configService.getConfig('currentBank');
  bankLogo: string = "";


  constructor(public router: Router,
    public groupService: GroupService,
    private configService: ConfigService) {
  }
  ngOnInit(): void {
    this.bankLogo = this.baseUrl.slice(0, -3) + `${this.currentBank}_banklogo.png`;
  }

  createGruopForm = new FormGroup({
    groupName: new FormControl('', [Validators.required]),
    notes: new FormControl('', [])
  })
  invalidData: boolean = false;
  hideAlert() {
    this.invalidData = false
  }


  get getGroupName() {
    return this.createGruopForm.controls['groupName'];
  }
  get getGroupNotes() {
    return this.createGruopForm.controls['notes'];
  }


  onSubmit(e: any) {
    if (this.createGruopForm.status == 'VALID') {
      this.groupService.CreateGroup(this.createGruopForm.value).subscribe({
        next: (val) => { this.router.navigate(['/Group/Index']) },
        error: (val) => { this.invalidData = true }
      })
    } else {
      this.invalidData = true
    }
  }

}
