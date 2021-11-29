import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import { makeSelectUser } from './selectors';
import { makeSelectLoading } from './selectors';

import reducer from './reducers';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getUser } from './actions';
import { deleteUser } from './actions';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../../components/css/style.css';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const useStylesLoading = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
const key = 'home';
import { useSnackbar } from 'notistack';
const User = ({
  users,
  loading,
  error,
  repos,
  getUsers,
  deleteUser,
  setStatus,
}) => {
  const classesLoading = useStylesLoading();
  const classes = useStyles();
  // const reposListProps = {
  //   loading,
  //   error,
  //   repos,
  // };

  useEffect(() => {
    setTimeout(() => {
      return getUsers();
    }, 1);
  }, []);
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const history = useHistory();
  const toDetail = userID => {
    history.push({
      pathname: '/detail',
      state: {
        ID: userID,
      },
    });
  };
  const [open, setOpen] = React.useState(false);
  const [userID, setUserID] = React.useState();

  const handleClickOpen = Userid => {
    setUserID(Userid);
    setOpen(true);
  };

  const handleDisagree = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    deleteUser(userID);
    setOpen(false);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleClick = () => {
    console.log(users);
    enqueueSnackbar('I love hooks');
  };
  return (
    <>
      {/* dialog xóa */}

      <Button onClick={handleClick}>Show snackbar</Button>
      <div>
        <Dialog
          open={open}
          onClose={handleDisagree}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure to delete user?'}
          </DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete?
            </DialogContentText>
          </DialogContent> */}
          <DialogActions>
            <Button onClick={() => handleDisagree()} color="primary">
              Disagree
            </Button>
            <Button onClick={() => handleAgree()} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* end xóa */}
      {/* Add */}
      <Button
        variant="contained"
        style={{ backgroundColor: 'Green', margin: '25px 25px' }}
        onClick={() => {
          history.push({
            pathname: '/adduser',
            state: {
              status: 'Add',
            },
          });
        }}
      >
        Add
      </Button>
      <Grid container spacing={1}>
        {users !== undefined &&
          !loading &&
          users.map(user => {
            return (
              <Grid item container xs={6} sm={3} key={user.id}>
                <Paper className={classes.paper}>
                  <p>name: {user.name}</p>
                  <p>email:{user.email}</p>
                  <p>phone:{user.phone}</p>
                  <p>website: {user.website}</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toDetail(user.id)}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'yellow', margin: '5px 5px' }}
                    onClick={() => {
                      history.push({
                        pathname: '/edituser',
                        state: {
                          status: 'Edit',
                          user: user,
                        },
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'red' }}
                    // onClick={() => deleteUser(user.id)}
                    onClick={() => handleClickOpen(user.id)}
                  >
                    Delete
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        {loading && (
          <div className={classesLoading.root} style={{ padding: '15% 45%' }}>
            <CircularProgress color="secondary" />
          </div>
        )}
      </Grid>
    </>
  );
};
User.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  getUser: PropTypes.func,
  deleteUser: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  users: makeSelectUser(),
  loading: makeSelectLoading(),
  // error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => {
      dispatch(getUser());
    },
    deleteUser: id => {
      dispatch(deleteUser(id));
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
)(User);
