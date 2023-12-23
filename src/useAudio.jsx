import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
    subscribeWithSelector((set) => {
        return {
            isPlaying: false,
            startPlaying: () => {
                set((state) => {
                    if (state.isPlaying === false) return { isPlaying: true };
                });
            },
            pausePlaying: () => {
                set((state) => {
                    if (state.isPlaying === true) return { isPlaying: false };
                });
            },
        };
    })
);
