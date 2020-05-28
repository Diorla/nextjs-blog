//@ts-check
import Head from "./head";
import Nav from "./nav";

export default (props) => (
  <div>
    <Head {...props} />
    <Nav />
    <div>{props.children}</div>
  </div>
);
