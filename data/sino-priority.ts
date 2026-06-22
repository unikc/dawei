import products from "@/data/sino-priority-products.json";

export type SinoPriorityProduct = (typeof products)[number];

export const sinoPriorityProducts = products as SinoPriorityProduct[];

export function getSinoPriorityProduct(slug: string) {
  return sinoPriorityProducts.find((product) => product.slug === slug);
}

export function getSinoPriorityCategoryProducts(categorySlug: string) {
  return sinoPriorityProducts.filter((product) => product.categorySlug === categorySlug);
}
