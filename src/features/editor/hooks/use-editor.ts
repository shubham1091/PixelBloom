import { useCallback } from "react";
import { loadFabric } from "../utils/loadFabric";

interface InitParams {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
}

export const useEditor = () => {
  const init = useCallback(
    async ({ initialCanvas, initialContainer }: InitParams) => {
      try {
        const fabric = await loadFabric();
        if (!fabric) {
          throw new Error("Failed to load Fabric.js");
        }

        fabric.Object.prototype.set({
          cornerColor: "#fff",
          cornerStyle: "circle",
          borderColor: "#3b82f6",
          borderScaleFactor: 1.5,
          transparentCorners: false,
          borderOpacityWhenMoving: 1,
          cornerStrokeColor: "#3b82f6",
        });

        const initialWorkspace = new fabric.Rect({
          width: 900,
          height: 1200,
          name: "clip",
          fill: "white",
          selectable: false,
          hasControls: false,
          shadow: new fabric.Shadow({
            color: "rgba(0,0,0,0.8)", // Fixed missing closing parenthesis
            blur: 5,
          }),
        });

        initialCanvas.setWidth(initialContainer.offsetWidth);
        initialCanvas.setHeight(initialContainer.offsetHeight);
        initialCanvas.add(initialWorkspace);
        initialCanvas.centerObject(initialWorkspace);
        initialCanvas.clipPath = initialWorkspace;

        const test = new fabric.Rect({
            height: 100,
            width: 100,
            fill: "red",
        })
        initialCanvas.add(test);
        initialCanvas.centerObject(test);

        return initialCanvas;
      } catch (error) {
        console.error("Failed to initialize editor:", error);
        throw error;
      }
    },
    []
  );

  return { init };
};