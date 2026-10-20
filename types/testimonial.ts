export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** The property this testimonial is about, when shown outside its own page. */
  project?: { title: string; slug: string };
}
