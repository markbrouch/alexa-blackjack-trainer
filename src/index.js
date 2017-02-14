import { handler } from 'alexa-sdk'

import languageString from './i18n.json'

import { SKILL_STATES, INTENTS } from './constants'
import { startHandlers } from './handlers/start-handlers'
import { helpHandlers } from './handlers/help-handlers'
import { dealHandlers } from './handlers/deal-handlers'
import { playAgainHandlers } from './handlers/play-again-handlers'

const newSessionHandlers = {
  'LaunchRequest'() {
    const prompt = `${this.t('START.WELCOME')} ${this.t('COMMON.PROMPT')}`
    const reprompt = `${this.t('START.SUGGESTION')} ${this.t('COMMON.PROMPT')}`

    this.handler.state = SKILL_STATES.START
    this.emit(':ask', prompt, reprompt)
  },

  [INTENTS.DEAL_INTENT]() {
    this.handler.state = SKILL_STATES.START
    this.emitWithState(INTENTS.DEAL_INTENT)
  },

  'AMAZON.CancelIntent'() {
    const prompt = this.t('COMMON.GOODBYE')

    this.emit(':tell', prompt)
  },

  'AMAZON.StopIntent'() {
    const prompt = this.t('COMMON.GOODBYE')

    this.emit(':tell', prompt)
  },

  'Unhandled'() {
    const prompt = `${this.t('COMMON.UNHANDLED')} ${this.t('COMMON.PROMPT')}`
    const reprompt = `${this.t('START.SUGGESTION')} ${this.t('COMMON.PROMPT')}`

    this.emit(':ask', prompt, reprompt)
  }
}

export default (event, context) => {
  const alexa = handler(event, context)

  alexa.appId = process.env.APP_ID
  alexa.resources = languageString
  alexa.registerHandlers(
    newSessionHandlers,
    startHandlers,
    helpHandlers,
    dealHandlers,
    playAgainHandlers
  )
  alexa.execute()
}
