import { TransactionCard } from "./_components/transaction-card-"



const OrdersPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-foreground">
                Transaction History
            </h1>
            <TransactionCard />
        </div>
    )
}

export default OrdersPage;