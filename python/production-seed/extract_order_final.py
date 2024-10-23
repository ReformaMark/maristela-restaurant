import json
from datetime import datetime

def convert_date_to_timestamp(date_str):
    date_obj = datetime.strptime(date_str, "%d/%m/%Y")
    timestamp = date_obj.timestamp() * 1000
    return timestamp

# Load menu data
with open('menu-data.json', 'r') as menu_file:
    menu_data = json.load(menu_file)

# Create a dictionary for quick menuId lookup
menu_id_lookup = {item['name']: item['id'] for item in menu_data}

# Read the original transactions and extract orders with converted timestamps and menuIds
all_orders = []
with open('transactions.jsonl', 'r') as infile:
    transactions = json.load(infile)
    for order in transactions:
        # Convert orderDate to timestamp
        timestamp = convert_date_to_timestamp(order['orderDate'])
        
        # Look up menuId
        menu_id = menu_id_lookup.get(order['menuName'], '')
        
        # Create new order object with _creationTime and menuId
        new_order = {
            "orderDate": timestamp,
            "menuId": menu_id,
            "menuName": order['menuName'],
            "quantity": order['quantity'],
            "status": order['status'],
            "totalPrice": float(order['totalPrice'].replace(',', '')),
            "userId": "kn73p61d18qahgm5877dk5rjnh736m5q" # You might need to generate or map this
        }
        all_orders.append(json.dumps(new_order))

# Write the extracted orders to a new file
with open('extracted-orders-with-timestamp-and-menuid.jsonl', 'w') as outfile:
    for i, order in enumerate(all_orders):
        if i < len(all_orders) - 1:
            outfile.write(f"{order},\n")
        else:
            outfile.write(f"{order}\n")

print("Orders with timestamps and menuIds have been extracted to 'extracted-orders-with-timestamp-and-menuid.jsonl'")