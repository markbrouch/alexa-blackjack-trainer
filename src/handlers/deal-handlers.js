import { CreateStateHandler } from 'alexa-sdk'

import { SKILL_STATES, INTENTS, ATTRIBUTES } from '../constants'
import {
  getCards,
  getRank,
  getSuit,
  normalizeAction,
  getStrategy,
  validateAction
} from '../blackjack-utils'

export const dealHandlers = CreateStateHandler(SKILL_STATES.DEAL, {
  [INTENTS.DEAL_INTENT]() {
    const { playerCards, dealerCards } = getCards();
    const {
      [ATTRIBUTES.PLAYER_CARDS.CARD_1]: card1,
      [ATTRIBUTES.PLAYER_CARDS.CARD_2]: card2
    } = playerCards;
    const {
      [ATTRIBUTES.DEALER_CARDS.CARD_1]: dealerCard
    } = dealerCards;

    this.attributes = {
      ...this.attributes,
      [ATTRIBUTES.PLAYER_CARDS.NAME]: {
        [ATTRIBUTES.PLAYER_CARDS.CARD_1]: card1,
        [ATTRIBUTES.PLAYER_CARDS.CARD_2]: card2
      },
      [ATTRIBUTES.DEALER_CARDS.NAME]: {
        [ATTRIBUTES.DEALER_CARDS.CARD_1]: dealerCard
      }
    }

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
    const action = normalizeAction(this.event.request.intent.slots.Action.value);
    const strategy = getStrategy(
      this.attributes[ATTRIBUTES.PLAYER_CARDS.NAME],
      this.attributes[ATTRIBUTES.DEALER_CARDS.NAME]
    )

    const prompt = `${validateAction(action, strategy)
      ? this.t('STRATEGY.CORRECT', {
        action: this.t(`ACTION.${action}`)
      })
      : this.this.t('STRATEGY.INCORRECT', {
        action: this.t(`ACTION.${strategy}`)
      })
    } ${this.t('DEAL.PLAY_AGAIN')}`
    const reprompt = this.t('DEAL.PLAY_AGAIN');

    this.handler.state = SKILL_STATES.PLAY_AGAIN
    this.emit(':ask', prompt, reprompt)
  },

  'Unhandled'() {
    const prompt = `${this.t('COMMON.UNHANDLED')} ${this.t('DEAL.SUGGESTION')} ${this.t('DEAL.PROMPT')}`
    const reprompt = `${this.t('DEAL.SUGGESTION')} ${this.t('DEAL.PROMPT')}`

    this.emit(':ask', prompt, reprompt)
  }
})

export default dealHandlers
