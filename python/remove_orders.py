import json

# Read the transformed transactions and remove orders
transactions_without_orders = []
with open('transformed-transactions.jsonl', 'r') as infile:
    for line in infile:
        transaction = json.loads(line)
        del transaction['orders']
        transactions_without_orders.append(json.dumps(transaction))

# Write the transactions without orders to a new file
with open('transactions-without-orders.jsonl', 'w') as outfile:
    for i, transaction in enumerate(transactions_without_orders):
        if i < len(transactions_without_orders) - 1:
            outfile.write(f"{transaction},\n")
        else:
            outfile.write(f"{transaction}\n")

print("Transactions without orders have been saved to 'transactions-without-orders.jsonl'")