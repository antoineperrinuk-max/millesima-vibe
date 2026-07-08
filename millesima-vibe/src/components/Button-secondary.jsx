import { PlusIcon } from './Button'

const SIZE_STYLES = {
  sm: {
    height: 'h-gds-button-sm',
    padding: 'px-gds-small',
    icon: 'size-4',
    gap: 'gap-gds-xxs',
  },
  md: {
    height: 'h-gds-button-md',
    padding: 'px-gds-medium',
    icon: 'size-6',
    gap: 'gap-gds-xs',
  },
}

/**
 * Secondary button from Georges Design System (Figma: Button-secondary-ia).
 *
 * @param {'sm' | 'md'} size - Figma Small (40px) / Medium (48px)
 * @param {React.ReactNode} [icon] - Optional leading icon
 * @param {React.ReactNode} children - Button label
 * @param {() => void} [onClick]
 * @param {boolean} [selected] - Figma Active state (filled black)
 * @param {boolean} [disabled]
 * @param {string} [aria-label] - Required when icon-only (no children)
 */
export default function ButtonSecondary({
  size = 'md',
  icon,
  children,
  onClick,
  selected = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  type = 'button',
  ...rest
}) {
  const isIconOnly = Boolean(icon) && !children
  const sizeConfig = SIZE_STYLES[size] ?? SIZE_STYLES.md

  if (isIconOnly && !ariaLabel) {
    console.warn(
      'ButtonSecondary: provide aria-label when using icon without children.',
    )
  }

  const variantStyles = disabled
    ? 'bg-button-disable text-content-disabled cursor-not-allowed'
    : selected
      ? 'bg-button-primary text-content-inverse cursor-pointer'
      : [
          'box-border cursor-pointer bg-button-secondary text-content-primary',
          'border-solid border-button-primary border-[length:var(--border-width-gds-default)]',
          'hover:shadow-[inset_999px_999px_0_0_var(--color-overlay-hover-inverse)]',
          'active:shadow-[inset_999px_999px_0_0_var(--color-overlay-press-inverse)]',
        ].join(' ')

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={isIconOnly ? ariaLabel : undefined}
      aria-pressed={selected || undefined}
      className={[
        'relative inline-flex items-center justify-center overflow-hidden',
        'rounded-gds-button',
        'font-gds-family text-gds-button leading-gds-button tracking-gds-large font-semibold',
        'transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-primary',
        sizeConfig.height,
        sizeConfig.padding,
        icon ? sizeConfig.gap : 'gap-0',
        variantStyles,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon && (
        <span
          className={`flex shrink-0 items-center justify-center ${sizeConfig.icon} [&_svg]:size-full`}
        >
          {icon}
        </span>
      )}
      {children && <span className="whitespace-nowrap">{children}</span>}
    </button>
  )
}

export { PlusIcon }
