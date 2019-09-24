
# IVH Base Style

> Is it gold in here, or is it just me?

## Usage

In your JS app:

```JavaScript
import theme from '@ivantage/ivh-base-style'
import '@ivantage/ivh-base-style/dist/ivh-base-style.css'

// Use variables on `theme` to style your custom stuff
```

We also expose our variables in a CSS custom properties-friendly format. Perfect
for using with the post CSS plugin `postcss-custom-properties`:

```JavaScript
// in your postcss.config.js
const customProperties = require('postcss-custom-properties')()
const theme = require('@ivantage/ivh-base-style')

customProperties.setVariables(theme.asCustomPropertyVariables())

module.exports = {
  plugins: [
    customProperties
  ]
}
```

## Docs

... Coming soon! For now check the source of `demo.html` - our main JS file is
fairly well commented too.
