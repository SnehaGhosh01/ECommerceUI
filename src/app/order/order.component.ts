import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  userId: any;
  orders: any[] = [];
  selectedOrder: any;
  groupedOrders: any[] = [];  
  uniqueOrderIds: Set<string> = new Set<string>();
  uniqueOrderIdsArray: string[] = [];  

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private utility: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.utility.getUserIdFromLocalStorage();

    this.navigationService.getAllOrders(this.userId).subscribe((orders) => {
      this.orders = orders;
      this.groupOrdersByOrderId();  
    });

    this.route.params.subscribe((params) => {
      const orderId = params['orderId'];
      if (orderId) {
        this.navigationService.getExactOrder(this.userId, orderId).subscribe(
          (orderDetails) => {
            this.selectedOrder = orderDetails;
            this.getUniqueOrderIds(this.selectedOrder.products);
          },
          (error) => {
            console.error('Error fetching order details:', error);
          }
        );
      }
    });
  }

  getUniqueOrderIds(products: any[]): void {
    this.uniqueOrderIds = new Set(products.map(product => product.orderId));
    this.uniqueOrderIdsArray = Array.from(this.uniqueOrderIds);
  }

  groupOrdersByOrderId(): void {
    const groupedOrdersMap = new Map<string, any>();
  
    this.orders.forEach((order: any) => {
      const orderId = order.orderId;
  
      if (!groupedOrdersMap.has(orderId)) {
        groupedOrdersMap.set(orderId, []);
      }
  
      const ordersArray = groupedOrdersMap.get(orderId);
      if (ordersArray) {
        ordersArray.push(order);
      }
    });
  
    this.groupedOrders = Array.from(groupedOrdersMap.entries()).map(([orderId, orders]) => ({
      orderId,
      orderDate: orders[0].orderDate,  
      grandTotal: orders[0].grandTotal,  
      products: orders,
    }));
  }

  cancelOrder(orderId: string): void {
    this.navigationService.cancelOrder(this.userId, orderId).subscribe(
      (res:any) => {
        console.log('Order canceled successfully:', res);
        // After cancellation, you may want to reload orders or update UI accordingly
        alert(res);
        this.router.navigate(['/orders']);
      },
      (error) => {
        console.error('Error canceling order:', error);
      }
    );
  }
}
