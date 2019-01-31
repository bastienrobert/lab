# Lab

Test things.

## Install and deploy

Fork and edit the package.json homepage to set the deploy URL.

## How to use?

You can add everything you want in `src/lab`. Each experience should be in a separate folder.

Don't forget to add your experience to `src/app/routes.js` if you want to access through a route.

## Routes

Simple example:

```js
// in top of document
import Hello from 'lab/Hello'

// in routes array
{
  path: '/hello',
  component: Hello,
  name: 'This is the title',
  description: 'A small description',
  date: '31/01/2019',
  wip: false // Or true if it's work in progress
}
```

Well, it's ok!

## Routes events

Some actions can be triggered on route change.

In your experience, you can add 2 methods:

- **componentWillMount**: when the route is coming
- **componentWillUnmount**: when the route is leaving

## How to deploy?

Install `gh-pages` with `npm i -g gh-pages`.

Then `yarn deploy`. It's online! 🙃

## Contributions

You know how to fork and create a PR ? Be free to contribute 😘
