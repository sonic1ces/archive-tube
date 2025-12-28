/**
 * ==========================================
 * 1. КОНСТРУКТОР КАНАЛОВ
 * ==========================================
 */
const channels = {
    'orange_skull': {
        name: 'orange.skull.6000',
        subscribers: '???',
        color: '#ff6600',
        avatars: ['avatars/may_2024.jpg', 'avatars/july_2024.jpg']
    },
    'zheka_cat': {
        name: 'zheka_i_very_love_murzik',
        subscribers: '1,1 тыс.',
        color: '#00d2ff',
        avatars: ['avatars/zheka_main.jpg']
    },
    'EGD': { 
        name: 'Е.Г.Д И К.С.А.Я.Н',
        subscribers: '500-700',
        color: '#000000',
        avatars: ['avatars/EGD.jpg']
    },
    'apple_fools': { 
        name: 'КРЫСА 228ᘛ⁐̤ᕐᐷ',
        subscribers: '5',
        color: '#ff0000',
        avatars: ['avatars/rat_avatar.webp'],
        communityPosts: [
            { author: 'Яблочные дураки', text: 'ВСМ 5 ЧЕЛОВ!?' },
            { author: 'Яблочные дураки', text: 'БЛЯТЬ НЕЕЕЕЕЕЕТ' },
            { author: 'КРЫСА 228ᘛ⁐̤ᕐᐷ', text: 'Не понял что с каналом?' }
        ]
    }
};

/**
 * ==========================================
 * 2. КОНСТРУКТОР ВИДЕО
 * ==========================================
 */
const archiveDatabase = {
    'south_pon_s4': {
        title: 'Южный пон: 4 сезон (Полный сборник)',
        file: 'videos/south_pon_s4.mp4',
        channel: 'orange_skull',
        date: 'Лето 2023',
        preview: 15,
        type: 'video'
    },
    'skull_shorts_1': {
        title: 'Редкий Shorts Черепа',
        file: 'videos/skull_shorts.mp4',
        channel: 'orange_skull',
        date: '2023',
        preview: 2,
        type: 'shorts'
    },
    'zheka_video_1': {
        title: 'Влог Жеки (Новое)',
        file: 'videos/zheka_video.mp4',
        channel: 'zheka_cat',
        date: '10 июня 2024',
        preview: 5,
        type: 'video'
    },
    'OTVET_NA_VORPOSI': { 
        title: 'Ответы на вопросы',
        file: 'videos/VOPROSI.mp4',
        channel: 'EGD',
        date: 'август 2023',
        preview: 19,
        type: 'video'
    },
    'APPLE_FOOLS_INTRO': { 
        title: 'интро канала.mp4 (LOST MEDIA)',
        file: 'videos/intro_kanala.mp4',
        channel: 'apple_fools',
        date: 'май 2024 (Удалено)',
        preview: 0,
        type: 'video'
    }
};

/**
 * ==========================================
 * 3. СИСТЕМНАЯ ЛОГИКА
 * ==========================================
 */

function initArchive() {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('v');
    const channelId = params.get('c');

    if (videoId && archiveDatabase[videoId]) {
        renderWatchPage(videoId);
    } 
    else if (channelId && channels[channelId]) {
        renderChannelPage(channelId);
    }
    else if (document.getElementById('videoGrid')) {
        renderHomePage();
    }
}

function renderWatchPage(vId) {
    const video = archiveDatabase[vId];
    const chan = channels[video.channel];
    const player = document.getElementById('mainPlayer');
    const source = document.getElementById('videoSource');
    
    if (player) {
        source.src = video.file + "#t=" + video.preview;
        player.load();
        
        document.getElementById('videoTitle').innerText = video.title;
        document.getElementById('publishDate').innerText = "Опубликовано: " + video.date;
        document.getElementById('chanName').innerText = chan.name;
        document.getElementById('subCount').innerText = chan.subscribers + " подписчиков";
        document.getElementById('videoID').innerText = "ID: " + vId;

        const randomAva = chan.avatars[Math.floor(Math.random() * chan.avatars.length)];
        const avaEl = document.getElementById('chanAvatar');
        if (avaEl) {
            avaEl.style.backgroundImage = `url('${randomAva}')`;
            avaEl.style.backgroundSize = 'cover';
        }

        // --- ВЫВОД ПОСТОВ СООБЩЕСТВА ---
        const postsContainer = document.getElementById('communitySection');
        if (postsContainer) {
            postsContainer.innerHTML = ''; // Очистка
            if (chan.communityPosts) {
                postsContainer.style.display = 'block';
                postsContainer.innerHTML = '<h3 style="color:#888; font-size:14px; margin-bottom:10px;">Записи сообщества:</h3>';
                chan.communityPosts.forEach(post => {
                    postsContainer.innerHTML += `
                        <div style="background: #1a1a1a; padding: 10px; border-left: 3px solid red; margin-bottom: 8px;">
                            <div style="font-weight:bold; font-size:12px; color:#ff4444;">${post.author}</div>
                            <div style="color:#eee; font-size:14px; margin-top:4px;">${post.text}</div>
                        </div>`;
                });
            } else {
                postsContainer.style.display = 'none';
            }
        }

        if (video.type === 'shorts') {
            document.getElementById('playerContainer').classList.add('is-shorts');
        } else {
            document.getElementById('playerContainer').classList.remove('is-shorts');
        }
    }
    renderSidebar(vId);
}

// ... (остальные функции sidebar и homepage остаются такими же)

function renderSidebar(excludeId) {
    const sidebar = document.getElementById('recommendations');
    if (!sidebar) return;
    sidebar.innerHTML = ''; 

    for (const id in archiveDatabase) {
        if (id === excludeId) continue;
        const item = archiveDatabase[id];
        const chan = channels[item.channel];

        sidebar.innerHTML += `
            <a href="watch.html?v=${id}" class="side-card">
                <div class="side-thumb">
                    <video muted preload="metadata"><source src="${item.file}#t=${item.preview}"></video>
                </div>
                <div class="side-info">
                    <div style="font-weight:bold; color:#fff; font-size:12px; line-height:1.2;">${item.title}</div>
                    <div style="font-size:11px; color:#888; margin-top:4px;">${chan.name}</div>
                </div>
            </a>`;
    }
}

function renderHomePage() {
    const vGrid = document.getElementById('videoGrid');
    const cGrid = document.getElementById('channelGrid');
    if (vGrid) vGrid.innerHTML = '';
    if (cGrid) cGrid.innerHTML = '';

    for (const id in archiveDatabase) {
        const video = archiveDatabase[id];
        const chan = channels[video.channel];
        vGrid.innerHTML += `
            <a href="watch.html?v=${id}" class="card">
                <div class="thumbnail">
                    <video muted preload="metadata"><source src="${video.file}#t=${video.preview}"></video>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <div style="font-size:12px; color:#888;">${chan.name}</div>
                </div>
            </a>`;
    }

    if (cGrid) {
        for (const id in channels) {
            const chan = channels[id];
            cGrid.innerHTML += `
                <a href="channel.html?c=${id}" class="channel-circle">
                    <div class="chan-img" style="background-image: url('${chan.avatars[0]}'); background-size: cover;"></div>
                    <div style="font-size:12px; font-weight:bold;">${chan.name}</div>
                </a>`;
        }
    }
}

window.addEventListener('DOMContentLoaded', initArchive);