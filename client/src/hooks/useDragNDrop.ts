import { useRef } from 'react';

type OnDropType = (files:FileList)=>void

export default function useDragNDrop(onDrop:OnDropType) {
    
    const ref = useRef<HTMLLabelElement>(null);
    console.log("hook: ", ref.current);
    
    if (ref.current) {
        ref.current?.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        ref.current?.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = e.dataTransfer?.files
            if(files)
                onDrop(files);
        });
        ref.current.style.color = 'red';
    }
    return ref;
}
