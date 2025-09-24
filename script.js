// Simulasi data komentar (dalam aplikasi nyata, ini akan diambil dari database)
let comments = [
    { id: 1, author: "Ahmad", rating: 5, comment: "Website yang sangat berguna! Download video TikTok jadi mudah.", date: "2023-10-15" },
    { id: 2, author: "Sari", rating: 4, comment: "Cepat dan tanpa watermark. Terima kasih!", date: "2023-10-12" },
    { id: 3, author: "Budi", rating: 5, comment: "Sangat membantu untuk konten kreatif saya.", date: "2023-10-10" }
];

// Fungsi untuk menampilkan komentar
function displayComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        
        // Membuat bintang rating
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= comment.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-rating">${stars}</span>
            </div>
            <p>${comment.comment}</p>
            <div class="comment-date">${comment.date}</div>
        `;
        
        commentsList.appendChild(commentElement);
    });
}

// Fungsi untuk menangani rating bintang
function setupStarRating() {
    const stars = document.querySelectorAll('.star-rating i');
    let currentRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            currentRating = rating;
            
            // Update tampilan bintang
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
    });
    
    return {
        getRating: () => currentRating,
        reset: () => {
            currentRating = 0;
            stars.forEach(star => {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            });
        }
    };
}

// Fungsi untuk menangani FAQ
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Tutup semua jawaban lainnya
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                    otherItem.querySelector('.faq-question i').classList.remove('fa-chevron-up');
                    otherItem.querySelector('.faq-question i').classList.add('fa-chevron-down');
                }
            });
            
            // Buka/tutup jawaban yang diklik
            answer.classList.toggle('active');
            const icon = question.querySelector('i');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
        });
    });
}

// Fungsi untuk menangani download video (simulasi)
function setupDownload() {
    const downloadBtn = document.getElementById('download-btn');
    const tiktokUrlInput = document.getElementById('tiktok-url');
    const resultsSection = document.getElementById('results');
    const videoPreview = document.getElementById('video-preview');
    
    downloadBtn.addEventListener('click', function() {
        const url = tiktokUrlInput.value.trim();
        
        if (!url) {
            alert('Silakan masukkan URL video TikTok');
            return;
        }
        
        // Validasi URL TikTok (sederhana)
        if (!url.includes('tiktok.com')) {
            alert('URL tidak valid. Pastikan URL berasal dari TikTok.');
            return;
        }
        
        // Simulasi proses download
        downloadBtn.textContent = 'Memproses...';
        downloadBtn.disabled = true;
        
        // Simulasi delay untuk memproses
        setTimeout(() => {
            // Dalam aplikasi nyata, ini akan mengambil video dari API
            // Di sini kita hanya mensimulasikan dengan video placeholder
            videoPreview.src = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
            resultsSection.style.display = 'block';
            
            // Scroll ke hasil
            resultsSection.scrollIntoView({ behavior: 'smooth' });
            
            // Reset tombol
            downloadBtn.textContent = 'Download Video';
            downloadBtn.disabled = false;
        }, 2000);
    });
    
    // Tombol download opsi
    document.getElementById('download-hd').addEventListener('click', function() {
        alert('Download HD akan dimulai. Dalam aplikasi nyata, ini akan mengunduh file video.');
    });
    
    document.getElementById('download-sd').addEventListener('click', function() {
        alert('Download SD akan dimulai. Dalam aplikasi nyata, ini akan mengunduh file video.');
    });
    
    document.getElementById('download-audio').addEventListener('click', function() {
        alert('Download Audio akan dimulai. Dalam aplikasi nyata, ini akan mengunduh file audio.');
    });
}

// Fungsi untuk menangani pengiriman rating dan komentar
function setupRatingSubmission(starRating) {
    const submitBtn = document.getElementById('submit-rating');
    const commentText = document.getElementById('comment-text');
    
    submitBtn.addEventListener('click', function() {
        const rating = starRating.getRating();
        const comment = commentText.value.trim();
        
        if (rating === 0) {
            alert('Silakan beri rating dengan mengklik bintang.');
            return;
        }
        
        if (!comment) {
            alert('Silakan tulis ulasan Anda.');
            return;
        }
        
        // Simulasi pengiriman data (dalam aplikasi nyata, ini akan dikirim ke server)
        const newComment = {
            id: comments.length + 1,
            author: 'Pengguna Baru', // Dalam aplikasi nyata, ini akan diambil dari login/user
            rating: rating,
            comment: comment,
            date: new Date().toISOString().split('T')[0] // Format YYYY-MM-DD
        };
        
        comments.unshift(newComment); // Tambahkan di awal array
        displayComments(); // Perbarui tampilan komentar
        
        // Reset form
        starRating.reset();
        commentText.value = '';
        
        alert('Terima kasih atas ulasan Anda!');
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan komentar yang ada
    displayComments();
    
    // Setup rating bintang
    const starRating = setupStarRating();
    
    // Setup FAQ
    setupFAQ();
    
    // Setup download
    setupDownload();
    
    // Setup pengiriman rating
    setupRatingSubmission(starRating);
    
    // Smooth scroll untuk navigasi
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});