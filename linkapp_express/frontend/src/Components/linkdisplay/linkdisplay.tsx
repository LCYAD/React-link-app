import * as React from 'react';
import './linkdisplay.css';

import LinkType from '../../link.model';

interface LinkDisplayProps {
    links: LinkType[];
    toggleSharing: Function;
    deleteLink: Function;
}

interface LinkDisplayState {

}

class LinkDisplay extends React.Component <LinkDisplayProps, LinkDisplayState> {

  constructor(props: LinkDisplayProps) {
    super(props);
    this.state = {};
    this.showLinks = this.showLinks.bind(this);
  }

  componentWillMount(){
  }

  showLinks(){
    return this.props.links.map(link => {
      return (
        <div key={link.title} className="link-box">
          <a target="_blank" className="title" href={link.url}>{link.title}</a>
          <div className="tags">{this.tagList(link.tags)}</div>
          <div><button className="remove-btn" onClick={(e)=>this.props.deleteLink(e, link.id)}>X</button></div>
          <div>{this.sharedBtn(link.shared, link.id)}</div>
        </div>
      )
    });
  }

  tagList(tags?: string[]):any{
    if (tags=== undefined){
      return ;
    } else{
      return tags.map(tag=>{
        return <span key={tag} className="tag">{tag}</span>;
      })
    }
  }

  sharedBtn(shared: boolean, id: string):any{
    if (shared){
      return <button className="shared" onClick={(e)=>this.props.toggleSharing(e, id)}>Shared</button>;
    } else {
      return <button className="notshared" onClick={(e)=>this.props.toggleSharing(e, id)}>Share</button>;
    }
  }

  render() {
    return (
      <div>
        {this.showLinks()}
      </div>
    );
  }
}

export default LinkDisplay;