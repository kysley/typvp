import {observable, action} from 'mobx'
import randomwords from 'random-words'

import {TypingState} from '@/types/game'

let timeout: any = null
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
  calculateResults(): any {
    const characters = this.typedHistory
      .map(word => (word !== '' ? word.length : -1))
      .reduce((a, b) => a + b + 1, 0)

    this.cpm = Math.floor((characters * 60) / this.time)
    this.wpm = (this.cpm - this.corrections) / 5
    // return Math.floor((characters * 60) / this.time)
  }

  @action
  reset = () => {
    clearTimeout(timeout)
    this.typedHistory = new Array(250).fill('')
    this.typedWord = ''
    this.wordIndex = 0
    this.time = 0
    this.typingState = TypingState.NotStarted
    this.cpm = 0
    this.wpm = 0
    this.generateWords()
    this.corrections = 0
    this.incorrect = 0
    this.correct = 0
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
    timeout = setTimeout(() => {
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
