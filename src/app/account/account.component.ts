// account.component.ts

import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountDetails: any;
  isEditMode: boolean = false;
  updatedProfile: any = {};

  constructor(
    private navigationService: NavigationService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditMode = params['editMode'] === 'true';
    });

    this.loadAccountDetails();
  }

  loadAccountDetails() {
    const userId = this.utilityService.getUserIdFromLocalStorage();

    this.navigationService.getAccountDetails(userId).subscribe({
      next: (details: any) => {
        this.accountDetails = details;
      },
      error: (error) => {
        console.error('Error fetching account details:', error);
      }
    });
  }

  enterEditMode() {
    this.isEditMode = true;
    this.updatedProfile = { ...this.accountDetails };
    this.updateUrlQueryParams(true);
  }

  exitEditMode() {
    this.isEditMode = false;
    this.updatedProfile = {};
    this.updateUrlQueryParams(false);
  }

  updateProfile() {
    const userId = this.utilityService.getUserIdFromLocalStorage();
    const updateProfileObservable = this.navigationService.updateProfile(userId, this.updatedProfile);

    if (updateProfileObservable) {
      updateProfileObservable.subscribe({
        next: (response: any) => {
          console.log(response);
          this.loadAccountDetails();
          this.exitEditMode();
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  private updateUrlQueryParams(editMode: boolean) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { editMode: editMode ? 'true' : null },
      queryParamsHandling: 'merge',
    });
  }
}
