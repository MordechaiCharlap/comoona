import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, name, avatar_url } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if profile already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { email }
    })

    if (existingProfile) {
      return NextResponse.json({ profile: existingProfile, created: false })
    }

    // Create new profile
    const newProfile = await prisma.profile.create({
      data: {
        email,
        name,
        avatar_url
      }
    })

    return NextResponse.json({ profile: newProfile, created: true })
  } catch (error) {
    console.error('Error ensuring profile exists:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}