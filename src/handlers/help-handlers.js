import { CreateStateHandler } from 'alexa-sdk'

import { SKILL_STATES, INTENTS } from '../constants'

export const helpHandlers = CreateStateHandler(SKILL_STATES.HELP, {
  'AMAZON.RepeatIntent'() {
    const prompt = `${this.t('HELP.DESCRIPTION')} ${this.t('HELP.MORE')}`
    const reprompt = this.t('HELP.MORE')

    this.emit(':ask', prompt, reprompt)
  },

  'AMAZON.YesIntent'() {
    const prompt = `${this.t('HELP.RULES')} ${this.t('COMMON.PROMPT')}`
    const reprompt = `${this.t('START.SUGGESTION')} ${this.t('COMMON.PROMPT')}`

    this.handler.state = SKILL_STATES.START
    this.emit(':ask', prompt, reprompt)
  },

  'AMAZON.NoIntent'() {
    this.handler.state = SKILL_STATES.START
    this.emitWithState(INTENTS.START_INTENT)
  },

  'AMAZON.CancelIntent'() {
    this.handler.state = SKILL_STATES.START
    this.emitWithState(INTENTS.START_INTENT)
  },

  'Unhandled'() {
    const prompt = `${this.t('COMMON.UNHANDLED')} ${this.t('HELP.MORE')}`
    const reprompt = this.t('HELP.MORE')

    this.emit(':ask', prompt, reprompt)
  }
})

export default helpHandlers
