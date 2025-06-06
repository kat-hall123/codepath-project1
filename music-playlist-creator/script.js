function loadFeaturedPlaylist() {
    fetch('data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Successfully loaded featured playlist", data);

        const randomIndex = Math.floor(Math.random() * data.length);
        const playlist = data[randomIndex];

        const featuredImg = document.getElementById('featured-playlist-img');
        featuredImg.src = playlist.playlist_art;

        const featuredTitle = document.getElementById('featured-playlist-title');
        featuredTitle.textContent = playlist.playlist_name;

        const featuredSonglist = document.getElementById('featured-playlist-songlist');
        featuredSonglist.innerHTML = '';

        playlist.songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = 'song';
            songDiv.innerHTML = `
                <img src="${song.art}" width="100px" height="100px" alt="Song Image">

                <div class="song-info">
                    <span class="song-title">${song.title}</span>
                    <span class="song-artist">${song.artist}</span>
                    <span class="song-album">${song.album}</span>
                </div>
                
                <div class="song-duration">
                    <span>${song.duration}</span>
                </div>
            `;
            featuredSonglist.appendChild(songDiv);
        });
        
    })
    .catch(error => {
        console.error('Error loading reviews:', error);
    })
}

if(window.location.pathname.includes('featured.html')) {
    document.addEventListener('DOMContentLoaded', () => loadFeaturedPlaylist());
}
function loadPlaylists() {
    fetch('data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Successfully loaded playlist cards", data);

        const playlistList = document.getElementById('playlist-list');
        playlistList.innerHTML = '';

        if(!data || data.length === 0) {
            playlistList.innerHTML = '<p>No playlists added.</p>';
            return;
        }

        data.forEach(playlist => {
            const playlistCard = createPlaylistCard(playlist);

            playlistCard.addEventListener('click', (event) => {
                if(!event.target.classList.contains('fa-heart')){
                    openModal(playlist);
                }
            });

            playlistList.appendChild(playlistCard);
        })
    })
    .catch(error => {
        console.error('Error loading reviews:', error);
    })
}

function createPlaylistCard(playlist) {
    const cardSec = document.createElement('section');
    cardSec.className = 'card';

    const imgElem = document.createElement('img');
    imgElem.src = playlist.playlist_art;
    imgElem.width = 200;
    imgElem.alt = "Picture of playlist";
    
    const titleElem = document.createElement('h2');
    titleElem.textContent = playlist.playlist_name;

    const authorElem = document.createElement('h3');
    authorElem.textContent = playlist.playlist_author;

    const likeContainer = document.createElement('div');
    likeContainer.className = 'like-container';

    const heartIcon = document.createElement('i');
    heartIcon.className = 'fa-regular fa-heart';

    const likeCount = document.createElement('span');
    likeCount.textContent = ` ${playlist.playlist_likes}`;

    heartIcon.addEventListener('click', (event) => {
        toggleLike(playlist, heartIcon, likeCount);
    });

    likeContainer.appendChild(heartIcon);
    likeContainer.appendChild(likeCount);

    cardSec.appendChild(imgElem);
    cardSec.appendChild(titleElem);
    cardSec.appendChild(authorElem);
    cardSec.appendChild(likeContainer);

    return cardSec;
}

document.addEventListener("DOMContentLoaded", () => loadPlaylists());

function toggleLike(playlist, heartIcon, likeCount, likeContainer) {
    const isLiked = heartIcon.classList.contains('fa-solid');

    if(isLiked) {
        heartIcon.className = 'fa-regular fa-heart';
        playlist.playlist_likes--;
    } else{
        heartIcon.className = 'fa-solid fa-heart';
        playlist.playlist_likes++;
    }

    likeCount.textContent = ` ${playlist.playlist_likes}`;
}

function openModal(playlist) {
    document.getElementById('playlist-modal').style.display = 'flex';
    
    const modalImg = document.getElementById('modal-img');
    modalImg.src = playlist.playlist_art;

    const modalTitle = document.getElementById('modal-title');
    modalTitle.textContent = playlist.playlist_name;

    const modalAuthor = document.getElementById('modal-author');
    modalAuthor.textContent = playlist.playlist_author;

    const shuffleButton = document.getElementById('shuffle-button');
    shuffleButton.addEventListener('click', () => handleShuffle(playlist));

    const modalSonglist = document.getElementById('modal-songlist');
    modalSonglist.innerHTML = '';

    playlist.songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <img src="${song.art}" width="100px" height="100px" alt="Song Image">

            <div class="song-info">
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${song.artist}</span>
                <span class="song-album">${song.album}</span>
            </div>
            
            <div class="song-duration">
                <span>${song.duration}</span>
            </div>
        `;
        modalSonglist.appendChild(songDiv);
    });
}

function handleShuffle(playlist) {
    const modalSonglist = document.getElementById('modal-songlist');
    modalSonglist.innerHTML = '';

    for(let i = playlist.songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = playlist.songs[i];
        playlist.songs[i] = playlist.songs[j];
        playlist.songs[j] = temp;
    }

    playlist.songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <img src="${song.art}" width="100px" height="100px" alt="Song Image">

            <div class="song-info">
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${song.artist}</span>
                <span class="song-album">${song.album}</span>
            </div>
            
            <div class="song-duration">
                <span>${song.duration}</span>
            </div>
        `;
        modalSonglist.appendChild(songDiv);
    });

}

document.getElementById('modal-close').addEventListener('click', () => document.getElementById('playlist-modal').style.display = 'none');

const modalOverlay = document.getElementById('playlist-modal');
const modalContent = document.getElementById('playlist-modal-content');
modalOverlay.addEventListener('click', (event) => {
    if(event.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

