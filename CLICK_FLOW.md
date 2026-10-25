# Printer-server — กดแล้วโค้ดไปไหน

```mermaid
flowchart LR
  A[กดยืนยันพิมพ์] --> B[StagedPrintForm.svelte: form ?/print]
  B --> C[user/+page.server.ts: actions.print]
  C --> D[getPageCountOfFile.ts]
  D --> E[deductQuota.ts]
  E --> H[(PocketBase: print_jobs)]
  H --> F[submitPrintJob.ts]
  F --> G[CUPS]
  I[กดยกเลิก] --> J[UserJobsTable.svelte: form ?/cancel]
  J --> K[user/+page.server.ts: actions.cancel]
  K --> H
```

| ผู้ใช้ทำอะไร | ตามไฟล์และฟังก์ชัน | ผลลัพธ์ |
| --- | --- | --- |
| เลือกไฟล์และตัวเลือกพิมพ์ | [StagedPrintForm.svelte](src/lib/components/Print-Com/user/StagedPrintForm.svelte) เก็บ staged file, copies, sides, color | ยังไม่ส่งงานไป CUPS |
| กดยืนยันพิมพ์ | `confirmPrint()` → `handleFormSubmit()` ส่ง XHR ไป `?/print` ใน [StagedPrintForm.svelte](src/lib/components/Print-Com/user/StagedPrintForm.svelte) → `actions.print` ใน [user/+page.server.ts](src/routes/user/+page.server.ts) → [getPageCountOfFile.ts](src/lib/server/functions/print/getPageCountOfFile.ts) → [deductQuota.ts](src/lib/server/functions/quota/deductQuota.ts) → สร้าง `print_jobs` → [submitPrintJob.ts](src/lib/server/functions/print/submitPrintJob.ts) | ตรวจไฟล์/โควตา, บันทึกงานก่อนส่ง CUPS; หากส่งล้มเหลวมีทางคืนโควตา |
| กดยกเลิกงาน | form `?/cancel` ใน [UserJobsTable.svelte](src/lib/components/Print-Com/user/UserJobsTable.svelte) → `actions.cancel` ใน [user/+page.server.ts](src/routes/user/+page.server.ts) → [cancelPrintJob.ts](src/lib/server/functions/print/cancelPrintJob.ts) และ [refundQuota.ts](src/lib/server/functions/quota/refundQuota.ts) | เปลี่ยนสถานะงานและคืนโควตาตามเงื่อนไข |
| แอดมินกดปรับโควตา/ระงับงาน | [admin/+page.svelte](src/routes/admin/+page.svelte) → `actions.adjustQuota`/`resetQuota`/`suspend` ใน [admin/+page.server.ts](src/routes/admin/+page.server.ts) | แก้ Quota หรือหยุด print job |

อ่าน [คู่มือระบบ](../Docs/HandOn/printer-server.md) สำหรับ CUPS และกติกา quota
