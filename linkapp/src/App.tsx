import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Profile from './Components/profile/profile';
import LinkDisplay from './Components/linkdisplay/linkdisplay';
import AddLinkForm from './Components/addlinkform/addlinkform';
import LinkSearch from './Components/linksearch/linksearch';

import LinkType from './link.model';
import * as uuidv4 from 'uuid/v4';

interface Statetype{
  links: LinkType[],
  fav_count: number,
  shared_count: number,
  search_key: string
}

let links: LinkType[] = [
  {id: "4564188", title: "Google", url:"https://www.google.com", tags: ["Google", "Search"], shared: false},
  {id: "679843213", title: "Accelerate", url:"https://www.acceleratedhk.com", tags: ["Accelerate", "Coding"], shared: true},
  {id: "456410088", title: "Facebook", url:"https://www.facebook.com", tags: ["Facebook", "Social"], shared: false}
];

class App extends React.Component<{}, Statetype> {

  link: any;

  constructor(props: any) {
    super(props);
    this.state = {
      links: [],
      fav_count: 0,
      shared_count: 0,
      search_key: ""
    }
    this.handleToggleSharing = this.handleToggleSharing.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeleteLink = this.handleDeleteLink.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
  }

  componentWillMount() {
    this.getLinks();
    this.getFavCount();
    this.getSharedCount();
  }

  getLinks(): void {
    this.setState({links: links});
  }

  getFavCount(): void {
    this.setState({fav_count: links.length});
  }

  getSharedCount(): void {
    let count = 0;
    for (let x of links){
      if (x.shared){
        count ++;
      }
    }
    this.setState({shared_count: count});
  }

  handleToggleSharing(e: any, id: string) {
    for (let x of this.state.links){
      if (x.id === id){
        x.shared = !x.shared;
      }
    }
    this.setState({links: links});
    this.getSharedCount();
  }

  handleInputChange(e: any) {
    // console.log(e.target.value);
    let searchStr = e.target.value;
    let filtered_links : LinkType[];
    if (searchStr[0] === '#'){
      searchStr = searchStr.substring(1,searchStr.length);
      filtered_links = links.filter((link)=>{
        if (link.tags === undefined){
          return;
        } else{
          return link.tags.filter(tag => tag.toLowerCase().includes(searchStr.toLowerCase())).length > 0
        }        
      });
    } else {
      filtered_links = links.filter(link=> link.title.toLowerCase().includes(searchStr.toLowerCase()));
    }
    this.setState({links: filtered_links});
    this.setState({search_key: e.target.value});
  }

  handleDeleteLink(e:any, id: string) {
    for (let index = 0; index < links.length ; index++){
      if (links[index].id === id){
        links.splice(index, 1);
      }
    }
    this.setState({links: links});
    this.getFavCount();
    this.getSharedCount();
  }

  handleAddLink(title:string, url:string, tags:string[]): void {
    let id = uuidv4();
    links.push({id: id ,title: title, url: url, tags: tags, shared: false});
    this.setState({links: links});
    this.getFavCount();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div id="top-part">
            <LinkSearch inputChange={this.handleInputChange}/>
          </div>
          <div id="bottom-part">
            <div id="bottom-left">
              <Profile fav_count={this.state.fav_count} shared_count={this.state.shared_count}/>
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
                  <div id="link-search"><i>Link for {this.state.search_key}</i></div>
                    <LinkDisplay 
                      links={this.state.links}
                      toggleSharing={this.handleToggleSharing}
                      deleteLink={this.handleDeleteLink}
                    />
                </div>
              }/>
              <Route path="/addlinkform" render={()=>
                <div className="body-container">
                  <AddLinkForm addLink={this.handleAddLink}/>
                </div>
              }/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
