import type { App } from 'vue'
import { setupFocusDirective } from './autoFocus'

export function setupGlobDirectives(app: App) {
  setupFocusDirective(app)
}
