let allPlaylists = [];

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
                <div class="song-img-info">
                    <img src="${song.art}" width="100px" height="100px" alt="Song Image">

                    <div class="song-info">
                        <span class="song-title">${song.title}</span>
                        <span class="song-artist">${song.artist}</span>
                        <span class="song-album">${song.album}</span>
                    </div>
                </div>

                <div class="song-album"></div>

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

        allPlaylists = data;
        displayPlaylists(allPlaylists);
    })
    .catch(error => {
        console.error('Error loading reviews:', error);
    })
}

function displayPlaylists(allPlaylists) {
    const playlistList = document.getElementById('playlist-list');
    playlistList.innerHTML = '';

    if(!allPlaylists || allPlaylists.length === 0) {
        playlistList.innerHTML = '<p>No playlists added.</p>';
        return;
    }

    allPlaylists.forEach(playlist => {
        const playlistCard = createPlaylistCard(playlist);

        playlistCard.addEventListener('click', (event) => {
            if(!event.target.classList.contains('fa-heart') && !event.target.classList.contains('delete-btn') && !event.target.classList.contains('fa-trash')){
                openModal(playlist);
            }
        });

        playlistList.appendChild(playlistCard);
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
    authorElem.textContent = `By: ${playlist.playlist_author}`;

    const dateElem = document.createElement('p');
    const dateElemTransf = new Date(playlist.date_added);
    dateElem.textContent = `Added: ${dateElemTransf.toLocaleDateString()}`;

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
    cardSec.appendChild(dateElem);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';

    const trashIcon = document.createElement('i');
    trashIcon.className = 'fa-solid fa-trash';
    deleteButton.append(trashIcon);

    deleteButton.addEventListener('click', (event) => {
        cardSec.remove();
    });
    cardSec.appendChild(deleteButton);

    return cardSec;
}

document.addEventListener("DOMContentLoaded", () => {
    loadPlaylists(); 

    const searchButton = document.getElementById('search-btn');
    const clearButton = document.getElementById('clear-btn');
    const searchInput = document.getElementById('search-input');

    function handleSearch() {
        const searchResult = searchInput.value.toLowerCase();
        
        const filteredResults = allPlaylists.filter(playlist => 
            playlist.playlist_name.toLowerCase().includes(searchResult) ||
            playlist.playlist_author.toLowerCase().includes(searchResult)
        );
        displayPlaylists(filteredResults);
    }

    searchInput.addEventListener('input', handleSearch);
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
            handleSearch();
        }
    });
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        displayPlaylists(allPlaylists);
    });

    const sortSelect = document.getElementById('sort-select');

    sortSelect.addEventListener('change', () => {
        const value = sortSelect.value;
        let sorted = [...allPlaylists];

        if(value === 'name') {
            sorted.sort((a, b) => 
                a.playlist_name.localeCompare(b.playlist_name.toLowerCase())
            );
        } else if(value === 'likes') {
            sorted.sort((a, b) => {
                if(a.playlist_likes === b.playlist_likes) {
                    return a.playlist_name.localeCompare(b.playlist_name.toLowerCase());
                }
                return b.playlist_likes - a.playlist_likes;
            });
        } else if(value === 'date-added') {
            sorted.sort((a, b) => 
                new Date(b.date_added) - new Date(a.date_added)
            );
        } else {
            displayPlaylists(allPlaylists);
        }

        displayPlaylists(sorted);
    });

    const addButton = document.getElementById('add-playlist-btn');
    const addPlaylistModal = document.getElementById('add-playlist-modal');
    const closeButton = document.getElementById('add-modal-close');
    const form = document.getElementById('playlist-form');
    const newSonglist = document.getElementById('new-playlist-songlist');
    const addSongButton = document.getElementById('add-song-btn');

    addButton.addEventListener('click', () => addPlaylistModal.style.display = 'flex');
    closeButton.addEventListener('click', () => addPlaylistModal.style.display = 'none');

    addSongButton.addEventListener('click', () => {
        const songDiv = document.createElement('div');
        songDiv.innerHTML = `
            <div id="new-playlist-songlist">
                <label for="new-playlist-song-title">Song Title: </label>
                <input type="text" class="new-playlist-song-title" required />

                <label for="new-playlist-song-artist">Song Artist: </label>
                <input type="text" class="new-playlist-song-artist" required />

                <label for="new-playlist-album">Album: </label>
                <input type="text" class="new-playlist-album" required/>

                <label for="new-playlist-song-duration">Song Duration: </label>
                <input type="text" class="new-playlist-song-duration" required />
            </div>
        `;
        newSonglist.appendChild(songDiv);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('new-playlist-name').value;
        const author = document.getElementById('new-playlist-author').value;

        const coverImageInput = document.getElementById('new-playlist-image');
        let coverImage = 'assets/img/playlist.png'; //default image

        if (coverImageInput.files.length > 0) {
            coverImage = URL.createObjectURL(coverImageInput.files[0]);
        }

        const titles = document.querySelectorAll('.new-playlist-song-title');
        const artists = document.querySelectorAll('.new-playlist-song-artist');
        const durations = document.querySelectorAll('.new-playlist-song-duration');
        const albums = document.querySelectorAll('.new-playlist-album');

        const songs = [];
        for(let i = 0; i < titles.length; i++) {
            songs.push({
                title: titles[i].value,
                artist: artists[i].value,
                album: albums[i].value,
                duration: durations[i].value,
                art: 'assets/img/song.png' //placeholder
            });
        }
        
        const newPlaylist = {
            playlistID: allPlaylists.length + 1,
            playlist_name: name,
            playlist_author: author,
            playlist_art: coverImage,
            playlist_likes: 0,
            date_added: new Date().toISOString(),
            songs: songs
        }

        allPlaylists.push(newPlaylist);
        displayPlaylists(allPlaylists);

        form.reset();
        document.getElementById('new-playlist-songlist').innerHTML = `
            <div id="new-playlist-songlist">
                <label for="new-playlist-song-title">Song Title: </label>
                <input type="text" class="new-playlist-song-title" required />

                <label for="new-playlist-song-artist">Song Artist: </label>
                <input type="text" class="new-playlist-song-artist" required />

                <label for="new-playlist-album">Album: </label>
                <input type="text" class="new-playlist-album" required/>

                <label for="new-playlist-song-duration">Song Duration: </label>
                <input type="text" class="new-playlist-song-duration" required />
            </div>
        `
        addPlaylistModal.style.display = 'none';
    });
});

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
    modalAuthor.textContent = `By: ${playlist.playlist_author}`;

    const shuffleButton = document.getElementById('shuffle-button');
    shuffleButton.addEventListener('click', () => handleShuffle(playlist));

    const modalSonglist = document.getElementById('modal-songlist');
    modalSonglist.innerHTML = '';

    playlist.songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <div class="song-img-info">
                <img src="${song.art}" width="100px" height="100px" alt="Song Image">

                <div class="song-info">
                    <span class="song-title">${song.title}</span>
                    <span class="song-artist">${song.artist}</span>
                    <span class="song-album">${song.album}</span>
                </div>
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
            <div class="song-img-info">
                <img src="${song.art}" width="100px" height="100px" alt="Song Image">

                <div class="song-info">
                    <span class="song-title">${song.title}</span>
                    <span class="song-artist">${song.artist}</span>
                    <span class="song-album">${song.album}</span>
                </div>
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

