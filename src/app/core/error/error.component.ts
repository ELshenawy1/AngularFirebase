import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{
  constructor(private activatedRoute : ActivatedRoute){}
  hasToken : boolean = false;
  errorStatus: number | null = null;
  errorMessage: string = '';
  ngOnInit(): void {
    const errorStatusParam = this.activatedRoute.snapshot.paramMap.get('error-status');

    if (errorStatusParam !== null) {
      this.errorStatus = +errorStatusParam;
      this.errorMessage = this.getErrorMessage(this.errorStatus);
    }

    const token = localStorage.getItem('token');
    this.hasToken = (token) ?  true : false;
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Bad Request <br> The server cannot process the request due to a client error.';
      case 404:
        return 'Not Found <br> The requested resource could not be found on the server.';
      case 500:
        return 'Internal Server Error <br> we apologize for the inconvenience. Please try again later.';
      default:
        return 'An error occurred. Please try again later.';
    }
  }


  

}
