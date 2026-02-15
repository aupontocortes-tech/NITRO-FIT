"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { formatCpf, validateCpf, getCpfDigits } from "@/lib/cpf"

export interface CpfInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> {
  value?: string
  onChange?: (value: string, rawDigits: string) => void
  showValidation?: boolean
}

const CpfInput = React.forwardRef<HTMLInputElement, CpfInputProps>(
  ({ value, onChange, showValidation = true, className, id, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(() =>
      value !== undefined ? formatCpf(value) : ""
    )
    const [touched, setTouched] = React.useState(false)

    const digits = getCpfDigits(internalValue)
    const isComplete = digits.length === 11
    const isValid = isComplete ? validateCpf(internalValue) : true
    const showError = showValidation && touched && isComplete && !isValid

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(formatCpf(value))
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 11)
      const formatted = formatCpf(raw)
      setInternalValue(formatted)
      onChange?.(formatted, raw)
    }

    return (
      <div className="grid gap-1.5">
        <Input
          ref={ref}
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="000.000.000-00"
          value={internalValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          className={cn(showError && "border-destructive focus-visible:ring-destructive", className)}
          {...props}
        />
        {showError && (
          <p className="text-xs text-destructive">CPF inválido. Verifique os números.</p>
        )}
      </div>
    )
  }
)
CpfInput.displayName = "CpfInput"

export { CpfInput }
