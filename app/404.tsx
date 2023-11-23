import classes from "@/styles/pages/404.module.scss"
import Link from "next/link"
import type { FunctionComponent } from "react"

const Error404: FunctionComponent = () => <main className={classes["root"]}>
	<p>Oops. The page you requested doesn&apos;t exist</p>
	<Link href="/">Go to home</Link>
</main>

export default Error404
