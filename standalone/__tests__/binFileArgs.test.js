const stdout = require('test-console').stdout;
const stderr = require('test-console').stderr;

const commands = [
    { params: '' }
];

const runTests = () => {
    const output = stdout.inspectSync(() => {
        console.log("foo");
    });
    assert.deepEqual(output, [ "foo\n "]);
};

runTests();
