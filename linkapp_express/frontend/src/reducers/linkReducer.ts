import LinkType from '../link.model';

interface ReducerState {
    links: LinkType[];
    searchStr: string;
}

interface ReducerAction {
    type: string;
    payload: any;
}

const InitialState = {
    links: [],
    searchStr: ""
}

export default function reducer (state: ReducerState = InitialState, action: ReducerAction) {
    switch (action.type){
        case "GET_LINKS_PENDING":
            return {...state};

        case "GET_LINKS_REJECTED":
            return {...state};

        case "GET_LINKS_FULFILLED":
            return {...state, links: [...state.links, ...action.payload.data]};
        
        case "CHANGE_SEARCH_STR":
            return {...state, searchStr: action.payload};

        case "ADD_NEW_LINK_PENDING":
            return {...state };

        case "ADD_NEW_LINK_FULFILLED":
            return {...state, links: [...action.payload.data]};

        case "ADD_NEW_LINK_REJECTED":
            return {...state };

        case "REMOVE_LINK_PENDING":
            return {...state};

        case "REMOVE_LINK_FULFILLED":
            return {...state, links: [...action.payload.data]};
        
        case "REMOVE_LINK_REJECTED":
            return {...state};

        case "CHANGE_SHARING_PENDING":
            return {...state};

        case "CHANGE_SHARING_FULFILLED":
            return {...state, links: [...action.payload.data]};
        
        case "CHANGE_SHARING_REJECTED":
            return {...state};
            
    }

    return state;
}