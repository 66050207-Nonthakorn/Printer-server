<script lang="ts">
	import { CheckCircle2, Clock3, FileText, Printer, Users } from '@lucide/svelte';

	let { stats }: {
		stats: {
			users: number;
			jobs: number;
			jobsToday: number;
			activeJobs: number;
			completedJobs: number;
			failedJobs: number;
			pagesThisMonth: number;
			pagesThisYear: number;
		};
	} = $props();

	const cards = $derived([
		{ label: 'ผู้ใช้ทั้งหมด', value: stats.users, detail: 'บัญชีในระบบ', Icon: Users, color: 'text-accent' },
		{ label: 'งานพิมพ์ทั้งหมด', value: stats.jobs, detail: `วันนี้ ${stats.jobsToday} งาน`, Icon: FileText, color: 'text-accent' },
		{ label: 'กำลังดำเนินการ', value: stats.activeJobs, detail: 'รอคิว / กำลังพิมพ์', Icon: Printer, color: 'text-warning' },
		{ label: 'พิมพ์สำเร็จ', value: stats.completedJobs, detail: `ผิดพลาด ${stats.failedJobs} งาน`, Icon: CheckCircle2, color: 'text-success' },
		{ label: 'หน้าที่พิมพ์เดือนนี้', value: stats.pagesThisMonth, detail: 'เฉพาะงานพิมพ์สำเร็จ', Icon: FileText, color: 'text-accent' },
		{ label: 'หน้าที่พิมพ์ปีนี้', value: stats.pagesThisYear, detail: 'เฉพาะงานพิมพ์สำเร็จ', Icon: Clock3, color: 'text-secondary-app' }
	]);
</script>

<section class="mb-8" aria-labelledby="admin-stats-title">
	<div class="mb-3 flex items-center gap-2">
		<h1 id="admin-stats-title" class="text-lg font-semibold tracking-tight text-fg-app">ภาพรวมระบบ</h1>
		<span class="text-xs text-muted-app">อัปเดตเมื่อเปิดหรือรีโหลดหน้า</span>
	</div>
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
		{#each cards as card}
			{@const Icon = card.Icon}
			<article class="rounded-xl border border-app bg-surface p-4 shadow-sm">
				<div class="flex items-start justify-between gap-3">
					<div>
						<p class="text-xs text-muted-app">{card.label}</p>
						<p class="mt-1 text-2xl font-semibold tracking-tight text-fg-app">{card.value.toLocaleString()}</p>
					</div>
					<Icon class={`h-5 w-5 ${card.color}`} aria-hidden="true" />
				</div>
				<p class="mt-2 text-xs text-secondary-app">{card.detail}</p>
			</article>
		{/each}
	</div>
</section>
