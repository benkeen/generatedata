const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const authUtils = require('../dist/utils/authUtils.js');
const { createUserAccount } = require('../dist/schema/accounts/resolvers/Mutation/createUserAccount.js');
const { deleteAccount } = require('../dist/schema/accounts/resolvers/Mutation/deleteAccount.js');
const { deleteDataSet } = require('../dist/schema/dataSets/resolvers/Mutation/deleteDataSet.js');
const serverConfig = require('@generatedata/config/serverConfig').default;

const buildNoneJwt = (payload) => {
  const base64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const header = base64Url({ alg: 'none', typ: 'JWT' });
  return `${header}.${base64Url(payload)}.`;
};

test('rejects unsigned alg:none JWTs', () => {
  const fakeJwt = buildNoneJwt({ accountId: 1, email: 'admin@youremail.net' });

  assert.equal(authUtils.authenticate(fakeJwt), false);
  assert.deepEqual(authUtils.getUser(fakeJwt), {});
});

test('rejects tokens signed with an invalid secret', () => {
  const badToken = jwt.sign({ accountId: 1, email: 'admin@youremail.net' }, 'definitely-wrong-secret', {
    algorithm: 'HS256'
  });

  assert.equal(authUtils.authenticate(badToken), false);
  assert.deepEqual(authUtils.getUser(badToken), {});
});

test('accepts tokens signed with configured secret', () => {
  const goodToken = jwt.sign({ accountId: 42, email: 'user@example.test' }, serverConfig.auth.GD_JWT_SECRET, {
    algorithm: 'HS256'
  });

  assert.equal(authUtils.authenticate(goodToken), true);
  const user = authUtils.getUser(goodToken);
  assert.equal(user.accountId, 42);
  assert.equal(user.email, 'user@example.test');
  assert.equal(typeof user.iat, 'number');
});

test('protected resolver denies unauthenticated createUserAccount requests', async () => {
  const result = await createUserAccount(
    null,
    {
      firstName: 'Evil',
      lastName: 'User',
      email: 'evil@example.test',
      country: 'US',
      region: '',
      accountStatus: 'live'
    },
    {
      token: '',
      user: {}
    }
  );

  assert.deepEqual(result, { success: false });
});

test('protected resolver denies unauthenticated deleteAccount requests', async () => {
  const result = await deleteAccount(
    null,
    {
      accountId: 2
    },
    {
      token: '',
      user: {}
    }
  );

  assert.deepEqual(result, { success: false });
});

test('protected resolver denies unauthenticated deleteDataSet requests', async () => {
  const result = await deleteDataSet(
    null,
    {
      dataSetId: 123
    },
    {
      token: '',
      user: {}
    }
  );

  assert.deepEqual(result, { success: false });
});
