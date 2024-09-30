const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const productPopularityData = [
    { month: "All", productA: randomInt(50, 150), productB: randomInt(50, 150), productC: randomInt(50, 150), productD: randomInt(50, 150), productE: randomInt(50, 150) },
    // { month: "February", productA: 150, productB: 186, productC: 30, productD: 15, productE: 55 },
    // { month: "March", productA: 110, productB: 50, productC: 125, productD: 210, productE: 22 },
    // { month: "April", productA: 90, productB: 70, productC: 20, productD: 115, productE: 33 },
]

export const orderStatusData = [
    { orderType: "pending", value: randomInt(50, 150), fill: "var(--color-pending)" },
    { orderType: "processing", value: randomInt(50, 150), fill: "var(--color-processing)" },
    { orderType: "shipped", value: randomInt(50, 150), fill: "var(--color-shipped)" },
    { orderType: "delivered", value: randomInt(50, 150), fill: "var(--color-delivered)" },
]

const foodProducts = [
    "Crispy Pata", "Adobo", "Sinigang", "Lechon", "Kare-Kare",
    "Bulalo", "Sisig", "Pancit", "Lumpia", "Tinola",
    "Pinakbet", "Laing", "Bicol Express", "Dinuguan", "Caldereta",
    "Inihaw na Liempo", "Chicken Inasal", "Longganisa", "Tapa", "Tocino",
    "Palabok", "Tortang Talong", "Ginataang Kalabasa", "Pinangat", "Kinilaw",
    "Beef Pares", "Arroz Caldo", "Champorado", "Suman", "Halo-Halo"
];

export const mockData = foodProducts.map(product => ({
    product,
    alitatag: randomInt(50, 500),
    cuenca: randomInt(50, 500),
    santaTeresita: randomInt(50, 500)
}));

export const locationSalesPerformanceData = [
    { location: "alitatag", value: randomInt(50, 150), fill: "var(--color-alitatag)" },
    { location: "cuenca", value: randomInt(50, 150), fill: "var(--color-cuenca)" },
    { location: "santaTeresita", value: randomInt(50, 150), fill: "var(--color-santaTeresita)" },

]

export const salesForecastData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Forecast',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        },
        {
            label: 'Actual',
            data: [70, 62, 75, 85, 60, null],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
        },
    ],
}