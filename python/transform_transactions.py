import json
from datetime import datetime

# Load menu data
with open('menu-data.json', 'r') as menu_file:
    menu_data = json.load(menu_file)

# Create a dictionary to map menu names to IDs
menu_name_to_id = {item['name']: item['id'] for item in menu_data}

# Load transaction data
with open('transactions.jsonl', 'r') as transaction_file:
    transaction_data = json.load(transaction_file)

# Process transactions
transformed_transactions = []
current_order = None

for item in transaction_data:
    if current_order is None or item['Order_Id'] != current_order['Order_Id']:
        if current_order is not None:
            transformed_transactions.append({
                "mop": "COD",
                "orders": current_order['orders'],
                "shippingId": "kx7fqk527305zc0gnrg3x8zwc1731xg8",
                "status": "Completed",
                "userId": "jx7a9segx0jj20w9570zf15jkd72t984"
            })
        current_order = {
            'Order_Id': item['Order_Id'],
            'orders': []
        }
    
    menu_id = menu_name_to_id.get(item['menuName'], "unknown_id")
    
    order = {
        "menuId": menu_id,
        "menuName": item['menuName'],
        "quantity": item['quantity'],
        "status": item['status'],
        "totalPrice": float(item['totalPrice'].replace(',', '')),
        "userId": "jx7a9segx0jj20w9570zf15jkd72t984"
    }
    
    current_order['orders'].append(order)

# Add the last order
if current_order is not None:
    transformed_transactions.append({
        "mop": "COD",
        "orders": current_order['orders'],
        "shippingId": "kx7fqk527305zc0gnrg3x8zwc1731xg8",
        "status": "Completed",
        "userId": "jx7a9segx0jj20w9570zf15jkd72t984"
    })

# Write transformed transactions to a new file
with open('transformed-transactions.jsonl', 'w') as outfile:
    for transaction in transformed_transactions:
        json.dump(transaction, outfile)
        outfile.write('\n')