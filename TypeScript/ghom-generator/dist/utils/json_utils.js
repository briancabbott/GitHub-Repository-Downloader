"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReplacer = void 0;
function mapReplacer(key, value) {
    if (value instanceof Map) {
        return Object.fromEntries(value.entries());
    }
    return value;
}
exports.mapReplacer = mapReplacer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9qc29uX3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLFNBQWdCLFdBQVcsQ0FBQyxHQUE2QixFQUFFLEtBQVU7SUFDakUsSUFBSSxLQUFLLFlBQVksR0FBRyxFQUFFO1FBQ3RCLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFORCxrQ0FNQyJ9