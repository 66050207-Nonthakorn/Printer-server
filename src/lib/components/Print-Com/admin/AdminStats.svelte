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
			topPrinters: Array<{ userId: string; name: string; email: string; pages: number; jobs: number }>;
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

	<div class="mt-4 rounded-xl border border-app bg-surface p-4 shadow-sm">
		<div class="mb-3 flex items-center justify-between gap-3">
			<div>
				<h2 class="text-sm font-semibold text-fg-app">ผู้ใช้ที่พิมพ์มากที่สุด</h2>
				<p class="text-xs text-muted-app">เรียงตามจำนวนหน้าที่พิมพ์สำเร็จสะสม</p>
			</div>
		</div>
		{#if stats.topPrinters.length > 0}
			<div class="overflow-x-auto">
				<table class="w-full min-w-[520px] text-left text-sm">
					<thead class="border-b border-app text-xs text-muted-app">
						<tr><th class="px-2 py-2">อันดับ</th><th class="px-2 py-2">ผู้ใช้</th><th class="px-2 py-2 text-right">งาน</th><th class="px-2 py-2 text-right">หน้า</th></tr>
					</thead>
					<tbody>
						{#each stats.topPrinters as printer, index (printer.userId)}
							<tr class="border-b border-app/60 last:border-0">
								<td class="px-2 py-2 font-semibold text-accent">{index + 1}</td>
								<td class="px-2 py-2"><div class="font-medium text-fg-app">{printer.name}</div><div class="text-xs text-muted-app">{printer.email}</div></td>
								<td class="px-2 py-2 text-right tabular-nums text-secondary-app">{printer.jobs.toLocaleString()}</td>
								<td class="px-2 py-2 text-right font-semibold tabular-nums text-fg-app">{printer.pages.toLocaleString()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<p class="py-6 text-center text-sm text-muted-app">ยังไม่มีงานพิมพ์ที่สำเร็จ</p>
		{/if}
	</div>
</section>
