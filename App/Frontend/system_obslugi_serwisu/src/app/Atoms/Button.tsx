import {ButtonHTMLAttributes, ReactElement} from 'react';
import {cva, VariantProps} from "class-variance-authority";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    color?: VariantProps<typeof buttonVariants>["intent"];
    inverse?: boolean;
    icon?: ReactElement;
};

export function Button({ className="", variant, inverse=false, color, icon, ...props } : ButtonProps) {

    if(icon !== undefined){
        return (<button className={buttonVariants({
            className: `${className} flex flex-row items-center justify-center gap-1`,
            variant,
            mode: inverse ? "inverse" : "normal",
            intent: color
        })} {...props}>{icon} {props?.children}</button>);
    }else{
        return (<button className={buttonVariants({
            className,
            variant,
            mode: inverse ? "inverse" : "normal",
            intent: color
        })} {...props} />);
    }
}

const buttonVariants = cva("rounded-md py-[10px] px-[15px] drop-shadow-sm cursor-pointer disabled:cursor-default select-none",
    {
        variants: {
            variant: {
                primary: "",
                secondary: "border border-solid",
            },
            intent: {
                default: "",
                danger: "",
            },
            mode: {
                normal: "",
                inverse: "",
            },
        },

        compoundVariants: [
            {
                variant: "primary",
                intent: "default",
                mode: "normal",
                class: "bg-primary text-white disabled:bg-secondary",
            },
            {
                variant: "primary",
                intent: "default",
                mode: "inverse",
                class: "bg-white text-primary disabled:text-secondary",
            },

            {
                variant: "secondary",
                intent: "default",
                mode: "normal",
                class: "bg-white text-primary border-primary disabled:text-secondary disabled:border-secondary",
            },
            {
                variant: "secondary",
                intent: "default",
                mode: "inverse",
                class: "bg-primary text-white border-white disabled:bg-secondary",
            },

            {
                variant: "primary",
                intent: "danger",
                mode: "normal",
                class: "bg-red-500 text-white disabled:bg-red-300",
            },
            {
                variant: "primary",
                intent: "danger",
                mode: "inverse",
                class: "bg-white text-red-500 disabled:text-red-300",
            },

            {
                variant: "secondary",
                intent: "danger",
                mode: "normal",
                class: "bg-white text-red-500 border-red-500 disabled:text-red-300 disabled:border-red-300",
            },
            {
                variant: "secondary",
                intent: "danger",
                mode: "inverse",
                class: "bg-red-500 text-white border-white disabled:bg-red-300",
            },
        ],

        defaultVariants: {
            variant: "primary",
            intent: "default",
            mode: "normal",
        },
    }
);