import React, { useEffect, useReducer } from 'react';
import { Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';

const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

function reducer(state, action) {
  switch(action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
}

const initialState = {
  data: [],
  loading: false,
  error: null,
};

function Post({ id, title, navigate }) {
  return (
    <>
      <Text>{title}</Text>
      <Button
        title="Ver detalles"
        onPress={() => navigate('post', {
          id: id,
        })}
      />
    </>
  );
}

export default function Posts({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING })
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(({ data }) => dispatch({ type: SET_DATA, payload: data }))
      .catch(error => dispatch({ type: SET_ERROR, payload: error }))
      .finally(() => dispatch({ type: TOGGLE_LOADING }));
  }, []);

  const { data, loading } = state;

  if (loading) return <ActivityIndicator size="large" color="purple" />;
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Post
            title={item.title}
            id={item.id}
            navigate={navigation.navigate}
          />
        )}
        keyExtractor={item => `${item.id}`}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('login')}
      />
    </>
  );
}
