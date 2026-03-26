import { useState } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'
import { Settings, Save } from 'lucide-react'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'zh', label: 'Chinese' },
]

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (US)' },
  { value: 'America/Chicago', label: 'Central Time (US)' },
  { value: 'America/Denver', label: 'Mountain Time (US)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
]

export function AccountSettingsPage() {
  const { data: user, isLoading } = useCurrentUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('America/New_York')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  // Initialize form when user data loads
  if (user && !name) {
    setName(user.name ?? '')
    setEmail(user.email ?? user.login_id ?? '')
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-primary-800">
          Account Settings
        </h3>
        <LoadingSkeleton type="row" count={8} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-primary-600" />
        <h3 className="text-2xl font-bold text-primary-800">
          Account Settings
        </h3>
      </div>

      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm">
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Language */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notification Preferences */}
          <div className="border-t border-neutral-100 pt-5">
            <h4 className="mb-3 text-sm font-semibold text-neutral-800">
              Notification Preferences
            </h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">
                  Email Notifications
                </span>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                    emailNotifications ? 'bg-primary-600' : 'bg-neutral-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                      emailNotifications
                        ? 'translate-x-4'
                        : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">
                  Push Notifications
                </span>
                <button
                  type="button"
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                    pushNotifications ? 'bg-primary-600' : 'bg-neutral-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                      pushNotifications
                        ? 'translate-x-4'
                        : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-neutral-100 pt-5">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
