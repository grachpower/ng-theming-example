# Contribution guide

## Styles

### Structure

#### Logical groups structure

Structure for this style guide is based on SMACSS methodology. Also this guide contains elements of BEM and OOCSS.

Styles are presented by this logical groups:
* **Modules** – are presented by components (do not have a prefix, are a namespace for their child rules, ex: `vertical-menu`)
* **Typography** – all styles which correspond to fonts. Like: sizes.
* **Base** – css reset (normalize) and general look for html elements (buttons, links). Use here in selector and only tag selectors (ex: `button`)
* **Layout** – layout patterns which can be used across components, variables for common spacings (prefixed with `l-`, ex: `l-two-columns`)
* **Accessibility** (prefixed with `ally-`, ex: `ally-visually-hidden`)
* **Theme** - theme specific css rules (ex: colors). Based on `Material`. Take into consideration that there can be more than two themes - light, dark and theme for colorblind.

#### Module styles

* Use only semantic class selectors (ex: `.horizontal-menu`, `.page-title`)
* Use maximum `3` depth for selectors (media and pseudo class selector does not count)
* Use `is-` prefix for states which can be changed by user actions. Example: `.is-active`
```scss
.cart-item {
  &__title {
    &.is-active {
    
    }
  }
}
```
* Use **submodules** if part of component can be reused but there is no need to extract it to separate component currently
* To customize styles from external components with `Encapsulation.None` (for example with name `.external-module`) place `external-module.overrides` near component which needs this overrides. Prefix overrides with component's selector and include this overrides into global styles file

#### Colors

Keep in mind that colors can change and do no bind to current color names (ex: `$white`, `$dark-gray`).
Use names which describe color purpose: `$highlight`, `$accent`, `$background-primary`, `$table-border`, `$table-background`), which can be nested from variables that describe particular colors.

### Code style

DO NOT:
* Nest rules with ancestor like `&-link`. Except first order block selectors in `Encapsulation.None` components. (it's hard to find such selectors while debugging). Example: 
```scss
.vertical-menu { 
    &__title {
    
    }
}
```

DO:
* Prefer `@extend` over mixins to add common styling with no parameters (mixins cause code duplicates in resulting css)
* Use [`!default`](https://sass-lang.com/documentation/variables#default-values) for rules which can be customized in `Encapsulation.None` components ([see bootstrap variables for examples](https://github.com/twbs/bootstrap/blob/master/scss/_variables.scss))
* Keep in mind that `Encapsulation.None` components can affect all elements on the page. Style such components under their module namespace (ex: `.page-title &__lead`).
* use _ to separate elements in block `.list_header` to prevent styles to fall through current component down or just append to original name `.list`, `.list-title`, `.list-header`


TODO:
* modifiers or state variants - 15deg rotation, 20deg rotation for some elements
* utilities (used for clearfixes, some layout styles, common color patters for background for example) maybe we don't need such entity as the same can be done by mixins/extends or be picked from existing group like layout
