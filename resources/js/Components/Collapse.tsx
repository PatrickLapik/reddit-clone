import { Transition } from '@headlessui/react';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react';

const CollapseContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
}>({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
});

const Collapse = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <CollapseContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div>{children}</div>
        </CollapseContext.Provider>
    );
};

const Trigger = ({ children }: PropsWithChildren) => {
    const { open, setOpen, toggleOpen } = useContext(CollapseContext);

    const arrow = (
        <div className={`transition flex items-center duration-200 ease-in-out ${open ? 'rotate-0': '-rotate-180'}`}>
            <svg
                fill="currentColor"
                height="20"
                icon-name="caret-down-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
            </svg>
        </div>
    );

    return (
        <>
            <div
                className="hover:bg-reddit-dark-secondary flex cursor-pointer justify-between rounded-xl px-2 py-2.5 text-gray-300"
                onClick={toggleOpen}
            >
                {children}
                {arrow}
            </div>
        </>
    );
};

const Content = ({
    contentClasses = 'py-1 space-y-2',
    children,
}: PropsWithChildren<{
    contentClasses?: string;
}>) => {
    const { open, setOpen } = useContext(CollapseContext);

    return (
        <>
            <Transition
                show={open}
                enter="transition tranform ease-out duration-200"
                enterFrom="opacity-0 translate"
                enterTo="opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div>
                    <div
                        className={
                            `ring-opacity-5 rounded-md ` + contentClasses
                        }
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const CollapseLink = ({
    className = '',
    children,
    ...props
}: InertiaLinkProps) => {
    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent the collapse from toggling
        // You can handle additional link logic here if needed
    };
    return (
        <Link
            {...props}
            className={
                'hover:bg-reddit-dark-secondary block w-full rounded-xl border-none px-4 py-2.5 text-start leading-5 text-gray-300 transition duration-150 ease-in-out hover:text-white ' +
                className
            }
            onClick={handleClick}
        >
            {children}
        </Link>
    );
};

Collapse.Trigger = Trigger;
Collapse.Content = Content;
Collapse.Link = CollapseLink;

export default Collapse;
