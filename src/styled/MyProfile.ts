import styled from 'styled-components'

export const ProfileGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-row-gap: 0.5em;
  grid-column-gap: 4rem;
  align-self: center;
  width: 80%;
  position: relative;
  margin-bottom: 10em;
  color: ${({theme}) => theme.colors.text};

  > section {
    background: ${({theme}) => theme.backgrounds.secondary};
    padding: 1em;
    border-radius: 6px;
  }
`

export const ProfileValue = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`

export const AboutArea = styled.section`
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 2em;
  margin-bottom: auto;

  ${ProfileValue} {
    color: ${({color}) => color && color};
  }
`

export const ResultsArea = styled.section`
  display: grid;
  grid-row-gap: 2em;
  margin-bottom: auto;
`

export const ResultFilter = styled.div`
  display: grid;
  > div:first-of-type {
    display: flex;
    align-items: center;
    label {
      font-weight: 700;
      margin-right: 1em;
    }
  }
`

export const ResultWrapper = styled.div`
  display: grid;
  background: ${({theme}) => theme.backgrounds.primary};
  border-radius: 4px;
  padding: 1em;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  text-align: right;

  h1 {
    :first-of-type {
      text-align: left;
    }
  }
  span {
    margin: 0;
    :first-of-type {
      text-align: left;
    }
  }
  p {
    margin: 0;
    font-size: 0.725rem;
    text-align: left;
    grid-area: 1 / span 2;
  }
`

export const ProfileHeader = styled.h1`
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
`

export const ResultHeader = styled(ProfileHeader)`
  grid-row: 2;
`

export const ResultValue = styled(ProfileValue)`
  grid-row: 3;
`
