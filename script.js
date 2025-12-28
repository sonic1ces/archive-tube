window.addEventListener('DOMContentLoaded', () => {
    const vp = document.getElementById('mainPlayer');
    const cb = document.getElementById('centralPlayBtn');
    const bb = document.getElementById('bottomPlayBtn');
    const progressBarRed = document.getElementById('progressBarRed');
    const progressContainer = document.getElementById('progressContainer');
    const timeDisplay = document.getElementById('timeDisplay');
    const idSearch = document.getElementById('idSearch');

    // 1. Поиск по ID (Enter)
    if (idSearch) {
        idSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.location.href = 'watch.html?v=' + e.target.value;
            }
        });
    }

    if (vp) {
        // 2. Play/Pause функции
        const togglePlay = () => {
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

        // Клик на центральную кнопку, нижнюю кнопку и само видео
        if (cb) cb.onclick = togglePlay;
        if (bb) bb.onclick = togglePlay;
        vp.onclick = togglePlay;

        // 3. Обновление прогресса
        vp.addEventListener('timeupdate', () => {
            if (!isNaN(vp.duration)) {
                const percentage = (vp.currentTime / vp.duration) * 100;
                if (progressBarRed) progressBarRed.style.width = percentage + '%';
                
                if (timeDisplay) {
                    timeDisplay.innerText = formatTime(vp.currentTime) + " / " + formatTime(vp.duration);
                }
            }
        });

        // 4. Логика перемотки при клике
        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                // Устанавливаем время видео
                vp.currentTime = pos * vp.duration;
            });
        }
    }
});

// Форматирование секунд в 0:00
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? '0' + sec : sec);
}