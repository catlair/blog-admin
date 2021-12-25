import type { App, Directive } from 'vue'

// auto foucus directive
export const autoFocusDirective: Directive = {
  mounted(el) {
    setTimeout(() => {
      el && el.focus()
    }, 100)
  }
}

export function setupFocusDirective(app: App) {
  app.directive('focus', autoFocusDirective)
}
