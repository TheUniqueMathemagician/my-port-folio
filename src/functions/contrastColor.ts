const contrastColor = (hex: string) => {
	hex = hex.substring(1)
	const r = parseInt(hex.slice(0, 2), 16)
	const g = parseInt(hex.slice(2, 4), 16)
	const b = parseInt(hex.slice(4, 6), 16)

	return r * 0.3 + g * 0.6 + b * 0.1 > 144 ? "#000000" : "#ffffff"
}

export default contrastColor
