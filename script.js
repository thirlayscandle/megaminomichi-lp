// ==========================================
// 🧚‍♂️ 天使のスクロール連動＆キラキラ花火演出
// ==========================================
let lastFairyState = "";
 
window.addEventListener('scroll', () => {
    const fairyImages = [
        'images/fairies/fairie-1/syoumen1.webp',
        'images/fairies/fairie-1/migi.webp',
        'images/fairies/fairie-1/ushiro.webp',
        'images/fairies/fairie-1/hidari.webp'
    ];
 
    const fairyImage = document.querySelector('#scrolling-fairy img');
    if (fairyImage) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const loopDistance = 600;
        const currentProgress = scrollTop % loopDistance;
        let imageIndex = 0;
 
        if (currentProgress < 300) {
            imageIndex = 0;
        } else if (currentProgress < 400) {
            imageIndex = 1;
        } else if (currentProgress < 500) {
            imageIndex = 2;
        } else {
            imageIndex = 3;
        }
 
        const nextState = fairyImages[imageIndex];
        fairyImage.src = nextState;
 
        // ✅ hidari.webpに切り替わった瞬間だけ花火を打ち上げる
        if (nextState.includes('hidari.webp') && lastFairyState !== nextState) {
            launchSparkleFirework();
        }
        lastFairyState = nextState;
    }
});
 
