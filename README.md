# Base Styles and Components

Here live the base styles and components for iVantage Healthcare Analytics.

## Docs

Docs for base style and components can be found in:

- [`/packages/ivh-base-components/README.md`](/packages/ivh-base-components/README.md)
- [`/packages/ivh-base-style/README.md`](/packages/ivh-base-style/README.md)

## Publishing

You do NOT need to manually update any version numbers in package.json. Also if
there are any uncomitted changes, this won't work.

To publish:

1. Go to the root folder.
2. Run `yarn build` to build the styles and components
3. Run `yarn test` to make sure nothing is extremely broken.
4. Make sure you are logged into npm with an account that can publish to the
   `@ivantagehealth` organization.
5. Make sure the `sed` command exists and is in your path.
6. Run `yarn run publish` to publish to the npm registry. The command will
   prompt you for a version type.
