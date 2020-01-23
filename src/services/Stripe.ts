const s = window.Stripe

const stripe = s('pk_test_S66sTiE5N1br0pZ7tfBNbTjZ00t0VjkMmC')

const productLookup = {
  pro_one_time: 'sku_Gb8BIdoHZAoVMT',
  pro_recurring: 'plan_Gb812oitY2Pc4w',
}

const successUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://typvp.xyz/thankyou'
    : 'http://localhost:8082/thankyou'
const cancelUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://typvp.xyz/payment'
    : 'http://localhost:8082/payment'

export function redirectToCheckout(product: keyof typeof productLookup): void {
  const key = product.startsWith('sku_') ? 'sku' : 'plan'
  const lookup = productLookup[product]

  const items = [
    {
      [key]: lookup,
      quantity: 1,
    },
  ]

  stripe.redirectToCheckout({
    items,
    successUrl,
    cancelUrl,
  })
}
