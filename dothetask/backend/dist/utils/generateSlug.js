"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateSlug;
function generateSlug(name) {
    return name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}
//# sourceMappingURL=generateSlug.js.map