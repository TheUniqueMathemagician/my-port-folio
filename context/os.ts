import { create } from "zustand"

type OsStore = {
	hasRanStartupApplications: boolean
	isMobile: boolean
	reset: () => void
	setHasRanStartupApplications: (value: boolean) => void
}

export const useOsStore = create<OsStore>((set) => ({
	hasRanStartupApplications: false,
	isMobile: false,
	reset: () => set(() => ({ hasRanStartupApplications: false })),
	setHasRanStartupApplications: (hasRanStartupApplications) => set(() => ({ hasRanStartupApplications })),
}))
