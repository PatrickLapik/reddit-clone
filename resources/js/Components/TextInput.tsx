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
};

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        as = 'input',
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

    const commonClasses =
        'bg-reddit-dark-secondary w-full rounded-xl border-none focus:border-white focus:ring-white ' +
        className;

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
