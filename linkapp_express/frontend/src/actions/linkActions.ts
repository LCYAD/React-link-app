import LinkType from '../link.model';
import axios from 'axios';

export function fetchLinks() {
    return {
        type: "GET_LINKS",
        payload: axios.get("http://localhost:8000/api/links")
    };
}

export function addLink(link:LinkType){
    return {
        type: "ADD_NEW_LINK",
        payload: axios.post("http://localhost:8000/api/addlink", link)
    };
}

export function removeLink(id:string) {
    return {
        type: "REMOVE_LINK",
        payload: axios.delete(`http://localhost:8000/api/removelink/${id}`)
    };
}

export function changeSearchStr(searchStr:string){
    return {
        type: "CHANGE_SEARCH_STR",
        payload: searchStr
    };
}

export function toggleShare(id:string) {
    return {
        type: "CHANGE_SHARING",
        payload: axios.put(`http://localhost:8000/api/changeShare/${id}`)
    }
}