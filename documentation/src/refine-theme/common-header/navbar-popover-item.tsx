import React, { Fragment, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { ChevronDownIcon } from "../icons/chevron-down";
import { NavbarPopoverItemType } from "./constants";
import { PointIcon } from "../icons/popover";

type NavbarPopoverItemProps = {
    item: NavbarPopoverItemType;
    isPermanentDark?: boolean;
};

export const NavbarPopoverItem: React.FC<NavbarPopoverItemProps> = ({
    item,
    isPermanentDark,
    children,
}) => {
    const [isShowing, setIsShowing] = useState(false);
    const timeoutRef = React.useRef(null);
    const timeoutEnterRef = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        setIsShowing(false);
    }, [location]);

    return (
        <Popover
            id={`popover-${item.label}`}
            key={item.label}
            className={clsx("relative", "inline-flex items-center")}
            onMouseEnter={() => {
                timeoutEnterRef.current = setTimeout(
                    () => setIsShowing(true),
                    210,
                );
                clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => setIsShowing(false), 210);
                clearTimeout(timeoutEnterRef.current);
            }}
        >
            {() => (
                <>
                    <Popover.Button
                        className={clsx(
                            "inline-flex items-center",
                            "text-base",
                            "font-medium",
                        )}
                    >
                        <span
                            className={clsx(
                                "text-gray-900 dark:text-white",
                                isPermanentDark && "!text-white",
                            )}
                        >
                            {item.label}
                        </span>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className={clsx(
                                "transition duration-150 ease-in-out",
                                "-mr-2",
                                "text-gray-400 dark:text-gray-500",
                                isShowing ? "translate-y-1" : "",
                                isShowing && isPermanentDark
                                    ? "!text-gray-0 opacity-100"
                                    : isPermanentDark
                                    ? "!text-gray-0 opacity-50"
                                    : "",
                                {
                                    "dark:text-gray-0 text-gray-900": isShowing,
                                },
                            )}
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-in duration-200"
                        enterFrom="opacity-0 translate-y-3"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-out duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-3"
                        show={isShowing}
                    >
                        <Popover.Panel
                            className={clsx("absolute", "z-50", "top-12", {
                                "-left-32 center-point":
                                    item.label === "Community" ||
                                    item.label === "Company",
                                "left-point": item.label === "Open-source",
                            })}
                        >
                            <PointIcon
                                className={clsx("absolute", "top-[-9px]", {
                                    "left-1/2": item.label !== "Open-source",
                                    "left-12": item.label === "Open-source",
                                })}
                                style={{ transform: "translateX(-50%)" }}
                            />
                            <div
                                className={clsx(
                                    "overflow-hidden",
                                    "rounded-xl",
                                    "border border-gray-200",
                                )}
                            >
                                {children}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};
