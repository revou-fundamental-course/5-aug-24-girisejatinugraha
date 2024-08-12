document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; 

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("Masukkan nilai yang valid untuk berat dan tinggi badan.");
        return;
    }

    const bmi = weight / (height * height);
    const bmiValue = bmi.toFixed(1);

    let category = '';
    let advice = '';
    let second = '';

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

    const averageRange = {
        start: bmi - 1, 
        end: bmi + 1  
    };

    document.querySelector('.bmi-value').textContent = bmiValue;
    document.querySelector('.bmi-category').textContent = category;
    document.getElementById('downloadResult').style.display = 'block';

    const bmiSummary = document.getElementById('bmiSummary');
    bmiSummary.innerHTML = `
        <p>Hasil BMI di antara ${averageRange.start.toFixed(1)} hingga ${averageRange.end.toFixed(1)}.</p>
        <p>${advice}</p>
        ${second ? `<p>${second}</p>` : ''}
    `;
    showBMISuggestions(bmi);
});

document.getElementById('downloadResult').addEventListener('click', function () {
    const bmiValueElement = document.querySelector('.bmi-value');
    const bmiCategoryElement = document.querySelector('.bmi-category');
    const resultText = `Hasil BMI: ${bmiValueElement.textContent}\nKategori: ${bmiCategoryElement.textContent}`;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BMI_Result.txt';
    a.click();
    URL.revokeObjectURL(url);
});