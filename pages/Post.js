import React, { useEffect, useReducer } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

function reducer(state, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      }
    default:
      return state;
  }
}

const initialState = {
  data: {},
  loading: false,
  error: null,
}

export default function Post({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ action: TOGGLE_LOADING });
    const id = navigation.getParam('id');
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(({ data }) => dispatch({ type: SET_DATA, payload: data }))
      .catch(error => dispatch({ type: SET_ERROR, payload: error }))
      .finally(() => dispatch({ action: TOGGLE_LOADING }));
  }, []);

  const { data, loading } = state;

  if (loading) return <ActivityIndicator size="large" color="purple" />;
  return (
    <>
      <Text>{data.title}</Text>
      <Text>{data.body}</Text>
    </>
  );
}
