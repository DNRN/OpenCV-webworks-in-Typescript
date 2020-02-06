import cv from '../assets/scripts/opencv.js';


cv.onRuntimeInitialized = async () => {
    console.log('📦OpenCV runtime loaded from web worker');
    init().then();
};

const ctx: Worker = self as any;
ctx.postMessage({
    type: 'init',
    message: 'Worker created'
});

const init = async() => {

    let _src;
    let _dimensions;

    const actions = new Map<string, ((...args) => void)> ([
        ['load', (imageData: ImageData) => {
            const src = new cv.Mat(imageData.height, imageData.width, cv.CV_8UC4);
            src.data.set(imageData.data);
            _src = src;
            ctx.postMessage({
                type: 'msg',
                args: 'Mat created'
            });
        }],
        ['blur', () => {
            const ksize = new cv.Size(10,10);
            const anchor = new cv.Point(-1,-1);
            cv.blur(_src, _src, ksize, anchor, cv.BORDER_DEFAULT);
            ctx.postMessage({
                type: 'msg',
                args: 'Imaged blurred'
            });
        }],
        ['orb', () => {
            // Do ORB magic here
            ctx.postMessage({
                type: 'msg',
                args: 'ORB done'
            });
        }],
        ['get', () => {
            const bytes = Uint8ClampedArray.from(_src.data);
            const imageData = new ImageData(bytes, _src.rows, _src.cols);

            ctx.postMessage({ type: 'imageData', args: imageData }, [imageData.data.buffer]);
        }]
    ]);

    const handleAction = message => {
        const action = actions.get(message.data.name);
        action ? action(message.data.args) : console.error('Action not found', message);
    } 
    ctx.addEventListener('message', handleAction);

    ctx.postMessage({
        type: 'msg',
        args: 'OpenCV worker created'
    });
}

export default {} as typeof Worker & (new () => Worker);