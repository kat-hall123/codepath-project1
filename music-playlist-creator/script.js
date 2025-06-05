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

        if(!data || data.length == 0) {
            playlistList.innerHTML = '<p>No playlists added.</p>';
            return;
        }

        data.forEach(playlist => {
            const playlistCard = createPlaylistCard(playlist);

            //check this
            playlistCard.addEventListener('click', () => openModal(playlist));

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

    const likeCount = document.createElement('p');
    likeCount.textContent = `${playlist.playlist_likes}`;


    cardSec.appendChild(imgElem);
    cardSec.appendChild(titleElem);
    cardSec.appendChild(authorElem);
    cardSec.appendChild(likeCount);

    return cardSec;
}

document.addEventListener("DOMContentLoaded", () => loadPlaylists());

function openModal(playlist) {
    document.getElementById('playlist-modal').style.display = 'flex';
    
    const modalImg = document.getElementById('modal-img');
    modalImg.src = playlist.playlist_art;

    const modalTitle = document.getElementById('modal-title');
    modalTitle.textContent = playlist.playlist_name;

    const modalAuthor = document.getElementById('modal-author');
    modalAuthor.textContent = playlist.playlist_author;

    const modalSonglist = document.getElementById('modal-songlist');
    modalSonglist.innerHTML = '';

    playlist.songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <img src="${song.art}" width="100px" alt="Song Image">

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