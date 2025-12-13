'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-context'
import { Briefcase, Globe, LogOut, Moon, Sun } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export function Navbar() {
  const { data: session } = useSession()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  const getInitials = (name?: string | null) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex shrink-0 items-center gap-2">
          <Briefcase className="h-6 w-6 shrink-0 text-primary" />
          <h1 className="text-xl font-bold">{t.jobTracker}</h1>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            title={language === 'uk' ? 'Switch to English' : 'Перемкнути на українську'}
          >
            <Globe className="h-4 w-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            title={theme === 'light' ? t.darkMode : t.lightMode}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-1 flex shrink-0 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <Avatar>
                    <AvatarImage
                      src={session.user.image || undefined}
                      alt={session.user.name || 'User'}
                    />
                    <AvatarFallback>
                      {getInitials(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.signOut}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}
