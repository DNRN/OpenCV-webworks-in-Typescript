import OpenCVWorker from '../web-workers/opencv.worker';
// import cv from '../assets/scripts/opencv.js';




export const OpenCvManager = async () => {
    // cv.onRuntimeInitialized = async () => {
    //     console.log('📦OpenCV runtime loaded');
    // };

    const canvasOut = document.getElementById('canvasOut') as HTMLCanvasElement;

    const openCvWorker1 = new OpenCVWorker();
    const openCvWorker2 = new OpenCVWorker();

    const WorkerActionOut = (workername: string) => {

        return {
            init: () => console.log(`${workername} init`),
            ready: () => {
                console.log(`${workername} ready`),
                document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
            },
            msg: (msg: string) => console.log(`Action message from ${workername}`, msg),
            imageData: (imgData) => {
                const ctx = canvasOut.getContext('2d');
                // WTF? OpenCV vender om på width and height
                canvasOut.width = imgData.height;
                canvasOut.height = imgData.width;
                console.log('load image data from openCV worker', imgData);
                const imageData = new ImageData(imgData.data, imgData.height, imgData.width);
                ctx.putImageData(imageData, 0, 0);
            }
        }
    }

    const handleAction = (workerName: string) => message => {
        // console.log('data', message.data);

        const action2 = WorkerActionOut(workerName)[message.data.type]
        action2 ? action2(message.data.args) : console.error('Action 2 not found', message);
    }

    openCvWorker1.onmessage = handleAction('Worker 1');
    openCvWorker2.onmessage = handleAction('Worker 2');

    const readDataFromImage = (canvas: HTMLCanvasElement) => {
        const imgData = canvas.getContext('2d');
        return imgData.getImageData(0, 0, canvas.width, canvas.height);
    }

    return {
        loadImage: (canvas: HTMLCanvasElement) => {
            const imgData = readDataFromImage(canvas);
            openCvWorker1.postMessage({ type: 'action', name: 'init', args: 'Worker 1' });
            openCvWorker1.postMessage({ type: 'action', name: 'load', args: imgData }, [imgData.data.buffer]);
            openCvWorker1.postMessage({ type: 'action', name: 'blur' });
            openCvWorker1.postMessage({ type: 'action', name: 'orb' });
            openCvWorker1.postMessage({ type: 'action', name: 'get' });
        }
    }
}