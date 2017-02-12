export const SKILL_STATES = {
  START: 'START',
  HELP: 'HELP',
  DEAL: 'DEAL',
  PLAY_AGAIN: 'PLAY_AGAIN'
}

export const INTENTS = {
  START_INTENT: 'StartIntent',
  DEAL_INTENT: 'DealIntent',
  ACTION_INTENT: 'ActionIntent'
}

export const ATTRIBUTES = {
  PLAYER_CARDS: {
    NAME: 'playerCards',
    CARD_1: 'card1',
    CARD_2: 'card2'
  },
  DEALER_CARDS: {
    NAME: 'dealerCards',
    CARD_1: 'card1'
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
