import { Container } from '@material-ui/core';
import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import { makeSelecError } from './selectors';
import reducer from './reducers';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import '../../components/css/style.css';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';
import { addUser } from './actions';
import { makeSelectUser } from '../User/selectors';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const User = ({ users, loading, error, addUser }) => {
  const classes = useStyles();
  const key = 'addUser';
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      return getUsers();
    }, 1);
  }, []);
  const location = useLocation();
  const [status, setStatus] = useState(location.state.status);
  const [userEdit, SetUserEdit] = useState({
    name: '',
    phone: '',
    address: '',
    website: '',
    company: '',
    email: '',
  });
  const validate = {
    dodai: 'độ dài',
    name: 'trùng tên',
  };
  useEffect(() => {
    if (status == 'Edit') {
      SetUserEdit(location.state.user);
    }
  }, []);
  const backHome = () => {
    if (error === null) {
      history.goBack();
    }
  };
  const checkName = userName => {
    console.log(users);
    //  users.forEach(element => {
    //   if (users[index].name === userName) return true;
  };
  const validation = () => {
    console.log('aa');
    if (!checkName(userEdit.name)) console.log('đúng name');
  };
  return (
    <>
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
          item
          xs={10}
          sm={10}
          style={{ display: 'flex', margin: 'auto' }}
        >
          <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
            Add New User
          </Grid>

          <Grid item xs={6} sm={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                fullWidth
                label="Name"
                required
                aria-readonly={status === 'Edit'}
                value={userEdit.name}
                onChange={e =>
                  SetUserEdit({
                    ...userEdit,
                    name: e.target.value,
                  })
                }
                onBlur={() => validation()}
              />
            </form>
          </Grid>
          <Grid item xs={6} sm={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                fullWidth
                label="Phone"
                value={userEdit.phone}
                onChange={e =>
                  SetUserEdit({
                    ...userEdit,
                    phone: e.target.value,
                  })
                }
                onBlur={() => validation()}
                required
              />
            </form>
          </Grid>
          <Grid item xs={6} sm={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                fullWidth
                label="Address "
                value={userEdit.address}
                onChange={e =>
                  SetUserEdit({
                    ...userEdit,
                    address: e.target.value,
                  })
                }
                onBlur={() => validation()}
                required
              />
            </form>
          </Grid>
          <Grid item xs={6} sm={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                fullWidth
                label="Website "
                value={userEdit.website}
                onChange={e =>
                  SetUserEdit({
                    ...userEdit,
                    website: e.target.value,
                  })
                }
                onBlur={() => validation()}
                required
              />
            </form>
          </Grid>
          <Grid item xs={6} sm={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                fullWidth
                label="Company "
                value={userEdit.company}
                onChange={e =>
                  SetUserEdit({
                    ...userEdit,
                    company: e.target.value,
                  })
                }
                onBlur={() => validation()}
                required
              />
            </form>
          </Grid>
          <Grid item xs={6} sm={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                fullWidth
                label="Email "
                value={userEdit.email}
                onChange={e =>
                  SetUserEdit({
                    ...userEdit,
                    email: e.target.value,
                  })
                }
                onBlur={() => validation()}
                required
              />
            </form>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: '25%' }}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: '25%' }}
              onClick={() => {
                addUser(status, userEdit);
                backHome();
              }}
            >
              {status}
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
User.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};
const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  users: makeSelectUser(),
  // loading: makeSelectLoading(),
  error: makeSelecError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    addUser: (status, user) => {
      dispatch(addUser(status, user));
    },
    getUsers: () => {
      dispatch(getUser());
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
