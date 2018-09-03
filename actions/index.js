import {logIn, authenticate, clearUser} from "./auth";
import {getLocations, getLocation, createLocation, updateLocation, createReview, editReview} from "./locations";
import {setLoading} from "./loading";
import {getUser} from "./users";
import {getPhoto} from "./photos";

export {logIn, authenticate, getLocations, getLocation, setLoading, getUser, getPhoto, clearUser, createLocation, updateLocation, createReview, editReview};
