/* eslint-disable import/no-anonymous-default-export */
import user from './user';
import message from './message';
import product from './product';

export default {
  ...user,
  ...message,
  ...product,
};
