import {logIn, authenticate, clearUser, createUser, editRegistration} from "./auth";
import {getLocations, getLocation, createLocation, updateLocation, createReview, editReview, setMyLocation} from "./locations";
import {setLoading} from "./loading";
import {getUser} from "./users";
import {getPhoto, uploadPhoto} from "./photos";
import {setScroll} from "./scrolling";
import {setPadding} from "./padding";
import {setResults, setSearching} from "./search";
import {setReport} from "./reports";

export {logIn, authenticate, getLocations, getLocation, setLoading, getUser, getPhoto, clearUser, createLocation, updateLocation, createReview, editReview, uploadPhoto, createUser, setScroll, setPadding, editRegistration, setSearching, setResults, setMyLocation, setReport};
