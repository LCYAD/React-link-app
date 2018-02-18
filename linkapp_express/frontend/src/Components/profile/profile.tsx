import * as React from 'react';
import './profile.css';

interface ProfileProps {
  fav_count: number;
  shared_count: number;
}

interface ProfileState {}

class Profile extends React.Component <ProfileProps, ProfileState> {
  render() {
    return (
      <div id="profile">
        <div><img id="profile-picture" src="./profile.gif"/></div>
        <div className="counts">
          <p>{this.props.fav_count} of Fav. Link</p>
          <p>{this.props.shared_count} of Shared. Link</p>
        </div>
      </div>
    );
  }
}

export default Profile;
