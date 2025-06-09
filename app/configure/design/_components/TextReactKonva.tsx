// import React, { useRef, useEffect, useCallback, useState } from 'react';
// import { Text as KonvaText, Transformer, Circle, Line } from 'react-konva';

// const VectorTransformableText = ({ shapeProps, isSelected, onSelect, onChange }) => {
//   const textRef = useRef(null);
//   const trRef = useRef(null);
  
//   // Estado para determinar si el texto está curvado
//   const [isCurved, setIsCurved] = useState(false);
  
//   // Estado para los puntos de vector (posiciones relativas al texto)
//   const [vectorPoints, setVectorPoints] = useState({
//     control1: { x: -shapeProps.width / 4, y: -50 },
//     control2: { x: shapeProps.width / 4, y: -50 }
//   });
  
//   // Estado para los caracteres individuales cuando el texto está curvado
//   const [textChars, setTextChars] = useState([]);
//   const [hoveredAnchor, setHoveredAnchor] = useState(null);

//   // Función para calcular el tamaño de fuente óptimo utilizando el canvas de Konva
//   const calculateOptimalFontSize = useCallback(() => {
//     if (!textRef.current || !shapeProps.text) return shapeProps.fontSize;

//     // Obtenemos el contexto del canvas existente a través de la referencia a Konva
//     const context = textRef.current.getLayer().getCanvas()._canvas.getContext('2d');
    
//     // Búsqueda binaria para el tamaño óptimo
//     let min = 1;
//     let max = 500;
//     let best = min;
    
//     while (min <= max) {
//       const mid = Math.floor((min + max) / 2);
//       context.font = `${mid}px ${shapeProps.fontFamily || 'Arial'}`;
//       const metrics = context.measureText(shapeProps.text);
      
//       // Cálculo aproximado de altura (1.2 veces el tamaño de fuente)
//       const textHeight = mid * 1.2;
      
//       if (metrics.width <= shapeProps.width && textHeight <= shapeProps.height) {
//         best = mid;
//         min = mid + 1;
//       } else {
//         max = mid - 1;
//       }
//     }
    
//     // Aplicamos un pequeño margen de seguridad (95%)
//     return Math.floor(best * 0.95);
//   }, [shapeProps.text, shapeProps.width, shapeProps.height, shapeProps.fontFamily]);

//   // Efecto para recalcular el tamaño cuando cambian las dimensiones o el texto
//   useEffect(() => {
//     if (textRef.current && !isCurved) {
//       const newFontSize = calculateOptimalFontSize();
//       if (newFontSize !== shapeProps.fontSize) {
//         onChange({ ...shapeProps, fontSize: newFontSize });
//       }
//     }
//   }, [shapeProps.text, shapeProps.width, shapeProps.height, shapeProps.fontFamily, calculateOptimalFontSize, onChange, isCurved]);

//   // Vincula el Transformer al nodo de texto
//   useEffect(() => {
//     if (isSelected && trRef.current && textRef.current) {
//       trRef.current.nodes([textRef.current]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [isSelected]);

//   // Inicializar los puntos de vector cuando cambia el tamaño del texto
//   useEffect(() => {
//     setVectorPoints({
//       control1: { x: -shapeProps.width / 4, y: -50 },
//       control2: { x: shapeProps.width / 4, y: -50 }
//     });
//   }, [shapeProps.width]);

//   // Calcular posiciones de caracteres a lo largo de la curva
//   useEffect(() => {
//     // Verificar si hay suficiente curvatura para activar el modo curvo
//     const hasSignificantCurve = Math.abs(vectorPoints.control1.y) > 5 || Math.abs(vectorPoints.control2.y) > 5;
//     setIsCurved(hasSignificantCurve);
    
//     if (hasSignificantCurve && shapeProps.text) {
//       const chars = [];
//       const letterCount = shapeProps.text.length;
      
