import { CreateStateHandler } from 'alexa-sdk'

import { SKILL_STATES, INTENTS, ATTRIBUTES } from '../constants'
import {
  getCards,
  getRank,
  getSuit,
  normalizeAction,
  getStrategy,
  validateAction,
  getStrategyType,
  calculateStats
} from '../blackjack-utils'

let { playerCards, dealerCards } = getCards()

export const dealHandlers = CreateStateHandler(SKILL_STATES.DEAL, {
  'NewSession'() {
    this.emit('NewSession')
  },

  [INTENTS.DEAL_INTENT](shouldDeal) {
    const cards = shouldDeal ? getCards() : { playerCards, dealerCards }
    playerCards = cards.playerCards
    dealerCards = cards.dealerCards

    this.emitWithState(INTENTS.READ_CARDS, playerCards, dealerCards)
  },

  [INTENTS.READ_CARDS]({ card1, card2 }, { card1: dealerCard }) {
    const prompt = `${this.t('DEAL.DEALT', {
      card1: this.t('CARDS.CARD', {
        rank: this.t(`CARDS.RANKS.${getRank(card1)}`),
        suit: this.t(`CARDS.SUITS.${getSuit(card1)}`)
      }),
      card2: this.t('CARDS.CARD', {
        rank: this.t(`CARDS.RANKS.${getRank(card2)}`),
        suit: this.t(`CARDS.SUITS.${getSuit(card2)}`)
      }),
      dealerCard: this.t('CARDS.CARD', {
        rank: this.t(`CARDS.RANKS.${getRank(dealerCard)}`),
        suit: this.t(`CARDS.SUITS.${getSuit(dealerCard)}`)
      })
    })} ${this.t('DEAL.PROMPT')}`
    const reprompt = `${this.t('DEAL.SUGGESTION')} ${this.t('DEAL.PROMPT')}`

    this.emit(':ask', prompt, reprompt)
  },

  [INTENTS.ACTION_INTENT]() {
    const action = normalizeAction(this.event.request.intent.slots.Action.value)
    const strategy = getStrategy(playerCards, dealerCards)
    const playerWon = validateAction(action, strategy)
    const strategyType = getStrategyType(playerCards, strategy)
    const stats = calculateStats(this.attributes[ATTRIBUTES.STATS.NAME], strategyType, playerWon)


    this.attributes[ATTRIBUTES.STATS.NAME] = stats
    this.emit(':saveState')

    const overallAccuracy = Math.round((
      +stats[ATTRIBUTES.STATS.WON] /
      +stats[ATTRIBUTES.STATS.PLAYED]
    ) * 100)
    const handAccuracy = Math.round((
      +stats[strategyType][ATTRIBUTES.STATS.WON] /
      +stats[strategyType][ATTRIBUTES.STATS.PLAYED]
    ) * 100)

    const prompt = `${playerWon
      ? this.t('STRATEGY.CORRECT', {
        action: this.t(`ACTION.${action}`)
      })
      : this.t('STRATEGY.INCORRECT', {
        action: this.t(`ACTION.${strategy}`)
      })
    } ${this.t('STATS.ACCURACY', {
      handAccuracy,
      overallAccuracy,
      handType: this.t(`STATS.${strategyType}`)
    })} ${this.t('DEAL.PLAY_AGAIN')}`
    const reprompt = this.t('DEAL.PLAY_AGAIN')

    this.handler.state = SKILL_STATES.PLAY_AGAIN
    this.emit(':ask', prompt, reprompt)
  },

  'AMAZON.RepeatIntent'() {
    this.emitWithState(INTENTS.READ_CARDS, playerCards, dealerCards)
  },

  'AMAZON.HelpIntent'() {
    const prompt = `${this.t('DEAL.SUGGESTION')} ${this.t('DEAL.PROMPT')}`
    const reprompt = `${this.t('DEAL.SUGGESTION')} ${this.t('DEAL.PROMPT')}`

    this.emit(':ask', prompt, reprompt)
  },

  'AMAZON.CancelIntent'() {
    this.handler.state = SKILL_STATES.START
    this.emitWithState([INTENTS.START_INTENT])
  },

  'AMAZON.StopIntent'() {
    const prompt = this.t('COMMON.GOODBYE')

    this.emit(':tell', prompt)
  },

  'Unhandled'() {
    const prompt = `${this.t('COMMON.UNHANDLED')} ${this.t('DEAL.SUGGESTION')} ${this.t('DEAL.PROMPT')}`
    const reprompt = `${this.t('DEAL.SUGGESTION')} ${this.t('DEAL.PROMPT')}`

    this.emit(':ask', prompt, reprompt)
  }
})

export default dealHandlers
