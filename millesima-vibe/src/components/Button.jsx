const SIZE_STYLES = {
  sm: {
    height: 'h-gds-button-sm',
    padding: 'px-gds-small',
    icon: 'size-4',
    gap: 'gap-gds-xxs',
  },
  lg: {
    height: 'h-gds-button-lg',
    padding: 'px-gds-medium',
    icon: 'size-6',
    gap: 'gap-gds-xs',
  },
}

/**
 * Primary button from Georges Design System (Figma: Button-ia).
 *
 * @param {'sm' | 'lg'} size - Figma Small (40px) / Medium (48px)
 * @param {React.ReactNode} [icon] - Optional leading icon
 * @param {React.ReactNode} children - Button label
 * @param {() => void} [onClick]
 * @param {boolean} [selected] - Figma Active state (outlined)
 * @param {boolean} [disabled]
 */
export default function Button({
  size = 'lg',
  icon,
  children,
  onClick,
  selected = false,
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const sizeConfig = SIZE_STYLES[size] ?? SIZE_STYLES.lg

  const variantStyles = disabled
    ? 'bg-button-disable text-content-disabled cursor-not-allowed'
    : selected
      ? 'box-border cursor-pointer border-solid border-button-primary border-[length:var(--border-width-gds-selected)] bg-button-secondary text-content-primary'
      : 'bg-button-primary text-content-inverse cursor-pointer hover:shadow-[inset_999px_999px_0_0_var(--color-overlay-hover)] active:shadow-[inset_999px_999px_0_0_var(--color-overlay-press)]'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
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

/** Default GDS plus icon (Figma: add-new-plus) */
export function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
