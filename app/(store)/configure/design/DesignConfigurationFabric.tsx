'use client';
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import Phone from "../../_components/Phone";
import { Button } from "../../../../components/ui/button";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

const initCanvas = (id) => {
    const bgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT13ZE8MITk1ApsD_BylOPuz1maO8YjSqsSbt1h00Ne1A&s'
    const canvas = new fabric.Canvas(id, {
        width: 500,
        height: 500,
        selection: false
    });
    fabric.Image.fromURL(bgUrl, (oImg) => {
        oImg.scaleToWidth(500)
        oImg.scaleToHeight(500)
        canvas.add(oImg)
        canvas.sendToBack(oImg)
        canvas.renderAll()
    });

    return canvas;
}

const DesignConfigurationFabric = ({ imgSrc }) => {
    const canvasRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const {editor,onReady}=useFabricJSEditor()
 

    const handlePic = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        fabric.Image.fromURL(url, (oImg) => {
            oImg.scale(0.1);
            oImg.set({
                width:500,
                height:500,
            })
            editor.canvas.add(oImg)
           
        });
    }

    const handleAddImage=(e)=>{
        if (!e.target.files) return;
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        fabric.Image.fromURL(url, (oImg) => {
            oImg.scale(0.1);
            canvasRef.current.add(oImg);
            
        });
        canvasRef.current.requestRenderAll()
    }

    const generateImage = () => {
        const dataURL = editor.canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'canvas-image.png';
        a.click();
    }

    return (
        <div className="min-h-screen mt-10 m-auto">
            <h1>Página de configuración</h1>

            <div className="flex gap-5">
                <div className="min-w-[250px] border-2 border-blue-500">
                    Panel izquierdo
                </div>
                <div className="relative w-[500px h-[600px] border-2 border-blue-600 rounded-xl">
                    <FabricJSCanvas onReady={onReady} className="w-[500px] h-[600px]"/>
                    <Phone imgSrc="" dark={true} className="absolute inset-0 w-[220px] top-8 left-40"></Phone>
                </div>
                <div className="min-w-[250px] border-2 border-blue-500">
                  
                    <div>
                     <label>add background image</label>
                     <input type="file" onChange={handlePic}></input>
                    </div>

                    <Button onClick={generateImage}>descargar</Button>
                </div>
             
            </div>
        </div>
    )
}

export default DesignConfigurationFabric;
