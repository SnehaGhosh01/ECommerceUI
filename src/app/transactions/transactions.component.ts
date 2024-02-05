import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  userId: string="";
  transactions$!: Observable<any>;

  constructor(private navigationService: NavigationService,private utility: UtilityService) { }

  ngOnInit(): void {
    // Get userId from the navigation service or wherever it's available
    this.userId =this.utility.getUserIdFromLocalStorage();

    // Call the backend API
    this.transactions$ = this.navigationService.getTransactionListOfUser(this.userId);

}
}
