import { fabric } from "fabric";

export const loadFabric = async (): Promise<typeof fabric | null> => {
  try {
    if (typeof window !== "undefined") {
      const fabricModule = await import("fabric");
      return fabricModule.fabric;
    }
    return null;
  } catch (error) {
    console.error("Failed to load Fabric.js:", error);
    return null;
  }
};