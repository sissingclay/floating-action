# Float action

This is a web component that will clear value from an input field.

## Demo

[Demo](http://sissingclay.github.io/input-clearout/)

## Install
Install the component using NPM:

```
$ npm i float-action --save
```

## Dependencies

Custom element polyfill

```
https://github.com/WebReflection/document-register-element

```

classList polyfill

```
https://www.npmjs.com/package/classlist

```

## Usage

Add Custom Element Script:

```
<script src="../dist/float-action.js"></script>
```

Start using it!

```
<cs-floatingaction button=".c-floating__button" container=".c-floating__nav" toggle="c-floating__nav--show" move-element="c-floating--offbottom" to-bottom="10">

    <nav class="c-floating__nav">
        <a href="" class="c-floating__link">
            <span class="glyphicon glyphicon-eye-open"></span> View reminders
        </a>
        <a href="" class="c-floating__link">
            <span class="glyphicon glyphicon-calendar"></span> Create reminder
        </a>
    </nav>

    <a href="" class="c-floating__button">
        <i class="material-icons md-36 c-floating__icon">add</i>
    </a>

</cs-floatingaction>
```

##Options

| Attribute      | Options          | Default                                     | Description                                                                                              |
| ---            | ---              | ---                                         | ---                                                                                                      |
| button         | Css Selector     | null                                        | This is required. Its the class on the icon that is allow aways visible.                                 |
| container      | Css Selector     | null                                        | This is required. Its the container that is hidden containing the links                                  |
| toggle         | String           | null                                        | This is required. This is the name of the class that needs to be added to display the container          |
| move-element   | String           | null                                        | If required to move the custom element of the bottom of the window. This is the class that will be added or remove when scroll off the bottom on the window  |
| to-bottom      | String           | 0                                           | How far from the bottom of the window should the 'move-element' class be added or removed  |