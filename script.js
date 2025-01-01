document.addEventListener('DOMContentLoaded', () => {
    // 首頁文字效果
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // 確保元素一開始是隱藏的
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        // 添加延遲顯示效果
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // 視差效果
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height } = hero.getBoundingClientRect();
            
            const xPos = (clientX / width - 0.5) * 2;
            const yPos = (clientY / height - 0.5) * 2;
            
            const transform = `scale(1.1) translate(${xPos * 20}px, ${yPos * 20}px)`;
            hero.style.setProperty('--parallax-transform', transform);
        });

        hero.addEventListener('mouseleave', () => {
            hero.style.setProperty('--parallax-transform', 'scale(1.1) translate(0, 0)');
        });
    }

    // 監聽滾動到關於我們區塊
    const aboutSection = document.querySelector('.about-section');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // 當區塊進入視窗時，添加動畫效果
                const aboutContent = entry.target.querySelector('.about-content');
                const aboutText = entry.target.querySelector('.about-text');
                const aboutImage = entry.target.querySelector('.about-image');
                
                if (aboutContent) aboutContent.style.opacity = '1';
                if (aboutText) aboutText.style.opacity = '1';
                if (aboutImage) {
                    aboutImage.style.opacity = '1';
                    aboutImage.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.3
    });

    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // 滾動提示動畫
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // 漢堡選單功能
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 商品輪播功能
    const shopCarousel = document.querySelector('.shop-carousel');
    if (shopCarousel) {
        const slides = shopCarousel.querySelectorAll('.carousel-slide');
        const dots = shopCarousel.querySelectorAll('.dot');
        let currentSlide = 0;
        let autoPlayInterval;

        // 切換到指定幻燈片
        function goToSlide(index) {
            if (isAnimating) return;
            isAnimating = true;

            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }

        // 下一張
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }

        // 開始自動輪播
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        // 停止自動輪播
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }

        // 綁定圓點點擊事件
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });

        // 滑鼠懸停時暫停輪播
        shopCarousel.addEventListener('mouseenter', stopAutoPlay);
        shopCarousel.addEventListener('mouseleave', startAutoPlay);

        // 開始自動輪播
        startAutoPlay();
    }

    // 背景互動效果
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height } = hero.getBoundingClientRect();
            
            const xPos = (clientX / width - 0.5) * 20;
            const yPos = (clientY / height - 0.5) * 20;
            
            hero.style.backgroundPosition = `calc(50% + ${xPos}px) calc(50% + ${yPos}px)`;
        });

        hero.addEventListener('mouseleave', () => {
            hero.style.backgroundPosition = 'center center';
        });
    }

    // 品牌故事滾動效果
    const storySection = document.querySelector('.about-story-section');
    const storyImage = document.querySelector('.story-image');
    const storyTitle = document.querySelector('.story-title');
    const storyParagraphs = document.querySelectorAll('.story-text p');
    const storyVideo = document.querySelector('.story-video');
    const mediaTitle = document.querySelector('.media-title');

    if (storySection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const sectionTop = storySection.offsetTop;
            const sectionHeight = storySection.offsetHeight;
            const viewportHeight = window.innerHeight;

            // 圖片淡出效果
            if (scrollPosition > sectionTop) {
                const opacity = 1 - (scrollPosition - sectionTop) / viewportHeight;
                storyImage.style.opacity = Math.max(0, opacity);
            }

            // 文字淡入效果
            if (scrollPosition > sectionTop + viewportHeight * 0.5) {
                storyTitle.style.opacity = '1';
                storyTitle.style.transform = 'translateY(0)';

                storyParagraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.style.opacity = '1';
                        p.style.transform = 'translateY(0)';
                    }, 200 * (index + 1));
                });
            }

            // 照片和影片切換效果
            const triggerPoint = sectionTop + sectionHeight * 0.3;

            if (scrollPosition > triggerPoint) {
                storyImage.classList.add('fade-out');
                storyVideo.classList.add('fade-in');
                mediaTitle.classList.add('fade-in');
            } else {
                storyImage.classList.remove('fade-out');
                storyVideo.classList.remove('fade-in');
                mediaTitle.classList.remove('fade-in');
            }
        });
    }

    // 產品介紹區塊的滾動效果
    const introText = document.querySelector('.accent-text');
    const introObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    if (introText) {
        introObserver.observe(introText);
    }

    // 在現有的滾動效果中添加標題的動畫
    const introTitle = document.querySelector('.intro-title');
    if (introTitle) {
        observer.observe(introTitle);
    }
});

