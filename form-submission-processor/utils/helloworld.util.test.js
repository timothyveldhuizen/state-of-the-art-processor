import { helloWorld } from './helloworld.util';

test('The function returns hello world text', () => {
    expect(helloWorld()).toBe('Hello, world this is my name!');
});