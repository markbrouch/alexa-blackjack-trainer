export const SKILL_STATES = {
  START: 'START',
  HELP: 'HELP',
  DEAL: 'DEAL',
  PLAY_AGAIN: 'PLAY_AGAIN'
}

export const INTENTS = {
  START_INTENT: 'StartIntent',
  DEAL_INTENT: 'DealIntent',
  READ_CARDS: 'ReadCards',
  ACTION_INTENT: 'ActionIntent'
}

export const HAND_TYPES = {
  HARD_HIT: 'HARD_HIT',
  HARD_STAY: 'HARD_STAY',
  HARD_SPLIT: 'HARD_SPLIT',
  HARD_DOUBLE: 'HARD_DOUBLE',
  SOFT_HIT: 'SOFT_HIT',
  SOFT_STAY: 'SOFT_STAY',
  SOFT_SPLIT: 'SOFT_SPLIT',
  SOFT_DOUBLE: 'SOFT_DOUBLE',
  SURRENDER: 'SURRENDER'
}

export const ATTRIBUTES = {
  STATS: {
    NAME: 'STATS',
    PLAYED: 'PLAYED',
    WON: 'WON'
  }
}

export const ENGINE = {
  CARDS: {
    VALUE: {
      NAME: 'value'
    },
    SUITS: {
      NAME: 'suite',
      HEARTS: 'hearts',
      DIAMONDS: 'diamonds',
      SPADES: 'spades',
      CLUBS: 'clubs'
    }
  }
}

export const CARDS = {
  CARD_1: 'card1',
  CARD_2: 'card2',
  HARD: 'HARD',
  SOFT: 'SOFT',
  RANKS: {
    ACE: 'ACE',
    TWO: 'TWO',
    THREE: 'THREE',
    FOUR: 'FOUR',
    FIVE: 'FIVE',
    SIX: 'SIX',
    SEVEN: 'SEVEN',
    EIGHT: 'EIGHT',
    NINE: 'NINE',
    TEN: 'TEN',
    JACK: 'JACK',
    QUEEN: 'QUEEN',
    KING: 'KING'
  },
  SUITS: {
    HEARTS: 'HEARTS',
    DIAMONDS: 'DIAMONDS',
    SPADES: 'SPADES',
    CLUBS: 'CLUBS'
  }
}

export const ACTIONS = {
  HIT: 'HIT',
  STAND: 'STAY',
  STAY: 'STAY',
  DOUBLE: 'DOUBLE',
  SPLIT: 'SPLIT',
  SURRENDER: 'SURRENDER'
}

export const STRATEGY = {
  FACE_VALUE: 10,
  HAND_COUNT: 1,
  DEALER_CHECKED: false,
  OPTIONS: {
    INSURANCE: 'offerInsurance'
  }
}

export const RULES = {
  INSURANCE: false
}
