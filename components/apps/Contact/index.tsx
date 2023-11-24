import { ApplicationId, RunningApplicationComponent } from "@/types/Application"
import { ColorScheme } from "@/types/ColorScheme"
import { useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { FormEvent, MouseEventHandler, memo, useCallback, useState } from "react"
import { IoLocationSharp } from "react-icons/io5"
import { MdMail, MdPhone } from "react-icons/md"
import Paper from "../../ui/Paper"
import Typography from "../../ui/Typography"
import Button from "../../ui/input/Button"
import Text from "../../ui/input/Text"
import TextArea from "../../ui/input/TextArea"
import Time from "./Elements/Time"
import classes from "./index.module.scss"

const SharpIcon = memo(IoLocationSharp)
const MailIcon = memo(MdMail)
const PhoneIcon = memo(MdPhone)

const Contact: RunningApplicationComponent = () => {
	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)

	const [loading, setLoading] = useState(false)
	const [resendDate, setResendDate] = useState(new Date(parseInt(localStorage.getItem("contact-resend-date") ?? "0", 10)))

	const runApplication = useApplicationsStore((store) => store.runApplication)

	const handleMapsClick: (MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>) = useCallback((e) => {
		e.preventDefault()

		runApplication(ApplicationId.Maps, {})
	}, [runApplication])

	const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (loading) return

		setLoading(true)

		const headers = new Headers()
		const data = new FormData(event.target as HTMLFormElement)
		const body = JSON.stringify(Object.fromEntries(data.entries()))

		headers.append("Content-Type", "application/json")

		try {
			const response = await fetch("/api/contact", { body, headers, method: "post" })

			if (response.status === 200 || response.status === 429) {
				const text = await response.text()

				localStorage.setItem("contact-resend-date", text)

				setResendDate(new Date(parseInt(text, 10)))
			}
		} catch (_) {
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}, [loading])

	return <div className={classes["root"]}>
		<div className={classes["container"]}>
			<Typography variant="h4">Me contacter</Typography>
			<Paper outlined={contrast} spaced blur background="paper">
				<div className={classes["grid"]}>
					<Typography variant="body" noSelect>
						Email
					</Typography>
					<Button
						align="start"
						focusable
						outlined
						size="md"
						startIcon
						to="mailto: tamburrini.yannick@gmail.com"
						variant="filled"
					>
						<MailIcon></MailIcon>
						<Typography variant="body" noWrap>
							tamburrini.yannick@gmail.com
						</Typography>
					</Button>
					<Typography variant="body" noSelect>
						Téléphone
					</Typography>
					<Button
						align="start"
						focusable
						outlined
						size="md"
						startIcon
						to="tel:+32 498 62 77 16"
						variant="filled"
					>
						<PhoneIcon></PhoneIcon>
						<Typography variant="body" noWrap>
							+32 498 62 77 16
						</Typography>
					</Button>
					<Typography variant="body" noSelect>
						Adresse
					</Typography>
					<Button
						align="start"
						focusable
						onClick={handleMapsClick}
						outlined
						size="md"
						startIcon
						to="https://www.google.com/maps/place/Avenue+des+Lanciers+45,+4900+Spa/@50.4888358,5.8542398,17z/data=!3m1!4b1!4m5!3m4!1s0x47c0617fcf8a2513:0xe0e509238ab82a8e!8m2!3d50.4888324!4d5.8564285"
						variant="filled"
					>
						<SharpIcon></SharpIcon>
						<Typography variant="body" noWrap>
							Avenue des Lanciers 45, 4900 Spa, Liège Belgique
						</Typography>
					</Button>
				</div>
			</Paper>
			<Typography variant="h4">M&apos;envoyer un message</Typography>
			<Paper outlined={contrast} spaced blur background="paper">
				<form action="" onSubmit={handleSubmit}>
					<Text
						disabled={loading}
						fullWidth
						label="Nom*"
						name="lastname"
						required
					></Text>
					<Text
						disabled={loading}
						fullWidth
						label="Prénom*"
						name="firstname"
						required
					></Text>
					<Text
						disabled={loading}
						fullWidth
						label="Organisation*"
						name="org"
						required
					></Text>
					<Text
						disabled={loading}
						fullWidth
						label="Email*"
						name="email"
						required
						type="email"
					></Text>
					<Text
						disabled={loading}
						fullWidth
						label="Téléphone"
						name="tel"
						type="tel"
					></Text>
					<TextArea
						disabled={loading}
						className={classes["text-area"]}
						fullWidth
						label="Message*"
						name="msg"
						required
						vertical
					></TextArea>
					<Button
						disabled={loading || resendDate.getTime() > 0}
						ripple
						focusable
						color="primary"
						outlined
						size="md"
						variant="filled"
						loading={loading}
					>
						{resendDate.getTime() > 0 ? (
							<Time
								date={resendDate}
								onAvailable={() => setResendDate(new Date(0))}
							></Time>
						) : (
							"Envoyer"
						)}
					</Button>
					<Typography variant="body">( * champs requis )</Typography>
				</form>
			</Paper>
		</div>
	</div>
}

export default memo(Contact)
