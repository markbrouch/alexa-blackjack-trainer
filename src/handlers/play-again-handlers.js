import { CreateStateHandler } from 'alexa-sdk'

import { SKILL_STATES, INTENTS } from '../constants'

export const playAgainHandlers = CreateStateHandler(SKILL_STATES.HELP, {
  'AMAZON.RepeatIntent'() {
    const prompt = this.t('DEAL.PLAY_AGAIN')

    this.emit(':ask', prompt, prompt)
  },

  'AMAZON.YesIntent'() {
    this.handler.state = SKILL_STATES.DEAL
    this.emitWithState(INTENTS.DEAL_INTENT)
  },

  'AMAZON.NoIntent'() {
    const prompt = this.t('COMMON.GOODBYE')

    this.emit(':tell', prompt)
  },

  'AMAZON.CancelIntent'() {
    const prompt = this.t('COMMON.GOODBYE')

    this.emit(':tell', prompt)
  },

  'Unhandled'() {
    const prompt = `${this.t('COMMON.UNHANDLED')} ${this.t('DEAL.PLAY_AGAIN')}`
    const reprompt = this.t('DEAL.PLAY_AGAIN')

    this.emit(':ask', prompt, reprompt)
  }
})

export default playAgainHandlers
