import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const CLASS_NAMES = {
  h1: 'heading-01 not-prose',
  h2: 'heading-02 not-prose',
  h3: 'heading-03 not-prose',
  h4: 'heading-04 not-prose',
  h5: 'heading-05 not-prose',
  h6: 'heading-06 not-prose',
};

function Heading({
  level,
  className,
  asChild = false,
  ...props
}) {
  const HTag = `h${level}`;
  const Comp = asChild ? Slot : HTag;

  return <Comp className={cn(CLASS_NAMES[HTag], className)} {...props} />;
}

export { Heading };
