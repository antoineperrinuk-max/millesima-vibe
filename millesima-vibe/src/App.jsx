import { useState } from 'react'
import Accordion from './components/Accordion'
import Button, { PlusIcon } from './components/Button'
import ButtonSecondary from './components/Button-secondary'

const ACCORDION_VARIANTS = [
  {
    label: 'Expand = False',
    description: 'Heading · défaut Figma',
    props: { expand: false, heading: true, label: false, paragraph: false, content: true },
  },
  {
    label: 'Expand = True',
    description: 'Heading + contenu · défaut Figma',
    props: { expand: true, heading: true, label: false, paragraph: false, content: true },
  },
  {
    label: 'Label = True',
    description: 'Heading + Label',
    props: { expand: false, heading: true, label: true, paragraph: false, content: true },
  },
  {
    label: 'Paragraph = True',
    description: 'Heading + Paragraphe (header)',
    props: { expand: false, heading: true, label: false, paragraph: true, content: true },
  },
  {
    label: 'Heading + Label + Paragraph',
    description: 'Toutes les options header',
    props: { expand: true, heading: true, label: true, paragraph: true, content: true },
  },
  {
    label: 'Content = False',
    description: 'Expand sans corps de contenu',
    props: { expand: true, heading: true, label: false, paragraph: false, content: false },
  },
]

const PRIMARY_COLUMNS = [
  { label: 'lg · texte', size: 'lg', icon: false },
  { label: 'lg · icône + texte', size: 'lg', icon: true },
  { label: 'sm · texte', size: 'sm', icon: false },
  { label: 'sm · icône + texte', size: 'sm', icon: true },
]

const SECONDARY_COLUMNS = [
  { label: 'md · texte', size: 'md', icon: false },
  { label: 'md · icône + texte', size: 'md', icon: true },
  { label: 'sm · texte', size: 'sm', icon: false },
  { label: 'sm · icône + texte', size: 'sm', icon: true },
]

function DemoGrid({ title, description, columns, Component, selectedKey, onToggle }) {
  return (
    <section className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-gds-xxl">
      <div className="mb-gds-medium">
        <h2 className="text-lg font-semibold text-content-primary">{title}</h2>
        <p className="mt-gds-xxs text-gds-button text-content-primary/70">{description}</p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="pb-gds-medium pr-gds-medium text-left text-xs font-semibold uppercase tracking-gds-large text-content-primary/50">
              État
            </th>
            {columns.map((col) => (
              <th
                key={col.label}
                className="pb-gds-medium px-gds-xs text-left text-xs font-semibold uppercase tracking-gds-large text-content-primary/50"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-gds-medium pr-gds-medium text-sm text-content-primary">
              Enable
              <span className="mt-0.5 block text-xs text-content-primary/50">
                Survolez / cliquez
              </span>
            </td>
            {columns.map((col) => (
              <td key={col.label} className="py-gds-medium px-gds-xs">
                <Component size={col.size} icon={col.icon ? <PlusIcon /> : undefined}>
                  Label
                </Component>
              </td>
            ))}
          </tr>

          <tr className="border-t border-neutral-100">
            <td className="py-gds-medium pr-gds-medium text-sm text-content-primary">
              Active
              <span className="mt-0.5 block text-xs text-content-primary/50">
                Cliquez pour basculer
              </span>
            </td>
            {columns.map((col) => {
              const key = `${col.size}-${col.icon}`
              return (
                <td key={col.label} className="py-gds-medium px-gds-xs">
                  <Component
                    size={col.size}
                    icon={col.icon ? <PlusIcon /> : undefined}
                    selected={selectedKey === key}
                    onClick={() => onToggle(key)}
                  >
                    Label
                  </Component>
                </td>
              )
            })}
          </tr>

          <tr className="border-t border-neutral-100">
            <td className="py-gds-medium pr-gds-medium text-sm text-content-primary">
              Disable
            </td>
            {columns.map((col) => (
              <td key={col.label} className="py-gds-medium px-gds-xs">
                <Component
                  size={col.size}
                  icon={col.icon ? <PlusIcon /> : undefined}
                  disabled
                >
                  Label
                </Component>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  )
}

function DemoSwitch({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-gds-xs">
      <span className="min-w-[5.5rem] text-sm text-content-primary">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-primary ${checked ? 'bg-button-primary' : 'bg-neutral-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-button-secondary transition-transform ${checked ? 'translate-x-5' : ''}`}
        />
      </button>
    </label>
  )
}

function AccordionDemo() {
  const [showHeading, setShowHeading] = useState(true)
  const [showLabel, setShowLabel] = useState(true)
  const [showParagraph, setShowParagraph] = useState(true)

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-gds-xxl">
      <div className="mb-gds-medium">
        <h2 className="text-lg font-semibold text-content-primary">Accordion</h2>
        <p className="mt-gds-xxs text-gds-button text-content-primary/70">
          Variants Figma · Expand, Heading, Label, Paragraph, Content
        </p>
      </div>

      <div className="grid gap-gds-xxl md:grid-cols-2">
        {ACCORDION_VARIANTS.map((variant) => (
          <div key={variant.label}>
            <p className="mb-gds-xs text-sm font-semibold text-content-primary">{variant.label}</p>
            <p className="mb-gds-medium text-xs text-content-primary/50">{variant.description}</p>
            <div className="max-w-[326px]">
              <Accordion {...variant.props} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-gds-xxl border-t border-neutral-100 pt-gds-xxl">
        <p className="mb-gds-xs text-sm font-semibold text-content-primary">Playground</p>
        <p className="mb-gds-medium text-xs text-content-primary/50">
          Activez les options typographiques puis cliquez pour ouvrir / fermer
        </p>

        <div className="mb-gds-medium flex flex-wrap gap-gds-medium">
          <DemoSwitch label="Heading" checked={showHeading} onChange={setShowHeading} />
          <DemoSwitch label="Label" checked={showLabel} onChange={setShowLabel} />
          <DemoSwitch label="Paragraph" checked={showParagraph} onChange={setShowParagraph} />
        </div>

        <div className="max-w-[326px]">
          <Accordion
            heading={showHeading}
            label={showLabel}
            paragraph={showParagraph}
            content
            defaultExpand={false}
          />
        </div>
      </div>
    </section>
  )
}

function App() {
  const [primarySelected, setPrimarySelected] = useState(null)
  const [secondarySelected, setSecondarySelected] = useState(null)

  const toggle = (setter) => (key) =>
    setter((prev) => (prev === key ? null : key))

  return (
    <main className="min-h-screen bg-neutral-50 px-gds-xxl py-gds-xxl font-gds-family">
      <div className="mx-auto flex max-w-5xl flex-col gap-gds-xxl">
        <header>
          <h1 className="text-2xl font-semibold text-content-primary">
            Georges Design System
          </h1>
          <p className="mt-gds-xs text-gds-button text-content-primary/70">
            Composants extraits de Figma
          </p>
        </header>

        <AccordionDemo />

        <DemoGrid
          title="Primary"
          description="Button-ia · Fond noir · Active avec bordure"
          columns={PRIMARY_COLUMNS}
          Component={Button}
          selectedKey={primarySelected}
          onToggle={toggle(setPrimarySelected)}
        />

        <DemoGrid
          title="Secondary"
          description="Button-secondary-ia · Fond blanc · Bordure 1px · Active rempli"
          columns={SECONDARY_COLUMNS}
          Component={ButtonSecondary}
          selectedKey={secondarySelected}
          onToggle={toggle(setSecondarySelected)}
        />
      </div>
    </main>
  )
}

export default App
