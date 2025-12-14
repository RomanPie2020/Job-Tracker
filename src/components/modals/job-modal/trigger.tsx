import { Button } from '@/components/ui/button'
import { useLanguage } from '@/providers/language-context'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Pencil, Plus, Trash2 } from 'lucide-react'

export const JobModalTrigger = ({variant, trigger}: {
	variant: 'create' | 'edit' | 'delete'
	trigger?: React.ReactNode, 
}) => {
	const { t } = useLanguage()
	if (trigger) {
		return (
			<DialogTrigger asChild>
				<div onClick={(e) => e.stopPropagation()}>{trigger}</div>
			</DialogTrigger>
		)
	}

	if (variant === 'create') {
		return (
			<DialogTrigger asChild>
				<Button className="gap-2">
					<Plus className="h-4 w-4" />
					{t.addJob}
				</Button>
			</DialogTrigger>
		)
	}

	if (variant === 'edit') {
		return (
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
					onClick={(e) => e.stopPropagation()}
				>
					<Pencil className="h-4 w-4" />
				</Button>
			</DialogTrigger>
		)
	}

	if (variant === 'delete') {
		return (
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
					onClick={(e) => {
						e.stopPropagation()
					}}
				>
					<Trash2 className="h-4 w-4 text-destructive" />
				</Button>
			</DialogTrigger>
		)
	}

	return null
}
