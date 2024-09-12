import ballerina/graphql;

type MenuItem record {|
    readonly string id;
    string item;
    float price;
    boolean isAvailableNow;
|};

table<MenuItem> key(id) menuItems = table [
    {id: "M1", item: "Classic Burger", price: 9.99, isAvailableNow: true},
    {id: "M2", item: "Vegetarian Pizza", price: 12.50, isAvailableNow: true},
    {id: "M3", item: "Grilled Chicken Salad", price: 8.75, isAvailableNow: false},
    {id: "M4", item: "Pasta Alfredo", price: 11.99, isAvailableNow: true},
    {id: "M5", item: "Fish and Chips", price: 10.25, isAvailableNow: true}
];

@graphql:ServiceConfig {
    graphiql: {enabled: true}
}
service /ms on new graphql:Listener(9093) {
    resource function get menus(string? id) returns MenuItem[] {
        if id is () {
            return menuItems.toArray();
        }
        return from MenuItem entry in menuItems
            where entry.id == id
            select entry;
    }
}
