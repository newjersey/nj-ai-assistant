const path = require('path');
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const mongoose = require('mongoose');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
const connect = require('./connect');

const listUsers = async () => {
  try {
    await connect();
    const users = await User.find(
      {},
<<<<<<< HEAD
      'email provider avatar username name createdAt termsAccepted termsAcceptedAt',
=======
      'email provider avatar username name createdAt termsAccepted termsAcceptedAt termsAcceptedSource',
>>>>>>> upstream/main
    );

    console.log('\nUser List:');
    console.log('----------------------------------------');
    users.forEach((user) => {
      console.log(`ID: ${user._id.toString()}`);
      console.log(`Email: ${user.email}`);
      console.log(`Username: ${user.username || 'N/A'}`);
      console.log(`Name: ${user.name || 'N/A'}`);
      console.log(`Provider: ${user.provider || 'email'}`);
      console.log(`Created: ${user.createdAt}`);
      console.log(`Terms Accepted: ${user.termsAccepted ? 'Yes' : 'No'}`);
      console.log(
<<<<<<< HEAD
        `Terms Accepted At: ${user.termsAcceptedAt ? user.termsAcceptedAt.toISOString() : 'N/A'}`,
=======
        `Terms Accepted At: ${user.termsAcceptedAt ? user.termsAcceptedAt.toISOString() : 'N/A'}${
          user.termsAcceptedSource === 'migration' ? ' (backfilled)' : ''
        }`,
>>>>>>> upstream/main
      );
      console.log('----------------------------------------');
    });

    console.log(`\nTotal Users: ${users.length}`);
    process.exit(0);
  } catch (err) {
    console.error('Error listing users:', err);
    process.exit(1);
  }
};

listUsers();
