/* ============================================================
   RIVAAH – Aditi & Samrat Wedding Invitation
   JavaScript
   ============================================================ */

const config = {
    opening: { title: "RIVAAH", subtitle: "Aditi &amp; Samrat" },
    couple: {
        introText: "Join us in celebrating love<br>&amp; blessing the beautiful union<br>of the couple.",
        brideName: "Aditi",
        brideFamily: "Grand D/o Late Mrs. Devi Singh<br>&amp; Late Mr. JagPrakash Singh<br>D/o Mrs. Alka Singh &amp; Mr. Vikash Singh",
        groomName: "Samrat",
        groomFamily: "Grand S/o Late Mrs. Sarwati Devi Singh<br>&amp; Late Mr. Ramji Lal Singh<br>S/o Mrs. SantoshDevi Singh &amp;<br>Late Mr. Bishwambhar Dayal Singh"
    },
    events: [
        { id: 1, month: "December", day: "10", year: "2026", time: "19:30", weekday: "Thursday", title: "Mehendi", subtitle: "The one where it begins", venue: "Poolside, Lawn", attire: "Attire: Colorful Indian" },
        { id: 2, month: "December", day: "10", year: "2026", time: "21:00", weekday: "Thursday", title: "Sangeet", subtitle: "The night of sparkle", venue: "Banquet Hall", attire: "Attire: Glam &amp; Sparkle" },
        { id: 3, month: "December", day: "11", year: "2026", time: "11:30", weekday: "Friday", title: "Haldi", subtitle: "Splash of Haldi &amp; Lots of fun", venue: "Lawnside", attire: "Attire: Hues of Sunshine" },
        { id: 4, month: "December", day: "11", year: "2026", time: "20:00", weekday: "Friday", title: "Wedding", subtitle: "The night of promises", venue: "Royal Ground", attire: "Attire: Traditional Indian" }
    ],
    weddingDate: "2026-12-10T19:30:00",
    location: { name: "Royal Ground, City Name", mapUrl: "https://maps.google.com" },
    closing: { text: "We are excited to share<br>our celebration with you!", signature: "The Singh Family" }
};

