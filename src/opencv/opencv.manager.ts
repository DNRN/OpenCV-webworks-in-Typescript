import OpenCVWorker from '../web-workers/opencv.worker';
// import cv from '../assets/scripts/opencv.js';


export const OpenCvManager = async () => {
    // cv.onRuntimeInitialized = async () => {
    //     console.log('📦OpenCV runtime loaded');
    // };

    // const matMap = new Map();
    const openCvWorker = new OpenCVWorker();
    const canvasOut = document.getElementById('canvasOut') as HTMLCanvasElement;
    

    const actions = new Map<string, ((...args) => void)> ([
        ['init', () => {
            document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
        }],
        ['msg', (msg: string) => {
            console.log(msg);
        }],
        ['imageData', (imgData) => {
            const ctx = canvasOut.getContext('2d');
            // WTF? OpenCV vender om på width and height
            canvasOut.width = imgData.height;
            canvasOut.height = imgData.width;
            console.log('load image data from openCV worker', imgData);
            const imageData = new ImageData(imgData.data, imgData.height, imgData.width);
            ctx.putImageData(imageData, 0, 0);
        }]
    ]);

    const handleAction = message => {
        console.log('msg', message);
        const action = actions.get(message.data.type);

        action ? action(message.data.args) : console.error('Action not found', message);
    }
    openCvWorker.onmessage = handleAction;

    const readDataFromImage = (canvas: HTMLCanvasElement) => {
        const imgData = canvas.getContext('2d');
        return imgData.getImageData(0, 0, canvas.width, canvas.height);
    }

    return {
        loadImage: (canvas: HTMLCanvasElement) => {
            const imgData = readDataFromImage(canvas);
            openCvWorker.postMessage({ type: 'action', name: 'load', args: imgData }, [imgData.data.buffer]);
            openCvWorker.postMessage({ type: 'action', name: 'blur' });
            openCvWorker.postMessage({ type: 'action', name: 'orb' });
            openCvWorker.postMessage({ type: 'action', name: 'get' });
        }
    }
}