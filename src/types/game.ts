enum TypingState {
  NotStarted,
  InProgress,
  Finished,
}

export type TRoom = {
  countdown: number
  secondsRemaining: number
  acceptUpdates: boolean
  name: string
  state: string
  players: any
}

export {TypingState}
