In this project let's build an **Spotify Remix app** by applying the concepts we have learned till now. This project allows you to practice the concepts and techniques learned till React Course and apply them in a concrete project.

You will demonstrate your skills by creating an app that will fetch data from an internal server using a component, displaying that data, routing concepts, authentication and authorization, and adding responsiveness to the website

This is an individual assessment. All work must be your own. You can request for the feedback after your project submission in the discussions.

### Prerequisites

#### UI Prerequisites

<details>
<summary>Click to view</summary>

- What is Figma?
  - Figma is a vector graphics editor and prototyping tool which is primarily web-based. You can check more info on the <a href="https://www.figma.com/" target="_blank">website</a>
- Create a Free account in Figma.
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=hrHL2VLMl7g&t=37s" target="_blank">this</a> video to create a free Figma account. Watch the video upto **00:50**
- How to Check CSS in Figma?
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=B242nuM3y2s" target="_blank">this</a> video to check CSS in a Figma screen. Watch the video upto **02:45**.
- Export Images in Figma screen

  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=NpzL1MONwaw" target="_blank">this</a> video to export images from a Figma screen.
  - Click on the Export button to get Export options as shown in the below image.

  <div style="text-align:center;margin:10px 0px 0px 45px;width:200px;">
    <img src="https://assets.ccbp.in/frontend/react-js/figma-export-option.png" />
  </div>

- Upload your exported images from Figma to Cloudinary and get image URLs from Cloudinary. Refer <a href="https://learning.ccbp.in/projects/course?c_id=fe4c935d-3ad5-4bb8-a1a5-9b045ae70010&s_id=2f72d6fe-09a7-4c0a-b0db-196740c853a0&t_id=6535e48d-fb4e-45c4-9654-3da423c79e26" target="_blank">this</a> session for better understanding.

</details>

#### Design Files

<details>
<summary>Click to view</summary>

- You can check the **Design Files** for different devices <a href="https://www.figma.com/file/tkinbKNLulcZ6UasfIQZOS/Spotify_Remix?type=design&node-id=0-1&mode=design" target="_blank">here</a>.

</details>

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Completion Instructions

<details>
<summary>Functionality to be added</summary>
<br/>
The app must have the following functionalities

- **Login Route**

  - When an invalid credentials are provided and the **Login** button is clicked, then the respective error message received from the response should be displayed
  - When a valid credentials are provided and the **Login** button is clicked, then the page should be navigated to the Home Route
  - When an _unauthenticated_ user tries to access the Home Route, Playlists, Categories and Albums Route, then the page should be navigated to Login Route
  - When an _authenticated_ user tries to access the Home Route, Playlists, Categories and Albums Route, then the page should be navigated to the respective route
  - When an _authenticated_ user tries to access the Login Route, then the page should be navigated to the Home Route

