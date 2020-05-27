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
