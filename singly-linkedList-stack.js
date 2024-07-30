var Stack = /** @class */ (function () {
    function Stack() {
        this.head = undefined;
        this.length = 0;
    }
    Stack.prototype.push = function (item) {
        var node = { value: item };
        this.length++;
        if (!this.head) {
            this.head = node;
            return;
        }
        node.prev = this.head;
        this.head = node;
    };
    Stack.prototype.pop = function () {
        this.length = Math.max(0, this.length - 1);
        if (!this.length) {
            var head_1 = this.head;
            this.head = undefined;
            return head_1 === null || head_1 === void 0 ? void 0 : head_1.value;
        }
        var head = this.head;
        this.head = head.prev;
        // free the memory
        head.prev = undefined;
        return head.value;
    };
    Stack.prototype.peek = function () {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.value;
    };
    return Stack;
}());
