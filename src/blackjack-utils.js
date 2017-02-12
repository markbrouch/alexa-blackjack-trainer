import blackjack from 'engine-blackjack'
import { GetRecommendedPlayerAction } from 'blackjack-strategy'

import { ATTRIBUTES, CARDS, ENGINE, ACTIONS, STRATEGY, RULES } from './constants'

export const getCards = () => {
  const game = new blackjack.Game()
  game.dispatch(blackjack.actions.deal({ bet: 0 }))

  const { handInfo, dealerCards } = game.getState()

  return {
    [ATTRIBUTES.PLAYER_CARDS.NAME]: {
      [ATTRIBUTES.PLAYER_CARDS.CARD_1]: handInfo.right.cards[0],
      [ATTRIBUTES.PLAYER_CARDS.CARD_2]: handInfo.right.cards[1]
    },
    [ATTRIBUTES.DEALER_CARDS.NAME]: {
      [ATTRIBUTES.DEALER_CARDS.CARD_1]: dealerCards[0]
    }
  }
}

export const getRank = card => {
  switch (card[ENGINE.CARDS.VALUE.NAME]) {
    case 1: return CARDS.RANKS.ACE
    case 2: return CARDS.RANKS.TWO
    case 3: return CARDS.RANKS.THREE
    case 4: return CARDS.RANKS.FOUR
    case 5: return CARDS.RANKS.FIVE
    case 6: return CARDS.RANKS.SIX
    case 7: return CARDS.RANKS.SEVEN
    case 8: return CARDS.RANKS.EIGHT
    case 9: return CARDS.RANKS.NINE
    case 10: return CARDS.RANKS.TEN
    case 11: return CARDS.RANKS.JACK
    case 12: return CARDS.RANKS.QUEEN
    case 13: return CARDS.RANKS.KING
  }
}

export const getSuit = card => {
  switch (card[ENGINE.CARDS.SUITS.NAME]) {
    case ENGINE.CARDS.SUITS.HEARTS: return CARDS.SUITS.HEARTS
    case ENGINE.CARDS.SUITS.DIAMONDS: return CARDS.SUITS.DIAMONDS
    case ENGINE.CARDS.SUITS.SPADES: return CARDS.SUITS.SPADES
    case ENGINE.CARDS.SUITS.CLUBS: return CARDS.SUITS.CLUBS
  }
}

export const normalizeAction = action => ACTIONS[action.toUpperCase()]

const getStrategyValue = card => {
  switch (card[ENGINE.CARDS.VALUE.NAME]) {
    case 11:
    case 12:
    case 13:
      return STRATEGY.FACE_VALUE
    default:
      return card[ENGINE.CARDS.VALUE.NAME]
  }
}

export const getStrategy = (playerCards, dealerCards) => normalizeAction(
  GetRecommendedPlayerAction(
    [
      getStrategyValue(playerCards[ATTRIBUTES.PLAYER_CARDS.CARD_1]),
      getStrategyValue(playerCards[ATTRIBUTES.PLAYER_CARDS.CARD_2])
    ],
    getStrategyValue(dealerCards[ATTRIBUTES.DEALER_CARDS.CARD_1]),
    STRATEGY.HAND_COUNT,
    STRATEGY.DEALER_CHECKED,
    {
      [STRATEGY.OPTIONS.INSURANCE]: RULES.INSURANCE
    }
  )
)

export const validateAction = (action, strategy) => action === strategy
