import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import withUser from '/imports/decorators/withUser';

@withUser
class AuthenticatedNav extends Component {
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

  modalCloseHandler(event) {
    const target = event.target;
    if(target && target.className === 'modal-overlay active') {
      this.closeModal();
    }
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
        {/* <ModalDialog isOpen={ this.state.isModalOpen } closeHandler={ this.modalCloseHandler.bind(this) }>
          <ModalUpload closeModal={ this.closeModal.bind(this) }/>
        </ModalDialog> */}
      </nav>
    );
  }
}

export default withRouter(AuthenticatedNav);
