import Link from "next/link"
import classes from "../styles/pages/404.module.scss"
import { Page } from "../types/Page"

const Error404: Page = () => <main className={classes["root"]}>
	<p>Oops. The page you requested doesn&apos;t exist</p>
	<Link href="/">Go to home</Link>
</main>

export default Error404
