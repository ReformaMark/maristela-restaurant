import json
from collections import defaultdict

def load_jsonl(file_path):
    with open(file_path, 'r') as file:
        return [json.loads(line.strip()) for line in file if line.strip()]

def generate_transactions():
    # Load data
    orders = load_jsonl('orders-data.jsonl')
    transformed_transactions = load_jsonl('transformed-transactions.jsonl')

    # Create a lookup for orders by menuName, quantity, and totalPrice
    order_lookup = defaultdict(list)
    for order in orders:
        key = (order['menuName'], order['quantity'], order['totalPrice'])
        order_lookup[key].append(order['_id'])

    # Generate transaction data
    transaction_data = []
    for trans in transformed_transactions:
        order_ids = []
        for order in trans['orders']:
            key = (order['menuName'], order['quantity'], order['totalPrice'])
            if order_lookup[key]:
                order_ids.append(order_lookup[key].pop(0))
        
        if order_ids:
            transaction = {
                "mop": trans['mop'],
                "orders": order_ids,
                "shippingId": trans['shippingId'],
                "status": trans['status'],
                "userId": trans['userId']
            }
            transaction_data.append(json.dumps(transaction))

    # Write transaction data to file with commas
    with open('transactions-data.jsonl', 'w') as outfile:
        for i, transaction in enumerate(transaction_data):
            if i < len(transaction_data) - 1:
                outfile.write(f"{transaction},\n")
            else:
                outfile.write(f"{transaction}\n")

    print(f"Generated {len(transaction_data)} transactions in 'transactions-data.jsonl'")

if __name__ == "__main__":
    generate_transactions()