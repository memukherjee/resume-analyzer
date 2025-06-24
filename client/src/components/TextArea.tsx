import type { ChangeEventHandler, CSSProperties, KeyboardEventHandler } from 'react';

type PropsType = {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    style?: CSSProperties;
    className?: string;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    rows?: number;
    placeholder?: string;
    name?: string;
};

export default function TextArea({
    value,
    placeholder = 'Type here',
    name = 'textarea',
    style,
    className = '',
    onChange,
    onKeyDown = () => {},
    rows = 5
}: PropsType) {
    return (
        <textarea
            style={style}
            className={`min-w-2/3 outline-none border border-dashed border-[#aaa] p-4 text-2xl ${className}`}
            rows={rows}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
            name={name}
        />
    );
}