// 商品頁面相關的 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 分類過濾功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按鈕的 active 類
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加當前按鈕的 active 類
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    // 添加動畫效果
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 商品詳情彈窗功能
    const modal = document.getElementById('productModal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const closeModal = document.querySelector('.close-modal');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productData = {
                title: card.querySelector('h3').textContent,
                description: card.querySelector('.product-description').textContent,
                price: card.querySelector('.product-price').textContent,
                image: card.querySelector('img').src
            };

            // 填充彈窗內容
            modal.querySelector('.modal-info h2').textContent = productData.title;
            modal.querySelector('.modal-description').textContent = productData.description;
            modal.querySelector('.modal-price').textContent = productData.price;
            modal.querySelector('.modal-image img').src = productData.image;

            // 顯示彈窗
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 點擊彈窗外部關閉
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// 添加滾動動畫
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Hero 區塊的滾動效果
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.product-hero .hero-content');
    
    // 頁面載入時的初始動畫
    setTimeout(() => {
        heroContent.classList.add('visible');
    }, 500);

    // 滾動時的效果
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(0, 1 - scrollPosition / 500); // 500px 內漸變
        
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });

    // 監聽所有需要淡入效果的元素
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// 滾動效果
document.addEventListener('DOMContentLoaded', function() {
    const featureSection = document.querySelector('.product-feature');
    const featureText = document.querySelector('.feature-text');
    const featureImage = document.querySelector('.feature-image img');
    
    window.addEventListener('scroll', () => {
        const rect = featureSection.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        if (rect.top <= viewHeight && rect.bottom >= 0) {
            // 增加係數從 2 到 3，使顏色變化更快
            const progress = 1 - (rect.bottom / (viewHeight + rect.height));
            const opacity = Math.min(Math.max(progress * 3, 0), 0.85);
            
            // 更新背景顏色和文字透明度
            featureText.style.background = `rgba(60, 55, 54, ${opacity})`;
            featureText.style.opacity = '1';
            
            // 同時加快圖片失的速度
            featureImage.style.opacity = Math.max(0, 1 - progress * 2);
        }
    });
});

// 產品內容文字的淡入效果
document.addEventListener('DOMContentLoaded', function() {
    const contentTexts = document.querySelectorAll('.content-text p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    contentTexts.forEach(text => {
        observer.observe(text);
    });
});

// 滾動視差效果
document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.querySelector('.product-intro');
    const introImage = document.querySelector('.intro-left img');
    const introText = document.querySelector('.accent-text');
    const introTitle = document.querySelector('.intro-title');
    
    // 創建新的觀察者
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    // 觀察標題元素
    if (introTitle) {
        titleObserver.observe(introTitle);
    }

    window.addEventListener('scroll', () => {
        const rect = introSection.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            // 圖片視差效果
            const scale = 1.1 + (scrollProgress * 0.1);
            const translateY = scrollProgress * 50;
            introImage.style.transform = `scale(${scale}) translateY(-${translateY}px)`;
            
            // 文字淡入效果
            if (scrollProgress > 0.3) {
                introText.classList.add('visible');
                introTitle.classList.add('visible');
            } else {
                introText.classList.remove('visible');
                introTitle.classList.remove('visible');
            }
        }
    });
});

// 滑動展示控制
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    
    if (!slides.length) return;

    let currentSlide = 0;
    let isAnimating = false;
    const SLIDE_INTERVAL = 5000;
    const FADE_DURATION = 800;
    let autoplayInterval;

    // 切換到指定幻燈片
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // 當前幻燈片淡出
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // 新幻燈片淡入
        currentSlide = index;
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        setTimeout(() => {
            isAnimating = false;
        }, FADE_DURATION);
    }

    // 自動播放功能
    function startAutoplay() {
        // 清除現有的計時器
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
        // 立即開始自動播放
        autoplayInterval = setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            goToSlide(nextSlide);
        }, SLIDE_INTERVAL);
    }

    // 初始化並立即開始自動播放
    slides[0].classList.add('active');
    slides[0].style.opacity = '1';
    dots[0].classList.add('active');
    
    // 立即開始自動播放
    startAutoplay();

    // 滑鼠懸停控制
    const sliderSection = document.querySelector('.slider-section');
    sliderSection.addEventListener('mouseenter', () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    });

    sliderSection.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // 點擊導航點
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide !== index && !isAnimating) {
                goToSlide(index);
                startAutoplay(); // 重置自動播放
            }
        });
    });
});

// 滾動動畫
function handleScroll() {
    const sections = document.querySelectorAll('.gallery-section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// 燈箱功能
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        lightboxImg.src = item.src;
        lightbox.classList.add('active');
    });
});

document.querySelector('.close-lightbox').addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// 事件監聽
window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.gallery-item img'));

    // 點擊圖片打開燈箱
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // 更新燈箱圖片
    function updateLightboxImage() {
        lightboxImg.src = images[currentImageIndex].src;
    }

    // 上一張圖片
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    });

    // 下一張圖片
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    });

    // 鍵盤控制
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightboxImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // 關閉燈箱
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}); 