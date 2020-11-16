import { toPassPackageAudit } from 'jest-package-audit';

expect.extend({ toPassPackageAudit });

jest.retryTimes(5);
jest.setTimeout(15000);

test('packages do not have vunerabilities', async () => {
  await expect({
    level: 'moderate',
    dependencyType: 'dependencies',
  }).toPassPackageAudit();
});
