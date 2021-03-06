import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean
} from 'graphql';
import AddressType from '../address/AddressType';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    _id: {
      type: GraphQLID,
      resolve: user => user._id
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name.split(' ').shift()
    },
    lastname: {
      type: GraphQLString,
      resolve: user => user.name
        .split(' ')
        .splice(1)
        .join(' ')
    },
    fullname: {
      type: GraphQLString,
      resolve: user => user.name
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email
    },
    avatar: {
      type: GraphQLString,
      resolve: user => user.avatar
    },
    notifications: {
      description: 'Field to define if user are able to receive notifications',
      type: GraphQLBoolean,
      resolve: user => user.notifications
    },
    hero: {
      description:
        'Setting that defines whether the user accepts to receive alert notifications near them',
      type: GraphQLBoolean,
      resolve: user => user.hero
    },
    facebookId: {
      type: GraphQLString,
      resolve: user => user.facebookId
    },
    address: {
      type: AddressType,
      resolve: user => user.address
    }
  })
});

export default UserType;
