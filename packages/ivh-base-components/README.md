
# ivh-base-components

> Dead simple React components for iVantage.

Check [this pen](https://codepen.io/jtrussell/pen/VWyGzL) out for a simple demo
and playground.


## Usage

Install the library:

```
yarn add @ivantagehealth/ivh-base-components
```

Import the modules you want to use and go to town:

```
import { AuAlert } from '@ivantagehealth/ivh-base-components'

// ...

<AuAlert primary>
  An alert!
</AuAlert>
```

Note - you may also include the iife build directly on our page from the
iVantage CDN.


### Accordions

We provide four atomic components for building accordions and expand/collapse
shelf experiences.

```
import {
  AuAccordion,
  AuAccordionPanel,
  AuAccordionHeader,
  AuAccordionBody
} from '@ivantage/ivh-base-components'

const Cmp = () => (
  <AuAccordion>
    <AuAccordionPanel active={true}>
      <AuAccordionHeader>
        Click to Open First Drawer!
      </AuAccordionHeader>
      <AuAccordionBody>
        Now you see me!
      </AuAccordionBody>
    </AuAccordionPanel>
    <AuAccordionPanel>
      <AuAccordionHeader>
        Click to Open Second Drawer!
      </AuAccordionHeader>
      <AuAccordionBody>
        Now you see me!
      </AuAccordionBody>
    </AuAccordionPanel>
  </AuAccordion>
)
```

Accordions are made up of panels which each have a header and body. Panels
accept and `active` prop to indicate whether they should be expanded (`active
=== true`) or collapsed. Note that it is up to you to enforce an "only one open
at a time" guarantee if that's what you want.


### Badges

Badges allow you to display "notification counts" in the upper right corner of
an element. Note that the containing element must have non-static positioning.
Some components provide a helper props ("bader") to support this, in other cases
you may use the `AuWithBadge` helper component to provide this positioning.

```
import {
  AuButton,
  AuBadge,
  AuWithBadge
} from '@ivantage/ivh-base-components'

// AuButton has the "badge" helper prop
const Cmp1 = () => (
  <AuButton badge>
    Clicky
    <AuBadge primary>5</AuBadge>
  </AuButton>
)

// The span can now have a badge
const Cmp2 = () => (
  <AuWithBadge>
    <span>
      Everything is crashing!
      <AuBadge danger>!!!</AuBadge>
    </span>
  </AuWithBadge>
)
```

Badges support the usual semantic props.

### Loading Masks

Loading masks provide a transparent, grayed out overlay for content that should
not be interacted with. This package includes a molecule which utilizes our
standard "spinner" dots with optional text:

```
import { LoadingMask } from '@ivantage/ivh-base-components'

// A simple loading mask with just dots and no text
const loadingThing = () => (
  <div style={{position: 'relative'}}>
    <LoadingMask />
  </div>
)

// A loading mask with awesome text
const otherLoadingThings = () => (
  <div style={{position: 'relative'}}>
    <LoadingMask>
      Please wait! Awesome things are happening :).
    </LoadingMask>
  </div>
)
```

Note that the mask will cover the first ancestor element with non-static
position.


### More

For more details and a complete list of availabe components, see:

- [Atoms in docs/atoms.md](docs/atoms.md)
- [Molecules in docs/molecules.md](docs/molecules.md)


## Conventions

### Atoms

- Atoms live in the `src/atoms` directory.
- Atoms should be automatically generated from the `atoms.json` file in the root
  of this repo. Do not create atoms by hand, they will be overwritten.
- Do not add tests for atoms. Atoms are essentially styled base elements (i.e.
  `div`, `button`, `input`, etc.)
- Generally speaking atom component names are the pascal case (PascalCase)
  version of their corresponding `ivh-base-style` classname roots. For example
  the `AuAlert` atom corresponds to elements with the css classnames
  `au-alert-*`. Secondary classnames are derived by atom props, e.g.:
  ```
  <AuAlert primary>Foo!</AuAlert>

  // translates to

  <p class="au-alert au-alert-primary">Foo!</p>
  ```
- You can change the base element using the `cmp` prop. All atoms support this:
  ```
  <AuAlert cmp="div" primary>Foo!</AuAlert>

  // translates to

  <div class="au-alert au-alert-primary">Foo!</div>
  ```
  Note that you *can* provide complex components here... it just may not be the
  best idea ;).
- Other props are forwarded along to the underlying DOM node (event handlers,
  input types, everything).


### Molecules

- Molecules live in the `src/molecules` directory.
- Molecules should not require custom CSS above what atoms provide.
  - When they do, be sure to use the variables provided by `ivh-base-style`.
- Molecules should automatically forward props such as `primary`, `success`,
  etc. to their underlying atoms where appropriate.
- Wherever possible, molecules should provide namespaces for prop forwarding:
  ```
  // Molcule has an inner `AuAtom` and will forward `foo={thingy}` to it. This
  // is meant as an emergency escape hatch and should not be abused (an
  // intentionaly leaky abstraction.
  <Molecule auAtomFoo={thingy} />
  ```

### Organisms

- Organisms live in the `src/organisms` directory.
- Organisms may require custom CSS and structure above what is provided by atoms
  and modules.
- Organisms are largely self-contained and often require little customization.


## Scripts

- `npm run atoms` - Build atomic components from `atoms.json`
- `npm run bump` Increment the package version and publish (git tag). I.e. `npm
  run bump minor`.
- `npm run clean` Kill old build artifacts.
- `npm test` Run all unit tests once. Test coverage results will be placed in
  `./coverage/<platform>`.
- `npm run test:watch` Execute tests continuously as files are updated.
- `npm run build` Clean old build artifacts and run webpack for production.