//       // Calcular puntos absolutos para la curva
//       const startX = shapeProps.x;
//       const startY = shapeProps.y + shapeProps.height / 2;
//       const endX = shapeProps.x + shapeProps.width;
//       const endY = startY;
      
//       const control1X = startX + shapeProps.width / 2 + vectorPoints.control1.x;
//       const control1Y = startY + vectorPoints.control1.y;
      
//       const control2X = startX + shapeProps.width / 2 + vectorPoints.control2.x;
//       const control2Y = startY + vectorPoints.control2.y;
      
//       for (let i = 0; i < letterCount; i++) {
//         const t = i / (letterCount - 1 || 1);
        
//         // Fórmula para punto en curva cúbica de Bezier
//         const x = Math.pow(1-t, 3) * startX + 
//                   3 * Math.pow(1-t, 2) * t * control1X + 
//                   3 * (1-t) * Math.pow(t, 2) * control2X + 
//                   Math.pow(t, 3) * endX;
                  
//         const y = Math.pow(1-t, 3) * startY + 
//                   3 * Math.pow(1-t, 2) * t * control1Y + 
//                   3 * (1-t) * Math.pow(t, 2) * control2Y + 
//                   Math.pow(t, 3) * endY;
        
//         // Calcular la tangente para determinar la rotación del texto
//         const tx = 3 * Math.pow(1-t, 2) * (control1X - startX) + 
//                    6 * (1-t) * t * (control2X - control1X) + 
//                    3 * Math.pow(t, 2) * (endX - control2X);
                   
//         const ty = 3 * Math.pow(1-t, 2) * (control1Y - startY) + 
//                    6 * (1-t) * t * (control2Y - control1Y) + 
//                    3 * Math.pow(t, 2) * (endY - control2Y);
        
//         const angle = Math.atan2(ty, tx) * 180 / Math.PI;
        
//         chars.push({
//           char: shapeProps.text[i],
//           x,
//           y,
//           angle
//         });
//       }
      
//       setTextChars(chars);
//     }
//   }, [vectorPoints, shapeProps]);

//   // Al finalizar la transformación, actualizamos las dimensiones
//   const handleTransformEnd = () => {
//     const node = textRef.current;
//     if (!node) return;
    
//     // Capturamos las dimensiones escaladas
//     const newWidth = Math.max(20, node.width() * node.scaleX());
//     const newHeight = Math.max(20, node.height() * node.scaleY());
    
//     // Restablecemos escalas
//     node.scaleX(1);
//     node.scaleY(1);
    
//     // Actualizamos propiedades
//     onChange({
//       ...shapeProps,
//       x: node.x(),
//       y: node.y(),
//       width: newWidth,
//       height: newHeight,
//     });
//   };

//   // Manejador para arrastrar puntos de control de vector
//   const handleVectorPointDrag = (e, pointName) => {
//     const centerX = shapeProps.x + shapeProps.width / 2;
    
//     // Calcular las coordenadas relativas
//     const newX = e.target.x() - centerX;
//     const newY = e.target.y() - (shapeProps.y + shapeProps.height / 2);
    
//     setVectorPoints({
//       ...vectorPoints,
//       [pointName]: { x: newX, y: newY }
//     });
//   };

//   // Manejador para el cursor al pasar sobre puntos de control
//   const handleCursor = (e, pointId, isEnter) => {
//     const stage = e.target.getStage();
//     stage.container().style.cursor = isEnter ? 'pointer' : 'default';
//     setHoveredAnchor(isEnter ? pointId : null);
//   };

//   // Obtener posiciones absolutas de los puntos de control
//   const getAbsoluteControlPoints = () => {
//     const centerX = shapeProps.x + shapeProps.width / 2;
//     const centerY = shapeProps.y + shapeProps.height / 2;
    
//     return {
//       control1: {
//         x: centerX + vectorPoints.control1.x,
//         y: centerY + vectorPoints.control1.y
//       },
//       control2: {
//         x: centerX + vectorPoints.control2.x,
//         y: centerY + vectorPoints.control2.y
//       }
//     };
//   };

