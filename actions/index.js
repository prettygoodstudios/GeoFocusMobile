import {logIn, authenticate, clearUser, createUser} from "./auth";
import {getLocations, getLocation, createLocation, updateLocation, createReview, editReview} from "./locations";
import {setLoading} from "./loading";
import {getUser} from "./users";
import {getPhoto, uploadPhoto} from "./photos";

export {logIn, authenticate, getLocations, getLocation, setLoading, getUser, getPhoto, clearUser, createLocation, updateLocation, createReview, editReview, uploadPhoto, createUser};
