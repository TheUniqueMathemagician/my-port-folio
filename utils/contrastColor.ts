const RED_PERCEPTION_RATIO = 0.3
const GREEN_PERCEPTION_RATIO = 0.6
const BLUE_PERCEPTION_RATIO = 0.1

const PERCEPTION_THRESHOLD = 144

const RED_START_INDEX = 0
const RED_END_INDEX = 2

const GREEN_START_INDEX = RED_END_INDEX
const GREEN_END_INDEX = 4

const BLUE_START_INDEX = GREEN_END_INDEX
const BLUE_END_INDEX = 6

const contrastColor = (hexDigits: string) => {
	hexDigits = hexDigits.substring(1)

	const red = parseInt(hexDigits.slice(RED_START_INDEX, RED_END_INDEX), 16)
	const green = parseInt(hexDigits.slice(GREEN_START_INDEX, GREEN_END_INDEX), 16)
	const blue = parseInt(hexDigits.slice(BLUE_START_INDEX, BLUE_END_INDEX), 16)

	return red * RED_PERCEPTION_RATIO + green * GREEN_PERCEPTION_RATIO + blue * BLUE_PERCEPTION_RATIO > PERCEPTION_THRESHOLD ? "#000000" : "#ffffff"
}

export default contrastColor
