import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { PropsWithChildren } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
    className,
}: PropsWithChildren<{
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    closeable?: boolean;
    onClose: CallableFunction;
    className?: string;
}>) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm p-6',
        md: 'sm:max-w-md p-6',
        lg: 'sm:max-w-lg p-6',
        xl: 'sm:max-w-xl p-6',
        '2xl': 'sm:max-w-2xl p-6',
        'full': 'w-full'
    }[maxWidth];

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className={`fixed inset-0 z-50 flex transform items-center px-4 py-6 transition-all sm:px-0`}
                onClose={close}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-reddit-dark/75 backdrop-blur-xs" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`transform overflow-hidden rounded-2xl bg-reddit-border-secondary shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass} ${className}`}
                    >
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
