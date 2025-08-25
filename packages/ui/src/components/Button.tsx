import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * When `asChild` is true the button will render the passed element
   * directly instead of a `<button>` element. This allows the component
   * to be composed with Next.js `Link` or other custom elements while
   * preserving the button styles.
   */
  asChild?: boolean;
  /**
   * Determines the visual style of the button.
   */
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-danger text-danger-foreground hover:bg-danger/90',
};

/**
 * A base button component that can render either a `<button>` element
 * or any custom element when `asChild` is true. Variants map to the
 * design tokens defined in the Tailwind configuration.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', asChild = false, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variantClasses[variant],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
