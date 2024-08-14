// Menambahkan event listener pada form dengan ID 'bmiForm' untuk menangani event submit
document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form dari pengiriman data secara default (refresh page)

    // Mendapatkan nilai berat dan tinggi badan dari input form, lalu mengonversinya menjadi float
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Mengonversi tinggi dari cm ke meter

    // Validasi input untuk memastikan nilai berat dan tinggi valid
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("Masukkan nilai yang valid untuk berat dan tinggi badan."); // Menampilkan alert jika nilai tidak valid
        return; // Menghentikan eksekusi kode jika validasi gagal
    }

    // Menghitung BMI dan mengonversi hasilnya menjadi 1 angka desimal
    const bmi = weight / (height * height);
    const bmiValue = bmi.toFixed(1);

    let category = ''; // Variabel untuk menyimpan kategori BMI
    let advice = '';   // Variabel untuk menyimpan saran berdasarkan kategori BMI
    let second = '';   // Variabel tambahan untuk menyimpan saran lanjutan jika diperlukan

    // Menentukan kategori dan saran berdasarkan nilai BMI
    if (bmi < 18.5) {
        category = 'Kekurangan Berat Badan';
        advice = 'Anda berada di bawah berat badan ideal. Disarankan untuk meningkatkan asupan kalori dan nutrisi.';
        second = 'Disarankan untuk meningkatkan asupan kalori dengan mengonsumsi makanan bergizi seimbang dan berkonsultasi dengan ahli gizi.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Berat Badan Normal';
        advice = 'Berat badan Anda berada dalam kisaran ideal. Pertahankan pola makan dan gaya hidup sehat.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Kelebihan Berat Badan';
        advice = 'Anda memiliki berat badan berlebih. Pertimbangkan untuk mengurangi asupan kalori dan meningkatkan aktivitas fisik.';
    } else {
        category = 'Kegemukan (Obesitas)';
        advice = 'Anda berada dalam kategori obesitas. Disarankan untuk berkonsultasi dengan ahli gizi untuk penanganan lebih lanjut.';
        second = 'Disarankan untuk segera menghubungi dokter atau ahli gizi untuk program penurunan berat badan yang aman dan efektif.';
    }

    // Menghitung rentang BMI rata-rata yang berkisar 1 poin di atas dan di bawah nilai BMI
    const averageRange = {
        start: bmi - 1, 
        end: bmi + 1  
    };

    // Menampilkan nilai BMI dan kategori pada elemen yang sesuai di halaman
    document.querySelector('.bmi-value').textContent = bmiValue;
    document.querySelector('.bmi-category').textContent = category;
    document.getElementById('downloadResult').style.display = 'block'; // Menampilkan tombol download hasil

    // Menyusun dan menampilkan rangkuman hasil BMI termasuk rentang rata-rata dan saran
    const bmiSummary = document.getElementById('bmiSummary');
    bmiSummary.innerHTML = `
        <p>Hasil BMI di antara ${averageRange.start.toFixed(1)} hingga ${averageRange.end.toFixed(1)}.</p>
        <p>${advice}</p>
        ${second ? `<p>${second}</p>` : ''}
    `;
    showBMISuggestions(bmi); // Memanggil fungsi untuk menampilkan saran tambahan berdasarkan BMI
});

// Event listener untuk tombol download hasil BMI sebagai file teks
document.getElementById('downloadResult').addEventListener('click', function () {
    const bmiValueElement = document.querySelector('.bmi-value');
    const bmiCategoryElement = document.querySelector('.bmi-category');
    
    // Menyusun teks hasil BMI dan kategori untuk disimpan dalam file
    const resultText = `Hasil BMI: ${bmiValueElement.textContent}\nKategori: ${bmiCategoryElement.textContent}`;
    
    // Membuat file teks dengan hasil BMI menggunakan Blob
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob); // Membuat URL untuk file
    const a = document.createElement('a'); // Membuat elemen link untuk mengunduh file
    a.href = url;
    a.download = 'BMI_Result.txt'; // Menentukan nama file unduhan
    a.click(); // Memulai unduhan
    URL.revokeObjectURL(url); // Membersihkan URL setelah digunakan
});