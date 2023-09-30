import { type Ref, ref, toRef } from 'vue'

interface useIconComposableState {
  source: Ref<string | undefined>;
}

const pack = new Map<string, string>()

export const useIcon = (name: string): useIconComposableState => {
  if (pack.has(name)) {
    return {
      source: toRef(pack.get(name)),
    }
  }

  const source = ref<string | undefined>()

  void import(/* @vite-ignore */ `../../assets/icons/${name}.svg?raw`)
    .then((module) => {
      source.value = module.default

      pack.set(name, module.default)
    })
    .catch((error) => {
      console.log('error', error)
    })

  return {
    source,
  }
}