//   // Puntos de control absolutos para renderizar
//   const absoluteControls = getAbsoluteControlPoints();

//   return (
//     <>
//       {/* Texto normal cuando no está curvado */}
//       {!isCurved && (
//         <KonvaText
//           ref={textRef}
//           x={shapeProps.x}
//           y={shapeProps.y}
//           width={shapeProps.width}
//           height={shapeProps.height}
//           text={shapeProps.text}
//           fontSize={shapeProps.fontSize}
//           fontFamily={shapeProps.fontFamily || "Arial"}
//           fill={shapeProps.fill || "black"}
//           align="center"
//           verticalAlign="middle"
//           draggable
//           onClick={() => onSelect()}
//           onTap={() => onSelect()}
//           onDragEnd={(e) => {
//             onChange({
//               ...shapeProps,
//               x: e.target.x(),
//               y: e.target.y(),
//             });
//           }}
//           onTransformEnd={handleTransformEnd}
//         />
//       )}
      
//       {/* Texto curvado cuando hay suficiente curvatura */}
//       {isCurved && textChars.map((charData, i) => (
//         <KonvaText
//           key={`char-${i}`}
//           x={charData.x}
//           y={charData.y}
//           text={charData.char}
//           fontSize={shapeProps.fontSize}
//           fontFamily={shapeProps.fontFamily || "Arial"}
//           fill={shapeProps.fill || "black"}
//           align="center"
//           rotation={charData.angle}
//           offsetX={0}
//           offsetY={shapeProps.fontSize / 2}
//           onClick={() => onSelect()}
//           onTap={() => onSelect()}
//         />
//       ))}
      
//       {/* Transformer siempre visible cuando está seleccionado */}
//       {isSelected && !isCurved && (
//         <Transformer
//           ref={trRef}
//           enabledAnchors={["top-left", "top-right", "top-center", "bottom-left", "bottom-center", "bottom-right"]}
//           anchorSize={12}
//           borderStroke="black"
//           borderDash={[4, 4]}
//           anchorStyleFunc={(anchor) => {
//             anchor.fill("black");
//             anchor.width(10);
//             anchor.height(10);
//             anchor.cornerRadius(5);
//           }}
//         />
//       )}
      
//       {/* Puntos de control del vector siempre visibles cuando está seleccionado */}
//       {isSelected && (
//         <>
//           {/* Línea entre los puntos de control */}
//           <Line
//             points={[
//               absoluteControls.control1.x,
//               absoluteControls.control1.y,
//               absoluteControls.control2.x,
//               absoluteControls.control2.y
//             ]}
//             stroke="#4287f5"
//             strokeWidth={2}
//             dash={[5, 5]}
//           />
          
//           {/* Punto de control 1 */}
//           <Circle
//             x={absoluteControls.control1.x}
//             y={absoluteControls.control1.y}
//             radius={8}
//             fill="#4287f5"
//             stroke="#1c54b2"
//             strokeWidth={hoveredAnchor === "control1" ? 3 : 1}
//             draggable
//             onDragMove={(e) => handleVectorPointDrag(e, "control1")}
//             onMouseEnter={(e) => handleCursor(e, "control1", true)}
//             onMouseLeave={(e) => handleCursor(e, "control1", false)}
//           />
          
//           {/* Punto de control 2 */}
//           <Circle
//             x={absoluteControls.control2.x}
//             y={absoluteControls.control2.y}
//             radius={8}
//             fill="#4287f5"
//             stroke="#1c54b2"
//             strokeWidth={hoveredAnchor === "control2" ? 3 : 1}
//             draggable
//             onDragMove={(e) => handleVectorPointDrag(e, "control2")}
//             onMouseEnter={(e) => handleCursor(e, "control2", true)}
//             onMouseLeave={(e) => handleCursor(e, "control2", false)}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default VectorTransformableText;