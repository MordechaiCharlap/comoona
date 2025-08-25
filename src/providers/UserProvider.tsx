'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthProvider'

interface UserProfile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: Date
  updated_at: Date
}

interface UserContextType {
  profile: UserProfile | null
  loading: boolean
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>
  refreshProfile: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const { user, session } = useAuth()

  const fetchProfile = async (userEmail: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/profile?email=${encodeURIComponent(userEmail)}`)
      
      if (!response.ok) {
        console.error('Error fetching profile:', response.status)
        return
      }

      const profileData = await response.json()
      setProfile(profileData)
    } catch (error) {
      console.error('Error in fetchProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return { error: 'No profile to update' }

    try {
      const updatedProfile = {
        ...updates,
        updated_at: new Date(),
      }

      const { data, error } = await supabase
        .from('Profile')
        .update(updatedProfile)
        .eq('id', profile.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating profile:', error)
        return { error }
      }

      setProfile(data)
      return { error: null }
    } catch (error) {
      console.error('Error in updateProfile:', error)
      return { error }
    }
  }

  const refreshProfile = async () => {
    if (user?.email) {
      await fetchProfile(user.email)
    }
  }

  useEffect(() => {
    if (user?.email) {
      fetchProfile(user.email)
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  const value = {
    profile,
    loading,
    updateProfile,
    refreshProfile,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}