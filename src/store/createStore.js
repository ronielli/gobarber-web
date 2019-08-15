import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewars) => {
  const enhacer =
    process.env.NODE_ENV === 'development'
      ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(...middlewars)
        )
      : applyMiddleware(...middlewars);

  return createStore(reducers, enhacer);
};
