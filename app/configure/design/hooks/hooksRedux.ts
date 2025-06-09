// import { setDesignOptions } from "@/config/redux/features/designOptions/designOptionsSlice";
// import { useAppDispatch, useAppSelector } from "@/config/redux/hooks";
// import { useCallback } from "react";

// export function useDesignOptions() {
//     const designOptions = useAppSelector((state: RootState) => state.designOptions);
//     const dispatch = useAppDispatch();
    
//     const setOptions = useCallback((options: DesignOptions) => {
//       dispatch(setDesignOptions(options));
//     }, [dispatch]);
    
//     const updateOption = useCallback((option: Partial<DesignOptions>) => {
//       dispatch(updateDesignOption(option));
//     }, [dispatch]);
    
//     return {
//       designOptions,
//       setDesignOptions: setOptions,
//       updateDesignOption: updateOption
//     };
//   }
  
//   export function useDesignElements() {
//     const designElements = useAppSelector((state: RootState) => state.designElements.elements);
//     const dispatch = useAppDispatch();
    
//     const selectedElement = designElements.find(item => item.isSelected === true) || null;
    
//     const setElements = useCallback((elements: DesignElement[]) => {
//       dispatch(setDesignElements(elements));
//     }, [dispatch]);
    
//     const addElement = useCallback((element: DesignElement) => {
//       dispatch(addDesignElement(element));
//     }, [dispatch]);
    
//     const removeElement = useCallback((id: string) => {
//       dispatch(removeDesignElement(id));
//     }, [dispatch]);
    
//     const updateElement = useCallback((element: DesignElement) => {
//       dispatch(updateDesignElement(element));
//     }, [dispatch]);
    
//     const selectElement = useCallback((id: string) => {
//       dispatch(setSelectDesignElement(id));
//     }, [dispatch]);
    
//     const unselectAll = useCallback(() => {
//       dispatch(unselectAllElements());
//     }, [dispatch]);
    
//     return {
//       designElements,
//       selectedElement,
//       setDesignElements: setElements,
//       createDesignElement: addElement,
//       removeDesignElement: removeElement,
//       updateDesignElement: updateElement,
//       setSelectDesignElement: selectElement,
//       unselectAllElements: unselectAll
//     };
//   }
  
//   export function useDesignUI() {
//     const ui = useAppSelector((state: RootState) => state.ui);
//     const dispatch = useAppDispatch();
    
//     const setDimensions = useCallback((dimensions: ConfiguratorDimensions) => {
//       dispatch(setConfiguratorDimensions(dimensions));
//     }, [dispatch]);
    
//     const setDeviceSidebar = useCallback((isOpen: boolean) => {
//       dispatch(setOpenSelectDeviceSidebar(isOpen));
//     }, [dispatch]);
    
//     const setSurroundingImage = useCallback((isVisible: boolean) => {
//       dispatch(setShowSurrondingImage(isVisible));
//     }, [dispatch]);
    
//     return {
//       configuratorDimensions: ui.configuratorDimensions,
//       openSelectDeviceSidebar: ui.openSelectDeviceSidebar,
//       showSurrondingImage: ui.showSurrondingImage,
//       setConfiguratorDimensions: setDimensions,
//       setOpenSelectDeviceSidebar: setDeviceSidebar,
//       setShowSurrondingImage: setSurroundingImage
//     };
//   }
  
//   // Hook for stage operations
//   export function useStageOperations() {
//     const stageRef = useRef<any>(null);
//     const stageContainerRef = useRef<HTMLDivElement>(null);
//     const phoneContainerRef = useRef<any>(null);
//     const dispatch = useAppDispatch();
//     const { configuratorDimensions } = useDesignUI();
    
//     const konvaPhoneLayerRefHandler = useCallback((layerNode: any) => {
//       if (layerNode) {
//         const sourceCanvas = layerNode.canvas._canvas;
//         phoneContainerRef.current = sourceCanvas;
//       } else {
//         phoneContainerRef.current = undefined;
//       }
//     }, []);
    
//     const getCornerRadiusFromPercentages = useCallback((width: number, xPercent: number): [number, number, number, number] => {
//       const radius = width * (xPercent / 100);
//       return [radius, radius, radius, radius];
//     }, []);
    
//     const updateStageDimensions = useCallback(() => {
//       const container = stageContainerRef.current;
//       if (!container) return;
  
//       const { width, height, top, left } = container.getBoundingClientRect();
//       const { phone } = configuratorDimensions;
  
//       const MAX_PHONE_WIDTH = 300;
//       const MAX_PHONE_HEIGHT = 600;
//       const aspectRatio = phone.width / phone.height;
  
//       // Calcular tamaño base (75% del contenedor)
//       let phoneWidth = width * 0.75;
//       let phoneHeight = height * 0.75;
  
//       // Ajustar a relación de aspecto
//       const containerRatio = phoneWidth / phoneHeight;
//       if (containerRatio > aspectRatio) {
//         phoneWidth = phoneHeight * aspectRatio;
//       } else {
//         phoneHeight = phoneWidth / aspectRatio;
//       }
  
//       // Limitar por dimensiones máximas
//       if (phoneWidth > MAX_PHONE_WIDTH) {
//         phoneWidth = MAX_PHONE_WIDTH;
//         phoneHeight = phoneWidth / aspectRatio;
//       }
//       if (phoneHeight > MAX_PHONE_HEIGHT) {
//         phoneHeight = MAX_PHONE_HEIGHT;
//         phoneWidth = phoneHeight * aspectRatio;
//       }
  
//       const borderRadius = getCornerRadiusFromPercentages(phoneWidth, 16);
  
//       dispatch(setConfiguratorDimensions({
//         container: { width, height, x: top, y: left },
//         phone: {
//           width: phoneWidth,
//           height: phoneHeight,
//           x: (width - phoneWidth) / 2,
//           y: (height - phoneHeight) / 2,
//           borderRadius,
//         },
//       } as any));
//     }, [dispatch, configuratorDimensions, getCornerRadiusFromPercentages]);
    
//     const getStageImage = useCallback(async () => {
//       if (!stageRef.current) return;
    
//       const stage = stageRef.current;
//       const { phone } = configuratorDimensions;
    
//       // Hide all Transformer nodes before exporting
//       const transformers = stage.find('Transformer');
//       transformers.forEach((transformer: any) => transformer.hide());
//       stage.draw();
    
//       phoneContainerRef.current.hide();
      
//       // Export only the phone area with the specified options
//       const dataURL = await stage.toBlob({
//         x: phone.x,
//         y: phone.y,
//         width: phone.width,
//         height: phone.height,
//         pixelRatio: 7,
//       });
      
//       phoneContainerRef.current.show();
  
//       // Restore the visibility of the Transformer nodes
//       transformers.forEach((transformer: any) => transformer.show());
//       stage.draw();
    
//       return dataURL;
//     }, [configuratorDimensions]);
    
//     // Set up resize handler
//     useEffect(() => {
//       const handleResize = () => {
//         updateStageDimensions();
//       };
  
//       window.addEventListener('resize', handleResize);
      
//       // Initial update
//       updateStageDimensions();
      
//       return () => {
//         window.removeEventListener('resize', handleResize);
//       };
//     }, [updateStageDimensions]);
    
//     return {
//       stageRef,
//       stageContainerRef,
//       phoneContainerRef,
//       konvaPhoneLayerRefHandler,
//       updateStageDimensions,
//       getStageImage
//     };
//   }
  