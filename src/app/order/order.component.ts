import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  groupedOrders: any[] = [];  // Add this to store grouped orders
  uniqueOrderIds: Set<string> = new Set<string>();
  uniqueOrderIdsArray: string[] = [];  // Declare an array to hold the order IDs

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {
    this.userId = this.utility.getUserIdFromLocalStorage();

    this.navigationService.getAllOrders(this.userId).subscribe((orders) => {
      this.orders = orders;
      this.groupOrdersByOrderId();  // Call the method to group orders
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

  // Method to extract unique order IDs
  getUniqueOrderIds(products: any[]): void {
    // Extract unique order IDs from products
    this.uniqueOrderIds = new Set(products.map(product => product.orderId));
    this.uniqueOrderIdsArray = Array.from(this.uniqueOrderIds);
  }

  // Method to group products by order ID
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
  
    // Convert the map to an array of objects
    this.groupedOrders = Array.from(groupedOrdersMap.entries()).map(([orderId, orders]) => ({
      orderId,
      orderDate: orders[0].orderDate,  // You might want to adjust this based on your data structure
      grandTotal: orders[0].grandTotal,  // You might want to adjust this based on your data structure
      products: orders,
    }));
  }
}
