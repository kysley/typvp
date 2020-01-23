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
  span {
    margin-right: 1em;
  }
`

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
  margin-bottom: 3em;
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
      Start Free. <br />
      Then get more.
    </Header>
    <Secondary>
      Enhance your typvp experience with <u>premium</u> features, <br /> without
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
          <p>Display your support with a special badge.</p>
        </div>
        <div>
          <GemIcon />
          <span>Strut your stuff</span>
          <p>Give your Profile a custom colour that is visible to everybody.</p>
        </div>
        <div>
          <GemIcon />
          <span>Save a Word Set</span>
          <p>Have a good run? Save the set of words to type later!</p>
        </div>
        <div>
          <GemIcon />
          <span>Custom Trials</span>
          <p>
            Create & publish your own Trials. Custom word set, difficulty,
            length, everything.
          </p>
        </div>
      </ProInfoGrid>
    </ProInfoWrapper>
  </LandingWrapper>
)

export default Landing
