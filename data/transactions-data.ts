export const transactionData = [
    {
        _id: "transaction-1",
        _creationTime: "2023-11-23",
        userId: "user-1",
        shippingId: "shipping-1",
        mop: "cash",
        status: "unconfirmed",
        orders: [
            {
                id: "order-1",
                menuId: "menu-item-1",
                familyMealId: null,
                menuItem: {
                    id: "menu-item-1",
                    name: "Burger",
                    price: 10.99
                },
                familyMeal: null,
                quantity: 4
            },
            {
                id: "order-2",
                menuId: null,
                familyMealId: "family-meal-1",
                menuItem: null,
                familyMeal: {
                    id: "family-meal-1",
                    name: "Family Meal Deal",
                    price: 29.99
                },
                quantity: 2
            }
        ],
        user: {
            id: "user-1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 234 567 890",
            role: "admin",
        },
        shippingAddress: {
            id: "shipping-1",
            address: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345"
        }
    },
    {
        _id: "transaction-2",
        _creationTime: "2023-11-24",
        userId: "user-1",
        shippingId: "shipping-1",
        mop: "card",
        status: "confirmed",
        orders: [
            {
                id: "order-3",
                menuId: "menu-item-2",
                familyMealId: null,
                menuItem: {
                    id: "menu-item-2",
                    name: "Chicken Sandwich",
                    price: 12.99
                },
                familyMeal: null,
                quantity: 5
            },
            {
                id: "order-4",
                menuId: null,
                familyMealId: "family-meal-2",
                menuItem: null,
                familyMeal: {
                    id: "family-meal-2",
                    name: "Family Meal Deal",
                    price: 34.99
                },
                quantity: 1
            }
        ],
        user: {
            id: "user-2",
            name: "Ace Ramirez",
            email: "ace.ramirez@example.com",
            phone: "+1 234 567 890",
            role: "admin",
        },
        shippingAddress: {
            id: "shipping-2",
            address: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345"
        }
    },
    {
        _id: "transaction-3",
        _creationTime: "2023-11-25",
        userId: "user-1",
        shippingId: "shipping-1",
        mop: "online",
        status: "unconfirmed",
        orders: [
            {
                id: "order-5",
                menuId: "menu-item-3",
                familyMealId: null,
                menuItem: {
                    id: "menu-item-3",
                    name: "Pizza",
                    price: 14.99
                },
                familyMeal: null,
                quantity: 2
            },
            {
                id: "order-6",
                menuId: null,
                familyMealId: "family-meal-3",
                menuItem: null,
                familyMeal: {
                    id: "family-meal-3",
                    name: "Family Meal Deal",
                    price: 39.99
                },
                quantity: 3
            }
        ],
        user: {
            id: "user-1",
            role: "admin"
        },
        shippingAddress: {
            id: "shipping-1",
            address: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345"
        }
    },
    {
        _id: "transaction-4",
        _creationTime: "2023-11-26",
        userId: "user-1",
        shippingId: "shipping-1",
        mop: "online",
        status: "confirmed",
        orders: [
            {
                id: "order-7",
                menuId: "menu-item-4",
                familyMealId: null,
                menuItem: {
                    id: "menu-item-4",
                    name: "Salad",
                    price: 9.99
                },
                familyMeal: null,
                quantity: 1
            },
            {
                id: "order-8",
                menuId: null,
                familyMealId: "family-meal-4",
                menuItem: null,
                familyMeal: {
                    id: "family-meal-4",
                    name: "Family Meal Deal",
                    price: 44.99
                },
                quantity: 1
            }
        ],
        user: {
            id: "user-1",
            role: "admin"
        },
        shippingAddress: {
            id: "shipping-1",
            address: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345"
        }
    }
]
