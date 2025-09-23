// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // RSVP Button functionality
    const rsvpButton = document.querySelector('.rsvp-button button');
    if (rsvpButton) {
        rsvpButton.addEventListener('click', function() {
            // Create a simple RSVP modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background-color: white;
                padding: 40px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                font-family: 'Montserrat', sans-serif;
            `;
            
            modalContent.innerHTML = `
                <h2 style="color: #3A473B; margin-bottom: 20px; font-size: 1.8rem;">RSVP</h2>
                <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
                    Cảm ơn bạn đã quan tâm đến lễ cưới của chúng tôi!<br>
                    Thank you for your interest in our wedding!
                </p>
                <p style="color: #666; margin-bottom: 30px;">
                    Vui lòng liên hệ trực tiếp với chúng tôi qua số điện thoại hoặc email để xác nhận tham dự.<br>
                    Please contact us directly via phone or email to confirm your attendance.
                </p>
                <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;">
                    <a href="tel:9723173712" style="background-color: #3A473B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: 600;">Call Thanh Phục</a>
                    <a href="tel:8177702066" style="background-color: #3A473B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: 600;">Call Khánh Hạ</a>
                </div>
                <button onclick="this.closest('.modal').remove()" style="background-color: #662D1E; color: white; border: none; padding: 10px 30px; border-radius: 5px; cursor: pointer; font-weight: 600;">Đóng / Close</button>
            `;
            
            modal.className = 'modal';
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    }
    
    // Add some interactive effects
    const timelineEvents = document.querySelectorAll('.event');
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255,255,255,0.1)';
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        event.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Make the hero section visible immediately
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

// Add some additional interactive features
function addFloatingHearts() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.cssText = `
        position: fixed;
        top: 100vh;
        left: ${Math.random() * 100}vw;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 3s linear forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add floating hearts occasionally
setInterval(addFloatingHearts, 5000);
