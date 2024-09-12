import ballerina/http;

// Define the Order table with initial data
table<Order> key(id) orders = table [
    {id: "O1", customerId: "C123", totalPrice: 50.25, date: "2024-02-28", itemIds: ["M1", "M2", "M3"]},
    {id: "O2", customerId: "C124", totalPrice: 35.50, date: "2024-02-27", itemIds: ["M4", "M5"]},
    {id: "O3", customerId: "C125", totalPrice: 75.00, date: "2024-02-26", itemIds: ["M2", "M3", "M4"]}
];

// Service to handle orders
service /sales on new http:Listener(9092) {

    // GET http://localhost:9092/sales/orders
    resource function get orders() returns Order[] {
        return orders.toArray();
    }

    // GET http://localhost:9092/sales/orders/<Order-ID>
    resource function get orders/[string id]() returns Order|http:NotFound {
        if orders.hasKey(id) {
            return orders.get(id);
        }
        return { body: string `Order with ID ${id} not found.` };
    }

    // POST http://localhost:9092/sales/orders
    resource function post orders(Order orderRequest) returns Order|http:BadRequest {
        // Validate the order request
        if orderRequest.id == "" || orderRequest.customerId == "" || orderRequest.totalPrice <= 0.0 || orderRequest.itemIds.length() == 0 {
            return { body: "Invalid order details." };
        }
        
        // Check if the order ID already exists
        if orders.hasKey(orderRequest.id) {
            return { body: string `Order with ID ${orderRequest.id} already exists.` };
        }
        
        // Add the new order
        orders.add(orderRequest);
        return orderRequest;
    }
}

// Order record type
type Order record {|
    readonly string id;
    string customerId;
    MenuIds[] itemIds;
    string date;
    float totalPrice;
|};

// Enum for menu items
enum MenuIds {
    M1 = "M1",
    M2 = "M2",
    M3 = "M3",
    M4 = "M4",
    M5 = "M5"
}
