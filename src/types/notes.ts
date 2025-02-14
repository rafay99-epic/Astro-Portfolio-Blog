export interface Note {
  id: string;
  slug: string;
  body: string;
  collection: "ms_notes";
  data: {
    lecture_title: string;
    lecture_description: string;
    pubDate: Date;
    lecture_draft: boolean;
    readTime?: string;
    lecture_tags: string[];
    lectureNumber: string;
    subject: string;
  };
}
