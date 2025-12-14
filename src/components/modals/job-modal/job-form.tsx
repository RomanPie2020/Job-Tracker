import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/providers/language-context'

interface IJobFormProps {
	handleSubmit: (e: React.FormEvent) => void
	title: string 
	setTitle: (title: string) => void 
	company: string
	setCompany: (company: string) => void 
	notes: string 
	setNotes: (notes: string) => void
}

export function JobForm({handleSubmit, title, setTitle, company, setCompany, notes, setNotes}: IJobFormProps) {
	const {t} = useLanguage()
	return (
		<form onSubmit={handleSubmit} id="job-form">
			<div className="grid gap-4 py-4">
				<div className="grid gap-2">
					<label htmlFor="title" className="text-sm font-medium">
						{t.jobTitle} <span className="text-destructive">*</span>
					</label>
					<Input
						id="title"
						placeholder="e.g. Senior Software Engineer"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						autoFocus
						required
					/>
				</div>
				<div className="grid gap-2">
					<label htmlFor="company" className="text-sm font-medium">
						{t.companyName} <span className="text-destructive">*</span>
					</label>
					<Input
						id="company"
						placeholder="e.g. Google"
						value={company}
						onChange={(e) => setCompany(e.target.value)}
						required
					/>
				</div>
				<div className="grid gap-2">
					<label htmlFor="notes" className="text-sm font-medium">
						{t.notes}
					</label>
					<Textarea
						id="notes"
						placeholder="..."
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						rows={4}
					/>
				</div>
			</div>
		</form>
	)
}