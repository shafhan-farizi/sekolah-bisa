<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceSyncController extends Controller
{
    public function markAsPaid(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'secret_key' => 'required|string',
        ]);

        // Verifikasi token keamanan sederhana
        if ($validated['secret_key'] !== env('N8N_API_SECRET', 'sdit-bisa-secret-2026')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $invoice = Invoice::with('student.user')->findOrFail($validated['invoice_id']);

        if ($invoice->status === 'PAID') {
            return response()->json([
                'message'        => 'Tagihan sudah berstatus lunas sebelumnya.',
                'invoice_number' => $invoice->invoice_number,
                'status'         => 'ALREADY_PAID',
            ]);
        }

        $paidDate = Carbon::now();
        $year     = $paidDate->format('Y');
        $month    = $paidDate->format('m');
        $nis      = $invoice->student->nis ?? '0000';
        $paddedId = str_pad($invoice->id, 5, '0', STR_PAD_LEFT);

        // Format No. Kuitansi: INV/2026/08/231456/00001
        $invoiceNumber = "INV/{$year}/{$month}/{$nis}/{$paddedId}";

        $invoice->update([
            'status'         => 'PAID',
            'paid_at'        => $paidDate,
            'invoice_number' => $invoiceNumber,
        ]);

        return response()->json([
            'success'        => true,
            'message'        => 'Status berhasil diperbarui menjadi lunas.',
            'invoice_id'     => $invoice->id,
            'invoice_number' => $invoiceNumber,
            'paid_at'        => $paidDate->translatedFormat('d F Y'),
            'student_name'   => $invoice->student->full_name,
            'user_name'  => $invoice->student->user->name,
            'user_phone' => $invoice->student->user->phone_number,
            'title'          => $invoice->title,
            'amount'         => $invoice->amount,
            'formatted_amount' => 'Rp ' . number_format($invoice->amount, 0, ',', '.'),
        ]);
    }
}