<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tabel User / Wali Murid
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');             // Contoh: "Ummu Rina"
            $table->string('email')->unique();  // Contoh: "wali@gmail.com"
            $table->string('phone_number');     // Contoh: "0812 3456 7890"
            $table->enum('gender', ['Laki-laki', 'Perempuan']);     
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('nip', 30)->unique()->nullable(); // Nomor Induk Pegawai
            $table->string('full_name', 100);
            $table->string('title', 30)->nullable();          // Gelar, misal: S.Pd.I, S.Pd
            $table->enum('gender', ['Laki-laki', 'Perempuan']);               // L = Ikhwan, P = Akhwat
            $table->string('phone_number', 20)->nullable();   // Nomor WhatsApp Wali Kelas
            $table->string('email', 100)->unique()->nullable();
            $table->string('subject_specialization', 100)->nullable(); // Misal: Tahfidz, PAI, Tematik
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Tabel Data Siswa / Anak
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teacher_id')->constrained()->cascadeOnDelete();
            $table->string('nis', 20)->unique();
            $table->string('nisn', 20)->unique();
            $table->string('full_name');
            $table->string('class_name');       // Contoh: "7A"
            $table->string('academic_year');    // Contoh: "2025/2026"
            $table->enum('gender', ['Laki-laki', 'Perempuan']);           // Contoh: "Perempuan"
            $table->string('birth_place');      // Contoh: "Depok"
            $table->date('birth_date');         // Contoh: "2013-08-12"
            $table->text('address');
            $table->timestamps();
        });

        // Tabel Tagihan Siswa
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->nullable()->unique();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('title');            // Contoh: "SPP Bulan Juli 2026"
            $table->integer('amount');          // Disimpan integer murni (350000)
            $table->date('due_date');           // Contoh: "2026-07-01"
            $table->enum('status', ['UNPAID', 'PAID'])->default('UNPAID');
            $table->date('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('students');
        Schema::dropIfExists('users');
        Schema::dropIfExists('teachers');
    }
};