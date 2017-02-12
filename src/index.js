import { name, version } from '../package.json'
import languageString from '../i18n.json'

import { handler } from 'alexa-sdk'

import { SKILL_STATES, INTENTS } from './constants'
import startHandlers from './handlers/start-handlers'
import helpHandlers from './handlers/help-handlers'
import dealHandlers from './handlers/deal-handlers'

const newSessionHandlers = {
  'NewSession'() {
    const prompt = `${this.t('START.WELCOME')} ${this.t('COMMON.PROMPT')}`
    const reprompt = `${this.t('START.SUGGESTION')} ${this.t('COMMON.PROMPT')}`

    this.handler.state = SKILL_STATES.START
    this.emit(':ask', prompt, reprompt)
  },
  [INTENTS.DEAL_INTENT]() {
    this.handler.state = SKILL_STATES.START
    this.emitWithState(INTENTS.DEAL_INTENT)
  }
}

export default (event, context, callback) => {
  // console.log('event:', event)
  // console.log('context:', context)
  // console.log('env:', process.env)

  const alexa = handler(event, context)

  alexa.appId = process.env.APP_ID
  alexa.resources = languageString
  alexa.registerHandlers(
    newSessionHandlers,
    startHandlers,
    helpHandlers,
    dealHandlers
  )
  alexa.execute()
}
