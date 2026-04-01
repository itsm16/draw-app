import { create } from "zustand";

const useToolStore = create((set) => ({
    tool : "cursor",
    setTool : (tool: string) => set({ tool })
}))

export default useToolStore