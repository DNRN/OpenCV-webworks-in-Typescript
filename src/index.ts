import { OpenCvManager } from './opencv/opencv.manager';

const start = async() => {
    const openCvManager = await OpenCvManager();

    const imgElement = document.getElementById('imageSrc') as HTMLImageElement;
    const inputElement = document.getElementById('fileInput');
    // const canvas = document.getElementById('canvasOutput') as HTMLCanvasElement;
    const imageCanvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
    inputElement.addEventListener('change', (e: any) => {
        imgElement.src = URL.createObjectURL(e.target.files[0]);

    }, false);
    imgElement.onload = (event) => {
        imageCanvas.height = imgElement.width;
        imageCanvas.width = imgElement.width;
        const context = imageCanvas.getContext("2d");
        context.drawImage(imgElement, 0, 0);

        openCvManager.loadImage(imageCanvas);
    };
    
    console.log('img elm', imgElement);
}

start().then();