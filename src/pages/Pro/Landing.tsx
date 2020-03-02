import React from 'react'
import styled from 'styled-components'

import Button from '@/styled/Button'
import {redirectToCheckout} from '@/services/Stripe'
import {GemIcon} from '@/components/icons'

const LandingWrapper = styled.article`
  margin-top: 6em;
  width: 70%;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: 5em;
`

const Header = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 0.5em;
`

const Secondary = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
`

const PurchaseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1em;

  span {
    margin-right: 1em;
  }
`

const PricingFAQ = styled.div`
  max-width: 40rem;
  h3 {
    font-size: 1.7rem;
  }
`

const PricingQ = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 0.65em;
`

const PricingA = styled.p``

const ProInfoWrapper = styled.section`
  background: ${({theme}) => theme.backgrounds.secondary};
  padding: 2em;
  width: 100%;
  border-radius: 6px;
  margin-top: 12em;
  display: grid;
  justify-content: center;
`

const ProInfoHeader = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  margin-top: 0;
  margin-bottom: 2.2em;
`

const ProInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5em;

  div {
    background: ${({theme}) => theme.backgrounds.primary};
    padding: 1em;
    border-radius: 4px;
  }
`

const Landing = () => (
  <LandingWrapper>
    <Header>
      typvp <i style={{color: '#998DD9'}}>Pro</i>
    </Header>
    <Secondary>
      Enhance your typvp experience with premium features, <br /> <u>without</u>{' '}
      the premium pricetag.
    </Secondary>
    <PurchaseWrapper>
      <Button
        appearance="primary"
        intent="none"
        onClick={() => redirectToCheckout('pro_one_time')}
      >
        $4.99 Once
      </Button>
      <span>or</span>
      <Button
        appearance="primary"
        intent="none"
        onClick={() => redirectToCheckout('pro_recurring')}
      >
        $2.50 / Month
      </Button>
    </PurchaseWrapper>
    <ProInfoWrapper>
      <ProInfoHeader>
        typvp Pro upgrades your typvp experience app-wide, letting you show off
        & do more. Take a peek at what you'll get:
      </ProInfoHeader>
      <ProInfoGrid>
        <div>
          <GemIcon />
          <span>Rep the Badge</span>
          <p>Your name will carry a special badge.</p>
        </div>
        <div>
          <GemIcon />
          <span>Strut your stuff</span>
          <p>Give your Profile a custom colour that is visible to everybody.</p>
        </div>
        <div>
          <GemIcon />
          <span>Save a Word Set</span>
          <p>Have a good run? Save the set of words to type again later.</p>
        </div>
        <div>
          <GemIcon />
          <span>Custom Trials</span>
          <p>
            Create & publish your own Trials. Custom word set, difficulty,
            length, everything.
          </p>
        </div>
        <div>
          <GemIcon />
          <span>Custom Trials</span>
          <p>
            Create & publish your own Trials. Custom word set, difficulty,
            length, everything.
          </p>
        </div>
        <div>
          <GemIcon />
          <span>More to come!</span>
          <p>Lot's of exciting features are in the works.</p>
        </div>
      </ProInfoGrid>
    </ProInfoWrapper>
    <PricingFAQ>
      <h3>FAQ</h3>
      <PricingQ>Q: Why are there multiple pricing options?</PricingQ>
      <PricingA>
        A: We offer a One Time or Subscription based pricing model to help
        accommodate users who want to upgrade but may not want to recieve a
        monthly payment.
      </PricingA>
      <PricingQ>Q: What happens if I opt for a One Time payment?</PricingQ>
      <PricingA>
        If you choose a One Time payment, you will recieve Pro benefits
        permanently.
      </PricingA>
      <PricingQ>Q: What happens if I opt for a Recurring payment?</PricingQ>
      <PricingA>
        A: If you choose a Subscription based payment, you will only have Pro
        benefits for the duration of your Subscription.
      </PricingA>
      <PricingQ>Q: Is my Payment information saved?</PricingQ>
      <PricingA>
        A: All payment processing is handled by Stripe. No information about you
        is saved by typvp.
      </PricingA>
      <PricingQ>Q: How fast can I expect my Account to become Pro?</PricingQ>
      <PricingA>
        A: As soon as the payment is processed by Stripe. Typically 'instantly'.
      </PricingA>
    </PricingFAQ>
  </LandingWrapper>
)

export default Landing
