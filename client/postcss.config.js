import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'
import postcssApply from 'postcss-apply'

export default function () {
  return {
    plugins: [
      postcssNested(),
      postcssPresetEnv({
        features: {
          'nesting-rules': false,
          'custom-properties': {
            disableDeprecationNotice: true,
          },
        },
      }),
      postcssApply(),
    ],
  }
}
