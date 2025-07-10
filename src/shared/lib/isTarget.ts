import type { HookTarget } from './getElement'

import { targetSymbol } from './getElement'

export function isTarget(target: HookTarget) {
  return (
    typeof target === 'object' &&
    ('current' in target || target.type === targetSymbol)
  )
}
