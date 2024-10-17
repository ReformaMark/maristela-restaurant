export interface CalculateOrder {
    id: string;
    menuId: string | null;
    familyMealId: string | null;
    menuItem: { id: string; name: string; price: number; } | null;
    familyMeal: { price: number; } | null;
    quantity: number;
}