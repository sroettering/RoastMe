import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {
    return withRouter(ComposedComponent);
}