import { MarkdownSection } from "./types";

const BAD_HEADING_PATTERNS = [
    /(tour packages?|holiday packages?|travel packages?)/i,
    /\bpackage\b/i,
    /\bbrand office\b/i,
    /\bcontact\b/i,
    /\benquiry\b/i,
    /\bbook now\b/i,
    /\brequest callback\b/i,

    // [3 Nights 4 Days ...]
    /\[\s*\d+\s*nights?.*?\]/i,

    // 3 Nights 4 Days ...
    /\b\d+\s*nights?\s*\d+\s*days?\b/i,
];

const BAD_CONTENT_PATTERNS = [
    /^send enquiry$/i,
    /^enquiry$/i,
    /^book now$/i,
    /^request callback$/i,
    /^get quote$/i,

    // Tour/package related
    /\btour packages?\b/i,
    /\bholiday packages?\b/i,
    /\btravel packages?\b/i,
    /\bpackage\b/i,

    // Dropdowns like 3 Nights/4 Days...
    /\b\d+\s*nights?\s*\/\s*\d+\s*days?\b/i,

    // Repeated duration options
    /\btrip duration\b/i,

    // Booking forms
    /\bplease choose an option\b/i,

    /\bnumber of people\b/i,

    /\bselect package\b/i,

    /\bcustomize (your )?trip\b/i,
    /\babout us\b/i,
    /\bwhy choose us\b/i,
    /\bexperienced\b/i,
    /\bour team\b/i,
    /\btestimonials?\b/i,
    /\bclient reviews?\b/i,
    /\bawards?\b/i,
];

const filterSections = (sections: MarkdownSection[]): MarkdownSection[] => {
    return sections.filter((section) => {
        const heading = section.heading.trim().toLowerCase();
        const content = section.content.trim().toLocaleLowerCase();

        if (BAD_HEADING_PATTERNS.some((r) => r.test(heading))) {
            return false;
        }

        if (BAD_CONTENT_PATTERNS.some((r) => r.test(content))) {
            return false;
        }

        if (content.length < 150) {
            return false;
        }

        if (
            /trip\s*duration/i.test(content) ||
            /number\s*of\s*people/i.test(content) ||
            /\d+\s*nights?/i.test(content)
        ) {
            return false;
        }
        // Ignore almost empty sections
        if (content.length < 40) {
            return false;
        }

        return true;
    });
};

export default filterSections;
