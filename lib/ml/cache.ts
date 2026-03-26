import type { TrainedModel } from "./tabular-regression"

declare global {
  // eslint-disable-next-line no-var
  var __ML_MODEL__: TrainedModel | undefined
}

export function getCachedModel() {
  return globalThis.__ML_MODEL__
}

export function setCachedModel(m: TrainedModel) {
  globalThis.__ML_MODEL__ = m
}

