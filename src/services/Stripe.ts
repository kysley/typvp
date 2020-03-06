import UserStore from '@/stores/User'

const s = window.Stripe

const stripe = s('pk_test_S66sTiE5N1br0pZ7tfBNbTjZ00t0VjkMmC')

const productLookup = {
  pro_one_time: 'sku_Gb8BIdoHZAoVMT',
  pro_recurring: 'plan_GbPJP7DsmNZcC1',
}

const successUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://typvp.xyz/thankyou?session_id={CHECKOUT_SESSION_ID}'
    : 'http://localhost:8082/thankyou?session_id={CHECKOUT_SESSION_ID}'
const cancelUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://typvp.xyz/payment'
    : 'http://localhost:8082/payment'

export function redirectToCheckout(product: keyof typeof productLookup): void {
  const lookup = productLookup[product]
  const key = lookup.startsWith('sku_') ? 'sku' : 'plan'

  const items = [
    {
      [key]: lookup,
      quantity: 1,
    },
  ]

  if (!UserStore.me) {
    // redirect to login
    // pass state through the router to say that we need
    // to call redirectToCheckout again
    return
  }

  stripe.redirectToCheckout({
    items,
    successUrl,
    cancelUrl,
    customerEmail: UserStore.me.confirmed ? UserStore.me.email : undefined,
  })
}
