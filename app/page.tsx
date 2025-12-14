'use client'

import { GoogleIcon } from '@/assets/google-icon'
import { Button } from '@/components/ui/button'
import { FeatureCard } from '@/components/ui/feature-card'
import { HOME_FEATURES } from '@/shared/data/home-features-data'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Briefcase className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Job Application Tracker
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Organize, track, and manage your job applications in one place
          </p>
          <Button
            size="lg"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="gap-2 text-lg"
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 grid gap-6 md:grid-cols-3"
        >
          {' '}
          {HOME_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              iconBg={feature.iconBg}
              iconColor={feature.iconColor}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
