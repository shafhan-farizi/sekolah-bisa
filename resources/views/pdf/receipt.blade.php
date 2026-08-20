<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Kuitansi_{{ $invoice->id }}_{{ $invoice->student->nis }}</title>
    <style>
        @page {
            margin: 25px 30px;
            size: A5 landscape;
            /* Kuitansi landscape ukuran ringkas A5 */
        }

        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #2D3748;
            font-size: 11px;
            line-height: 1.4;
        }

        .header {
            border-bottom: 2px solid #065F46;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }

        .header table {
            width: 100%;
        }

        .school-title {
            font-size: 16px;
            font-weight: bold;
            color: #065F46;
            margin: 0;
            text-transform: uppercase;
        }

        .school-subtitle {
            font-size: 8.5px;
            color: #718096;
            margin: 2px 0 0 0;
        }

        .receipt-badge {
            background-color: #ECFDF5;
            color: #065F46;
            border: 1px solid #A7F3D0;
            padding: 4px 10px;
            font-weight: bold;
            font-size: 11px;
            text-align: right;
            border-radius: 4px;
            display: inline-block;
        }

        .info-table {
            width: 100%;
            margin-bottom: 15px;
        }

        .info-table td {
            vertical-align: top;
            padding: 2px 0;
        }

        .item-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        .item-table th {
            background-color: #F7FAFC;
            color: #2D3748;
            border-top: 1px solid #E2E8F0;
            border-bottom: 1px solid #CBD5E0;
            padding: 6px 8px;
            text-align: left;
            font-size: 10px;
            text-transform: uppercase;
        }

        .item-table td {
            padding: 8px;
            border-bottom: 1px solid #E2E8F0;
        }

        .total-box {
            background-color: #F0FDF4;
            border: 1px solid #BBF7D0;
            padding: 8px 12px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .footer-table {
            width: 100%;
            margin-top: 10px;
        }

        .stamp-box {
            text-align: center;
            width: 180px;
        }

        .watermark-paid {
            color: #059669;
            font-weight: bold;
            font-size: 14px;
            border: 2px dashed #059669;
            padding: 4px 12px;
            display: inline-block;
            transform: rotate(-5deg);
            border-radius: 6px;
        }
    </style>
</head>

<body>

    <!-- Header Sekolah -->
    <div class="header">
        <table>
            <tr>
                <td style="width: 65%;">
                    <h1 class="school-title">SDIT BISA BOGOR</h1>
                    <p class="school-subtitle">
                        Jl. Kh Abdul Hamid, Kp. Sirnasari, Gn. Sari, Kec. Pamijahan, Kab. Bogor, Jawa Barat<br>
                        Email: tatausaha@bisa.sch.id | WhatsApp: 0812-3456-7890
                    </p>
                </td>
                <td style="width: 35%; text-align: right;">
                    <div class="receipt-badge">BUKTI PEMBAYARAN SAH</div>
                    <div style="font-size: 9px; color: #718096; margin-top: 4px;">
                        No. Ref: <strong>{{ $invoice->invoice_number }}</strong>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Informasi Siswa & Pembayaran -->
    <table class="info-table">
        <tr>
            <td style="width: 18%; font-weight: bold; color: #718096;">Telah Terima Dari</td>
            <td style="width: 2%;">:</td>
            <td style="width: 35%; font-weight: bold;">{{ $invoice->student->user->name ?? 'Wali Murid' }}</td>

            <td style="width: 18%; font-weight: bold; color: #718096;">Tanggal Bayar</td>
            <td style="width: 2%;">:</td>
            <td style="width: 25%;">{{ \Carbon\Carbon::parse($invoice->paid_at)->translatedFormat('d F Y') }}</td>
        </tr>
        <tr>
            <td style="font-weight: bold; color: #718096;">Nama Siswa</td>
            <td>:</td>
            <td style="font-weight: bold; color: #065F46;">{{ $invoice->student->full_name }}</td>

            <td style="font-weight: bold; color: #718096;">Kelas / NISN</td>
            <td>:</td>
            <td>{{ $invoice->student->class_name }} / {{ $invoice->student->nisn }}</td>
        </tr>
    </table>

    <!-- Rincian Tagihan -->
    <table class="item-table">
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 65%;">Deskripsi Pembayaran</th>
                <th style="width: 30%; text-align: right;">Jumlah</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>
                    <strong>{{ $invoice->title }}</strong><br>
                    <span style="font-size: 9px; color: #718096;">Tahun Ajaran:
                        {{ $invoice->student->academic_year }}</span>
                </td>
                <td style="text-align: right; font-weight: bold;">
                    Rp {{ number_format($invoice->amount, 0, ',', '.') }}
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Total & Status Lunas -->
    <div class="total-box">
        <table style="width: 100%;">
            <tr>
                <td style="font-size: 11px; font-weight: bold; color: #065F46;">
                    TOTAL PEMBAYARAN:
                </td>
                <td style="text-align: right; font-size: 14px; font-weight: bold; color: #065F46;">
                    Rp {{ number_format($invoice->amount, 0, ',', '.') }}
                </td>
            </tr>
        </table>
    </div>

    <!-- Tanda Tangan & Footer -->
    <table class="footer-table">
        <tr>
            <td style="width: 60%; vertical-align: middle;">
                <div class="watermark-paid">LUNAS / VERIFIED</div>
                <p style="font-size: 8px; color: #A0AEC0; margin-top: 8px;">
                    *Dokumen ini merupakan bukti pembayaran elektronik resmi yang sah dan diterbitkan secara otomatis
                    oleh Portal SDIT BISA BOGOR.
                </p>
            </td>
            <td class="stamp-box" style="width: 40%; text-align: center;">
                <p style="margin: 0; font-size: 9px; color: #718096;">
                    Bogor, {{ \Carbon\Carbon::parse($invoice->paid_at)->translatedFormat('d F Y') }}
                </p>
                <p style="margin: 2px 0 6px 0; font-weight: bold;">Bendahara SDIT BISA</p>

                <!-- TARUH STEMPEL DI SINI -->
                <!-- Stempel Kotak Resmi Stabil untuk DomPDF -->
                <div
                    style="display: inline-block;
    border: 2px solid #065F46;
    border-radius: 4px;
    padding: 3px;
    transform: rotate(-7deg);
    margin: 4px 0 8px 0;
">
                    <div
                        style="
        border: 1px dashed #065F46;
        border-radius: 2px;
        padding: 4px 10px;
        text-align: center;
        color: #065F46;
    ">
                        <div
                            style="font-size: 7px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">
                            SDIT BISA BOGOR
                        </div>
                        <div style="font-size: 11px; font-weight: bold; margin: 1px 0; letter-spacing: 1px;">
                            - LUNAS -
                        </div>
                        <div style="font-size: 6.5px; font-weight: bold; letter-spacing: 0.5px;">
                            BAGIAN KEUANGAN
                        </div>
                    </div>
                </div>

                <br>
                <p
                    style="margin: 0; font-weight: bold; border-top: 1px solid #CBD5E0; display: inline-block; padding-top: 3px;">
                    ( Bagian Keuangan )
                </p>
            </td>
        </tr>
    </table>

</body>

</html>
