// Stripe integration — add STRIPE_SECRET_KEY in .env.local
// Usage: import Stripe from 'stripe'
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export const STRIPE_PLANS = {
  essentiel: 'price_essentiel_monthly',
  pro: 'price_pro_monthly',
  proplus: 'price_proplus_monthly',
} as const;
