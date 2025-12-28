/**
 * ==========================================
 * 1. УЛЬТИМАТИВНАЯ ЗАЩИТА (ANTI-DEVTOOLS & ANTI-OBS)
 * ==========================================
 */

// Бесконечный дебаггер: если открыть консоль, сайт будет постоянно "вставать на паузу".
setInterval(function () {
    debugger;
}, 500);

window.addEventListener('DOMContentLoaded', () => {
    const vp = document.getElementById('mainPlayer');
    const cb = document.getElementById('centralPlayBtn');
    const bb = document.getElementById('bottomPlayBtn');
    const progressBarRed = document.getElementById('progressBarRed');
    const progressContainer = document.getElementById('progressContainer');
    const timeDisplay = document.getElementById('timeDisplay');
    const idSearch = document.getElementById('idSearch');
    const shield = document.querySelector('.video-shield');
    const wm = document.getElementById('dynamicWatermark');

    /**
     * Блокировка системных действий
     */
    
    // 1. Блокируем правую кнопку мыши
    document.addEventListener('contextmenu', (e) => {
        if (e.target.nodeName === 'VIDEO' || 
            e.target.classList.contains('video-shield') || 
            e.target.classList.contains('video-player-frame')) {
            e.preventDefault();
        }
    });

    // 2. Блокируем горячие клавиши (F12, Ctrl+U, Ctrl+Shift+I/C/J, Ctrl+S)
    document.addEventListener('keydown', (e) => {
        if (
            e.keyCode == 123 || // F12
            (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 67 || e.keyCode == 74)) || 
            (e.ctrlKey && e.keyCode == 85) || 
            (e.ctrlKey && e.keyCode == 83)
        ) {
            e.preventDefault();
            return false;
        }

        // Управление пробелом (Play/Pause)
        if (e.keyCode == 32 && vp) {
            e.preventDefault();
            togglePlay();
        }
    });

    /**
     * Динамический водяной знак (Защита от OBS)
     * Перемещает твой ник в случайное место плеера каждые 5 секунд
     */
    function moveWatermark() {
        if (wm && vp) {
            const container = document.querySelector('.video-player-frame');
            const maxX = container.clientWidth - wm.clientWidth - 20;
            const maxY = container.clientHeight - wm.clientHeight - 60;
            
            const randomX = Math.max(10, Math.floor(Math.random() * maxX));
            const randomY = Math.max(10, Math.floor(Math.random() * maxY));
            
            wm.style.left = randomX + 'px';
            wm.style.top = randomY + 'px';
        }
    }
    
    if (wm) {
        setInterval(moveWatermark, 5000);
        moveWatermark(); // Первый запуск
    }

    /**
     * ==========================================
     * 2. ЛОГИКА ПЛЕЕРА
     * ==========================================
     */

    const togglePlay = () => {
        if (!vp) return;
        if (vp.paused) {
            vp.play();
            if (cb) cb.style.display = 'none';
            if (bb) bb.innerText = '⏸';
        } else {
            vp.pause();
            if (cb) cb.style.display = 'flex';
            if (bb) bb.innerText = '▶';
        }
    };

    if (vp) {
        vp.setAttribute('controlsList', 'nodownload');

        // Клики по всем элементам
        if (shield) shield.onclick = togglePlay;
        if (cb) cb.onclick = togglePlay;
        if (bb) bb.onclick = togglePlay;
        vp.onclick = togglePlay;

        // Обновление прогресса
        vp.addEventListener('timeupdate', () => {
            if (!isNaN(vp.duration)) {
                const percentage = (vp.currentTime / vp.duration) * 100;
                if (progressBarRed) progressBarRed.style.width = percentage + '%';
                
                if (timeDisplay) {
                    timeDisplay.innerText = formatTime(vp.currentTime) + " / " + formatTime(vp.duration);
                }
            }
        });

        // Перемотка
        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                vp.currentTime = pos * vp.duration;
            });
        }
    }

    /**
     * ==========================================
     * 3. ОБЩИЕ ФУНКЦИИ
     * ==========================================
     */

    if (idSearch) {
        idSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.location.href = 'watch.html?v=' + e.target.value;
            }
        });
    }

    // Запуск инициализации из archive.js (если есть)
    if (typeof initArchive === 'function') {
        initArchive();
    }
});

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? '0' + sec : sec);
}

console.log("%cАРХИВ ЗАЩИЩЕН", "color: red; font-size: 30px; font-weight: bold;");