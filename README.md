# @selfage/closest_locale_finder

## Install

`npm install @selfage/closest_locale_finder`

## Overview

Written in TypeScript and compiled to ES6 with inline source map & source. See [@selfage/tsconfig](https://www.npmjs.com/package/@selfage/tsconfig) for full compiler options. Provides helper functions to find the closest locale out of a list of locales you want to support.

Lookup algorithm is based on [lookup-closest-locale](https://github.com/format-message/format-message/blob/v6.2.3/packages/lookup-closest-locale/index.js).

## Find from a map of localized texts

```TypeScript
type Delimiter = "-" | "_";
function findClosestLocalizedText<T>(targetLocales: Array<string> /* From most preferred to least preferred. */, localizedTexts: Map<string, T>, defaultText: T, delimiter: Delimiter = '-'): T;
```

```TypeScript
import { findClosestLocalizedText } from '@selfage/closest_locale_finder';

let text = findClosestLocalizedText(
  [navigator.language],
  new Map([
    ['en-US', {'welcome': 'Hello'}],
    ['zh-CN', {'welcome': '欢迎'}]
  ]),
  {'welcome': 'Hello'});
console.log(text.welcome);
```

## Find from a set of available locales

```TypeScript
type Delimiter = "-" | "_";
function findClosestLocale(targetLocales: Array<string> /* From most preferred to least preferred. */, availableLocales: Set<string>, defaultLocale: string, delimiter: Delimiter  = '-'): string;
```

```TypeScript
import { findClosestLocale } from '@selfage/closest_locale_finder';

let locale = findClosestLocale(
  [navigator.language],
  new Set(['en-US', 'zh-CN']),
  'en-US');
console.log(locale);
```

## Customize finding

```TypeScript
type Delimiter = "-" | "_";
function forEachLocaleCandidate<T>(targetLocales: Array<string> /* From most preferred to least preferred. */, tryMatch: (localeCandidate: string) => {
    matched: boolean;
    res: T;
}, defaultValue: T, delimiter: Delimiter = '-'): T;
```

`forEachLocaleCandidate` is used internally by both `findClosestLocalizedText` and `findClosestLocale`, which match `localeCandidate` from the map and set respectively.
