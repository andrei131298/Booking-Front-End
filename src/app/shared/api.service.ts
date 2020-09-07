import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Property } from "./property.model";
import { City } from "./city.model";
import { Apartment } from "./apartment.model";
import { Favourite } from "./favourite.model";
import { Reservation } from "./reservation.model";
import { User } from "./user.model";
import { Owner } from "./owner.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    "Content-Type": "application/json",
  });
  baseUrl = "https://localhost:44344/api";

  getCity(id: number) {
    return this.http.get(this.baseUrl + "/City/" + id.toString(), {
      headers: this.header,
    });
  }

  getApartment(id: number) {
    return this.http.get(this.baseUrl + "/Apartment/" + id.toString(), {
      headers: this.header,
    });
  }

  getFavourite(id: number) {
    return this.http.get(this.baseUrl + "/Favourites/" + id.toString(), {
      headers: this.header,
    });
  }

  getOwner(id: number) {
    return this.http.get(this.baseUrl + "/Owner/" + id.toString(), {
      headers: this.header,
    });
  }
  getUser(id: number) {
    return this.http.get(this.baseUrl + "/User/" + id.toString(), {
      headers: this.header,
    });
  }
  getProperty(id: number) {
    return this.http.get(this.baseUrl + "/Property/" + id.toString(), {
      headers: this.header,
    });
  }
  getReservation(id: number) {
    return this.http.get(this.baseUrl + "/Reservation/" + id.toString(), {
      headers: this.header,
    });
  }

  getProperties() {
    return this.http.get(this.baseUrl + "/Property", { headers: this.header });
  }

  // getSongs() {
  //   return this.http.get(this.baseUrl + "/song", { headers: this.header });
  // }

  // getArtists() {
  //   return this.http.get(this.baseUrl + "/artist", { headers: this.header });
  // }

  addProperty(property) {
    return this.http.post(
      this.baseUrl + "/Property",
      {
        name: property.name,
        type: property.type,
        description: property.description,
        numberOfStars: property.numberOfStars,
        pricePerNight: property.pricePerNight,
        addressId: JSON.parse("[" + property.addressId + "]"),
        //img: property.img,
      },
      { headers: this.header }
    );
  }

  //   addOwner(artist: Artist) {
  //     return this.http.post(this.baseUrl + "/Owner", artist, {
  //       headers: this.header,
  //     });
  //   }
  //   addAddress(song: Song) {
  //     return this.http.post(this.baseUrl + "/Address", song, {
  //       headers: this.header,
  //     });
  //   }
  //   addFavourite(song: Song) {
  //     return this.http.post(this.baseUrl + "/Favourite", song, {
  //       headers: this.header,
  //     });
  //   }
  addUser(user: User) {
    return this.http.post(this.baseUrl + "/User", user, {
      headers: this.header,
    });
  }
  //   addApartment(song: Song) {
  //     return this.http.post(this.baseUrl + "/Apartment", song, {
  //       headers: this.header,
  //     });
  //   }
  //   addResrvation(song: Song) {
  //     return this.http.post(this.baseUrl + "/Reservation", song, {
  //       headers: this.header,
  //     });
  //   }

  //   // addAlbum(album) {
  //   //   return this.http.post(
  //   //     this.baseUrl + "/album",
  //   //     {
  //   //       name: album.name,
  //   //       releaseYear: album.releaseYear,
  //   //       studioId: album.studioId,
  //   //       artistId: JSON.parse("[" + album.artistId + "]"),
  //   //       songId: JSON.parse("[" + album.songId + "]"),
  //   //       img: album.img,
  //   //     },
  //   //     { headers: this.header }
  //   //   );
  //   // }

  //   deleteAlbum(id: number) {
  //     return this.http.delete(this.baseUrl + "/album/" + id.toString(), {
  //       headers: this.header,
  //     });
  //   }

  //   deleteSong(id: number) {
  //     return this.http.delete(this.baseUrl + "/song/" + id.toString(), {
  //       headers: this.header,
  //     });
  //   }

  //   deleteArtist(id: number) {
  //     return this.http.delete(this.baseUrl + "/artist/" + id.toString(), {
  //       headers: this.header,
  //     });
  //   }

  //   editAlbum(album: Album) {
  //     return this.http.put(
  //       this.baseUrl + "/album/" + album.id.toString(),
  //       album,
  //       { headers: this.header }
  //     );
  //   }

  //   editArtist(artist: Artist) {
  //     return this.http.put(
  //       this.baseUrl + "/artist/" + artist.id.toString(),
  //       artist,
  //       { headers: this.header }
  //     );
  //   }

  //   editSong(song: Song) {
  //     return this.http.put(this.baseUrl + "/song/" + song.id.toString(), song, {
  //       headers: this.header,
  //     });
  //   }
}
