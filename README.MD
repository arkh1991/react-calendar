# react-universal-calendar

---

[![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/react-universal-calendar.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-universal-calendar

## React universal calendar

Fully customizable calendar

## Install



```js
npm i react-universal-calendar

// or if using yarn
yarn add react-universal-calendar
```
## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import UniversalCalendar from "react-universal-calendar"

const Calendar = () =>
    <UniversalCalendar renderHeader={() => <div>Custom calendar</div>}
                       renderDate={(date) => <div>{date.format("D")}</div>}/>

ReactDOM.render(<Calendar/>, document.getElementById('root'));

```

## Props

### initDate

Type: `moment`

Month of date determines start page of calendar.
### renderHeader

Type: `func`

Function for render header of calendar.

### renderSwitchMonth

Type: `function`

Function for render navigation component.
It has 3 arguments.
* date - moment of current month
* swipeLeft - function for switching to previous month
* swipeRight - function for switching to next month



```jsx
renderSwitchMonth: (date, swipeLeft, swipeRight) => {/*  your component   */}
```

### dateAreaStyle

Type: `object`

Additional styles applied for calendar dates container.



### renderDayOfWeekName

Type: `function`

Function for render cell with week day name.
It has 1 argument:
* dayNum - serial number of the day of the week.

```jsx
renderDayOfWeekName: (dayNum) => {/*  your component   */}
```

### cellStyle

Type: `object`

Additional styles applied for date container.

### renderDate

Type: `function`

Function for render cell with date.
It has 2 argument:
* date - moment of current date.
* currentMonth - moment of current month.

```jsx
 renderDate: (date, currentMonth) => ({/*  your component   */}
```

## License

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](/LICENSE)

