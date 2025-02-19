
referencias

-patron repositorio node
https://github.com/shihabmridha/nodejs-repository-pattern-and-ioc/blob/master/src/user/user.service.ts

-base repository drizzle example
https://gist.github.com/cayter/49d5c256a885d90c399ca6c1eca19f51


    // "react-rnd": "^10.4.10",

--Escala de imagen al extraer de canvas a tamaño del dispositivo final deseado (probar)

    const saveConfiguration = async () => {
  try {
    const { leftOffset, topOffset, width, height } = caseDimensions!;
    
    // Tamaño deseado basado en iPhone 12 Pro Max
    const targetWidth = 1284;
    const targetHeight = 2778;

    // Determinar el factor de escala basado en el tamaño del canvas visible
    const scaleX = targetWidth / width;
    const scaleY = targetHeight / height;

    // Crear el canvas con tamaño objetivo
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    // Aplicar el factor de escala
    ctx!.scale(scaleX, scaleY);

    // Fondo
    ctx!.fillStyle = designOptions.color.hex;
    ctx!.fillRect(0, 0, width, height);

    // Dibujar imágenes escaladas
    if (imagesState?.length) {
      const imagesPromises = stickersState.items.map((image) => {
        return new Promise<void>((resolve) => {
          const customImage = new Image();
          customImage.crossOrigin = "anonymous";
          customImage.src = image.image.src;
          customImage.onload = () => {
            ctx?.drawImage(
              customImage,
              image.x - leftOffset,
              image.y - topOffset,
              image.width,
              image.height
            );
            resolve();
          };
        });
      });
      await Promise.all(imagesPromises);
    }

    // Dibujar texto escalado
    if (textContainerRef.current) {
      const textImageUrl = await toPng(textContainerRef.current, {
        quality: 1,
        pixelRatio: 3,
      });
      const textImage = new Image();
      textImage.crossOrigin = "anonymous";
      textImage.src = textImageUrl;

      await new Promise((resolve) => {
        textImage.onload = resolve;
      });

      ctx?.drawImage(
        textImage,
        textState.position.x - leftOffset,
        textState.position.y - topOffset,
        textState.size.width,
        textState.size.height
      );
    }

    // Dibujar stickers escalados
    if (stickersState.items.length) {
      const stickerPromises = stickersState.items.map((sticker) => {
        return new Promise<void>((resolve) => {
          const stickerImage = new Image();
          stickerImage.crossOrigin = "anonymous";
          stickerImage.src = sticker.image.src;
          stickerImage.onload = () => {
            ctx?.drawImage(
              stickerImage,
              sticker.x - leftOffset,
              sticker.y - topOffset,
              sticker.width,
              sticker.height
            );
            resolve();
          };
        });
      });
      await Promise.all(stickerPromises);
    }

    // Convertir a imagen final
    canvas.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], "filename.png", { type: "image/png" });
        await startUpload([file]);
      }
    });
  } catch (err) {
    throw new Error("Error uploading images");
  }
};
