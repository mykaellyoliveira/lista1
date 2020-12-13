export function AnalyzeProperty(target, key) {
    console.log(`I'm a Decorator for property '${key}' of the class '${target.constructor.name}'.`);
}
export default AnalyzeProperty;
