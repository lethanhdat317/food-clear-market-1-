import { Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from 'antd';

function AdminLayout(props) {
  const { exact, path, component: Component } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return <Redirect to="/login" />
  } else {
    if (userInfo.role === 'user') {
      return <Redirect to="/" />
    } else {
      return (
        <Route
          exact={exact}
          path={path}
          render={(routeProps) => {
            return (
              <>
                ADMIN HEADER 
                <Link to="/">
                  <Button >Home Page</Button>
                </Link>
                <div className="main-container">
                  <Component {...routeProps} />
                </div>
              </>
            )
          }}  
        />
      );
    }
  }
}

export default AdminLayout;
