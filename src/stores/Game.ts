import {observable, action} from 'mobx'
import randomwords from 'random-words'

import {TypingState} from '@/types/game'

class GameStore {
  @observable
  typedHistory: string[] = new Array(250).fill('')

  @observable
  typedWord: string = ''

  @observable
  wordIndex: number = 0

  @observable
  time: number = 0

  @observable
  typingState: TypingState = TypingState.NotStarted

  @observable
  cpm: number = 0

  @observable
  wpm: number = 0

  @observable
  words: string[] = []

  @observable
  corrections: number = 0

  @observable
  incorrect: number = 0

  @observable
  correct: number = 0

  @action
  calculateCpm(): any {
    const characters = this.typedHistory
      .map(word => (word !== '' ? word.length : -1))
      .reduce((a, b) => a + b + 1, 0)

    this.cpm = Math.floor((characters * 60) / this.time)
    // return Math.floor((characters * 60) / this.time)
  }

  @action
  generateWords = () => {
    this.words = randomwords(250)
  }

  @action
  endTimer = () => {
    this.typingState = TypingState.AwaitingLastWord
  }

  @action
  runTimer = (): void => {
    setTimeout(() => {
      const {time} = this
      if (time < 60) {
        this.time++
        this.runTimer()
      } else {
        this.endTimer()
      }
    }, 1000)
  }

  @action
  onKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.typingState === TypingState.NotStarted) {
      this.typingState = TypingState.InProgress
      this.runTimer()
    }

    if (e.target.value !== ' ') {
      this.typedWord = e.target.value
    }
  }

  @action
  onAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      this.typedHistory[this.wordIndex] = this.typedWord

      if (this.typingState === TypingState.AwaitingLastWord) {
        this.typingState = TypingState.Finished
      }

      if (this.typedHistory[this.wordIndex] === this.words[this.wordIndex]) {
        this.correct++
      } else {
        this.incorrect++
      }

      this.typedWord = ''
      this.wordIndex++
      // this.calculateCpm()
    } else if (e.key === 'Backspace') {
      this.corrections++
    }
  }
}

export default new GameStore()
