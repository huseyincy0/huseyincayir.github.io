// Portfolyo sitesi için ana JavaScript dosyası
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            
            // İkon değiştirme
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (menu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Menü linklerine tıklandığında menüyü kapat
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    menu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }
    
    // Yumuşak kaydırma için
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Mobil cihazlarda menü yüksekliğini hesaba kat
                const offset = window.innerWidth < 768 ? 70 : 80;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll olayında header stilini değiştir
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('bg-white/95', 'backdrop-blur-sm');
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('bg-white/95', 'backdrop-blur-sm');
                if (window.innerWidth > 768) {
                    header.classList.remove('shadow-md');
                }
            }
        });
    }
    
    // Sayfa bölümlerine girince animasyon ekle
    const sections = document.querySelectorAll('section');
    const animateOnScroll = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75 && !section.classList.contains('animated')) {
                section.classList.add('animate-fade-in', 'animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // İlk yükleme için çalıştır
    
    // Form gönderimi
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini topla
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Normalde burada bir API çağrısı yapılırdı
            console.log('Form verileri:', formValues);
            
            // Başarılı gönderim mesajı 
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.disabled = true;
            button.textContent = 'Gönderiliyor...';
            
            // API çağrısını taklit et
            setTimeout(() => {
                button.textContent = 'Gönderildi!';
                button.classList.remove('bg-primary');
                button.classList.add('bg-green-500');
                
                // Formu sıfırla
                this.reset();
                
                // Butonu eski haline getir
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('bg-green-500');
                    button.classList.add('bg-primary');
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Responsive görünüm için ekran boyutu değişikliğini izle
    window.addEventListener('resize', function() {
        // Ekran genişliği 768px'in üzerine çıktığında açık menüyü kapat
        if (window.innerWidth >= 768 && menu.classList.contains('active')) {
            menu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}); 