export const ScriptLoader = {
    load: (name: string) => {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `scripts/${name}`;
            script.onload = () => {
                resolve({ script: name, loaded: true, status: 'Loaded' });
            };
            script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }
}