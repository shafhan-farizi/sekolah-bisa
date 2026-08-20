<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function downloadReceipt(Invoice $invoice)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Validasi Keamanan: Pastikan tagihan ini milik anak dari user yang sedang login
        if ($invoice->student->user_id !== $user->id) {
            abort(403, 'Anda tidak memiliki akses ke kuitansi ini.');
        }

        // 2. Pastikan tagihan berstatus PAID
        if ($invoice->status !== 'PAID') {
            abort(400, 'Tagihan belum lunas, kuitansi belum tersedia.');
        }

        // 3. Eager load relasi yang dibutuhkan template
        $invoice->load('student.user');

        // 4. Render PDF
        $pdf = Pdf::loadView('pdf.receipt', compact('invoice'))
            ->setPaper('a5', 'landscape');

        // 5. Download langsung / buka di tab browser
        $fileName = 'Kuitansi_' . str_replace(' ', '_', $invoice->title) . '_' . $invoice->student->nis . '.pdf';

        // Gunakan ->stream() jika ingin preview di browser, atau ->download() jika ingin langsung terunduh
        return $pdf->stream($fileName);
    }
}
