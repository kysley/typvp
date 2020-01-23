const s = window.Stripe

const stripe = s('asd')

const successUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://typvp.xyz/thankyou'
    : 'localhost:8082/thankyou'
const cancelUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://typvp.xyz/payment'
    : 'localhost:8082/payment'

export function redirectToCheckout(sku: string): void {
  stripe.redirectToCheckout({
    items: [{sku, quantity: 1}],
    successUrl,
    cancelUrl,
  })
}
