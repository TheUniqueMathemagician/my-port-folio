import {NextPage} from "next";
import Link from "next/link";
import classes from "../styles/pages/404.module.scss";

const Error404: NextPage = () => <main className={classes["root"]}>
  <p>Oops. The page you requested doesn&apos;t exist</p>
  <Link href="/"></Link>
</main>;

export default Error404;
