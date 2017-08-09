import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withUser from '/imports/decorators/withUser';
import withRouter from '/imports/decorators/withRouter';
import UploadModal from '/imports/layout/components/UploadModal';

@withRouter
@withUser
export default class AuthenticatedNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    const { user, history } = this.props;
    if(user && (!user.rulesAccepted || !user.tosAccepted)) {
      history.push('/postSignup');
    } else {
      this.setState({ isModalOpen: true });
    }
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { user, userReady } = this.props;
    return (
      <nav className="navigation-right" role="navigation">
        <ul>
          <li>
            <i className="icon-upload big" onClick={ this.openModal }></i>
          </li>
          <li>
            { userReady ?
              <Link to={ `/user/${(user ? user._id : '')}` }>
                <img className="img-circle" src={ user.getAvatarUrl() } />
              </Link> : ''
            }
          </li>
        </ul>
        <UploadModal isOpen={ this.state.isModalOpen } onClose={ this.closeModal }/>
      </nav>
    );
  }
}
