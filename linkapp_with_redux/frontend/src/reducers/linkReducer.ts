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
    links: [
        {id: "4564188", title: "Google", url:"https://www.google.com", tags: ["Google", "Search"], shared: false},
        {id: "679843213", title: "Accelerate", url:"https://www.acceleratedhk.com", tags: ["Accelerate", "Coding"], shared: true},
        {id: "456410088", title: "Facebook", url:"https://www.facebook.com", tags: ["Facebook", "Social"], shared: false}
    ],
    searchStr: ""
}

export default function reducer (state: ReducerState = InitialState, action: ReducerAction) {
    switch (action.type){
        case "GET_LINKS":
            return {...state};
        
        case "CHANGE_SEARCH_STR":
            return {...state, searchStr: action.payload};

        case "ADD_NEW_LINK":
            return {...state, 
                    links: [...state.links, action.payload]};
        case "REMOVE_LINK":
            for (let x = 0; x < state.links.length; x++) {
                if (state.links[x].id === action.payload) {
                    return {...state, links: [...state.links.slice(0, x), ...state.links.slice(x+1)]}
                }
            }
            return {...state}
        
        case "CHANGE_SHARING":
            for (let x = 0; x < state.links.length; x++) {
                if (state.links[x].id === action.payload) {
                    let changedLinks = state.links[x];
                    changedLinks.shared = !changedLinks.shared;
                    return {...state, links: [...state.links.slice(0, x), changedLinks, ...state.links.slice(x+1)]}
                }
            }
            return {...state}
            
    }

    return state;
}