import { CreateStateHandler } from 'alexa-sdk'

import { SKILL_STATES, INTENTS } from '../constants'

export const playAgainHandlers = CreateStateHandler(SKILL_STATES.PLAY_AGAIN, {
  'AMAZON.RepeatIntent'() {
    const prompt = this.t('DEAL.PLAY_AGAIN')

    this.emit(':ask', prompt, prompt)
  },

  'AMAZON.YesIntent'() {
    this.handler.state = SKILL_STATES.DEAL
    this.emitWithState(INTENTS.DEAL_INTENT, true)
  },

  'AMAZON.NoIntent'() {
    const prompt = this.t('COMMON.GOODBYE')

    this.emit(':tell', prompt)
  },

  'AMAZON.CancelIntent'() {
    const prompt = this.t('COMMON.GOODBYE')

    this.emit(':tell', prompt)
  },

  'AMAZON.StopIntent'() {
    const prompt = this.t('COMMON.GOODBYE')

    this.emit(':tell', prompt)
  },

  'SessionEndedRequest'() {
    this.handler.state = ''
    this.emit(':saveState', true)
  },

  'Unhandled'() {
    const prompt = `${this.t('COMMON.UNHANDLED')} ${this.t('DEAL.PLAY_AGAIN')}`
    const reprompt = this.t('DEAL.PLAY_AGAIN')

    this.emit(':ask', prompt, reprompt)
  }
})

export default playAgainHandlers
