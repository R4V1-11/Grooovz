const searchInput = document.createElement('input');
searchInput.type = "search";
searchInput.placeholder = "Search for a song...";
searchInput.style.display = "block";
searchInput.style.margin = "20px auto 0";
searchInput.style.width = "300px";
searchInput.style.padding = "12px";
searchInput.style.border = "1px solid black";
searchInput.type = 'text';
document.body.appendChild(searchInput);

const songsContainer = document.createElement('div'); // Use a container to hold all the song results
document.body.appendChild(songsContainer);

// Function to fetch song data
export const searchSong = (query) => { // Update function name to reflect plural 'searchSongs'
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'c7d3fd8ef1mshf2f9a69b487015ap14e363jsn91d71f5e575f',
			'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
		}
	};

	fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, options)
		.then(response => response.json())
		.then(response => {
			// Handle the retrieved data from the Deezer API
			console.log(response);
			const songs = response.data; // Update to retrieve all songs
			if (songs.length > 0) {
				// Display the song data in the frontend
				songsContainer.innerHTML = ''; // Clear previous results
				songs.forEach(song => {
					const songElement = document.createElement('div'); // Create a new div for each song
					songElement.innerHTML = `
						<h1>${song.title}</h1>
						<p>Artist: ${song.artist.name}</p>
						<p>Album: ${song.album.title}</p>
						<img src="${song.album.cover_medium}" alt="Album Cover">
						<audio src="${song.preview}" controls></audio>
					`;
					songElement.addEventListener('click', () => { // Add click event listener to play the song on click
						playSong(song.preview);
					});
					songsContainer.appendChild(songElement); // Append each song element to the container
				});
			} else {
				// Handle case when no songs are found
				songsContainer.textContent = 'No songs found';
			}
		})
		.catch(err => console.error(err));
};

// Function to play selected song
const playSong = (previewUrl) => {
	const audio = new Audio(previewUrl);
	audio.play();
};

// Event listener for search input
searchInput.addEventListener('change', (event) => {
	const query = event.target.value;
	searchSong(query);
});

// Add additional event listener for pressing 'Enter' key in search input
searchInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		const query = event.target.value;
		searchSong(query);
	}
});