import { Mapping } from "./Mapping.js";

export class Callback {
    constructor({ id, slug, description, data, mapping = [], settings }) {
        this.id = id;
        this.slug = slug;
        this.description = description;
        this.data = data; // { condition, uri, method }
        this.mapping = mapping.map((m) => new Mapping(m));
        this.settings = settings; // { authType, authData, isPrediacte }
    }

    toJson() {
        return {
            id: this.id,
            slug: this.slug,
            description: this.description,
            data: this.data,
            mapping: this.mapping.map((m) => m.toJson()),
            settings: this.settings,
        };
    }
}
