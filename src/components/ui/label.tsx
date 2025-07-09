"use client"

import * as React from "react"
import { mergeClasses } from "@/lib/utils"

const labelClasses = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={mergeClasses(labelClasses, className)}
    {...props}
  />
));
Label.displayName = "Label"

export { Label }
