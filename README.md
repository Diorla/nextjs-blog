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
