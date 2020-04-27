## Preamble

Project uses same theming organization as angular material. Once you get one of them, you get both.

## Theming structure
Theme entry point for application: in `src/styles/theming/themes` folder we have main themes declared. Theme is a sass file which name corresponds with `Theme` enum value. Inside this class palettes and application mixins are defined.

Inside theme file, CSS class is defined. Again, class should be named after its enum and file name, containing it. Such class contains next definitions:
- A palette (https://material.angular.io/guide/theming)
- An angular material core mixin
- Project core mixin (defined in `src/styles/theming/theming.scss`)

Project core mixin contains all themable components, provided throughout the project.

## How to create theme
If there's an urgent need to create something besides light or dark theme, then follow next steps:
- Create new theme in `Theme` enum
- Create new theme in `src/styles/theming/themes` and define a new class
- Inside this class define an angular material palette (https://material.angular.io/guide/theming) and include angular material theme and admin-theme mixins inside them like it was in neighbor theme files
- Define a method for user of how he could enable new theme in your app, e.g. a toggle on setting page. Use `ThemeService` to turn specified theme on.
- Define a new theme in `angular.json` in styles as lazy loaded chunk. See other theme chunks to use as an example.

## How to create themable component
Anything that is related to theming, like color, background or such, must be extracted from component styles to theme file. In order to create a themable component:
- Create style in same folder where component is declared. File name should consist of component name + `-theme.scss`, e.g. `category-list-theme.scss`
- Define a mixin inside a file, mixin name should start with project name and proceed with its file name, e.g. `@mixin admin-category-list-theme($theme)`. Note a first argument, that should be a theme
- Define component styles using provided theme. Please use same hierarchy which was defined in component. For example, if component had `.description-label` class inside `.category-list-body`, then same structure should be provided in theme file for styling `description-label`.
- When everything is done, `@include` resulted mixin in `src/styles/theming/theming.scss`'s `admin-theme` mixin

Be adviced to keep themes in touch, if theme becomes deprecated, then it should be properly removed from `admin-theme` mixin.

## Lazy loading
Though theme does not respect lazy loaded components, thus loading all provided project and angular material components themes at once, we could lazy load a single theme. Such mechanism is working automatically when theme was declared by following this guide. 

### How this works?
During build-time, sass theme file is compiled to js webpack bundle via provided option in `angular.json` styles block. While we controlling name of the chunk, we could load it dynamically for example via creating a script element with specified `src`. Upon load, a webpack module containing our theme would be applied automatically.
