/**
 * TivraPay HTML Website - Main JavaScript
 * Shared functionality across all pages
 */

// Blog data in localStorage
let blogs = JSON.parse(localStorage.getItem('tivraBlog')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScroll();
    renderBlogs();
    setupModalEvents();
});

// Setup smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Setup modal events
function setupModalEvents() {
    // Modal events removed - write blog feature disabled
}

// Scroll to section function
function scrollToSection(event, sectionId) {
    if (event) {
        event.preventDefault();
    }
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}



// Render blogs
function renderBlogs() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    if (blogs.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-content">
                <p>No blog posts available yet.</p>
            </div>
        `;
        return;
    }

    blogGrid.innerHTML = blogs.map(blog => `
        <article class="blog-card">
            <div class="blog-image">
                📝
            </div>
            <div class="blog-content">
                <span class="blog-date">${blog.date}</span>
                <h2>${escapeHtml(blog.title)}</h2>
                <p>${escapeHtml(blog.description.substring(0, 100))}...</p>
            </div>
        </article>
    `).join('');
}



// Handle contact form submission
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Store in localStorage (in a real app, this would go to a backend)
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push({
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('contactForm').reset();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add scroll animations
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.blog-card, .hero-content');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});
