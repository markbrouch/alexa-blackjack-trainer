import blackjack from 'engine-blackjack'
import { GetRecommendedPlayerAction } from 'blackjack-strategy'

import { ATTRIBUTES, CARDS, ENGINE, ACTIONS, STRATEGY, RULES } from './constants'

export const getCards = () => {
  const game = new blackjack.Game()
  game.dispatch(blackjack.actions.deal({ bet: 0 }))

  const { handInfo, dealerCards } = game.getState()

  return {
    playerCards: {
      card1: handInfo.right.cards[0],
      card2: handInfo.right.cards[1]
    },
    dealerCards: {
      card1: dealerCards[0]
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
    default: return false
  }
}

export const getSuit = card => {
  switch (card[ENGINE.CARDS.SUITS.NAME]) {
    case ENGINE.CARDS.SUITS.HEARTS: return CARDS.SUITS.HEARTS
    case ENGINE.CARDS.SUITS.DIAMONDS: return CARDS.SUITS.DIAMONDS
    case ENGINE.CARDS.SUITS.SPADES: return CARDS.SUITS.SPADES
    case ENGINE.CARDS.SUITS.CLUBS: return CARDS.SUITS.CLUBS
    default: return false
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
      getStrategyValue(playerCards.card1),
      getStrategyValue(playerCards.card2)
    ],
    getStrategyValue(dealerCards.card1),
    STRATEGY.HAND_COUNT,
    STRATEGY.DEALER_CHECKED,
    {
      [STRATEGY.OPTIONS.INSURANCE]: RULES.INSURANCE
    }
  )
)

export const validateAction = (action, strategy) => action === strategy

export const getHandType = cards => (
  cards[CARDS.CARD_1][ENGINE.CARDS.VALUE.NAME] === 1 ||
  cards[CARDS.CARD_2][ENGINE.CARDS.VALUE.NAME] === 1
    ? [CARDS.SOFT]
    : [CARDS.HARD]
)

export const getStrategyType = (playerCards, strategy) => {
  switch (strategy) {
    case ACTIONS.SURRENDER: return strategy
    default:
      return `${getHandType(playerCards)}_${strategy}`
  }
}

export const calculateStats = (stats = {}, strategyType, playerWon) => {
  const handsPlayed = stats[ATTRIBUTES.STATS.PLAYED]
  const handsWon = stats[ATTRIBUTES.STATS.WON]
  const strategyTypeStats = stats[strategyType] || {}
  const strategyTypePlayed = strategyTypeStats[ATTRIBUTES.STATS.PLAYED]
  const strategyTypeWon = strategyTypeStats[ATTRIBUTES.STATS.WON]

  return {
    ...stats,
    [ATTRIBUTES.STATS.PLAYED]: (handsPlayed || 0) + 1,
    [ATTRIBUTES.STATS.WON]: (handsWon || 0) + playerWon ? 1 : 0,
    [strategyType]: {
      [ATTRIBUTES.STATS.PLAYED]: (strategyTypePlayed || 0) + 1,
      [ATTRIBUTES.STATS.WON]: (strategyTypeWon || 0) + playerWon ? 1 : 0
    }
  }
}
