import { CreateStateHandler } from 'alexa-sdk'

import { SKILL_STATES, INTENTS } from '../constants'

export const startHandlers = CreateStateHandler(SKILL_STATES.START, {
  [INTENTS.START_INTENT]() {
    const prompt = this.t('COMMON.PROMPT')
    const reprompt = `${this.t('START.SUGGESTION')} ${this.t('COMMON.PROMPT')}`

    this.emit(':ask', prompt, reprompt)
  },

  [INTENTS.DEAL_INTENT]() {
    this.handler.state = SKILL_STATES.DEAL
    this.emitWithState(INTENTS.DEAL_INTENT)
  },

  'AMAZON.HelpIntent'() {
    const prompt = `${this.t('HELP.DESCRIPTION')} ${this.t('HELP.MORE')}`
    const reprompt = this.t('HELP.MORE')

    this.handler.state = SKILL_STATES.HELP
    this.emit(':ask', prompt, reprompt)
  },

  'Unhandled'() {
    const prompt = `${this.t('COMMON.UNHANDLED')} ${this.t('COMMON.PROMPT')}`
    const reprompt = `${this.t('START.SUGGESTION')} ${this.t('COMMON.PROMPT')}`

    this.emit(':ask', prompt, reprompt)
  }
})

export default startHandlers