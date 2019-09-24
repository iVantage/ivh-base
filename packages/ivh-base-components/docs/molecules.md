
# Molecules

Molecules are slightly more complex complex components than atoms. In fact,
they're typically made up of a handful of atomic components. See what they did
there with the analogy?


## Usage

Molecules may be imported by name from `@ivantagehealth/ivh-base-components`
just like their atomic siblings.

Where possible (and relevant) we will pass down semantic props, and other
relevant props, to the constituent atomics.


### LoadingMask

> A convenient loading mask for those not-quite-ready-yet things.

The `LoadingMask` component accepts no props other than children. Use `children`
to supply a message for your loading mask. This molecule combines the mask
wrapper, spinner, and spinner dots. Note that the containing element (the one
you want to apply a mask to) needs to have non-static positioning.

Example:

```javascript
<div className='still-loading' style={{position: 'relative'}}>
  <LoadingMask />
</div>
```


### Select Menus / Dropdowns

> Fancy select menus.

Example:

```javascript
<AuSelect>
  <AuSelectButton>
    <button onClick={() => {}}>Toggle</button>
  </AuSelectButton>
  <AuSelectMenu>
    <AuSelectMenuItem onClick={() => {}}>Clicky 1</AuSelectMenuItem>
    <AuSelectMenuItem.Link href='https://example.com'>
      Clicky 2
    </AuSelectMenuItem.Link>
  </AuSelectMenu>
</AuSelect>
```
