import json

# Function to flatten the orders list
def flatten_orders(orders):
    flattened = []
    for order in orders:
        flattened.append(json.dumps(order))
    return flattened

# Read the transformed transactions and extract orders
all_orders = []
with open('transformed-transactions.jsonl', 'r') as infile:
    for line in infile:
        transaction = json.loads(line)
        all_orders.extend(flatten_orders(transaction['orders']))

# Write the extracted orders to a new file
with open('extracted-orders.jsonl', 'w') as outfile:
    for i, order in enumerate(all_orders):
        if i < len(all_orders) - 1:
            outfile.write(f"{order},\n")
        else:
            outfile.write(f"{order}\n")

print("Orders have been extracted to 'extracted-orders.jsonl'")