const preCleanMarkdown = (md: string) => {
    return (
        md
            // Remove markdown images
            .replace(/!\[[^\]]*]\([^)]*\)/g, "")

            // Remove HTML img tags
            .replace(/<img\b[^>]*>/gi, "")

            // Remove markdown badges
            .replace(/\[!\[[^\]]*]\([^)]*\)]\([^)]*\)/g, "")

            // Remove standalone image URLs
            .replace(
                /^https?:\/\/\S+\.(png|jpg|jpeg|gif|svg|webp|bmp|ico)(\?\S*)?$/gim,
                "",
            )

            // Remove standalone URLs
            .replace(/^https?:\/\/\S+$/gim, "")

            // Remove orphaned markdown link targets
            .replace(/\(https?:\/\/[^)\s]+\)/g, "")

            // Remove separator lines
            .replace(/^\s*[-_=*|]{3,}\s*$/gm, "")

            // Remove markdown table separators
            .replace(/^\s*\|?(\s*:?-+:?\s*\|)+\s*:?[-]*\s*$/gm, "")

            // Replace non-breaking spaces
            .replace(/\u00A0/g, " ")

            // Remove double quotes
            .replace(/"/g, "")

            // Collapse multiple spaces/tabs
            .replace(/[ \t]{2,}/g, " ")

            // Collapse excessive blank lines
            .replace(/\n{3,}/g, "\n\n")

            .trim()
    );
};

export default preCleanMarkdown;
