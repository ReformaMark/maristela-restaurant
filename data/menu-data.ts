import { Id } from "../convex/_generated/dataModel";

export const menuCategories = [
    'Chicken',
    'Pork',
    'Pancit & Pasta',
    'Extras',
    'Beverages',
    'Sizzling Plate',
    'Super Silog Meals',
    'Seafood',
    'Veggies',
]

export type MenuCategoryType =
    'Chicken' |
    'Pork' |
    'Pancit & Pasta' |
    'Extras' |
    'Beverages' |
    'Sizzling Plate' |
    'Super Silog Meals' |
    'Seafood' |
    'Veggies'

export type MenuDataWithRatings = {
    name: string;
    description?: string;
    price: number;
    imageId?: Id<"_storage"> | undefined;
    category: MenuCategoryType;
    available: boolean;
    prepTime?: string | undefined;
    special?: boolean | undefined;
    recommended?: boolean | undefined;
    quantity?: number | undefined;
    _id: Id<"menus">;
    _creationTime: number;
    url?: string | null | undefined;
    isArchived?: boolean | undefined;
    ratings: {
        _id: Id<"ratings">;
        menuId: Id<"menus">;
        userId: Id<"users">;
        stars?: number | undefined;
        feedbackMessage?: string | undefined;
        _creationTime: number;
    }[]
}