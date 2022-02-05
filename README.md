# @freckle/maybe

Provides a collection of helper functions for operations on maybe types.

## Motivation

This package seeks to recreate idioms common in strongly typed functional programming languages, with heavy influence from the [Data.Maybe Haskell package][Data.Maybe].

## Usage

Operations are used to refine an input from being possibly `null` or `undefined`:

```js
/* @flow */

import {fromJust, fromMaybe, maybe} from '@freckle/maybe'

// Return input from a user, if any:
declare function getUserInput(): ?string

const mUserInput = getUserInput()

// Go from ?string -> string:
const input = fromMaybe(() => 'No input', mUserInput)

// Run a function on ?string with a default:
const capitalized = maybe(() => 'No input to capitalize', capitalize, mUserInput)

// Or produce an error on null | undefined to make future execution more predictable:
const userInput = fromJust(mUserInput, 'No input was given!')
```

Other operations carry the possibly `null` value after applying a function:

```js
import {mmap, mthen} from '@freckle/maybe'

// Return input from a user, if any:
declare function getUserInput(): ?string

// Function that does not handle a null | undefined value:
declare function transform(input: string): string

const mUserInput = getUserInput()

const mTransformed = mmap(transform, mUserInput)
// => null | undefined | transform(mUserInput)

// Alternate form that is more helpful for control flow:
mthen(mTransformed, (transformedUserInput: string) => {
  // Process value
})
```

For dealing with Arrays that may contain `null` or `undefined` elements:

```js
import {catMaybes, mapMaybes} from '@freckle/maybe'

const arr = [
  null,
  'foo',
  undefined,
  'bar'
]

const out = catMaybes(arr)

console.log(out) // => ['foo', 'bar']

const padString = (input: string) => `  ${input}`

const mapped = mapMaybes(arr, padString)

console.log(mapped) // => ['  foo', '  bar']
```

Two operations are tailored to use with React:

```js
/* @flow */
import {mEffect, asHTMLAttributeValue} from '@freckle/maybe'

type Props = {
  myInput: ?string
}

const MyComponent = (props: Props): React.Node => {
  // This prop may be string | undefined | null
  const possibleInput = props.myInput
  
  React.useEffect(() => {  
    mEffect(possibleInput, input =>
      // Call a side effect that does not handle a null value:
      sideEffect(input)
    )
  }, [possibleInput])
  
  // Rendering an element with an attribute from a maybe value:
  const attrObj = {'my-attribute': asHTMLAttributeValue(possibleInput)}
  
  // If input is not a string, <div> is rendered;
  // otherwise: <div my-attribute="..." />
  return <div {...attrObj} />
}
```


[Data.Maybe]: https://hackage.haskell.org/package/base-4.16.0.0/docs/Data-Maybe.html
