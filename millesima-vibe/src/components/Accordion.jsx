import { useId, useState } from 'react'

const DEFAULT_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque magna felis, volutpat et orci eu, tincidunt finibus enim. Fusce facilisis pellentesque orci, eget blandit libero laoreet quis.'

/**
 * Accordion from Georges Design System (Figma: Accordion).
 *
 * @param {boolean} [heading] - Show heading in header
 * @param {boolean} [label] - Show label in header
 * @param {boolean} [paragraph] - Show paragraph in header
 * @param {boolean} [content] - Show body content when expanded
 * @param {boolean} [expand] - Controlled expanded state (Figma: Expand)
 * @param {boolean} [defaultExpand] - Initial expanded state (uncontrolled)
 * @param {(expanded: boolean) => void} [onExpandChange]
 * @param {string} [headingText]
 * @param {string} [labelText]
 * @param {string} [paragraphText]
 * @param {React.ReactNode} [children] - Expanded body content
 */
export default function Accordion({
  heading = true,
  label = false,
  paragraph = false,
  content = true,
  expand: expandProp,
  defaultExpand = false,
  onExpandChange,
  headingText = 'Heading',
  labelText = 'Label',
  paragraphText = 'Paragraphe',
  children = DEFAULT_CONTENT,
  className = '',
}) {
  const [internalExpand, setInternalExpand] = useState(defaultExpand)
  const expanded = expandProp ?? internalExpand

  const toggle = () => {
    const next = !expanded
    if (expandProp === undefined) {
      setInternalExpand(next)
    }
    onExpandChange?.(next)
  }

  const id = useId()
  const headerId = `accordion-header${id}`
  const panelId = `accordion-panel${id}`

  return (
    <div className={`flex w-full flex-col items-start px-gds-none ${className}`}>
      <button
        type="button"
        id={headerId}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={toggle}
        className="flex w-full cursor-pointer items-center gap-gds-medium py-gds-medium text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-primary"
      >
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center break-words">
          {heading && (
            <p className="w-full font-gds-family text-gds-heading-small leading-gds-heading-small font-medium tracking-gds-small text-content-primary">
              {headingText}
            </p>
          )}
          {label && (
            <p className="w-full font-gds-family text-gds-body leading-gds-body font-semibold tracking-gds-normal text-content-primary">
              {labelText}
            </p>
          )}
          {paragraph && (
            <p className="w-full font-gds-family text-gds-body leading-gds-body font-normal text-content-primary">
              {paragraphText}
            </p>
          )}
        </div>

        <span
          className={`flex size-4 shrink-0 items-center justify-center transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <ChevronIcon />
        </span>
      </button>

      {expanded && content && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className="flex w-full flex-col gap-gds-medium pt-gds-medium pb-gds-xxl"
        >
          <p className="w-full break-words font-gds-family text-gds-body leading-gds-body font-normal text-content-primary">
            {children}
          </p>
        </div>
      )}
    </div>
  )
}

/** Chevron 16×16 (Figma: Artwork small) */
function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-full">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
