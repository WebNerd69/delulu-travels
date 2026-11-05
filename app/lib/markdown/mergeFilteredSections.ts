
import { MarkdownSection } from "./types";

const cleanText = (text: string): string => {
  let content = text;

  // Remove URLs, emails and phone numbers
  content = content.replace(/https?:\/\/\S+|www\.\S+/gi, "");
  content = content.replace(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    ""
  );
  content = content.replace(
    /(?:\+?\d{1,3}[-\s]?)?(?:\d[-\s]?){10,12}/g,
    ""
  );

  // Remove booking form fields and navigation
  content = content.replace(
    /\b(?:dd-mm-yyyy|trip duration|number of people|send enquiry|send enquirys)\b/gi,
    ""
  );

  // Remove duration options
  content = content.replace(
    /\b\d+\s*nights?\s*\/\s*\d+\s*days?\b/gi,
    ""
  );

  // Remove repeated promotional sentences
  const promotionalPatterns = [
    /do not hesitate to give us a call[^.!?]*[.!?]?/gi,
    /we are happy to talk to you[^.!?]*[.!?]?/gi,
    /an experienced sikkim tour operator[^.!?]*[.!?]?/gi,
    /sikkim tourism has received numerous accolades[^.!?]*[.!?]?/gi,
    /send enquiries?/gi,
  ];

  for (const pattern of promotionalPatterns) {
    content = content.replace(pattern, "");
  }

  // Normalize whitespace
  content = content
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return content;
};

// Remove duplicate sentences while preserving order
const removeDuplicates = (text: string): string => {
  const paragraphs = text.split(/\n{2,}/);
  const seen = new Set<string>();

  const cleanedParagraphs = paragraphs
    .map(paragraph => {
      const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [];

      return sentences
        .map(sentence => sentence.trim())
        .filter(sentence => {
          const normalized = sentence
            .toLowerCase()
            .replace(/[^\p{L}\p{N}]+/gu, " ")
            .trim();

          if (!normalized || seen.has(normalized)) {
            return false;
          }

          seen.add(normalized);
          return true;
        })
        .join(" ");
    })
    .filter(Boolean);

  return cleanedParagraphs.join("\n\n");
};

const mergeFilteredSections = (
  filteredSections: MarkdownSection[]
): string => {

  // Merge sections while preserving paragraph boundaries
  const mergedContent = filteredSections
    .map(item => item.content)
    .filter(Boolean)
    .join("\n\n");

  const cleaned = cleanText(mergedContent);

  return removeDuplicates(cleaned);
};

export default mergeFilteredSections;
