import {observable, action, flow, runInAction} from 'mobx'
import randomwords from 'random-words'

import {TypingState} from '@/types/game'
import {client} from '@/services/Client'
import {GET_WORD_SET} from '@/graphql/mutations/addResult'

let timeout: any = null
class GameStore {
  @observable
  typedHistory: string[] = new Array(250).fill(null)

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
  rawCpm: number = 0

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

  incorrectIndex: number[] = []

  @observable
  isSpellingIncorrect: boolean = false

  @observable
  mode?: 'Singleplayer' | 'Trial'

  @observable
  fetchingWords: boolean = false

  @action
  calculateResults = (): any => {
    /*
     * 1. Check if the word has been typed, if so, use the length of the typed word.
     *    if not, we won't want to increase character count (-1)
     *
     * 2. -250 being the length of the words array
     *    not sure what else is going on but it works lol
     *    +2 is because you count the space as a character as well
     */
    const characters = this.typedHistory
      .map(word => (word !== null ? word.length : -1)) // 1
      .reduce((a, b) => a + b + 2, -250) // 2

    // Raw CPM => Doesn't include mistakes
    this.rawCpm = Math.floor((characters / this.time) * 60)

    // Corrected CPM = > Subtract mistakes character length from all characters
    let adjustCpmBy = 0
    this.incorrectIndex.forEach(index => {
      if (this.typedHistory[index] !== null) {
        adjustCpmBy += this.typedHistory[index].length + 1
      }
    })

    const goodCharacters = characters - adjustCpmBy

    this.cpm = Math.floor((goodCharacters / this.time) * 60)

    this.wpm = Math.floor(this.cpm / 5)
  }

  @action
  reset = () => {
    clearTimeout(timeout)
    this.typedHistory = new Array(250).fill(null)
    this.typedWord = ''
    this.wordIndex = 0
    this.time = 0
    this.typingState = TypingState.NotStarted
    this.cpm = 0
    this.rawCpm = 0
    this.wpm = 0
    if (this.mode !== 'Trial') {
      this.generateWords()
    }
    this.corrections = 0
    this.incorrect = 0
    this.correct = 0
    this.incorrectIndex = []
    this.isSpellingIncorrect = false
  }

  @action
  empty = () => {
    clearTimeout(timeout)
    this.typedHistory = new Array(250).fill(null)
    this.typedWord = ''
    this.wordIndex = 0
    this.time = 0
    this.typingState = TypingState.NotStarted
    this.cpm = 0
    this.rawCpm = 0
    this.wpm = 0
    this.words = []
    this.corrections = 0
    this.incorrect = 0
    this.correct = 0
    this.incorrectIndex = []
    this.isSpellingIncorrect = false
    this.mode = undefined
  }

  generateWords = flow(function*(
    this: GameStore,
  ): Generator<Promise<any>, void, any> {
    if (!this.fetchingWords) {
      this.fetchingWords = true
      const {
        data: {getWordSet},
      } = yield client.mutation(GET_WORD_SET).toPromise()
      this.loadWordSet(getWordSet)
      this.fetchingWords = false
    }
  })

  @action
  loadWordSet = (wordSet: string): void => {
    this.words = wordSet.split('|')
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
  validateInput = (): void => {
    const target = this.words[this.wordIndex]
    for (let i = 0; i < this.typedWord.length; i++) {
      if (this.typedWord[i] !== target[i]) {
        this.isSpellingIncorrect = true
        return
      } else {
        this.isSpellingIncorrect = false
      }
    }
  }

  @action
  onKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.typingState === TypingState.NotStarted) {
      this.typingState = TypingState.InProgress
      this.runTimer()
    }

    if (e.target.value !== ' ' && this.typingState !== TypingState.Finished) {
      this.typedWord = e.target.value
      this.validateInput()
    }
  }

  @action
  onAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.typingState !== TypingState.Finished) {
      if (e.key === ' ') {
        if (this.typedWord === '') {
          e.preventDefault()
          return
        }

        this.typedHistory[this.wordIndex] = this.typedWord

        if (this.typingState === TypingState.AwaitingLastWord) {
          this.typingState = TypingState.Finished
          this.calculateResults()
        }

        if (this.typedHistory[this.wordIndex] === this.words[this.wordIndex]) {
          this.correct++
        } else {
          this.incorrect++
          this.incorrectIndex.push(this.wordIndex)
        }

        this.typedWord = ''
        this.wordIndex++
        this.isSpellingIncorrect = false
      } else if (e.key === 'Backspace') {
        this.corrections++
        this.validateInput()
      }
    }
  }
}

export default new GameStore()
