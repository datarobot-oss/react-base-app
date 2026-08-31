import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const BADGE_TYPE = {
  default: 'default',
  outline: 'outline'
};

const BADGE_VARIANT = {
  default: 'default',
  'light-gray': 'light-gray',
  destructive: 'destructive',
  info: 'info',
  warning: 'warning',
  success: 'success',
  pink: 'pink',
  turquoise: 'turquoise',
  purple: 'purple',
  blue: 'blue',
  orange: 'orange'
};

// Hover styles map - only applied when onClick is provided
const BADGE_HOVER_STYLES = {
  [BADGE_TYPE.default]: {
    [BADGE_VARIANT.pink]:
      'hover:bg-[color-mix(in_oklch,var(--chart-2)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--chart-2)_80%,white)]',
    [BADGE_VARIANT.turquoise]:
      'hover:bg-[color-mix(in_oklch,var(--chart-3)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--chart-3)_80%,white)]',
    [BADGE_VARIANT.purple]:
      'hover:bg-[color-mix(in_oklch,var(--chart-1)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--chart-1)_80%,white)]',
    [BADGE_VARIANT.blue]:
      'hover:bg-[color-mix(in_oklch,var(--chart-5)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--chart-5)_80%,white)]',
    [BADGE_VARIANT.orange]:
      'hover:bg-[color-mix(in_oklch,var(--chart-4)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--chart-4)_80%,white)]',
    [BADGE_VARIANT.destructive]:
      'hover:bg-[color-mix(in_oklch,var(--destructive)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--destructive)_80%,white)]',
    [BADGE_VARIANT.info]:
      'hover:bg-[color-mix(in_oklch,var(--link)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--link)_80%,white)]',
    [BADGE_VARIANT.warning]:
      'hover:bg-[color-mix(in_oklch,var(--warning)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--warning)_80%,white)]',
    [BADGE_VARIANT.success]:
      'hover:bg-[color-mix(in_oklch,var(--success)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--success)_80%,white)]',
    [BADGE_VARIANT.default]:
      'hover:bg-[color-mix(in_oklch,var(--border)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--border)_80%,white)]',
    [BADGE_VARIANT['light-gray']]:
      'hover:bg-[color-mix(in_oklch,var(--muted)_90%,black)] dark:hover:bg-[color-mix(in_oklch,var(--muted)_45%,white)]',
  },
  [BADGE_TYPE.outline]: {
    [BADGE_VARIANT.pink]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--chart-2)_75%,black)] hover:text-[color-mix(in_oklch,var(--chart-2)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--chart-2)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--chart-2)_80%,white)]',
    [BADGE_VARIANT.turquoise]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--chart-3)_75%,black)] hover:text-[color-mix(in_oklch,var(--chart-3)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--chart-3)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--chart-3)_80%,white)]',
    [BADGE_VARIANT.purple]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--chart-1)_75%,black)] hover:text-[color-mix(in_oklch,var(--chart-1)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--chart-1)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--chart-1)_80%,white)]',
    [BADGE_VARIANT.blue]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--chart-5)_75%,black)] hover:text-[color-mix(in_oklch,var(--chart-5)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--chart-5)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--chart-5)_80%,white)]',
    [BADGE_VARIANT.orange]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--chart-4)_75%,black)] hover:text-[color-mix(in_oklch,var(--chart-4)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--chart-4)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--chart-4)_80%,white)]',
    [BADGE_VARIANT.destructive]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--destructive)_75%,black)] hover:text-[color-mix(in_oklch,var(--destructive)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--destructive)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--destructive)_80%,white)]',
    [BADGE_VARIANT.info]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--link)_75%,black)] hover:text-[color-mix(in_oklch,var(--link)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--link)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--link)_80%,white)]',
    [BADGE_VARIANT.warning]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--warning)_75%,black)] hover:text-[color-mix(in_oklch,var(--warning)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--warning)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--warning)_80%,white)]',
    [BADGE_VARIANT.success]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--success)_75%,black)] hover:text-[color-mix(in_oklch,var(--success)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--success)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--success)_80%,white)]',
    [BADGE_VARIANT.default]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--secondary-foreground)_75%,black)] hover:text-[color-mix(in_oklch,var(--secondary-foreground)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--secondary-foreground)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--secondary-foreground)_80%,white)]',
    [BADGE_VARIANT['light-gray']]:
      'hover:bg-black/3 hover:border-[color-mix(in_oklch,var(--foreground)_75%,black)] hover:text-[color-mix(in_oklch,var(--foreground)_75%,black)] dark:hover:border-[color-mix(in_oklch,var(--foreground)_80%,white)] dark:hover:text-[color-mix(in_oklch,var(--foreground)_80%,white)]',
  },
};

