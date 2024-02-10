import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orders: any[] = [];
  selectedOrderId: string | null = null;
  orderDetails: any[] = [];
  userId: string = ''; // Initialize userId, you can get it from wherever appropriate

  constructor(
    private navigationService: NavigationService,
    private utility: UtilityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.userId = this.utility.getUserIdFromLocalStorage();
    this.route.params.subscribe(params => {
      const orderId = params['orderId'];
      if (orderId) {
        this.showOrderDetails(orderId);
      }
    });
  }

  loadOrders() {
    this.userId = this.utility.getUserIdFromLocalStorage();
    this.navigationService.getAllOrdersOfVender(this.userId)
      .subscribe(
        (data: any[]) => {
          const uniqueOrders: { [key: string]: any } = {};
          data.forEach((order: any) => {
            uniqueOrders[order.orderId] = order;
          });
          this.orders = Object.values(uniqueOrders);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  showOrderDetails(orderId: string) {
    this.userId = this.utility.getUserIdFromLocalStorage();
    this.selectedOrderId = orderId;
    this.navigationService.getExactOrderOfVender(this.userId, orderId)
      .subscribe(
        (data: any[]) => {
          this.orderDetails = data;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  goBack() {
    this.router.navigate(['/orderlist']);
    this.selectedOrderId = null;
    this.orderDetails = [];
  }
}
