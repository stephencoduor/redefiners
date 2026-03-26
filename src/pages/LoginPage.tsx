import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        navigate('/dashboard', { replace: true })
      } else {
        setError(result.error ?? 'Login failed. Please try again.')
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col font-poppins md:flex-row">
      {/* Left Panel - Teal Branding */}
      <div
        className="hidden w-1/2 flex-col items-center justify-center gap-6 bg-gradient-to-b from-primary-700 to-primary-800 p-10 md:flex"
        style={{ borderRadius: '0 40px 0 0' }}
      >
        <h1 className="text-center text-5xl font-bold text-white">Welcome</h1>
        <h2 className="text-center text-3xl font-bold text-primary-400">
          Bienvenidos
        </h2>
        <p className="text-center text-base text-primary-400">
          Enter your details to login or
          <br />
          take a{' '}
          <a href="#" className="text-primary-400 hover:underline">
            Placement Test
          </a>
        </p>
        <div className="mt-6 flex gap-4">
          <img src="/Images/login1.png" alt="" className="h-auto max-h-32" />
          <img src="/Images/login2.png" alt="" className="h-auto max-h-32" />
          <img src="/Images/login3.png" alt="" className="h-auto max-h-32" />
          <img src="/Images/login4.png" alt="" className="h-auto max-h-32" />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <img src="/Images/logo.PNG" alt="ReDefiners" className="mb-8 h-10" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary-900">
                Your E-mail
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary-900">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="remember" className="text-primary-400">
                Keep me logged in
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-gradient-to-r from-primary-600 to-primary-700 font-semibold text-white hover:from-primary-700 hover:to-primary-800"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs font-semibold text-primary-400">OR</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          {/* Google OAuth */}
          <Button variant="outline" className="w-full gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Login With Google
          </Button>

          <p className="mt-6 text-center text-xs text-primary-400">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              className="font-semibold text-primary-900 hover:underline"
            >
              Sign up
            </a>
          </p>
          <p className="mt-2 text-center text-xs">
            <a
              href="#"
              className="font-semibold text-primary-900 hover:underline"
            >
              Forgot Password
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
