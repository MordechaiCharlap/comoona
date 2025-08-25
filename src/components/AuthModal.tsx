'use client'

import { useState } from 'react'
import { useTheme } from '@/providers/ThemeProvider'
import { useAuth } from '@/contexts/AuthProvider'
import { Button } from './Button'
import { Input } from './Input'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthMode = 'sign-in' | 'sign-up' | 'sign-up-email'

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { theme } = useTheme()
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithApple } = useAuth()
  
  const [mode, setMode] = useState<AuthMode>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError('')
    setLoading(false)
  }

  const handleClose = () => {
    resetForm()
    setMode('sign-in')
    onClose()
  }

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    setLoading(true)
    setError('')
    
    try {
      const { error } = provider === 'google' 
        ? await signInWithGoogle()
        : await signInWithApple()
      
      if (error) {
        setError(error.message)
      } else {
        handleClose()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailAuth = async () => {
    if (mode === 'sign-in') {
      if (!email || !password) {
        setError('Please fill in all fields')
        return
      }
    }

    if (mode === 'sign-up-email') {
      if (!email || !password || !confirmPassword) {
        setError('Please fill in all fields')
        return
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
    }

    setLoading(true)
    setError('')

    try {
      const { error } = mode === 'sign-in'
        ? await signInWithEmail(email, password)
        : await signUpWithEmail(email, password)

      if (error) {
        setError(error.message)
      } else {
        if (mode === 'sign-up-email') {
          setError('Please check your email for a confirmation link')
          // Don't close modal, let user see the message
        } else {
          handleClose()
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const switchToSignUp = () => {
    resetForm()
    setMode('sign-up')
  }

  const switchToSignIn = () => {
    resetForm()
    setMode('sign-in')
  }

  const switchToEmailSignUp = () => {
    resetForm()
    setMode('sign-up-email')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-md mx-4 p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 
              className="text-2xl font-bold"
              style={{ color: theme.colors.text }}
            >
              {mode === 'sign-in' ? 'Welcome back' : 'Create account'}
            </h2>
            <p 
              className="text-sm mt-1"
              style={{ color: theme.colors.textSecondary }}
            >
              {mode === 'sign-in' 
                ? 'Sign in to your account' 
                : mode === 'sign-up'
                ? 'Join the community'
                : 'Enter your details to create an account'
              }
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleSocialAuth('apple')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3"
              variant="secondary"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
                <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              Continue with Apple
            </Button>
            
            <Button
              onClick={() => handleSocialAuth('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3"
              variant="secondary"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div 
              className="absolute inset-0 flex items-center"
            >
              <div 
                className="w-full border-t"
                style={{ borderColor: theme.colors.border }}
              />
            </div>
            <div className="relative flex justify-center text-sm">
              <span 
                className="px-2"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.textSecondary 
                }}
              >
                or
              </span>
            </div>
          </div>

          {/* Email Form */}
          {mode === 'sign-up' ? (
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Button
                onClick={switchToEmailSignUp}
                disabled={loading || !email}
                className="w-full"
              >
                Continue with Email
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              {mode === 'sign-up-email' && (
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              )}
              <Button
                onClick={handleEmailAuth}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Loading...' : mode === 'sign-in' ? 'Sign In' : 'Create Account'}
              </Button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Footer */}
          <div className="text-center">
            {mode === 'sign-in' ? (
              <p style={{ color: theme.colors.textSecondary }}>
                Don't have an account?{' '}
                <button
                  onClick={switchToSignUp}
                  disabled={loading}
                  className="font-medium hover:underline"
                  style={{ color: theme.colors.primary }}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p style={{ color: theme.colors.textSecondary }}>
                Already have an account?{' '}
                <button
                  onClick={switchToSignIn}
                  disabled={loading}
                  className="font-medium hover:underline"
                  style={{ color: theme.colors.primary }}
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1 rounded-full hover:opacity-70 transition-opacity"
          style={{ color: theme.colors.textSecondary }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}