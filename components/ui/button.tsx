import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-paper text-ink hover:bg-paper/90",
        outline:
          "border border-line-strong bg-transparent text-paper hover:border-paper hover:bg-paper/5",
        ghost: "text-paper/80 underline-offset-4 hover:text-paper hover:underline",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-5 text-[13px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { href?: string };

export function Button({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children as React.ReactNode}
      </Link>
    );
  }
  return <button className={classes} {...props} />;
}
