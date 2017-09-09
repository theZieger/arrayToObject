# toObject 0.1.0 [![Build Status](https://scrutinizer-ci.com/g/theZieger/toObject/badges/build.png?b=master)](https://scrutinizer-ci.com/g/theZieger/toObject/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/theZieger/toObject/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/theZieger/toObject/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/theZieger/toObject/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/theZieger/toObject/?branch=master)

> Easily convert an array to an object.

## Getting started

There is more than one way to use `toObject` inside your project. I prefer using npm for dependency management.

If you haven't used [npm](http://npmjs.com/) (Node Package manager) before, be sure to check out the [Getting Started](https://docs.npmjs.com/getting-started/what-is-npm) guide, as it explains how to install and use npm. Once you're familiar with that process, you may install the `toObject` module with this command inside your project:

```bash
npm install toObject --save-dev
```

Once the module has been installed, you may integrate that file into your build process (e.g concatenating and uglifying your JS with Grunt or whatever) since the `--save-dev` option is meant for development only.

## toObject(arr, mapBy)

Turns an array of values into a object.

The `mapBy` argument is therefore totally optional.

`mapBy` can be a simple string (referring to an property name of the objects inside `arr`), an array of strings (referring to an property name of the objects inside `arr`) or an function returning a property name which is used to store the reference to the original object of `arr` in the returned object.

When mapBy is a function it will take three arguments:
1. `val` - the current object which is processed
1. `i` - the index of the current object which is processed
1. `arr` - the array given to toObject as first parameter

This function was created because I, as a front-end developer, have to handle a lot of data from API responses. And when I say a lot, I mean a lot.
Sometimes more than 2000 objects inside an array with countless attributes hit our clients and I have to enrich them with even more data from different API requests.
You can imagine looping over those 2000 objects can be tough for the clients device. So I map these array of objects to an associative object which can be accessed a lot faster by simply doing a member access by the ID.
A lot faster and way more performant. That's the story how this function landed inside this repo. For me it's quite handy.

Anyway. Here is a code example how to use the `toObject` function:

```javascript
// make sure toObject.js is already available when this code runs

var states = ['Sachsen', 'Sachsen-Anhalt', 'Berlin', 'Hamburg'];
var statesObject = toObject(states);

console.log(statesObject);

// results in a not very impressive object with key names representing the array indexes:
// {0: 'Sachsen', 1: 'Sachsen-Anhalt', 2: 'Berlin', 3: 'Hamburg'}


// maybe a way better example
// with some of the punniest headlines ever

var news = [
    {
        id: 12001,
        headline: 'Tiger goes limp',
        subHeadline: 'Pulls out after 9 holes'
    },{
        id: 666,
        headline: 'Croc has beef with cow',
        subHeadline: ''
    },{
        id: 1337,
        headline: 'Germans wurst at penalties',
        subHeadline: 'New stats prove England are better from the spot'
    }
];

var newsObject1 = toObject(news, 'id');
var newsObject2 = toObject(news, ['id', 'id']);
var newsObject3 = toObject(news, function(val, i) {
    return val.id + '_' + i;
});

console.log(newsObject1);
// results in:
// {
//     '12001': { id: 12001, headline: 'Tiger goes limp', subHeadline: 'Pulls out after 9 holes' },
//     '666': { id: 666, headline: 'Croc has beef with cow', subHeadline: '' },
//     '1337': { id: 1337, headline: 'Germans wurst at penalties', subHeadline: 'New stats prove England are better from the spot' }

console.log(newsObject2);
// results in:
// {
//     '12001_12001': { id: 12001, headline: 'Tiger goes limp', subHeadline: 'Pulls out after 9 holes' },
//     '666_666': { id: 666, headline: 'Croc has beef with cow', subHeadline: '' },
//     '1337_1337': { id: 1337, headline: 'Germans wurst at penalties', subHeadline: 'New stats prove England are better from the spot' }

console.log(newsObject3);
// results in:
// {
//     '12001_0': { id: 12001, headline: 'Tiger goes limp', subHeadline: 'Pulls out after 9 holes' },
//     '666_1': { id: 666, headline: 'Croc has beef with cow', subHeadline: '' },
//     '1337_2': { id: 1337, headline: 'Germans wurst at penalties', subHeadline: 'New stats prove England are better from the spot' }
// }

```

