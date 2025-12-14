'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-full bg-muted p-6 mb-6"
      >
        <FileQuestion className="h-16 w-16 text-primary" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold tracking-tight mb-2"
      >
        Page Not Found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-muted-foreground mb-8 text-lg max-w-md mx-auto"
      >
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
        removed or moved to a new URL.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href="/">
          <Button size="lg">Go back home</Button>
        </Link>
      </motion.div>
    </div>
  )
}
