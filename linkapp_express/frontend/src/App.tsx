import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Profile from './Components/profile/profile';
import LinkDisplay from './Components/linkdisplay/linkdisplay';
import AddLinkForm from './Components/addlinkform/addlinkform';
import LinkSearch from './Components/linksearch/linksearch';

import LinkType from './link.model';
import * as uuidv4 from 'uuid/v4';

import { connect } from "react-redux";

import { changeSearchStr, addLink, removeLink, toggleShare, fetchLinks } from './actions/linkActions';

class App extends React.Component<any, {}> {

  componentWillMount(){
    this.props.getLink();
  }

  handleToggleSharing(e: any, id: string) {
    this.props.toggleShare(id);
  }

  handleInputChange(e: any) {
    this.props.changeSearch(e.target.value);
  }

  handleDeleteLink(e:any, id: string) {
    this.props.removeLink(id);
  }

  handleAddLink(title:string, url:string, tags:string[]): void {
    let id = uuidv4();
    this.props.addLink({id: id ,title: title, url: url, tags: tags, shared: false});
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div id="top-part">
            <LinkSearch inputChange={this.handleInputChange.bind(this)}/>
            {this.props.searchStr}
          </div>
          <div id="bottom-part">
            <div id="bottom-left">
              <Profile fav_count={this.props.fav_count} shared_count={this.props.shared_count}/>
              <Route exact path="/" render={()=>
                <Link to="/addlinkform">
                  <button className="link-btn">Add Link</button>
                </Link>
              }/>
              <Route exact path="/addlinkform" render={()=>
                <Link to="/">
                  <button className="link-btn">Search</button>
                </Link>
              }/>
            </div>
            <div id="bottom-right">
              <Route exact path="/" render={()=>
                <div className="body-container">
                  <div id="link-search"><i>Link for </i></div>
                    <LinkDisplay 
                      links={this.props.links}
                      toggleSharing={this.handleToggleSharing.bind(this)}
                      deleteLink={this.handleDeleteLink.bind(this)}
                    />
                </div>
              }/>
              <Route path="/addlinkform" render={()=>
                <div className="body-container">
                  <AddLinkForm addLink={this.handleAddLink.bind(this)}/>
                </div>
              }/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
  
} //End App Class


const getFavCount= (links:LinkType[]): number => {
  return links.length;
}

const getSharedCount = (links: LinkType[]): number => {
  let count = 0;
  for (let x of links){
    if (x.shared){
      count ++;
    }
  }
  return count;
}

const mapStatetoProps = (state: any) => {
  let passedLinks: LinkType[];
  let fav_count = getFavCount(state.link.links);
  let shared_count = getSharedCount(state.link.links);
  let searchStr = state.link.searchStr;
  if (searchStr === "" || searchStr === "#"){
    passedLinks = state.link.links;
  } else {
    if (searchStr[0] === '#'){
      searchStr = searchStr.substring(1,searchStr.length);
      passedLinks = state.link.links.filter((link:LinkType)=>{
        if (link.tags === undefined){
          return;
        } else{
          return link.tags.filter(tag => tag.toLowerCase().includes(searchStr.toLowerCase())).length > 0
        }        
      });
    } else {
      passedLinks = state.link.links.filter((link:LinkType)=> link.title.toLowerCase().includes(searchStr.toLowerCase()));
    }
  }
  return {
    links: passedLinks,
    fav_count: fav_count,
    shared_count: shared_count
  };
};

const mapDispatchToProps = (dispatch: any) =>{
  return {
    changeSearch: (searchStr:string) => {
      dispatch(changeSearchStr(searchStr));
    },
    addLink: (link:LinkType) => {
      dispatch(addLink(link));
    },
    removeLink: (id:string) => {
      dispatch(removeLink(id));
    },
    toggleShare: (id:string) => {
      dispatch(toggleShare(id));
    },
    getLink: ()=>{
      dispatch(fetchLinks());
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(App);
