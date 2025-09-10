import { Action } from "./Action.js";

export default class Project {
    constructor({
        id,
        name,
        slug,
        url,
        description,
        author,
        additional_data,
        actions = [],
        settings,
    }) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.url = url;
        this.description = description;
        this.author = author;
        this.additionalData = additional_data || {};
        this.actions = actions.map((a) => new Action(a));
        this.settings = settings; // { isAsync, authType, ... }
    }

    getActionById(id) {
        return this.actions.find((a) => a.id === id) || null;
    }

    getActionBySlug(slug) {
        return this.actions.find((a) => a.slug === slug) || null;
    }

    getCallbackById(actionSlug, callbackId) {
        const action = this.getActionBySlug(actionSlug);
        if (!action) return null;
        return action.callbacks.find((cb) => cb.id === callbackId) || null;
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            url: this.url,
            description: this.description,
            author: this.author,
            additional_data: this.additional_data,
            actions: this.actions.map((a) => a.toJson()),
            settings: this.settings
        };
    }
}
