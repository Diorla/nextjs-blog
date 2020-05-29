# Pages

So the first thing we are going to is to see how

`<Link>` is the equivalent of `<a>` tag, and it's used to navigate through different webpages. Unlike `<a>` tag, it doesn't load a new `html` file, but simply render the page on pre-existing html file.

Note, if you want to link to an external site e.g. `https://www.google.com`, you should use `<a>` tag.

All the relative paths corresponds to `.js` files inside `/pages` e.g.

- `/pages/post.js` = `href="/post"`
- `/pages/about.js` = `href="/about"`
  The exception is `/pages/index.js` which corresponds to `href=/`

## <Link>

```jsx
<Link href="about" as="Page info" replace>About</Link>
<Link href={{pathname: "/learn", query: {section: "Developer"}}} scroll={false}>Learn more</Link>
<Link href={props.href} passHref shallow>
  <a href={props.mylink}>Extra mile</a>
</Link>
```

- `href`: The path, corresponds to `.js` file in `/pages`
  - It may also be an object
- `as`: if the href is `hello.js`, the top of the bar will be `localhost:3000/hello` or `http://www.mypage.com/hello`. You may change this with the `as` attribute
- `passHref`: default is false. The `Link` tag wraps around another `<a>` tag and you want the `<a>` tag to handle the `href`.
- `prefetch`: default is true
- `replace`: default is false
- `scroll`: default is true
- `shallow`: default is false. Update path without re-running `props` like `getStaticProps`.

# Managing assets

Static assets like images, robot.txt should be placed inside `/public`. The assets inside `/public` is treated as a root file, no need to use relative path. For example `/public/kermit.jpg`

```jsx
// pages/index.js
<img src="kermit.jpg" alt="A frog goes shopping" />
```

Be careful when naming to avoid clashing e.g.

`/public/about.jpb`

# metadata

A typical html file will look like this

```html
<html>
  <head>
    <!-- Here is where all the meta data, styles, title etc lies. -->
  </head>
  <body></body>
</html>
```

Normally, we update the content of the body when using react. Next allows us to update/populate the `<head>` tag.

# CSS

Along with `style jsx`, it also support `CSS Modules`.

## CSS Modules

Create a normal `.css` file. The file must have the extension `*.module.css` e.g.

```css
/* Layout.module.css */
.link {
  color: cornflowerblue;
  font-size: 14px;
  text-decoration: none;
}
```

Now you can import it into the file that you want to use it. Note, it should be relative path based on file structure

```jsx
import styles from "./components/Layout.module.css";

<Link className={styles.link}>
  <span>Hello</span>
</Link>;
```

## Global styles

`style jsx` and `css modules` target only specific elements and do not pollute the global space. If you want to apply a `.css` file globally.

- First, create a file `_app.js` inside `/pages`
- Import `.css` file into `_app.js` file.
- Any css file that is imported into `_app.js` will be applied to all the pages.

# Pre-rendering

Generally, Nextjs pre-renders every page, this means an html file is generated for each page at the server side, which in turn prevent too much js work at the client side and SEO. This means unlike normal reactjs, even if you disable your js, the page will still load with minimal functionalities.
So if/when the page is loaded, other necessary js code is applied to make it fully interactive.
There are two types of rendering, `Static Generation` and `Sever-side Rendering`.

## Comparison

This means the html file is generated when the page is built ie. after `npm run build`. Any request made by the client(s) will fetch the same page.
Server-side rendering on the other hand, changes depending on who is making the request. So the pre-rendering will take into account current circumstances.
Note, different pages may implement different types of pre-rendering depending on your demands. e.g. welcome page and about page may have static generation while user dashboard may have server side rendering.

## Static Generation

- Marketing pages and product listing
- Blog post
- Help and documentation etc.
  All the pages without data like the ones we've been creating are static by nature.
  If we want to create a static page that uses data e.g. load external image, we use `getStaticProps`

### getStaticProps

It will only run on the server-side and none of its code will be sent to the browser, only the products will be sent. This means you can make direct queries into database, fetch data from other pages etc without an overhead on the browser side or security concerns.
Note, during development, it runs on every request and only one is allowed per page.

## Client rendering

Now, even if a page requires unique data on each request, it may still better to use static generation. This approach works by rendering a basic structure and then filling it up with data afterwards e.g user profile.
This is not new and has been implemented in cases like `AJAX` or `jquery.get()` etc, and the good news is that it should hurt your SEO because it's not relevant to the part of your page that search engines indexes.

### SWR

A library by `nextjs` team for fetching data. Perhaps, it will work better in nextjs than other library like `node-fetch`. One of the benefit of `swr` is that it first return a stale data from cache before sending fetch request and then updating the data again, making sure users don't have to wait.

```js
/**
 * {string} source - points to the source of the data
 * {function} fetcher - an async function that tells which manner by which swr should get the data.
 * {object} options? - provide extra information.
* /
`swr(source, fetcher)`
```

```jsx
import { Suspense } from "react";
import useSWR from "swr";

const Profile = () => {
  // uses js fetch to get the data
  const { data, error } = useSWR("/api/user", fetch, { suspense: true });

  if (error) return <div>Failed to load page</div>;
  return <div>Welcome {data.name}</div>;
};

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </Suspense>
  );
};
```

By default, `swr` assumes `REST` api, but we can also use other mathod like `graphql`

```jsx
import { request } from "graphql-request";
import useSWR from "swr";

const API = "https://api.graph.cool/simple/v1/movies";

const MovieActors = () => {
  const { data, error } = useSWR(
    `{
      Movie(title: "Inception") {
        actors {
          id
          name
        }
      }
    }`,
    (query) => request(API, query)
  );
};

if (error) return <div>Failed to load page</div>;
if (!data) return <div>Loading...</div>;
return data.actors.map((actor) => <li key={actor.id}>{actor.name}</li>);
```

There are other functions from `swr` like `SWRConfig`, `mutate`

## Server-side rendering

## YAML

The `.md` files inside `/posts` will be processed into html by using `gray-matter`, a YAML Front Matter library.

# Dynamic routes

Dynamic pages are created using square brackets, e.g. `/pages/posts/[id].js`. Hence, `id` is not predetermined can could be anything.

Note, it's also possible to nest our dynamic routes e.g.

`/pages/posts/[...id].js` (with three dots) would match

- `/posts/hello`
- `/posts/hello/world`
- `/posts/hello/world/next`
  But the return statement like the one under `/lib/posts.js` will be slightly different

```js
return {
  params: {
    //id: fileName.replace(/\.md$/, ""),
    id: ['a', 'b', 'c']
  },
};
```
where `a/b/c` is a real filepath

## Error page
To customise your own error page, just create `/pages/404.js`.

# Api routes
It is possible to create an endpoint on your webpage, that merely sends data, so that you and other websites can interact with it.

This is similar to the way accuweather sends weather report or imdb sends movie information.

Note, if you want to fetch data from this `API`, don't use `getStaticProps` or  `getStaticPaths` because they only work on the server and will never work on the client side. And since fetching data via `API` is done at the client side, it's counter productive.

Like any page, api routes may be dynamic as well

## Possible uses
- Form validation
- Intermediate between webpage and database
- Preview mode