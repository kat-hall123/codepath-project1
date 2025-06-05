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

document.addEventListener("DOMContentLoaded", () => {
    loadPlaylists();
});

function populateModal() {
    console.log("Nothing right now")
} 
