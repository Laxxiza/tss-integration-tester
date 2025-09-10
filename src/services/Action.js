import { Mapping } from "./Mapping.js";
import { Callback } from "./Callback.js";

export class Action {
    constructor({
        id,
        slug,
        description,
        mapping = [],
        callbacks = [],
        enable,
    }) {
        this.id = id;
        this.slug = slug;
        this.description = description;
        this.mapping = mapping.map((m) => new Mapping(m));
        this.callbacks = callbacks.map((c) => new Callback(c));
        this.enable = enable;
    }

    toJson() {
        return {
            id: this.id,
            slug: this.slug,
            description: this.description,
            mapping: this.mapping.map((m) => m.toJson()),
            callbacks: this.callbacks.map((c) => c.toJson()),
            enable: this.enable,
        };
    }
}
