import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './sagaUserDetail';
import { makeSelectUser } from './selectorsUserDetail';
import reducer from './reducersUserDetail';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getUserDetail } from './actionsUserDetail';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeSelectUserDeails } from './selectorsUserDetail';
import { makeSelectLoading } from './selectorsUserDetail';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation } from 'react-router-dom';
const key = 'detail';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    margin: 'auto',
    color: theme.palette.text.secondary,
  },
}));
function isObjectEmpty(object) {
  var isEmpty = true;
  for (let keys in object) {
    isEmpty = false;
    break; // exiting since we found that the object is not empty
  }
  return isEmpty;
}
const useStylesLoading = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
const UserDetails = ({
  usersDetails,
  loading,
  error,
  repos,
  getDetailUser,
}) => {
  const classesLoading = useStylesLoading();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [UserID, setUserID] = useState(location.state.ID);
  useEffect(() => {
    setUserID(location.state.ID);
    if (UserID === undefined) history.push('/');
    setTimeout(() => {
      getDetailUser(UserID);
    });
  }, []);

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  console.log(usersDetails);
  return (
    <>
      <h1>This is Details User Page</h1>
      <div className={classes.root}>
        <Grid spacing={3} container>
          {usersDetails !== undefined &&
            !loading &&
            !isObjectEmpty(usersDetails) && (
              <Grid item xs={7} key={usersDetails.id}>
                <Paper className={classes.paper}>
                  <p>name: {usersDetails.name}</p>
                  <p>email:{usersDetails.email}</p>
                  <p>phone:{usersDetails.phone}</p>
                  <p>website: {usersDetails.website}</p>
                  <p>
                    {/* address:{usersDetails.address.street} -{' '}
                    {usersDetails.address.suite}- {usersDetails.address.city} */}
                    address:{usersDetails.address}
                  </p>
                </Paper>
              </Grid>
            )}
          {loading && (
            <div className={classesLoading.root} style={{ padding: '15% 45%' }}>
              <CircularProgress color="secondary" />
            </div>
          )}
        </Grid>
      </div>
    </>
  );
};
UserDetails.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  getDetailUser: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  usersDetails: makeSelectUserDeails(),
  loading: makeSelectLoading(),
  // error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getDetailUser: id => {
      dispatch(getUserDetail(id));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserDetails);