- **Home Route**

  - When an authenticated user opens the Home Route,

    - An HTTP GET requests should be made to **featuredPlaylistsApiUrl** ( Editor's Pick ), **categoriesApiUrl** ( Genres & Moods ), and **newReleasesApiUrl** ( New Releases )

      - Respective **_loader_** should be displayed while fetching the data
      - After the data is fetched successfully,
        - Users should be able to see a list of Featured Playlists (Ex: Editor Picks).
        - Users should be able to see the list of Categories (Ex: Genres and Moods).
        - Users should be able to see the list of New Releases.
        - Sidebar should contain the **Spotify Remix** with logo, and Logout button
        - Users should be able to navigate to the Home route when clicking on the **Spotify Remix** logo.

- **Specific Playlist Details Route**

  - When a user clicks on any playlist in the list of featured playlists then the user should be able to see the list of songs in that playlist.
  - Users should be able the see the following details(Song Name, Artist Name, Duration of the song)
  - Users should be able to play the song.

- **Specific Category Playlists Details Route**

  - When a user clicks on any category in the list of categories then the user should be able to see the list of playlists in that category.
  - Users should be able to see the image and name of the category along with their total tracks.
  - When a user clicks on any playlist in the list of playlists in that category then the user should be able to see the list of songs in that playlist.
  - Users should be able the see the following details(Song Name, Artist Name, Duration of the song)
  - Users should be able to play the song.

- **Specific Album Details Route**

  - When a user clicks on any Album in the list of New Releases then the user should be able to see that Album.
  - Users should be able to see the image and name of the Album.
  - Users should be able to see the song in that Album
  - Users should be able to play the song.

- **Not Found Route**

  - When a random path is provided as the URL, then the page should navigate to the Not Found Route

- Users should be able to view the website responsively in mobile view, tablet view as well

</details>

### Resources

<details>
<summary>API Requests & Responses</summary>

<br/>

**loginApiUrl**

#### API: `https://apis.ccbp.in/login`

#### Method: `POST`

#### Request:

```json
{
  "username": "rahul",
  "password": "rahul@2021"
}
```

#### Description:

Returns a response based on the credentials provided

#### Sample Success Response

```json
{
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9. nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y"
}
```

#### Sample Failure Response

```json
{
  "status_code": 404,
  "error_msg": "Username is not found"
}
```

**featuredPlayLists**

#### API: `https://apis2.ccbp.in/spotify-clone/featured-playlists`

#### Method: `GET`

#### Description:

Returns a response containing the list of featured playlists

#### Sample Response

    ```json
    {
        "message" : "Popular Playlists",
        "playlists" : {
            "href" : "https://api.spotify.com/v1/browse/featured-playlists?country=IN&timestamp=2021-07-03T11%3A00%3A00&offset=0&limit=20",
            "items" : [
                {
                    "collaborative" : false,
                    "description" : "Hottest Bollywood R&B tunes!",
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DXdSavJjIP6Fb"
                    },
                    "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DXdSavJjIP6Fb",
                    "id" : "37i9dQZF1DXdSavJjIP6Fb",
                    "images" : [ {
                        "height" : null,
                        "url" : "https://i.scdn.co/image/ab67706f000000036caf8c414e0b49f1b5be3e91",
                        "width" : null
                    } ],
                    "name" : "Bollywood R&B",
                    "owner" : {
                        "display_name" : "Spotify",
                        "external_urls" : {
                        "spotify" : "https://open.spotify.com/user/spotify"
                        },
                        "href" : "https://api.spotify.com/v1/users/spotify",
                        "id" : "spotify",
                        "type" : "user",
                        "uri" : "spotify:user:spotify"
                    },
                    "primary_color" : null,
                    "public" : null,
                    "snapshot_id" : "MTYyMzgyNjY1NCwwMDAwMDAxMDAwMDAwMTdhMTM5YzY0NzAwMDAwMDE3MTM0MmFmMTgz",
                    "tracks" : {
                        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DXdSavJjIP6Fb/tracks",
                        "total" : 30
                    },
                    "type" : "playlist",
                    "uri" : "spotify:playlist:37i9dQZF1DXdSavJjIP6Fb"
                },
                ....
            ],
            "limit" : 20,
            "next" : null,
            "offset" : 0,
            "previous" : null,
            "total" : 15
        }
    }
    ```

**categoriesApiUrl**

#### API: `https://apis2.ccbp.in/spotify-clone/categories`

#### Method: `GET`

#### Description:

Returns a response containing the list of categories

#### Sample Response

```json
{
    "categories" : {
        "href" : "https://api.spotify.com/v1/browse/categories?offset=0&limit=20",
        "items" : [
            {
                "href" : "https://api.spotify.com/v1/browse/categories/toplists",
                "icons" : [ {
                    "height" : 275,
                    "url" : "https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg",
                    "width" : 275
                } ],
                "id" : "toplists",
                "name" : "Top Lists"
            },
            ....
        ],
        "limit" : 20,
        "next" : "https://api.spotify.com/v1/browse/categories?offset=20&limit=20",
        "offset" : 0,
        "previous" : null,
        "total" : 58
    }
}
```

**newReleasesApiUrl**

#### API: `https://apis2.ccbp.in/spotify-clone/new-releases`

#### Method: `GET`

#### Description:

Returns a response containing the list of new releases

#### Sample Response

```json
    {
        "albums" : {
            "href" : "https://api.spotify.com/v1/browse/new-releases?country=IN&offset=0&limit=20",
            "items" : [
                {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/7gXy60xRcwYujBFoYHnR2O"
                        },
                        "href" : "https://api.spotify.com/v1/artists/7gXy60xRcwYujBFoYHnR2O",
                        "id" : "7gXy60xRcwYujBFoYHnR2O",
                        "name" : "Big Red Machine",
                        "type" : "artist",
                        "uri" : "spotify:artist:7gXy60xRcwYujBFoYHnR2O"
                    }, {
                        "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02"
                        },
                        "href" : "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02",
                        "id" : "06HL4z0CvFAxyc27GXpf02",
                        "name" : "Taylor Swift",
                        "type" : "artist",
                        "uri" : "spotify:artist:06HL4z0CvFAxyc27GXpf02"
                    } ],
                    "available_markets" : [ "AD", "AE", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CH", "CI", "CL", "CM", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MN", "MO", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PS", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SR", "ST", "SV", "SZ", "TD", "TG", "TH", "TL", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VC", "VN", "VU", "WS", "XK", "ZA", "ZM", "ZW" ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4kD0pFwhEjEiF9pwUwkpNo"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4kD0pFwhEjEiF9pwUwkpNo",
                    "id" : "4kD0pFwhEjEiF9pwUwkpNo",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273b8abc4de41be8b3158a4ef40",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02b8abc4de41be8b3158a4ef40",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851b8abc4de41be8b3158a4ef40",
                        "width" : 64
                    } ],
                    "name" : "Renegade (feat. Taylor Swift)",
                    "release_date" : "2021-07-02",
                    "release_date_precision" : "day",
                    "total_tracks" : 3,
                    "type" : "album",
                    "uri" : "spotify:album:4kD0pFwhEjEiF9pwUwkpNo"
                },
                ....
            ],
            "limit" : 20,
            "next" : "https://api.spotify.com/v1/browse/new-releases?country=IN&offset=20&limit=20",
            "offset" : 0,
            "previous" : null,
            "total" : 100
    }
```

**specificPlaylistDetailsApiUrl**

#### API: `https://apis2.ccbp.in/spotify-clone/playlists-details/{playlistId}`

#### Example: `https://apis2.ccbp.in/spotify-clone/playlists-details/37i9dQZF1DX7cLxqtNO3zl`

#### Method: `GET`

#### Description:

Returns a response containing the specific playlist details

#### Sample Response

    ```json
    {
        "collaborative" : false,
        "description": "From India to MENA, these hits will make you dance.",
        "external_urls" : {
            "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX7cLxqtNO3zl"
        },
        "followers" : {
            "href" : null,
            "total" : 47628
        },
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX7cLxqtNO3zl",
        "id" : "37i9dQZF1DX7cLxqtNO3zl",
        "images" : [ {
            "height" : null,
            "url" : "https://i.scdn.co/image/ab67706f0000000384696e0bd9318a598cc9373d",
            "width" : null
        } ],
        "name" : "Bollywood Araby",
        "owner" : {
            "display_name" : "Spotify",
            "external_urls" : {
            "spotify" : "https://open.spotify.com/user/spotify"
            },
            "href" : "https://api.spotify.com/v1/users/spotify",
            "id" : "spotify",
            "type" : "user",
            "uri" : "spotify:user:spotify"
        },
        "primary_color" : "#ffffff",
        "public" : false,
        "snapshot_id" : "MTYyNTI5NDQ3MiwwMDAwMDAwMGJiYzUwMjlhMGNjZWVlYTgxYTUyY2I0MTc1MjBjMmUy",
        "tracks" : {
            "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX7cLxqtNO3zl/tracks?offset=0&limit=100",
            "items" : [
                {
                    "added_at" : "2021-06-03T19:23:39Z",
                    "added_by" : {
                        "external_urls" : {
                        "spotify" : "https://open.spotify.com/user/"
                        },
                        "href" : "https://api.spotify.com/v1/users/",
                        "id" : "",
                        "type" : "user",
                        "uri" : "spotify:user:"
                    },
                    "is_local" : false,
                    "primary_color" : null,
                    "track" : {
                        "album" : {
                        "album_type" : "single",
                        "artists" : [ {
                            "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of"
                            },
                            "href" : "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
                            "id" : "0LyfQWJT6nXafLPZqxe9Of",
                            "name" : "Various Artists",
                            "type" : "artist",
                            "uri" : "spotify:artist:0LyfQWJT6nXafLPZqxe9Of"
                        } ],
                        "available_markets" : [ "AD", "AE", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CH", "CI", "CL", "CM", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MN", "MO", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PS", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SR", "ST", "SV", "SZ", "TD", "TG", "TH", "TL", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VC", "VN", "VU", "WS", "XK", "ZA", "ZM", "ZW" ],
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/album/7IfUPFe5MSwcAp2Vw8ohF5"
                        },
                        "href" : "https://api.spotify.com/v1/albums/7IfUPFe5MSwcAp2Vw8ohF5",
                        "id" : "7IfUPFe5MSwcAp2Vw8ohF5",
                        "images" : [ {
                            "height" : 640,
                            "url" : "https://i.scdn.co/image/ab67616d0000b273bd04f8c4ddaa8586e3f1505d",
                            "width" : 640
                        }, {
                            "height" : 300,
                            "url" : "https://i.scdn.co/image/ab67616d00001e02bd04f8c4ddaa8586e3f1505d",
                            "width" : 300
                        }, {
                            "height" : 64,
                            "url" : "https://i.scdn.co/image/ab67616d00004851bd04f8c4ddaa8586e3f1505d",
                            "width" : 64
                        } ],
                        "name" : "BurjKhalifa (From \"Laxmii\")",
                        "release_date" : "2020-10-18",
                        "release_date_precision" : "day",
                        "total_tracks" : 1,
                        "type" : "album",
                        "uri" : "spotify:album:7IfUPFe5MSwcAp2Vw8ohF5"
                        },
                        "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/5EXIQQjCaCnRPJ68SxYURB"
                        },
                        "href" : "https://api.spotify.com/v1/artists/5EXIQQjCaCnRPJ68SxYURB",
                        "id" : "5EXIQQjCaCnRPJ68SxYURB",
                        "name" : "Shashi",
                        "type" : "artist",
                        "uri" : "spotify:artist:5EXIQQjCaCnRPJ68SxYURB"
                        }, {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/6xElGyunMSlnuJ2vabDUWA"
                        },
                        "href" : "https://api.spotify.com/v1/artists/6xElGyunMSlnuJ2vabDUWA",
                        "id" : "6xElGyunMSlnuJ2vabDUWA",
                        "name" : "DJ Khushi",
                        "type" : "artist",
                        "uri" : "spotify:artist:6xElGyunMSlnuJ2vabDUWA"
                        }, {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3tPQOjkxO3mrYrrgkTeXgH"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3tPQOjkxO3mrYrrgkTeXgH",
                        "id" : "3tPQOjkxO3mrYrrgkTeXgH",
                        "name" : "Nikhita Gandhi",
                        "type" : "artist",
                        "uri" : "spotify:artist:3tPQOjkxO3mrYrrgkTeXgH"
                        }, {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/4x4Q6d60hC0ZuLloMeCLoS"
                        },
                        "href" : "https://api.spotify.com/v1/artists/4x4Q6d60hC0ZuLloMeCLoS",
                        "id" : "4x4Q6d60hC0ZuLloMeCLoS",
                        "name" : "Madhubanti",
                        "type" : "artist",
                        "uri" : "spotify:artist:4x4Q6d60hC0ZuLloMeCLoS"
                        } ],
                        "available_markets" : [ "AD", "AE", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CH", "CI", "CL", "CM", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MN", "MO", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PS", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SR", "ST", "SV", "SZ", "TD", "TG", "TH", "TL", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VC", "VN", "VU", "WS", "XK", "ZA", "ZM", "ZW" ],
                        "disc_number" : 1,
                        "duration_ms" : 187570,
                        "episode" : false,
                        "explicit" : false,
                        "external_ids" : {
                        "isrc" : "INZ031408360"
                        },
                        "external_urls" : {
                        "spotify" : "https://open.spotify.com/track/3ZVKI8jix6PjEFx2xFBFhz"
                        },
                        "href" : "https://api.spotify.com/v1/tracks/3ZVKI8jix6PjEFx2xFBFhz",
                        "id" : "3ZVKI8jix6PjEFx2xFBFhz",
                        "is_local" : false,
                        "name" : "BurjKhalifa (From \"Laxmii\")",
                        "popularity" : 67,
                        "preview_url" : "https://p.scdn.co/mp3-preview/db40ab496ac6cbfdc8b87e8ecf2032b18073b1e5?cid=f25d283eae8046588034aee0a42c0f31",
                        "track" : true,
                        "track_number" : 1,
                        "type" : "track",
                        "uri" : "spotify:track:3ZVKI8jix6PjEFx2xFBFhz"
                    },
                    "video_thumbnail" : {
                        "url" : null
                    }
                },
                ....
            ],
            "limit" : 100,
            "next" : null,
            "offset" : 0,
            "previous" : null,
            "total" : 50
            },
        "type" : "playlist",
        "uri" : "spotify:playlist:37i9dQZF1DX7cLxqtNO3zl"
    }
    ```

- You can get the song url from the key `preview_url`. this key value is present inside items object that is received as a part of the response for the Specific Playlist API

- For example in above response

  ```json
      {
      ....
      "tracks" : {
          ....
          "items" : [
              {
                  ....
                  "track" : {
                      ....
                      "preview_url" : "https://p.scdn.co/mp3-preview/db40ab496ac6cbfdc8b87e8ecf2032b18073b1e5?cid=f25d283eae8046588034aee0a42c0f31",
                      ....
                  },
                  ....
              },
              ....
          ],
          ....
          },
          ....
  }
  ```

**specificCategoryPlaylistsDetailsApiUrl**

#### API: `https://apis2.ccbp.in/spotify-clone/category-playlists/{categoryId}`

#### Example: `https://apis2.ccbp.in/spotify-clone/category-playlists/toplists`

#### Method: `GET`

#### Description:

Returns a response containing the specific category

#### Sample Response

```json
{
    "playlists" : {
        "href" : "https://api.spotify.com/v1/browse/categories/toplists/playlists?country=IN&offset=0&limit=20",
        "items" : [
            {
                "collaborative" : false,
                "description": "Doja Cat & The Weeknd are on top of the Hottest 50!",
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
                },
                "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M",
                "id" : "37i9dQZF1DXcBWIGoYBM5M",
                "images" : [ {
                    "height" : null,
                    "url" : "https://i.scdn.co/image/ab67706f0000000324cee63f23e9ec905dbcb3b0",
                    "width" : null
                } ],
                "name" : "Today's Top Hits",
                "owner" : {
                    "display_name" : "Spotify",
                    "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/spotify"
                    },
                    "href" : "https://api.spotify.com/v1/users/spotify",
                    "id" : "spotify",
                    "type" : "user",
                    "uri" : "spotify:user:spotify"
                },
                "primary_color" : null,
                "public" : null,
                "snapshot_id" : "MTYyNTE5ODQwMCwwMDAwMDRjMTAwMDAwMTdhNjU1ZjkyY2YwMDAwMDE3YTY0OWRhYmYw",
                "tracks" : {
                    "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks",
                    "total" : 50
                },
                "type" : "playlist",
                "uri" : "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
            },
            ....
        ],
        "limit" : 20,
        "next" : null,
        "offset" : 0,
        "previous" : null,
        "total" : 13
    }
}
```

**specifcAlbumDetailsApiUrl**

#### API: `https://apis2.ccbp.in/spotify-clone/album-details/{albumId}`

#### Example: `https://apis2.ccbp.in/spotify-clone/album-details/7gXy60xRcwYujBFoYHnR2O`

#### Method: `GET`

#### Description:

Returns a response containing the specific album details

#### Sample Response

    ```json
    {
        "album_type" : "single",
        "artists" : [
            {
                "external_urls" : {
                "spotify" : "https://open.spotify.com/artist/7gXy60xRcwYujBFoYHnR2O"
                },
                "href" : "https://api.spotify.com/v1/artists/7gXy60xRcwYujBFoYHnR2O",
                "id" : "7gXy60xRcwYujBFoYHnR2O",
                "name" : "Big Red Machine",
                "type" : "artist",
                "uri" : "spotify:artist:7gXy60xRcwYujBFoYHnR2O"
            },
            ....
        ],
        "available_markets" : [ "AD", "AE", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CH", "CI", "CL", "CM", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MN", "MO", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PS", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SR", "ST", "SV", "SZ", "TD", "TG", "TH", "TL", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VC", "VN", "VU", "WS", "XK", "ZA", "ZM", "ZW" ],
        "copyrights" : [ {
            "text" : "2021 Jagjaguwar / 37d03d",
            "type" : "C"
        }, {
            "text" : "2021 Jagjaguwar / 37d03d",
            "type" : "P"
        } ],
        "external_ids" : {
            "upc" : "617308011296"
        },
        "external_urls" : {
            "spotify" : "https://open.spotify.com/album/4kD0pFwhEjEiF9pwUwkpNo"
        },
        "genres" : [ ],
        "href" : "https://api.spotify.com/v1/albums/4kD0pFwhEjEiF9pwUwkpNo",
        "id" : "4kD0pFwhEjEiF9pwUwkpNo",
        "images" : [ {
            "height" : 640,
            "url" : "https://i.scdn.co/image/ab67616d0000b273b8abc4de41be8b3158a4ef40",
            "width" : 640
        }, {
            "height" : 300,
            "url" : "https://i.scdn.co/image/ab67616d00001e02b8abc4de41be8b3158a4ef40",
            "width" : 300
        }, {
            "height" : 64,
            "url" : "https://i.scdn.co/image/ab67616d00004851b8abc4de41be8b3158a4ef40",
            "width" : 64
        } ],
        "label" : "Jagjaguwar",
        "name" : "Renegade (feat. Taylor Swift)",
        "popularity" : 0,
        "release_date" : "2021-07-02",
        "release_date_precision" : "day",
        "total_tracks" : 3,
        "tracks" : {
            "href" : "https://api.spotify.com/v1/albums/4kD0pFwhEjEiF9pwUwkpNo/tracks?offset=0&limit=50",
            "items" : [
                {
                    "artists" : [ {
                        "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/7gXy60xRcwYujBFoYHnR2O"
                        },
                        "href" : "https://api.spotify.com/v1/artists/7gXy60xRcwYujBFoYHnR2O",
                        "id" : "7gXy60xRcwYujBFoYHnR2O",
                        "name" : "Big Red Machine",
                        "type" : "artist",
                        "uri" : "spotify:artist:7gXy60xRcwYujBFoYHnR2O"
                    }, {
                        "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02"
                        },
                        "href" : "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02",
                        "id" : "06HL4z0CvFAxyc27GXpf02",
                        "name" : "Taylor Swift",
                        "type" : "artist",
                        "uri" : "spotify:artist:06HL4z0CvFAxyc27GXpf02"
                    } ],
                    "available_markets" : [ "AD", "AE", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CH", "CI", "CL", "CM", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MN", "MO", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PS", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SR", "ST", "SV", "SZ", "TD", "TG", "TH", "TL", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VC", "VN", "VU", "WS", "XK", "ZA", "ZM", "ZW" ],
                    "disc_number" : 1,
                    "duration_ms" : 254466,
                    "explicit" : false,
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/track/1aU1wpYBSpP0M6IiihY5Ue"
                    },
                    "href" : "https://api.spotify.com/v1/tracks/1aU1wpYBSpP0M6IiihY5Ue",
                    "id" : "1aU1wpYBSpP0M6IiihY5Ue",
                    "is_local" : false,
                    "name" : "Renegade (feat. Taylor Swift)",
                    "preview_url" : "https://p.scdn.co/mp3-preview/e3b1851865f3ee5f213dfd8d950e344e6b14ec8c?cid=f25d283eae8046588034aee0a42c0f31",
                    "track_number" : 1,
                    "type" : "track",
                    "uri" : "spotify:track:1aU1wpYBSpP0M6IiihY5Ue"
                },
                ....
            ],
            "limit" : 50,
            "next" : null,
            "offset" : 0,
            "previous" : null,
            "total" : 3
        },
        "type" : "album",
        "uri" : "spotify:album:4kD0pFwhEjEiF9pwUwkpNo"
    }
    ```

</details>

### Quick Tips

<details>
<summary>Click to view</summary>

- You can use Moment third party library to format the date
  - Moment <a href="https://www.npmjs.com/package/moment" target="_blank">Documentation</a>
- You can use <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio" target="_blank">HTML Audio tags</a> for building the Music Player
  - You can see this <a href="https://pointclearmedia.com/2020/08/27/css-styling-the-audio-element/" target="_blank">Documentation</a> for stylings

</details>

### Important Note

<details>
<summary>Click to view</summary>

<br/>

**The following instructions are required for the tests to pass**

- **Note:**

  - For Mini Projects, You have to use HTML elements to style the React Components. Usage of `styled-components` (CSS in JS) to style React components are not supported in Mini Projects. Test cases won't be passed, if you use styled components.
  - Refer to the below Example for the usage of `data-testid` in the HTML elements
    - Example: `<div data-testid="questionItem" className="question-item"/>`

- **Routes**

  - `Home` Route should consist of `/` in the URL path
  - `PlaylistsDetails` Route should consist of `/playlist/:id` in the URL path
  - `CategoryPlaylistsDetails` Route should consist of `/category/:id/playlists` in the URL path
  - `AlbumDetails` Route should consist of `/album/:id` in the URL path

- **Login Route**

  - The Spotify Remix Logo image should consist of alt attribute value as `login website logo`

- **Home Route:**

  - The Spotify Remix Logo image in Sidebar should consist of alt attribute value as `website logo`
  - The Featured playlist images should consist of alt attribute value as `featured playlist`
  - The List of Categories (Genres & Moods) images should consist of alt attribute value as `category`
  - The List of New Releases images should consist of alt attribute value as `new release album`
  - The Failure View image should consist of alt attribute value as `failure view`

- **Not Found Route**
  - The Not Found image should consist of alt attribute value as `page not found`

</details>

### User Credentials

<details>
<summary>Click to view user credentials</summary>

<br/>

**You can use any one of the following credentials**

```text
  username: aakash
  password: sky@007
```

```text
  username: agastya
  password: myth#789
```

```text
  username: advika
  password: world@5
```

```text
  username: binita
  password: modest*6
```

```text
  username: chetan
  password: vigor$life
```

```text
  username: deepak
  password: lightstar@1
```

```text
  username: harshad
  password: joy@85
```

```text
  username: kapil
  password: moon$008
```

```text
 username: rahul
 password: rahul@2021
```

```text
  username: shravya
  password: musical#stone
```

```text
  username: saira
  password: princess@9
```

<br/>
</details>

### Project Submission Instructions

- For Mini Projects, you can submit the test cases at your own pace. But we suggest you to submit the code to know the percentage of completion through test cases and that score will be considered for your interviews.

- Also it's important to publish your code frequently using `Step - 4` in the Instructions tab.

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
