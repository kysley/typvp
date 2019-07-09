import styled, {css} from 'styled-components'

const finishedMatch = css`
  color: #64aa84;
`

const finishedIncorrect = css`
  color: #cb466a;
`

const current = css`
  color: #5646b2;
`

interface SingleWordProps {
  variant: 'current' | 'done' | 'awaiting'
  isMatch: boolean | undefined
}

const SingleWord = styled.span<SingleWordProps>`
  font-size: 1.4rem;
  margin-bottom: 4px;
  padding: 4px 5px;
  border-radius: 5px;
  display: inline-block;
  color: #162020;

  ${p => {
    if (p.variant === 'done') {
      return p.isMatch ? `${finishedMatch}` : `${finishedIncorrect}`
    }
  }}
  ${p => (p.variant === 'current' ? `${current}` : null)}
`

export default SingleWord
