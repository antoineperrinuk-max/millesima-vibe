import { useState } from 'react'
import Button, { PlusIcon } from './components/Button'

const COLUMNS = [
  { label: 'lg · texte', size: 'lg', icon: false },
  { label: 'lg · icône + texte', size: 'lg', icon: true },
  { label: 'sm · texte', size: 'sm', icon: false },
  { label: 'sm · icône + texte', size: 'sm', icon: true },
]

function DemoCell({ size, withIcon, state, onClick, selected }) {
  const props = {
    size,
    onClick,
    selected,
    disabled: state === 'disabled',
    ...(withIcon && { icon: <PlusIcon /> }),
  }

  return (
    <Button {...props}>Label</Button>
  )
}

function App() {
  const [selectedKey, setSelectedKey] = useState(null)

  return (
    <main className="min-h-screen bg-neutral-50 px-gds-xxl py-gds-xxl font-gds-family">
      <div className="mx-auto max-w-5xl">
        <header className="mb-gds-xxl">
          <h1 className="text-2xl font-semibold text-content-primary">
            Button — Georges Design System
          </h1>
          <p className="mt-gds-xs text-gds-button text-content-primary/70">
            Variants extraits de Figma · Primary · Hover &amp; press interactifs
          </p>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-gds-xxl">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="pb-gds-medium pr-gds-medium text-left text-xs font-semibold uppercase tracking-gds-large text-content-primary/50">
                  État
                </th>
                {COLUMNS.map((col) => (
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
                {COLUMNS.map((col) => (
                  <td key={col.label} className="py-gds-medium px-gds-xs">
                    <DemoCell size={col.size} withIcon={col.icon} state="default" />
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
                {COLUMNS.map((col) => {
                  const key = `${col.size}-${col.icon}`
                  return (
                    <td key={col.label} className="py-gds-medium px-gds-xs">
                      <DemoCell
                        size={col.size}
                        withIcon={col.icon}
                        state="selected"
                        selected={selectedKey === key}
                        onClick={() =>
                          setSelectedKey((prev) => (prev === key ? null : key))
                        }
                      />
                    </td>
                  )
                })}
              </tr>

              <tr className="border-t border-neutral-100">
                <td className="py-gds-medium pr-gds-medium text-sm text-content-primary">
                  Disable
                </td>
                {COLUMNS.map((col) => (
                  <td key={col.label} className="py-gds-medium px-gds-xs">
                    <DemoCell size={col.size} withIcon={col.icon} state="disabled" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default App
