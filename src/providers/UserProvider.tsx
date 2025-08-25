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

  const fetchProfile = async (userId: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('Profile')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const newProfile = {
          id: userId,
          email: user?.email || '',
          name: user?.user_metadata?.name || user?.user_metadata?.full_name || null,
          avatar_url: user?.user_metadata?.avatar_url || null,
        }

        const { data: createdProfile, error: createError } = await supabase
          .from('Profile')
          .insert([newProfile])
          .select()
          .single()

        if (createError) {
          console.error('Error creating profile:', createError)
          return
        }

        setProfile(createdProfile)
        return
      }

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      setProfile(data)
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
    if (user) {
      await fetchProfile(user.id)
    }
  }

  useEffect(() => {
    if (user) {
      fetchProfile(user.id)
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