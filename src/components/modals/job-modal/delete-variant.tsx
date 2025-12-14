import { useLanguage } from '@/providers/language-context'
import { IJob } from '@/shared/types/job-types'

export function DeleteVariant({job}: {job: IJob | undefined}) {
	const { t } = useLanguage()
	if (!job) return null
	return (
		<div className="rounded-lg border bg-muted/50 p-4 overflow-hidden">
			<div className="space-y-2">
				<div>
					<p className="text-sm font-medium text-muted-foreground">
						{t.jobTitle}
					</p>
					<p className="font-semibold break-words">{job?.title}</p>
				</div>
				<div>
					<p className="text-sm font-medium text-muted-foreground">
						{t.companyName}
					</p>
					<p className="font-semibold break-words">{job?.company}</p>
				</div>
				{job?.notes && (
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							{t.notes}
						</p>
						<p className="text-sm break-words whitespace-pre-wrap">
							{job.notes}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}