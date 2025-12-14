import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface IFeatureCardProps {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  description: string
}

export function FeatureCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
}: IFeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div
          className={`mb-2 flex h-12 w-12 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
