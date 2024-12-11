// 監聽滾動事件，添加導覽列陰影效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// 視差滾動效果
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    hero.style.backgroundPosition = `${50 + mouseX * 10}% ${50 + mouseY * 10}%`;
});

// 漢堡選單控制
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 點擊導覽項目時關閉選單
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// 添加滾動顯示動畫
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// 監聽 hero-content 中的元素
document.querySelectorAll('.hero-content > *').forEach(element => {
    element.classList.add('fade-up');
    observer.observe(element);
});

// 添加相應的 CSS 動畫
const fadeUpAnimation = `
    .fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-up.show {
        opacity: 1;
        transform: translateY(0);
    }
`;

// 將動畫 CSS 添加到頁面
const style = document.createElement('style');
style.textContent = fadeUpAnimation;
document.head.appendChild(style);

// 添加圖片載入檢查
window.addEventListener('load', () => {
    const logo = document.querySelector('.logo-img');
    const hero = document.querySelector('.hero');
    
    // 檢查 logo 載入狀態
    if (logo) {
        logo.addEventListener('error', () => {
            console.error('Logo 圖片載入失敗');
        });
    }
    
    // 檢查背景圖片載入狀態
    const bgImg = new Image();
    bgImg.src = 'images/coffee-bg.jpg';
    bgImg.addEventListener('error', () => {
        console.error('背景圖片載入失敗');
    });

    // 檢查 logo 載入狀態
    const logoImg = new Image();
    logoImg.src = 'images/logo.png';
});

// 監聽滾動，控制背景和內容的顯示
const aboutSection = document.querySelector('.about-section');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // 控制背景透明度
            const scrollProgress = window.scrollY / (window.innerHeight * 0.5);
            const background = entry.target.querySelector('.about-background');
            if (background) {
                background.style.opacity = Math.max(0.2, 0.4 - scrollProgress * 0.4);
            }
            // 修改內容的淡入效果
            const container = entry.target.querySelector('.about-container');
            if (container) {
                container.style.opacity = 1; // 保持完全不透明
                container.style.transform = 'translateY(0)';
            }
        }
    });
}, {
    threshold: 0.2
});

aboutObserver.observe(aboutSection);

// 監聽滾動事件來控制背景淡出
window.addEventListener('scroll', () => {
    if (aboutSection.classList.contains('active')) {
        const rect = aboutSection.getBoundingClientRect();
        const scrollProgress = Math.max(0, -rect.top) / (window.innerHeight * 0.5);
        const background = aboutSection.querySelector('.about-background');
        if (background) {
            background.style.opacity = Math.max(0.2, 0.4 - scrollProgress * 0.4);
        }
        // 保持內容完全可見
        const container = aboutSection.querySelector('.about-container');
        if (container) {
            container.style.opacity = 1;
            container.style.transform = 'translateY(0)';
        }
    }
});

// 添加聯繫頁面的動畫效果
document.addEventListener('DOMContentLoaded', () => {
    // 檢查是否在聯繫頁面
    if (document.querySelector('.contact-section')) {
        // 添加進入動畫
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });

        // 地圖點擊效果
        const map = document.querySelector('.contact-map');
        if (map) {
            map.addEventListener('click', () => {
                map.style.position = map.style.position === 'fixed' ? 'relative' : 'fixed';
                map.style.top = map.style.position === 'fixed' ? '50%' : '';
                map.style.left = map.style.position === 'fixed' ? '50%' : '';
                map.style.transform = map.style.position === 'fixed' ? 
                    'translate(-50%, -50%) scale(1.5)' : '';
                map.style.zIndex = map.style.position === 'fixed' ? '1000' : '';
                map.style.width = map.style.position === 'fixed' ? '90vw' : '';
                map.style.height = map.style.position === 'fixed' ? '80vh' : '';
            });
        }
    }
});

// 商品頁面的進階動畫效果
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.products-section')) {
        // 初始動畫
        setTimeout(() => {
            document.querySelector('.hero-title').classList.add('active');
        }, 500);

        // 滾動動畫
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // 特殊處理文字動畫
                    if (entry.target.classList.contains('intro-text')) {
                        const text = entry.target.querySelector('p');
                        text.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '-50px'
        });

        // 監聽需要動畫的元素
        document.querySelectorAll('.intro-text, .showcase-image, .detail-item, .footer-content').forEach(el => {
            scrollObserver.observe(el);
        });

        // 滾動視差效果增強
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const direction = scrollTop > lastScrollTop ? 'down' : 'up';
            
            // 視差圖片效果
            const parallaxImage = document.querySelector('.parallax-image');
            if (parallaxImage) {
                const speed = direction === 'down' ? 0.5 : -0.5;
                const offset = (scrollTop - lastScrollTop) * speed;
                const currentTransform = getComputedStyle(parallaxImage).transform;
                const matrix = new DOMMatrix(currentTransform);
                const currentY = matrix.m42;
                parallaxImage.style.transform = `translate3d(0, ${currentY + offset}px, 0)`;
            }

            lastScrollTop = scrollTop;
        }, { passive: true });

        // 滑鼠移動效果
        document.querySelector('.product-hero').addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xOffset = (clientX - innerWidth / 2) * 0.02;
            const yOffset = (clientY - innerHeight / 2) * 0.02;
            
            const heroImage = document.querySelector('.hero-image');
            heroImage.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });

        // 細節圖片懸停效果
        document.querySelectorAll('.detail-item').forEach(item => {
            item.addEventListener('mouseenter', function(e) {
                const { left, top, width, height } = this.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                
                const image = this.querySelector('.detail-image');
                image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        // 立即添加 active 類
        heroTitle.classList.add('active');
    }
});

// 監聽商品展示圖片
document.addEventListener('DOMContentLoaded', () => {
    const showcaseImage = document.querySelector('.showcase-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.3  // 當 30% 的圖片進入視窗時觸發
    });

    if (showcaseImage) {
        observer.observe(showcaseImage);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const introText = document.querySelector('.intro-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3  // 當 30% 的內容進入視窗時觸發
    });

    if (introText) {
        observer.observe(introText);
    }
}); 