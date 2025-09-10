export class Mapping {
    constructor({ request, response }) {
        this.request = request || null;
        this.response = response || null;
    }

    toJson() {
        return {
            request: this.request,
            response: this.response
        };
    }
}
