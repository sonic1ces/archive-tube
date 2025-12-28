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
    },
    'amirxan_archive': { 
        name: 'Плейлист(ПЕРЕЗАЛИВ)',
        subscribers: '📛 Это просто бот, а не настоящий профиль 📛 ',
        color: '#00ccff',
        avatars: ['avatars/amirxan_avatar.webp'],
        communityPosts: [
            { author: 'Amirxan', text: 'Массовый перезалив архива! Lost Media (Snippets) уже тут.' }
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
    'BRIAN_SPISAT': { 
        title: 'НИКТО НЕ ДАЕТ МНЕ СПИСАТЬ :C (Брайан Мапс)',
        file: 'videos/nobody_lets_me_copy.mp4', 
        preview_img: 'thumbnails/spisat_preview.webp', 
        channel: 'amirxan_archive',
        date: '22 окт. 2014 (предпологаемо)',
        preview: 0,
        type: 'video'
    },
    'BALDI_STEALTHY': { 
        title: 'САМЫЙ БЫСТРЫЙ STEALTHY CHALLENGE | Baldi Basics Plus (Короткий сниппет)',
        file: 'videos/baldi_stealthy.mp4', 
        channel: 'amirxan_archive',
        date: '31 августа (?) 2025 год',
        preview: 5,
        type: 'video'
    },
    'skull_shorts_1': {
        title: 'Редкий Shorts Черепа',
        file: 'videos/skull_shorts.mp4',
        channel: 'orange_skull',
        date: '2023 июнь(?)',
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
        document.getElementById('subCount').innerText = chan.subscribers;
        document.getElementById('videoID').innerText = "ID: " + vId;

        const randomAva = chan.avatars[Math.floor(Math.random() * chan.avatars.length)];
        const avaEl = document.getElementById('chanAvatar');
        if (avaEl) {
            avaEl.style.backgroundImage = `url('${randomAva}')`;
            avaEl.style.backgroundSize = 'cover';
        }

        const postsContainer = document.getElementById('communitySection');
        if (postsContainer) {
            postsContainer.innerHTML = ''; 
            if (chan.communityPosts) {
                postsContainer.style.display = 'block';
                postsContainer.innerHTML = '<h3 style="color:#888; font-size:14px; margin-bottom:10px;">Записи сообщества:</h3>';
                chan.communityPosts.forEach(post => {
                    postsContainer.innerHTML += `
                        <div style="background: #1a1a1a; padding: 10px; border-left: 3px solid red; margin-bottom: 8px; border-radius: 8px;">
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

function renderSidebar(excludeId) {
    const sidebar = document.getElementById('recommendations');
    if (!sidebar) return;
    sidebar.innerHTML = ''; 

    for (const id in archiveDatabase) {
        if (id === excludeId) continue;
        const item = archiveDatabase[id];
        const chan = channels[item.channel];
        const timeId = `side_time_${id}`;

        const thumb = item.preview_img 
            ? `<img src="${item.preview_img}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`
            : `<video id="side_vid_${id}" muted preload="metadata" style="width:100%; border-radius:8px;"><source src="${item.file}#t=${item.preview}"></video>`;

        sidebar.innerHTML += `
            <a href="watch.html?v=${id}" class="side-card">
                <div class="side-thumb" style="position:relative; width:120px; aspect-ratio:16/9; background:#000; border-radius:8px; overflow:hidden;">
                    ${thumb}
                    <div id="${timeId}" style="position:absolute; bottom:4px; right:4px; background:rgba(0,0,0,0.8); color:white; font-size:10px; padding:2px 4px; border-radius:4px;">...</div>
                </div>
                <div class="side-info">
                    <div style="font-weight:bold; color:#fff; font-size:12px; line-height:1.2;">${item.title}</div>
                    <div style="font-size:11px; color:#888; margin-top:4px;">${chan.name}</div>
                </div>
            </a>`;

        if (!item.preview_img) {
            const tempVideo = document.getElementById(`side_vid_${id}`);
            tempVideo.onloadedmetadata = function() {
                updateTime(timeId, tempVideo.duration);
            };
        } else {
            // Если картинка, создаем скрытое видео для замера времени
            const hiddenVid = document.createElement('video');
            hiddenVid.src = item.file;
            hiddenVid.onloadedmetadata = () => updateTime(timeId, hiddenVid.duration);
        }
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
        const timeId = `home_time_${id}`;

        const thumb = video.preview_img 
            ? `<img src="${video.preview_img}" style="width:100%; height:100%; object-fit:cover;">`
            : `<video id="home_vid_${id}" muted preload="metadata" style="width:100%;"><source src="${video.file}#t=${video.preview}"></video>`;

        vGrid.innerHTML += `
            <a href="watch.html?v=${id}" class="card">
                <div class="thumbnail" style="position:relative; border-radius:12px; overflow:hidden; background:#000; aspect-ratio:16/9;">
                    ${thumb}
                    <div id="${timeId}" style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.8); color:white; font-size:12px; padding:2px 6px; border-radius:4px; font-weight:bold;">...</div>
                </div>
                <div class="video-info">
                    <h3 style="margin: 10px 0 5px 0; font-size: 14px;">${video.title}</h3>
                    <div style="font-size:12px; color:#888;">${chan.name}</div>
                </div>
            </a>`;

        const hiddenVid = document.createElement('video');
        hiddenVid.src = video.file;
        hiddenVid.onloadedmetadata = () => updateTime(timeId, hiddenVid.duration);
    }

    if (cGrid) {
        for (const id in channels) {
            const chan = channels[id];
            cGrid.innerHTML += `
                <a href="channel.html?c=${id}" class="channel-circle">
                    <div class="chan-img" style="background-image: url('${chan.avatars[0]}'); background-size: cover; border-radius: 50%; width: 60px; height: 60px; margin: 0 auto 8px;"></div>
                    <div style="font-size:11px; font-weight:bold; text-align:center;">${chan.name}</div>
                </a>`;
        }
    }
}

function updateTime(elId, duration) {
    const box = document.getElementById(elId);
    if (box && !isNaN(duration)) {
        const min = Math.floor(duration / 60);
        const sec = Math.floor(duration % 60);
        box.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
}

window.addEventListener('DOMContentLoaded', initArchive);