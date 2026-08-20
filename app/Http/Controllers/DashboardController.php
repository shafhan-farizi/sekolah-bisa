<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function index(Request $request) {
        $user = Auth::user()->load('students.teacher');

        if($user->students->isEmpty()) {
            return Inertia::render('Dashboard', [
                'guardian' => $user,
                'studentsList' => [],
                'selectedStudent' => null,
                'unpaidInvoices' => [],
                'totalUnpaid' => 0
            ]);
        }

        // Ambil ID siswa yang dipilih, default ke siswa pertama
        $selectedStudentId = $request->query('student_id', $user->students->first());

        $selectedStudent = $user->students->firstWhere('id', $selectedStudentId) ?? $user->students->first();

        $unpaidInvoices = Invoice::whereStudentId($selectedStudent->id)
            ->whereStatus('UNPAID')
            ->orderBy('due_date')
            ->get();

        $paidInvoices = Invoice::whereStudentId($selectedStudent->id)
            ->whereStatus('PAID')
            ->orderBy('paid_at', 'desc')
            ->get();

        $totalUnpaid = $unpaidInvoices->sum('amount');

        $lastPaid = Invoice::whereStudentId($selectedStudent->id)
            ->whereStatus('PAID')
            ->orderBy('paid_at', 'desc')
            ->first()
            ->paid_at;

        return Inertia::render('Dashboard', [
            'guardian' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone_number,
                'gender' => $user->gender
            ],
            'studentsList' => $user->students->map(fn($s) => [
                'id' => $s->id,
                'full_name' => $s->full_name,
                'nisn' => $s->nisn,
                'class_name' => $s->class_name
            ]),
            'selectedStudent' => [
                'id' => $selectedStudent->id,
                'full_name' => $selectedStudent->full_name,
                'nisn' => $selectedStudent->nisn,
                'class_name' => $selectedStudent->class_name,
                'gender' => $selectedStudent->gender,
                'birth_place' => $selectedStudent->birth_place,
                'birth_date' => $selectedStudent->birth_date,
                'address' => $selectedStudent->address,
                'academic_year' => $selectedStudent->academic_year,
                'homeroom_teacher' => $selectedStudent->teacher ? [
                    'name' => $selectedStudent->teacher->full_name,
                    'title' => $selectedStudent->teacher->title,
                    'gender' => $selectedStudent->teacher->gender
                ] : null
            ],
            'lastPaid' => $lastPaid,
            'unpaidInvoices' => $unpaidInvoices,
            'paidInvoices' => $paidInvoices,
            'totalUnpaid' => $totalUnpaid
        ]);
    }
}