// ✅ キラキラが1.5秒で花火のように広がり消える魔法
function launchSparkleFirework() {
    const fireworkStage = document.getElementById('sparkle-firework-stage');
    if (!fireworkStage) return;
 
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const sparkleCount = 12;
 
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('img');
        sparkle.src = 'images/backgrounds/kirakira.webp';
        sparkle.className = 'sparkle-firework-particle';
 
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${centerX}px`;
        sparkle.style.top = `${centerY}px`;
        sparkle.style.width = `${30 + Math.random() * 30}px`;
        sparkle.style.height = 'auto';
        sparkle.style.transformOrigin = 'center center';
 
        const angleRad = ((i * (360 / sparkleCount)) + (Math.random() * 15 - 7.5)) * (Math.PI / 180);
        const distance = 100 + Math.random() * 120;
        const targetX = Math.cos(angleRad) * distance;
        const targetY = Math.sin(angleRad) * distance;
        const rotation = 90 + Math.random() * 180;
 
        sparkle.animate([
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.2) rotate(0deg)' },
            { opacity: 1, offset: 0.2 },
            { opacity: 0.8, offset: 0.7 },
            { opacity: 0, transform: `translate(-50%, -50%) translate(${targetX}px, ${targetY}px) scale(1.5) rotate(${rotation}deg)` }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
            fill: 'forwards'
        });
 
        fireworkStage.appendChild(sparkle);
        setTimeout(() => { sparkle.remove(); }, 1550);
    }
}
 
 
// ==========================================
// ✍️ DOMContentLoaded：全演出の起動
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
 
    // ------------------------------------------
    // ✅ カーソルフェードアウト共通関数
    //    タイプ完了後1秒待ち → 1.5秒かけてゆっくり消える
    // ------------------------------------------
    function fadeOutCursor(cursorEl) {
        if (!cursorEl) return;
        setTimeout(() => {
            cursorEl.style.transition = 'opacity 1.5s ease';
            cursorEl.style.opacity = '0';
            setTimeout(() => {
                cursorEl.style.display = 'none';
            }, 1500);
        }, 1000); // タイプ完了から1秒後にフェード開始
    }
 
 
    // ------------------------------------------
    // 🧚‍♀️ 1つ目のタイピング演出
    // ------------------------------------------
    const message = "私たちは巡る宇宙という意識";
    const typingBox = document.querySelector('.typing-box');
    const typingTextElement = document.getElementById('typing-text');
    const cursor1 = document.getElementById('cursor-1');
    let index = 0;
    let hasStarted = false;
 
    function typeNextChar() {
        if (!typingTextElement) return;
        if (index < message.length) {
            let currentChar = message.charAt(index);
            if (currentChar === "\n") {
                typingTextElement.innerHTML += "<br>";
            } else {
                typingTextElement.innerHTML += currentChar;
            }
            index++;
            setTimeout(typeNextChar, 150);
        } else {
            // ✅ タイプ完了 → 1秒後にゆっくりフェードアウト
            fadeOutCursor(cursor1);
        }
    }
 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                typeNextChar();
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 });
 
    if (typingBox && typingTextElement) {
        observer.observe(typingBox);
    }
 
 
    // ------------------------------------------
    // 🧚‍♀️ 2つ目のタイピング演出
    // ------------------------------------------
    const text2 = "私とは意識\n認識していない無意識も含めた意識です";
    const typingBox2 = document.getElementById('typing-box-2-zone');
    const typingText2 = document.getElementById('typing-text-2');
    const cursor2 = document.getElementById('cursor-2');
    let index2 = 0;
    let hasStarted2 = false;
 
    function typeWriter2() {
        if (!typingText2) return;
        if (index2 < text2.length) {
            let currentChar = text2.charAt(index2);
            if (currentChar === "\n") {
                typingText2.innerHTML += "<br>";
            } else {
                typingText2.innerHTML += currentChar;
            }
            index2++;
            setTimeout(typeWriter2, 150);
        } else {
            // ✅ タイプ完了 → 1秒後にゆっくりフェードアウト
            fadeOutCursor(cursor2);
        }
    }
 
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted2) {
                hasStarted2 = true;
                setTimeout(typeWriter2, 300);
            }
        });
    }, { root: null, rootMargin: "-30% 0px -30% 0px", threshold: 0 });
 
    if (typingBox2 && typingText2) {
        observer2.observe(typingBox2);
    }
 
 
    // ------------------------------------------
    // 🌹 バラたちの3秒に1回、ランダムタイミング回転魔法
    // ------------------------------------------
    const roses = document.querySelectorAll('.rotating-rose');
    roses.forEach((rose) => {
        const randomDelay = Math.random() * 2500;
        setTimeout(() => {
            rose.classList.add('start-slow-rotation');
        }, randomDelay);
    });
 
 
    // ------------------------------------------
    // 🌸 申し込みボタン：花びらが「じわ〜っ」と咲き誇る魔法
    // ------------------------------------------
    const trigger = document.getElementById('butterfly-trigger');
    const stage = document.getElementById('butterfly-stage');
 
    if (trigger && stage) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
 
            const launchItems = [
                { src: 'images/backgrounds/dot.webp',   type: 'dot' },
                { src: 'images/backgrounds/hana.webp',  type: 'hana' },
                { src: 'images/backgrounds/hana2.webp', type: 'hana2' },
                { src: 'images/backgrounds/hana3.webp', type: 'hana3' },
                { src: 'images/fairies/rokubousei/rokubousei.webp', type: 'rokubousei' }
            ];
 
            const rect = trigger.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;
            const totalParticles = 25;
 
            for (let i = 0; i < totalParticles; i++) {
                setTimeout(() => {
                    const itemData = launchItems[i % launchItems.length];
                    const item = document.createElement('img');
 
                    item.src = itemData.src;
                    item.className = 'flying-flower-particle';
                    item.style.position = 'fixed';
                    item.style.left = `${buttonCenterX}px`;
                    item.style.top = `${buttonCenterY}px`;
                    item.style.transformOrigin = 'center center';
 
                    let baseAngle = 0;
                    if (itemData.type === 'hana')       { baseAngle = 20; }
                    else if (itemData.type === 'hana2') { baseAngle = 180; }
                    else if (itemData.type === 'hana3') { baseAngle = 240; }
                    else                                { baseAngle = Math.random() * 360; }
 
                    const finalAngleRad = (baseAngle + (Math.random() * 20 - 10)) * (Math.PI / 180);
                    const durationMs = 1800 + Math.random() * 200;
                    const travelDistance = 150 + Math.random() * 100;
                    const targetX = Math.cos(finalAngleRad) * travelDistance;
                    const targetY = Math.sin(finalAngleRad) * travelDistance;
                    const rotateDirection = Math.random() > 0.5 ? 1 : -1;
 
                    let startScale, endScale, maxRotation;
                    if (itemData.type === 'rokubousei') {
                        startScale = 1.2;
                        endScale = 3.6;
                        maxRotation = (45 + Math.floor(Math.random() * 45)) * rotateDirection;
                    } else {
                        startScale = 0;
                        endScale = 2.0 + Math.random() * 0.6;
                        maxRotation = (180 + Math.floor(Math.random() * 180)) * rotateDirection;
                    }
 
                    item.animate([
                        { opacity: 0, transform: `translate(-50%, -50%) translate(0px, 0px) scale(${startScale}) rotate(0deg)` },
                        { opacity: 1, offset: 0.3 },
                        { opacity: 1, offset: 0.65 },
                        { opacity: 0, transform: `translate(-50%, -50%) translate(${targetX}px, ${targetY}px) scale(${endScale}) rotate(${maxRotation}deg)` }
                    ], {
                        duration: durationMs,
                        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                        fill: 'forwards'
                    });
 
                    stage.appendChild(item);
                    setTimeout(() => { item.remove(); }, durationMs + 50);
 
                }, Math.random() * 150);
            }
 
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 1000);
        });
    }
});