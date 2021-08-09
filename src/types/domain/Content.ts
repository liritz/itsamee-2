import { Topic } from "@/types/domain/Topic";

export interface Content {
  pageTitle: string;
  logoUrl: string;
  topics: Array<Topic>;
}
