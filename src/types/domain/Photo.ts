export interface Photo {
  title: string;
  date: Date;
  isPrimary: boolean;
  url: {
    original: string;
    medium: string;
    small: string;
  };
}