document.addEventListener('DOMContentLoaded', function () {
    // Populate config data
    document.getElementById('openingTitle').innerHTML = config.opening.title;
    document.getElementById('openingSubtitle').innerHTML = config.opening.subtitle;
    document.getElementById('introText').innerHTML = config.couple.introText;
    document.getElementById('brideName').innerHTML = config.couple.brideName;
    document.getElementById('brideFamily').innerHTML = config.couple.brideFamily;
    document.getElementById('groomName').innerHTML = config.couple.groomName;
    document.getElementById('groomFamily').innerHTML = config.couple.groomFamily;

    config.events.forEach(ev => {
        document.getElementById(`event${ev.id}Month`).innerHTML = ev.month;
        document.getElementById(`event${ev.id}Day`).innerHTML = ev.day;
        document.getElementById(`event${ev.id}Year`).innerHTML = ev.year;
        document.getElementById(`event${ev.id}Time`).innerHTML = ev.time;
        document.getElementById(`event${ev.id}Weekday`).innerHTML = ev.weekday;
        document.getElementById(`event${ev.id}Title`).innerHTML = ev.title;
        document.getElementById(`event${ev.id}Subtitle`).innerHTML = ev.subtitle;
        document.getElementById(`event${ev.id}Venue`).innerHTML = ev.venue;
        document.getElementById(`event${ev.id}Attire`).innerHTML = ev.attire;
    });

    document.getElementById('locationName').innerHTML = config.location.name;
    document.getElementById('mapLink').href = config.location.mapUrl;
    document.getElementById('closingText').innerHTML = config.closing.text;
    document.getElementById('closingSignature').innerHTML = config.closing.signature;


    // ========================================================
    // 1. SLIDE-TO-OPEN BUTTON
    // ========================================================
    const slideButton = document.getElementById('slideButton');
    const slideHandle = document.getElementById('slideHandle');
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');

    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    // ========================================================
    // 0. START SCREEN WATERFALL
    // ========================================================
    const startWaterfall = document.getElementById('start-waterfall');
    if (startWaterfall) {
        for (let i = 0; i < 30; i++) {
            const drop = document.createElement('div');
            drop.className = 'start-drop';
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.animationDuration = `${1.5 + Math.random() * 2}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.height = `${20 + Math.random() * 40}px`;
            startWaterfall.appendChild(drop);
        }
    }

    function getButtonWidth() {
        return slideButton.offsetWidth;
    }

    // Mouse events
    slideHandle.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);

    // Touch events
    slideHandle.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        startX = clientX;
        slideHandle.style.transition = 'none';
        slideHandle.style.cursor = 'grabbing';
    }

    function onDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        currentX = clientX - startX;
        
        const handleWidth = slideHandle.offsetWidth;
        const maxMove = getButtonWidth() - handleWidth - 12;

        if (currentX < 0) currentX = 0;
        if (currentX > maxMove) currentX = maxMove;

        slideHandle.style.left = (12 + currentX) + 'px';
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        slideHandle.style.cursor = 'grab';
        slideHandle.style.transition = 'left 0.3s ease';

        const handleWidth = slideHandle.offsetWidth;
        const maxMove = getButtonWidth() - handleWidth - 12;
        const dynamicThreshold = maxMove * 0.7;

        if (currentX >= dynamicThreshold) {
            // Success – open the website
            slideHandle.style.left = maxMove + 'px';
            setTimeout(() => {
                openingScreen.classList.add('hidden');
                mainContent.style.display = 'block';
                // Trigger reflow
                void mainContent.offsetHeight;
                mainContent.classList.add('visible');
                document.body.style.overflow = 'auto';
            }, 400);
        } else {
            // Reset
            slideHandle.style.left = '12px';
        }
        currentX = 0;
    }

    // ========================================================
    // 2. COUNTDOWN TIMER
    // ========================================================
    const weddingDate = new Date(config.weddingDate).getTime();

    function updateCountdown() {
        const now = Date.now();
        const diff = weddingDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========================================================
    // 3. SCROLL FADE-IN ANIMATIONS
    // ========================================================
    const fadeElements = document.querySelectorAll('.event-card, .countdown-box, .location-section, .rsvp-section, .closing-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // ========================================================
    // 4. PARALLAX-LIKE EFFECT FOR MOON
    // ========================================================
    const moonCircle = document.querySelector('.moon-circle');
    if (moonCircle) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const speed = 0.15;
            moonCircle.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    // ========================================================
    // 5. FLOATING LOTUS POSITION UPDATE ON SCROLL
    // ========================================================
    const lotus1 = document.getElementById('lotus1');
    const lotus2 = document.getElementById('lotus2');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = docHeight > 0 ? scrollY / docHeight : 0;
        const t = scrollFraction; // 0 to 1

        if (lotus1) {
            // Animates above the left stream
            lotus1.style.top = (20 + t * 60) + '%';
            // Curve math for left stream (0.2 to 0.6 curve on right, 0.2 straight on left)
            // The stream container is 120px wide. Left edge is at 24px (0.2), Right edge curves 24px to 72px (0.6).
            // Curve = 24 + 48(t) - 48(t^2)? No, we used M 0.2,0 L 0.2,1 L 0.6,1 Q 1,0.5 0.6,0
            // Q 1,0.5 means control point is at x=1 (120px).
            // B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
            // For right edge: P0=0.6, P1=1, P2=0.6
            // x(t) = (1-t)^2*0.6 + 2(1-t)t*1.0 + t^2*0.6
            // x(t) = 0.6 + 0.8t - 0.8t^2
            // Center is (leftEdge + rightEdge)/2 = (0.2 + 0.6 + 0.8t - 0.8t^2)/2 = 0.4 + 0.4(t - t^2)
            // Center in px = (0.4 + 0.4(t - t^2)) * 120 = 48 + 48(t - t^2)
            const centerPx = 48 + 48 * (t - t * t);
            // Add stream left offset (2% of screen) + centerPx - half lotus width (20px)
            lotus1.style.left = `calc(2% + ${centerPx - 20}px)`;
        }
        if (lotus2) {
            // Animates above the right stream
            lotus2.style.top = (30 + t * 50) + '%';
            // Curve math for right stream (0.8 straight on right, curve on left)
            // P0=0.4, P1=0, P2=0.4
            // x(t) = 0.4 - 0.8t + 0.8t^2
            // Center is (0.8 + 0.4 - 0.8t + 0.8t^2)/2 = 0.6 - 0.4(t - t^2)
            // This is x from left of stream container.
            // Distance from right of stream container = 1 - (0.6 - 0.4(t - t^2)) = 0.4 + 0.4(t - t^2)
            // Center in px from right = 48 + 48(t - t^2)
            const rightCenterPx = 48 + 48 * (t - t * t);
            // Add stream right offset (2%) + centerPx - half lotus width (17.5px)
            lotus2.style.right = `calc(2% + ${rightCenterPx - 17.5}px)`;
            lotus2.style.left = 'auto';
        }
    });

    // ========================================================
    // 6. HIDE FLOATING LOTUS WHEN OPENING SCREEN IS VISIBLE
    // ========================================================
    const floatingLotuses = document.querySelectorAll('.floating-lotus');
    floatingLotuses.forEach(l => l.style.display = 'none');

    // Show lotuses after opening
    const showLotuses = () => {
        floatingLotuses.forEach(l => l.style.display = 'block');
    };

    // Watch for main content becoming visible
    const contentObserver = new MutationObserver(() => {
        if (mainContent.classList.contains('visible')) {
            showLotuses();
            contentObserver.disconnect();
        }
    });
    contentObserver.observe(mainContent, { attributes: true, attributeFilter: ['class'] });

    // ========================================================
    // 7. RSVP FORM SUBMISSION
    // ========================================================
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpMessage = document.getElementById('rsvpMessage');
    const rsvpSubmitBtn = document.getElementById('rsvpSubmitBtn');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Loading state
            const originalText = rsvpSubmitBtn.textContent;
            rsvpSubmitBtn.textContent = 'Sending...';
            rsvpSubmitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                rsvpSubmitBtn.textContent = originalText;
                rsvpSubmitBtn.disabled = false;
                
                // Success message
                rsvpForm.classList.add('hidden');
                rsvpMessage.textContent = 'Thank you for your RSVP! We look forward to celebrating with you.';
                rsvpMessage.classList.remove('hidden');
                
            }, 1200);
        });
    }

    // ========================================================
    // 8. ADD WATER DROP ELEMENTS TO HERO
    // ========================================================
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const waterDrops = document.createElement('div');
        waterDrops.className = 'water-drops';
        for (let i = 0; i < 6; i++) {
            const drop = document.createElement('div');
            drop.className = 'water-drop';
            waterDrops.appendChild(drop);
        }
        heroSection.appendChild(waterDrops);
    }

    // ========================================================
    // 9. PREVENT BODY SCROLL WHILE OPENING
    // ========================================================
    document.body.style.overflow = 'hidden';
});
