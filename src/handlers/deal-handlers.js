import { CreateStateHandler } from 'alexa-sdk'

import { SKILL_STATES, INTENTS, ATTRIBUTES } from '../constants'
import { deal, getRank, getSuit } from '../blackjack'

export const dealHandlers = CreateStateHandler(SKILL_STATES.DEAL, {
  [INTENTS.DEAL_INTENT]() {
    deal.call(this)

    const card1 = this.attributes[ATTRIBUTES.PLAYER_CARDS.NAME][ATTRIBUTES.PLAYER_CARDS.CARD_1]
    const card2 = this.attributes[ATTRIBUTES.PLAYER_CARDS.NAME][ATTRIBUTES.PLAYER_CARDS.CARD_2]
    const dealerCard = this.attributes[ATTRIBUTES.DEALER_CARDS.NAME][ATTRIBUTES.DEALER_CARDS.CARD_1]

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

  }
})

export default dealHandlers
