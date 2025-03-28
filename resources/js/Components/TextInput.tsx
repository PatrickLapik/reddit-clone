import {
    forwardRef,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

type TextInputProps = (
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>
) & {
    isFocused?: boolean;
    as?: 'input' | 'textarea';
    type?: string;
    addBorder?: boolean;
};

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        as = 'input',
        addBorder = false,
        ...props
    }: TextInputProps,
    ref,
) {
    const localRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const commonClasses = `bg-reddit-dark-secondary w-full rounded-xl focus:border-reddit-border focus:ring-reddit-border ${className} ${addBorder ? ' border' : ' border-none'}`;

    return as === 'textarea' ? (
        <textarea
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={commonClasses}
            ref={localRef as React.RefObject<HTMLTextAreaElement>}
        />
    ) : (
        <input
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            type={type}
            className={`hover:brightness-125 ${commonClasses}`}
            ref={localRef as React.RefObject<HTMLInputElement>}
        />
    );
});
