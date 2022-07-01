import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document"

export default class AppDocument extends Document {
	public static override async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)

		return { ...initialProps }
	}

	public override render() {
		return <Html lang="fr">
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	}
}
