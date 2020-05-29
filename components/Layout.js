//@ts-check
import Head from "./head";
import Nav from "./nav";
// @ts-ignore
import layoutStyles from "./../styles/layout.module.css"

export default (props) => (
  <div>
    <Head {...props} />
    <Nav />
    <div className={layoutStyles.layout}>{props.children}</div>
  </div>
);
