import { Palette, Eye, Check } from 'lucide-react'

interface ThemeConfig {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  isActive: boolean
}

const THEMES: ThemeConfig[] = [
  {
    id: '1',
    name: 'ReDefiners Default',
    primaryColor: '#1e40af',
    secondaryColor: '#059669',
    isActive: true,
  },
  {
    id: '2',
    name: 'Ocean Blue',
    primaryColor: '#0284c7',
    secondaryColor: '#0d9488',
    isActive: false,
  },
  {
    id: '3',
    name: 'Sunset Warm',
    primaryColor: '#c2410c',
    secondaryColor: '#b45309',
    isActive: false,
  },
  {
    id: '4',
    name: 'Forest Green',
    primaryColor: '#15803d',
    secondaryColor: '#4d7c0f',
    isActive: false,
  },
]

export function BrandConfigsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Palette className="h-6 w-6 text-primary-600" />
        <div>
          <h3 className="text-2xl font-bold text-primary-800">Themes & Branding</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Manage the visual appearance of your Canvas instance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((theme) => (
          <div
            key={theme.id}
            className={`rounded-lg bg-white shadow-sm ${
              theme.isActive ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className="flex h-24 overflow-hidden rounded-t-lg">
              <div className="flex-1" style={{ backgroundColor: theme.primaryColor }} />
              <div className="flex-1" style={{ backgroundColor: theme.secondaryColor }} />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-neutral-800">{theme.name}</h4>
                {theme.isActive && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                    <Check className="h-3 w-3" />
                    Active
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full border border-neutral-200"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <span className="text-xs text-neutral-500">{theme.primaryColor}</span>
                <div
                  className="h-4 w-4 rounded-full border border-neutral-200"
                  style={{ backgroundColor: theme.secondaryColor }}
                />
                <span className="text-xs text-neutral-500">{theme.secondaryColor}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </button>
                {!theme.isActive && (
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
