export function Log(prefix) {
    return (target) => {
        console.log(`I'm a Decorator with prefix "${prefix}" for the class '${target.name}'.`);
    };
}
export default Log;
