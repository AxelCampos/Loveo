import GraphQLDate from 'graphql-date';
import {
  Group, Message, User, Photo, Lifestyle, Activity
} from './connectors';

export const resolvers = {
  Date: GraphQLDate,
  Query: {
    group(_, args) {
      return Group.find({ where: args });
    },
    messages(_, args) {
      return Message.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
    users(_, args) {
      return User.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
    user(_, args) {
      return User.findOne({
        where: args,
      });
    },
    photo(_, args) {
      return Photo.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
    lifestyles(_, args) {
      return Lifestyle.findAll({
        where: args,
      });
    },
    activities(_, args) {
      return Activity.findAll({
        where: args,
      });
    },
  },
  Mutation: {
    createMessage(
      _,
      {
        message: { text, userId, groupId },
      },
    ) {
      return Message.create({
        userId,
        text,
        groupId,
      });
    },
  },
  Group: {
    users(group) {
      return group.getUsers();
    },
    messages(group) {
      return Message.findAll({
        where: { groupId: group.id },
        order: [['createdAt', 'DESC']],
      });
    },
  },
  Message: {
    to(message) {
      return message.getGroup();
    },
    from(message) {
      return message.getUser();
    },
  },
  User: {
    messages(user) {
      return Message.findAll({
        where: { userId: user.id },
        order: [['createdAt', 'DESC']],
      });
    },
    groups(user) {
      return user.getGroups();
    },
    friends(user) {
      return user.getFriends();
    },
    album(user) {
      return Photo.findAll({
        where: { userId: user.id },
        order: [['createdAt', 'DESC']],
      });
    },
    photoprofile(user) {
      return Photo.findOne({
        where: { userId: user.id },
      });
    },
    lifestyle(user) {
      return Lifestyle.findOne({
        where: { userId: user.id },
      });
    },
    activities(user) {
      return user.getActivities();
    },
  },
  Photo: {
    to(photo) {
      return photo.getGroup();
    },
    from(photo) {
      return photo.getUser();
    },
  },
  Lifestyle: {
    from(lifestyle) {
      return lifestyle.getUser();
    },
  },
  Activity: {
    subscription(activity) {
      return activity.getUsers();
    },
  },
  /* To: {
    __resolveType(obj) {
      if (obj.email) {
        return user.getUser();
      }
      return group.getGroup();
    },
  },
*/
};

export default resolvers;
