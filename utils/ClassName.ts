
type Nullable<T> = T | null | undefined

class ClassNameBuilder {
	private readonly classNames = new Set<string>()

	public constructor(...classNames: Nullable<string>[]) {
		this.add(...classNames)
	}

	public add(...classNames: Nullable<string>[]): ClassNameBuilder {
		for (const className of classNames) if (className) this.classNames.add(className)

		return this
	}

	public remove(...classNames: Nullable<string>[]): ClassNameBuilder {
		for (const className of classNames) if (className) this.classNames.delete(className)

		return this
	}

	public toggle(...classNames: Nullable<string>[]): ClassNameBuilder {
		for (const className of classNames) if (className) this.classNames[this.classNames.has(className) ? "delete" : "add"](className)

		return this
	}

	public build(): string {
		return Array.from(this.classNames).join(" ")
	}
}

export namespace ClassName {
	export const builder = (...classNames: Nullable<string>[]) => new ClassNameBuilder(...classNames)
	export const merge = (...classNames: Nullable<string>[]) => new ClassNameBuilder(...classNames).build()
}
