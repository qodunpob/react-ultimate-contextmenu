# react-ultimate-contextmenu
React-component allows you to replace the browser context menu with your own

[Demo](https://qodunpob.github.io/examples/react-ultimate-contextmenu/)
([See code](https://github.com/qodunpob/react-ultimate-contextmenu/tree/master/example))

## Installation
By npm
```console
$ npm install react-ultimate-contextmenu
```
By Yarn
```console
$ yarn add react-ultimate-contextmenu
```

## Usage
This simple example demonstrate different cases:
```jsx
import React, { Fragment } from 'react'
import { FaPhoneSquare } from 'react-icons/fa'
import {
  MenuProvider,
  Menu,
  MenuItem,
  Submenu,
  MenuFilter,
  Separator
} from 'react-ultimate-contextmenu'

const MyAwesomeComponent = ({ doSomethingAwesome, supportList, callSupport }) =>
<MenuProvider>
  This is my awesome component
  <Menu>
    <MenuItem href='https://my-awesome-site.com' target='_blank'>Go to my awesome site!<MenuItem>
    <MenuItem onClick={doSomethingAwesome}>Do something awesome!<MenuItem>
    {supportList.length && <Fragment>
      <Separator />
      <Submenu icon={<FaPhoneSquare />} label='Support...'>
        <MenuFilter available={supportList.length > 10}></MenuFilter>
        {supportList.map((item, index) =>
          <MenuItem key={index} onClick={() => { callSupport(index) }}>
            Call support {index + 1}
          </MenuItem>
        )}
      </Submenu>
    </Fragment>}
  </Menu>
</MenuProvider>

export default MyAwesomeComponent
```

### MenuProvider
This component define a context menu swap scope. It catches the `contextmenu` event and displays the child **Menu** component.

### Menu
This is the main container for context menu elements.

### MenuItem
Single menu item like button or link. By default this is button, but if you define prop `href` it will be a link and you can define all available link's props.

#### Properties:

* **leftIcon** - (react-element) icon to the left of the label
* **rightIcon** - (react-element) icon to the right of the label
* **disabled** - (boolean) disabled state
* **href** - (string) link address
* **target** - (string) target specifies where to open the link
* **onClick** - (function) handler of `click` event

### Submenu
Container for submenu elements.

#### Properties:

* **icon** - (react-element) icon to the left of the label of the parent submenu item
* **label** - (string) label of the parent submenu item
* **disabled** - (boolean) disabled state of parent submenu item

### MenuFilter:
Filter of menu items

#### Properties:

* **available** - (boolean) filter availability flag

### Separator
Dividing line between menu items.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
