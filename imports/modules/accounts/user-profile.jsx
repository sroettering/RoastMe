import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { moment } from 'meteor/momentjs:moment';

import { Roasts } from '/imports/modules/roasts/roasts-collection';
import { Comments } from '/imports/modules/roasts/comments-collection';
import { ProfileRoast } from './profile-roast';
import { Headline } from '/imports/modules/roasts/components/headline';
import { Score } from '/imports/modules/roasts/components/score';
import { Image } from '/imports/modules/roasts/components/image';
import { TabComponent } from '/imports/modules/ui/tab-component';
import { ModalDialog } from '/imports/modules/ui/modal-dialog';
import { ModalConfirm } from '/imports/modules/ui/modal-confirm';
import Loading from '/imports/modules/ui/loading';
import SEO from '/imports/modules/utility/seo';

class UserProfileC extends Component {

  constructor(props) {
    super(props);
    this.getTotalPoints = this.getTotalPoints.bind(this);
    this.resetUsername = this.resetUsername.bind(this);
    this.state = {
      username: '',
      isModalOpen: false,
      roastToDelete: undefined,
    };
  }

  getTotalPoints() {
    let points = 0;
    _.each(this.props.comments, (comment) => {points += comment.points});
    return points;
  }

  logout() {
    Meteor.logout();
    browserHistory.push('/');
  }

  usernameChanged(event) {
    this.setState({ username: this.usernameField.value });
  }

  submitUsername(event) {
    if(event.key === "Enter") {
      const username = this.usernameField.value;
      if(!username) {
        this.resetUsername();
        Bert.alert('Really?' ,'warning');
      } else if(username !== this.props.user.profile.name) {
        Meteor.call('changeUsername', username, (error, result) => {
          if(error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Done!', 'success');
          }
        });
      }
    }
  }

  resetUsername() {
    this.usernameField.value = this.props.user.profile.name;
  }

  focusUsernameField() {
    this.usernameField.focus();
  }

  confirmDelete(roastId) {
    this.setState({
      isModalOpen: true,
      roastToDelete: roastId,
    });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  modalCloseHandler(event) {
    const target = event.target;
    if(target && target.className === 'modal-overlay active') {
      this.closeModal();
    }
    if(event.keyCode === 27) {
      this.closeModal();
    }
  }

  deleteRoast() {
    Meteor.call('deleteRoast', this.state.roastToDelete);
    this.closeModal();
  }

  render() {
    const { userReady, commentsReady, uploadsReady } = this.props;
    if(userReady) {
      const { user, comments, uploads, ownProfile } = this.props;
      const name = this.state.username || user.profile.name;
      const since = moment(user.createdAt).format('DD.MM.YYYY');
      const tabHeadings = ['Best Roasts', ownProfile ? 'My Uploads' : 'Uploads'];
      let avatar;
      if(user.services.facebook) {
        avatar = user.services.facebook.picture;
      } else if(user.services.google) {
        avatar = user.services.google.picture;
      }
      return (
        <div className="profile">
          <SEO
            schema='Profile'
            title={ user.profile.name }
            path={ 'user/' + user._id }
            contentType='profile'
          />
          <ModalDialog isOpen={ this.state.isModalOpen } closeHandler={ this.modalCloseHandler.bind(this) }>
            <ModalConfirm
              onSubmit={ this.deleteRoast.bind(this) }
              onCancel={ this.closeModal.bind(this) }
              title={ 'Delete Image?' }
              confirmText={ 'Your image and all associated roasts will be deleted. Continue?' }/>
          </ModalDialog>
          <div className="profile-section">
            <div className="profile-picture">
              <img src={ avatar } alt={ name } />
            </div>
            <div className="profile-information">
              <div className="username">
                <input
                  className="username-input"
                  type="text"
                  value={ name }
                  onChange={ this.usernameChanged.bind(this) }
                  onKeyPress={ this.submitUsername.bind(this) }
                  onBlur={ this.resetUsername }
                  ref={ input => this.usernameField = input }
                  disabled={ !ownProfile } />
                { ownProfile ?
                  <span className="mdi mdi-pencil" onClick={ this.focusUsernameField.bind(this) }></span>
                   : '' }
              </div>
              <div className="profile-score">
                <Score comments={ comments.length } points={ this.getTotalPoints() } />
              </div>
              <span className="membership">Member since { since }</span>
              { ownProfile ? <button className="flat-button" onClick={ this.logout.bind(this) }>Logout</button> : '' }
            </div>
          </div>
          <div className="profile-section">
            <TabComponent tabHeadings={ tabHeadings } >
              { commentsReady ?
                <div className="profile-roasts">
                  { comments.map((comment, index) => <ProfileRoast key={ index } comment={ comment } />) }
                </div> : <Loading />
              }
              { uploadsReady ?
                <div className="profile-uploads">
                  { uploads.map((roast, index) =>
                    <div className="roast" key={ roast._id }>
                      <Headline
                        roastUrl={ `/roast/${roast._id}` }
                        roastTitle={ roast.title }
                        userId={ roast.userId }
                        username={ roast.userName } />
                      <Score comments={ roast.totalComments } points={ roast.totalUpvotes } />
                      <Image
                        imageUrl={ roast.imageUrl }
                        roastTitle={ roast.title }
                        onClick={ () => browserHistory.push(`/roast/${roast._id}`) } />
                      { ownProfile ? <button
                          className="flat-button right mdi mdi-delete"
                          onClick={ this.confirmDelete.bind(this, roast._id) }>
                        </button> : '' }
                    </div>) }
                </div> : <Loading />
               }
            </TabComponent>
          </div>
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }

}

UserProfileC.propTypes = {
  userReady: React.PropTypes.bool,
  commentsReady: React.PropTypes.bool,
  uploadsReady: React.PropTypes.bool,
  user: React.PropTypes.object,
  comments: React.PropTypes.array,
  uploads: React.PropTypes.array,
  ownProfile: React.PropTypes.bool,
}

export const UserProfile = createContainer(({ params }) => {
  const userId = params.id;
  const userHandle = Meteor.subscribe('user.profile', userId);
  const user = Meteor.users.findOne(userId);
  const ownProfile = Meteor.userId() === userId;
  const commentsHandle = Meteor.subscribe('comments.all.user', userId);
  const uploadsHandle = Meteor.subscribe('roasts.all.user', userId);
  let comments = Comments.find({ userId }, { sort: { points: -1 } }).fetch();
  comments = _.uniq(comments, (item) => item.roastId );
  const uploads = Roasts.find({ userId }, { sort: { createdAt: -1 } }).fetch();
  return {
    userReady: userHandle.ready(),
    commentsReady: commentsHandle.ready(),
    uploadsReady: uploadsHandle.ready(),
    user,
    comments,
    uploads,
    ownProfile,
  }
}, UserProfileC);
