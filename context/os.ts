import { createWithEqualityFn as createStore } from "zustand/traditional"

type OsStore = {
	hasRanStartupApplications: boolean
	isMobile: boolean
	reset: () => void
	setHasRanStartupApplications: (value: boolean) => void
}

export const useOsStore = createStore<OsStore>((set) => ({
	hasRanStartupApplications: false,
	isMobile: false,
	reset: () => set(() => ({ hasRanStartupApplications: false })),
	setHasRanStartupApplications: (hasRanStartupApplications) => set(() => ({ hasRanStartupApplications })),
}))
