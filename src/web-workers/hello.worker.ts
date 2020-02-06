// Trickery to fix TypeScript since this will be done by "worker-loader"

console.log('HWLLO WORKER');
const ctx: Worker = self as any;
ctx.addEventListener('message', event => {
  console.log(event);
  setTimeout(() => ctx.postMessage({
    foo: 'boo'
  }), 5000);
});

export default {} as typeof Worker & (new () => Worker);