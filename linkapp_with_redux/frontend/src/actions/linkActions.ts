import LinkType from '../link.model';

export function fetchLinks() {
    return ;
}

export function addLink(link:LinkType){
    return {
        type: "ADD_NEW_LINK",
        payload: link
    };
}

export function removeLink(id:string) {
    return {
        type: "REMOVE_LINK",
        payload: id
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
        payload: id
    }
}