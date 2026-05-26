import { project } from "./project";
import { journalPost } from "./journal-post";
import { person } from "./person";
import { settings } from "./settings";

export const schema = {
  types: [project, journalPost, person, settings],
};