const BADGE_VARIANTS = cva(`
  inline-flex items-center rounded-xl border caption-01 px-2 py-0.5 transition-colors
  focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none
`, {
  variants: {
    type: {
      [BADGE_TYPE.default]: '',
      [BADGE_TYPE.outline]: '',
    },
    variant: {
      [BADGE_VARIANT.default]: '',
      [BADGE_VARIANT['light-gray']]: '',
      [BADGE_VARIANT.destructive]: '',
      [BADGE_VARIANT.info]: '',
      [BADGE_VARIANT.warning]: '',
      [BADGE_VARIANT.success]: '',
      [BADGE_VARIANT.pink]: '',
      [BADGE_VARIANT.turquoise]: '',
      [BADGE_VARIANT.purple]: '',
      [BADGE_VARIANT.blue]: '',
      [BADGE_VARIANT.orange]: '',
    },
  },
  compoundVariants: [
    // Default type - destructive (error)
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.destructive,
      className: 'border-transparent bg-(--destructive) text-white',
    },
    // Default type - info
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.info,
      className: 'border-transparent bg-(--link) text-(--primary-foreground)',
    },
    // Default type - warning
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.warning,
      className:
        'border-transparent bg-(--warning) text-(--primary-foreground)',
    },
    // Default type - success
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.success,
      className:
        'border-transparent bg-(--success) text-(--primary-foreground)',
    },
    // Default type - pink
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.pink,
      className:
        'border-transparent bg-(--chart-2) text-(--primary-foreground)',
    },
    // Default type - turquoise
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.turquoise,
      className:
        'border-transparent bg-(--chart-3) text-(--primary-foreground)',
    },
    // Default type - purple
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.purple,
      className:
        'border-transparent bg-(--chart-1) text-(--primary-foreground)',
    },
    // Default type - blue
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.blue,
      className:
        'border-transparent bg-(--chart-5) text-(--primary-foreground)',
    },
    // Default type - orange
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.orange,
      className:
        'border-transparent bg-(--chart-4) text-(--primary-foreground)',
    },
    // Default type - default
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT.default,
      className: `
        border-transparent bg-(--border) text-(--foreground)
        dark:bg-(--border)
      `,
    },
    // Default type - light gray
    {
      type: BADGE_TYPE.default,
      variant: BADGE_VARIANT['light-gray'],
      className: `
        border-transparent bg-muted text-[color-mix(in_oklch,var(--primary-foreground)_20%,black)]
        dark:bg-[color-mix(in_oklch,var(--muted)_55%,white)] dark:text-(--primary-foreground)
      `,
    },
    // Outline type - destructive (error)
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.destructive,
      className: `
        border-(--destructive) bg-transparent text-(--destructive)
        dark:border-[color-mix(in_oklch,var(--destructive)_70%,white)] dark:text-[color-mix(in_oklch,var(--destructive)_70%,white)]
      `,
    },
    // Outline type - info
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.info,
      className: 'border-(--link) bg-transparent text-(--link)',
    },
    // Outline type - warning
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.warning,
      className: 'border-(--warning) bg-transparent text-(--warning)',
    },
    // Outline type - success
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.success,
      className: 'border-(--success) bg-transparent text-(--success)',
    },
    // Outline type - pink
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.pink,
      className: 'border-(--chart-2) bg-transparent text-(--chart-2)',
    },
    // Outline type - turquoise
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.turquoise,
      className: 'border-(--chart-3) bg-transparent text-(--chart-3)',
    },
    // Outline type - purple
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.purple,
      className: 'border-(--chart-1) bg-transparent text-(--chart-1)',
    },
    // Outline type - blue
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.blue,
      className: 'border-(--chart-5) bg-transparent text-(--chart-5)',
    },
    // Outline type - orange
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.orange,
      className: 'border-(--chart-4) bg-transparent text-(--chart-4)',
    },
    // Outline type - default
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT.default,
      className:
        'border-(--secondary-foreground) bg-transparent text-(--secondary-foreground)',
    },
    // Outline type - light gray
    {
      type: BADGE_TYPE.outline,
      variant: BADGE_VARIANT['light-gray'],
      className: 'border-(--foreground) bg-transparent text-(--foreground)',
    },
  ],
  defaultVariants: {
    type: BADGE_TYPE.default,
    variant: BADGE_VARIANT.default,
  },
});

const Badge = React.forwardRef(({ className, type, variant, onClick, ...props }, ref) => {
  const badgeType = type ?? BADGE_TYPE.default;
  const badgeVariant = variant ?? BADGE_VARIANT.default;
  const hasOnClick = !!onClick;

  const badgeClassName = cn(
    BADGE_VARIANTS({ type: badgeType, variant: badgeVariant }),
    hasOnClick && 'cursor-pointer',
    hasOnClick && BADGE_HOVER_STYLES[badgeType]?.[badgeVariant],
    className
  );

  if (hasOnClick) {
    return (
      <button
        ref={ref}
        type='button'
        data-slot='badge'
        onClick={
          onClick
        }
        className={badgeClassName}
        {...(props)} />
    );
  }

  return (<div ref={ref} data-slot='badge' className={badgeClassName} {...props} />);
});

Badge.displayName = 'Badge';

export { Badge, BADGE_VARIANTS, BADGE_TYPE, BADGE_VARIANT };
