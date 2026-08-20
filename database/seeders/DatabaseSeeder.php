<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Student;
use App\Models\Invoice;
use App\Models\Teacher;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ---------------------------------------------------------------------
        // 1. Data Akun Wali Murid
        // ---------------------------------------------------------------------
        $guardian = User::create([
            'name'         => 'Rina Rianty',
            'email'        => 'wali@gmail.com',
            'phone_number' => '081234567890',
            'gender'       => 'Perempuan',
            'password'     => Hash::make('password'),
        ]);

        // ---------------------------------------------------------------------
        // 2. Data Dewan Guru & Wali Kelas
        // ---------------------------------------------------------------------
        $teacher1 = Teacher::create([
            'nip'                    => '198801122015011001',
            'full_name'              => 'Ahmad Fauzi',
            'title'                  => 'S.Pd.I',
            'gender'                 => 'Laki-laki',
            'phone_number'           => '081234567891',
            'email'                  => 'ahmad.fauzi@bisa.sch.id',
            'subject_specialization' => 'Tahfidz Al-Qur\'an',
            'is_active'              => true,
        ]);

        $teacher2 = Teacher::create([
            'nip'                    => '199203152018022002',
            'full_name'              => 'Siti Maryam',
            'title'                  => 'S.Pd',
            'gender'                 => 'Perempuan',
            'phone_number'           => '089876543210',
            'email'                  => 'siti.maryam@bisa.sch.id',
            'subject_specialization' => 'Tematik & Bahasa Arab',
            'is_active'              => true,
        ]);

        $teacher3 = Teacher::create([
            'nip'                    => '198507202012031003',
            'full_name'              => 'Muhammad Ridwan',
            'title'                  => 'Lc., M.Ag',
            'gender'                 => 'Laki-laki',
            'phone_number'           => '085711223344',
            'email'                  => 'm.ridwan@bisa.sch.id',
            'subject_specialization' => 'Diniyyah & Sirah Nabawiyah',
            'is_active'              => true,
        ]);

        // ---------------------------------------------------------------------
        // 3. Anak ke-1: Aisyah Nur Ramadhani (Kelas 7A - SMP)
        // ---------------------------------------------------------------------
        $student1 = Student::create([
            'user_id'                 => $guardian->id,
            'teacher_id'              => $teacher1->id,
            'nis'                     => '231456',
            'nisn'                    => '0056781234',
            'full_name'               => 'Aisyah Nur Ramadhani',
            'class_name'              => '7A',
            'academic_year'           => '2025/2026',
            'gender'                  => 'Perempuan',
            'birth_place'             => 'Depok',
            'birth_date'              => '2013-08-12',
            'address'                 => 'Jl. Kh abdul Hamid, Kp. Sirnasari, RT.006/RW.002, Gn. Sari, Kec. Pamijahan, Kabupaten Bogor, Jawa Barat 16810',
        ]);

        $invoicesStudent1 = [
            [
                'invoice_number' => null,
                'title'          => 'SPP Bulan Agustus 2026',
                'amount'         => 350000,
                'due_date'       => '2026-08-10',
                'status'         => 'UNPAID',
                'paid_at'        => null,
            ],
            [
                'invoice_number' => null,
                'title'          => 'SPP Bulan Juli 2026',
                'amount'         => 350000,
                'due_date'       => '2026-07-10',
                'status'         => 'UNPAID',
                'paid_at'        => null,
            ],
            [
                'invoice_number' => null,
                'title'          => 'Paket Buku & Modul Diniyyah Kls 7',
                'amount'         => 450000,
                'due_date'       => '2026-07-20',
                'status'         => 'UNPAID',
                'paid_at'        => null,
            ],
            [
                'invoice_number' => 'INV/2026/06/231456/00004',
                'title'          => 'SPP Bulan Juni 2026',
                'amount'         => 350000,
                'due_date'       => '2026-06-10',
                'status'         => 'PAID',
                'paid_at'        => '2026-06-08',
            ],
            [
                'invoice_number' => 'INV/2026/05/231456/00005',
                'title'          => 'Infaq Pembangunan Gedung (Cicilan 3)',
                'amount'         => 500000,
                'due_date'       => '2026-05-25',
                'status'         => 'PAID',
                'paid_at'        => '2026-05-20',
            ],
            [
                'invoice_number' => 'INV/2026/05/231456/00006',
                'title'          => 'SPP Bulan Mei 2026',
                'amount'         => 350000,
                'due_date'       => '2026-05-10',
                'status'         => 'PAID',
                'paid_at'        => '2026-05-09',
            ],
        ];

        foreach ($invoicesStudent1 as $inv) {
            Invoice::create(array_merge(['student_id' => $student1->id], $inv));
        }

        // ---------------------------------------------------------------------
        // 4. Anak ke-2: Abdullah Ramadhani (Kelas 1B - SD)
        // ---------------------------------------------------------------------
        $student2 = Student::create([
            'user_id'                 => $guardian->id,
            'teacher_id'              => $teacher2->id,
            'nis'                     => '251890',
            'nisn'                    => '0078901234',
            'full_name'               => 'Abdullah Ramadhani',
            'class_name'              => '1B',
            'academic_year'           => '2025/2026',
            'gender'                  => 'Laki-laki',
            'birth_place'             => 'Bogor',
            'birth_date'              => '2019-03-25',
            'address'                 => 'Jl. Kh abdul Hamid, Kp. Sirnasari, RT.006/RW.002, Gn. Sari, Kec. Pamijahan, Kabupaten Bogor, Jawa Barat 16810',
        ]);

        $invoicesStudent2 = [
            [
                'invoice_number' => null,
                'title'          => 'SPP Bulan Agustus 2026',
                'amount'         => 300000,
                'due_date'       => '2026-08-10',
                'status'         => 'UNPAID',
                'paid_at'        => null,
            ],
            [
                'invoice_number' => 'INV/2026/07/251890/00008',
                'title'          => 'Seragam Sekolah & Atribut Lengkap',
                'amount'         => 650000,
                'due_date'       => '2026-07-15',
                'status'         => 'PAID',
                'paid_at'        => '2026-07-12',
            ],
            [
                'invoice_number' => 'INV/2026/07/251890/00009',
                'title'          => 'SPP Bulan Juli 2026',
                'amount'         => 300000,
                'due_date'       => '2026-07-10',
                'status'         => 'PAID',
                'paid_at'        => '2026-07-05',
            ],
        ];

        foreach ($invoicesStudent2 as $inv) {
            Invoice::create(array_merge(['student_id' => $student2->id], $inv));
        }

        // ---------------------------------------------------------------------
        // 5. Anak ke-3: Maryam Khadijah (Kelas 4C - SD)
        // ---------------------------------------------------------------------
        $student3 = Student::create([
            'user_id'                 => $guardian->id,
            'teacher_id'              => $teacher3->id,
            'nis'                     => '241102',
            'nisn'                    => '0061234567',
            'full_name'               => 'Maryam Khadijah',
            'class_name'              => '4C',
            'academic_year'           => '2025/2026',
            'gender'                  => 'Perempuan',
            'birth_place'             => 'Bogor',
            'birth_date'              => '2016-11-02',
            'address'                 => 'Jl. Kh abdul Hamid, Kp. Sirnasari, RT.006/RW.002, Gn. Sari, Kec. Pamijahan, Kabupaten Bogor, Jawa Barat 16810',
        ]);

        $invoicesStudent3 = [
            [
                'invoice_number' => 'INV/2026/08/241102/00010',
                'title'          => 'SPP Bulan Agustus 2026',
                'amount'         => 320000,
                'due_date'       => '2026-08-10',
                'status'         => 'PAID',
                'paid_at'        => '2026-08-02',
            ],
            [
                'invoice_number' => 'INV/2026/07/241102/00011',
                'title'          => 'Rihlah & Outing Class Semester 1',
                'amount'         => 200000,
                'due_date'       => '2026-07-28',
                'status'         => 'PAID',
                'paid_at'        => '2026-07-20',
            ],
            [
                'invoice_number' => 'INV/2026/07/241102/00012',
                'title'          => 'SPP Bulan Juli 2026',
                'amount'         => 320000,
                'due_date'       => '2026-07-10',
                'status'         => 'PAID',
                'paid_at'        => '2026-07-04',
            ],
        ];

        foreach ($invoicesStudent3 as $inv) {
            Invoice::create(array_merge(['student_id' => $student3->id], $inv));
        }
    }
}